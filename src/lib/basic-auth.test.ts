import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { validateBasicAuthHeader } from "./basic-auth";

describe("validateBasicAuthHeader", () => {
  const originalUsername = process.env.BLOG_ADMIN_USERNAME;
  const originalPassword = process.env.BLOG_ADMIN_PASSWORD;

  beforeEach(() => {
    process.env.BLOG_ADMIN_USERNAME = "admin";
    process.env.BLOG_ADMIN_PASSWORD = "secret";
  });

  afterEach(() => {
    process.env.BLOG_ADMIN_USERNAME = originalUsername;
    process.env.BLOG_ADMIN_PASSWORD = originalPassword;
  });

  it("safely rejects malformed base64 headers without crashing", () => {
    const result = validateBasicAuthHeader("Basic !!!invalid-base64!!!");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.response.status).toBe(401);
    }
  });

  it("accepts valid credentials", () => {
    const validHeader = "Basic " + btoa("admin:secret");
    const result = validateBasicAuthHeader(validHeader);
    expect(result.ok).toBe(true);
  });

  it("rejects invalid credentials", () => {
    const invalidHeader = "Basic " + btoa("admin:wrong");
    const result = validateBasicAuthHeader(invalidHeader);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.response.status).toBe(401);
    }
  });
});
