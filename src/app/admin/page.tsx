import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { AdminBlogPanel } from "@/components/blog/AdminBlogPanel";
import { BLOG_BLOB_PATHNAME, getAllBlogPosts, getBlogCacheInfo, isBlobConfigured } from "@/lib/blog-storage";

export const metadata: Metadata = {
  title: "Admin | Blog",
  description: "Protected blog administration panel.",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const posts = await getAllBlogPosts();
  const blobConfigured = isBlobConfigured();
  const cacheInfo = getBlogCacheInfo();

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-700 dark:text-amber-400">
            Admin
          </p>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
            Blog management panel
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
            Manage the full blog lifecycle here: create articles, update
            existing posts, and remove content when it is no longer needed.
          </p>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Canonical store: <span className="font-mono">{BLOG_BLOB_PATHNAME}</span>
          </p>
          {blobConfigured && cacheInfo.hasCache && (
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              In-memory fallback cache last updated at {cacheInfo.cacheUpdatedAt}.
            </p>
          )}
        </div>

        <AdminBlogPanel initialPosts={posts} blobConfigured={blobConfigured} />
      </Container>
    </section>
  );
}
