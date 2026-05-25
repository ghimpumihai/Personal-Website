const REALM = "Blog Admin";

function unauthorizedResponse() {
  return new Response("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
    },
  });
}

export function validateBasicAuthHeader(header: string | null) {
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

  if (!header?.startsWith("Basic ")) {
    return { ok: false, response: unauthorizedResponse() };
  }

  const decoded = atob(header.slice(6));
  const separatorIndex = decoded.indexOf(":");

  if (separatorIndex === -1) {
    return { ok: false, response: unauthorizedResponse() };
  }

  const username = decoded.slice(0, separatorIndex);
  const password = decoded.slice(separatorIndex + 1);

  if (username !== expectedUsername || password !== expectedPassword) {
    return { ok: false, response: unauthorizedResponse() };
  }

  return { ok: true as const };
}
