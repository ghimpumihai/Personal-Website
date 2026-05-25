import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { getAllBlogPosts, getBlogCacheInfo, isBlobConfigured } from "@/lib/blog-storage";

export const metadata: Metadata = {
  title: "Blog | Portfolio",
  description:
    "Chronological articles with theme filters, bibliography sections, and useful links.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const blobConfigured = isBlobConfigured();
  const cacheInfo = getBlogCacheInfo();

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-700 dark:text-amber-400">
            Blog
          </p>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
            Notes, articles, and learning trails
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
            Posts are ordered from newest to oldest, with theme filters on the
            right just like a classic long-form blog archive.
          </p>
          {!blobConfigured && (
            <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-500/40 dark:bg-amber-400/10 dark:text-amber-100">
              Vercel Blob is not configured yet, so the blog can only show
              in-memory cached posts from the current server process.
            </p>
          )}
          {blobConfigured && posts.length === 0 && cacheInfo.hasCache && (
            <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-500/40 dark:bg-amber-400/10 dark:text-amber-100">
              Blob could not be reached, so the page is currently showing the
              most recent in-memory cached version.
            </p>
          )}
        </div>

        <BlogIndex posts={posts} />
      </Container>
    </section>
  );
}
