import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { validateBasicAuthHeader } from "./basic-auth";
import { resetRateLimit } from "./rate-limit";

describe("validateBasicAuthHeader", () => {
  const originalUsername = process.env.BLOG_ADMIN_USERNAME;
  const originalPassword = process.env.BLOG_ADMIN_PASSWORD;
  const testIp = "192.0.2.1";

  beforeEach(() => {
    process.env.BLOG_ADMIN_USERNAME = "admin";
    process.env.BLOG_ADMIN_PASSWORD = "secret";
    resetRateLimit(testIp);
  });

  afterEach(() => {
    process.env.BLOG_ADMIN_USERNAME = originalUsername;
    process.env.BLOG_ADMIN_PASSWORD = originalPassword;
    resetRateLimit(testIp);
  });

  it("safely rejects malformed base64 headers without crashing", () => {
    const result = validateBasicAuthHeader("Basic !!!invalid-base64!!!", testIp);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.response.status).toBe(401);
    }
  });

  it("accepts valid credentials", () => {
    const validHeader = "Basic " + btoa("admin:secret");
    const result = validateBasicAuthHeader(validHeader, testIp);
    expect(result.ok).toBe(true);
  });

  it("rejects invalid credentials", () => {
    const invalidHeader = "Basic " + btoa("admin:wrong");
    const result = validateBasicAuthHeader(invalidHeader, testIp);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.response.status).toBe(401);
    }
  });

  it("enforces rate limits after 5 failed attempts with 429 Too Many Requests", () => {
    const invalidHeader = "Basic " + btoa("admin:wrong");

    // 5 failed attempts
    for (let i = 0; i < 5; i++) {
      const res = validateBasicAuthHeader(invalidHeader, testIp);
      expect(res.ok).toBe(false);
      if (!res.ok) {
        expect(res.response.status).toBe(401);
      }
    }

    // 6th attempt should be blocked with 429
    const blockedRes = validateBasicAuthHeader(invalidHeader, testIp);
    expect(blockedRes.ok).toBe(false);
    if (!blockedRes.ok) {
      expect(blockedRes.response.status).toBe(429);
      expect(blockedRes.response.headers.get("Retry-After")).toBeDefined();
    }
  });

  it("resets rate limit counter after a successful login", () => {
    const invalidHeader = "Basic " + btoa("admin:wrong");
    const validHeader = "Basic " + btoa("admin:secret");

    // 2 failed attempts
    validateBasicAuthHeader(invalidHeader, testIp);
    validateBasicAuthHeader(invalidHeader, testIp);

    // 1 successful login resets counter
    const successRes = validateBasicAuthHeader(validHeader, testIp);
    expect(successRes.ok).toBe(true);

    // Should still allow attempts without 429
    const afterRes = validateBasicAuthHeader(invalidHeader, testIp);
    expect(afterRes.ok).toBe(false);
    if (!afterRes.ok) {
      expect(afterRes.response.status).toBe(401);
    }
  });
});
