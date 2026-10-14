import { createHash, timingSafeEqual } from "node:crypto";
import {
  checkRateLimit,
  recordFailedAttempt,
  resetRateLimit,
} from "$lib/rate-limit";

const REALM = "Blog Admin";

function unauthorizedResponse() {
  return new Response("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
    },
  });
}

function rateLimitedResponse(retryAfterSeconds: number) {
  return new Response(
    `Too many failed login attempts. Please wait ${retryAfterSeconds} seconds before trying again.`,
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfterSeconds),
      },
    },
  );
}

function safeCompare(a: string, b: string): boolean {
  const hashA = createHash("sha256").update(a).digest();
  const hashB = createHash("sha256").update(b).digest();
  return timingSafeEqual(hashA, hashB);
}

export function validateBasicAuthHeader(
  header: string | null,
  clientIp = "127.0.0.1",
) {
  const expectedUsername = process.env.BLOG_ADMIN_USERNAME;
  const expectedPassword = process.env.BLOG_ADMIN_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    return {
      ok: false,
      response: new Response(
        "Missing BLOG_ADMIN_USERNAME or BLOG_ADMIN_PASSWORD environment variables.",
        { status: 500 },
      ),
    };
  }

  const rateLimit = checkRateLimit(clientIp);
  if (!rateLimit.allowed) {
    return {
      ok: false,
      response: rateLimitedResponse(rateLimit.retryAfterSeconds ?? 60),
    };
  }

  if (!header?.startsWith("Basic ")) {
    return { ok: false, response: unauthorizedResponse() };
  }

  let decoded: string;
  try {
    decoded = atob(header.slice(6));
  } catch {
    recordFailedAttempt(clientIp);
    return { ok: false, response: unauthorizedResponse() };
  }

  const separatorIndex = decoded.indexOf(":");
  if (separatorIndex === -1) {
    recordFailedAttempt(clientIp);
    return { ok: false, response: unauthorizedResponse() };
  }

  const username = decoded.slice(0, separatorIndex);
  const password = decoded.slice(separatorIndex + 1);

  if (
    !safeCompare(username, expectedUsername) ||
    !safeCompare(password, expectedPassword)
  ) {
    recordFailedAttempt(clientIp);
    return { ok: false, response: unauthorizedResponse() };
  }

  resetRateLimit(clientIp);
  return { ok: true as const };
}
