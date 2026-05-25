import { get, put } from "@vercel/blob";
import { BlogPost, normalizeSlug, sortBlogPosts } from "@/lib/blog";

export const BLOG_BLOB_PATHNAME = "blog/blog-posts.json";
const BLOG_IMAGE_PREFIX = "blog/images";

let cachedBlogPosts: BlogPost[] | null = null;
let cacheUpdatedAt: string | null = null;

export function isBlobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function sanitizeFileName(fileName: string) {
  const extensionIndex = fileName.lastIndexOf(".");
  const baseName = extensionIndex === -1 ? fileName : fileName.slice(0, extensionIndex);
  const extension = extensionIndex === -1 ? "" : fileName.slice(extensionIndex).toLowerCase();
  const safeBaseName = baseName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${safeBaseName || "image"}${extension}`;
}

function sanitizeLink(link: { label?: string; href?: string }) {
  const label = link.label?.trim() ?? "";
  const href = link.href?.trim() ?? "";

  if (!label || !href) {
    return null;
  }

  return { label, href };
}

export function sanitizeBlogPostInput(input: Partial<BlogPost>) {
  const slug = normalizeSlug(input.slug ?? input.title ?? "");

  const post: BlogPost = {
    slug,
    title: input.title?.trim() ?? "",
    excerpt: input.excerpt?.trim() ?? "",
    publishedAt: input.publishedAt?.trim() ?? "",
    themes: (input.themes ?? [])
      .map((theme) => theme.trim())
      .filter(Boolean),
    introduction: input.introduction?.trim() ?? "",
    content: input.content?.trim() ?? "",
    bibliography: (input.bibliography ?? [])
      .map(sanitizeLink)
      .filter((link): link is NonNullable<typeof link> => Boolean(link)),
    usefulLinks: (input.usefulLinks ?? [])
      .map(sanitizeLink)
      .filter((link): link is NonNullable<typeof link> => Boolean(link)),
  };

  if (!post.slug) {
    throw new Error("Slug is required.");
  }

  if (!post.title || !post.excerpt || !post.publishedAt || !post.introduction || !post.content) {
    throw new Error("Title, excerpt, publish date, introduction, and content are required.");
  }

  if (post.themes.length === 0) {
    throw new Error("At least one theme is required.");
  }

  return post;
}

function sanitizeBlogPostsCollection(input: unknown) {
  if (!Array.isArray(input)) {
    throw new Error("The Blob blog JSON must contain an array of posts.");
  }

  return sortBlogPosts(
    input.map((item) => sanitizeBlogPostInput(item as Partial<BlogPost>)),
  );
}

function updateCache(posts: BlogPost[]) {
  cachedBlogPosts = sortBlogPosts(posts);
  cacheUpdatedAt = new Date().toISOString();
  return cachedBlogPosts;
}

function getCachedPosts() {
  return cachedBlogPosts ? sortBlogPosts(cachedBlogPosts) : [];
}

async function readBlobText(pathname: string) {
  const result = await get(pathname, { access: "public" });

  if (!result || result.statusCode !== 200 || !result.stream) {
    return null;
  }

  return await new Response(result.stream).text();
}

async function readPostsFromBlob() {
  if (!isBlobConfigured()) {
    throw new Error("Vercel Blob is not configured.");
  }

  const text = await readBlobText(BLOG_BLOB_PATHNAME);

  if (!text) {
    return updateCache([]);
  }

  const posts = sanitizeBlogPostsCollection(JSON.parse(text) as unknown);
  return updateCache(posts);
}

async function writePostsToBlob(posts: BlogPost[]) {
  if (!isBlobConfigured()) {
    throw new Error("Vercel Blob is not configured.");
  }

  const normalizedPosts = sortBlogPosts(posts);

  await put(BLOG_BLOB_PATHNAME, JSON.stringify(normalizedPosts, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json; charset=utf-8",
  });

  return updateCache(normalizedPosts);
}

export async function getAllBlogPosts() {
  try {
    return await readPostsFromBlob();
  } catch {
    return getCachedPosts();
  }
}

export async function getBlogPostBySlug(slug: string) {
  const normalizedSlug = normalizeSlug(slug);
  const posts = await getAllBlogPosts();
  return posts.find((post) => post.slug === normalizedSlug) ?? null;
}

export async function createBlogPost(input: Partial<BlogPost>) {
  const post = sanitizeBlogPostInput(input);
  const posts = await readPostsFromBlob();

  if (posts.some((item) => item.slug === post.slug)) {
    throw new Error("A post with this slug already exists.");
  }

  await writePostsToBlob([...posts, post]);
  return post;
}

export async function updateBlogPost(existingSlug: string, input: Partial<BlogPost>) {
  const previousSlug = normalizeSlug(existingSlug);
  const posts = await readPostsFromBlob();
  const current = posts.find((post) => post.slug === previousSlug);

  if (!current) {
    throw new Error("Post not found.");
  }

  const nextPost = sanitizeBlogPostInput({
    ...current,
    ...input,
  });

  const conflictingPost = posts.find(
    (post) => post.slug === nextPost.slug && post.slug !== previousSlug,
  );

  if (conflictingPost) {
    throw new Error("Another post already uses the new slug.");
  }

  const nextPosts = posts.map((post) =>
    post.slug === previousSlug ? nextPost : post,
  );

  await writePostsToBlob(nextPosts);
  return nextPost;
}

export async function deleteBlogPost(slug: string) {
  const normalizedSlug = normalizeSlug(slug);
  const posts = await readPostsFromBlob();
  const nextPosts = posts.filter((post) => post.slug !== normalizedSlug);

  if (nextPosts.length === posts.length) {
    throw new Error("Post not found.");
  }

  await writePostsToBlob(nextPosts);
}

export function getBlogCacheInfo() {
  return {
    hasCache: Boolean(cachedBlogPosts),
    cacheUpdatedAt,
  };
}

export async function uploadBlogImage(file: File, slug?: string) {
  if (!isBlobConfigured()) {
    throw new Error("Vercel Blob is not configured.");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Only image uploads are allowed.");
  }

  const safeSlug = normalizeSlug(slug ?? "") || "draft";
  const safeName = sanitizeFileName(file.name);
  const pathname = `${BLOG_IMAGE_PREFIX}/${safeSlug}/${Date.now()}-${safeName}`;
  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: false,
    contentType: file.type,
  });

  return {
    pathname: blob.pathname,
    url: blob.url,
    markdown: `![${safeName.replace(/\.[^.]+$/, "")}](${blob.url})`,
  };
}
