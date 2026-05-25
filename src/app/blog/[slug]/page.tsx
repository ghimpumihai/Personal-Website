import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { BlogContentRenderer } from "@/components/blog/BlogContentRenderer";
import { formatBlogDate } from "@/lib/blog";
import { getBlogPostBySlug } from "@/lib/blog-storage";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Article Not Found | Portfolio",
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="py-16 md:py-24">
      <Container className="max-w-4xl">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="text-sm font-medium text-amber-700 transition hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-200"
          >
            Back to all articles
          </Link>

          <header className="mt-6 rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#fff8eb_0%,#ffffff_100%)] p-8 shadow-[0_25px_70px_-50px_rgba(15,23,42,0.75)] dark:border-slate-800 dark:bg-[linear-gradient(180deg,rgba(51,65,85,0.35)_0%,rgba(15,23,42,0.95)_100%)] md:p-10">
            <div className="flex flex-wrap gap-2">
              {post.themes.map((theme) => (
                <span
                  key={theme}
                  className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-sm text-amber-900 dark:border-amber-500/60 dark:bg-amber-400/10 dark:text-amber-100"
                >
                  {theme}
                </span>
              ))}
            </div>

            <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
              {post.title}
            </h1>

            <p className="mt-4 text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              {formatBlogDate(post.publishedAt)}
            </p>

            <p className="mt-6 text-lg leading-8 text-slate-700 dark:text-slate-300">
              {post.introduction}
            </p>
          </header>

          <article className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.75)] dark:border-slate-800 dark:bg-slate-900 md:p-10">
            <BlogContentRenderer content={post.content} />

            <div className="mt-14 grid gap-8 border-t border-slate-200 pt-10 dark:border-slate-800 md:grid-cols-2">
              <section>
                <h2 className="font-serif text-2xl font-semibold text-slate-900 dark:text-slate-50">
                  Bibliography
                </h2>
                <ul className="mt-5 space-y-3 text-base leading-7 text-slate-700 dark:text-slate-300">
                  {post.bibliography.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="transition hover:text-amber-700 dark:hover:text-amber-300"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-slate-900 dark:text-slate-50">
                  Useful links
                </h2>
                <ul className="mt-5 space-y-3 text-base leading-7 text-slate-700 dark:text-slate-300">
                  {post.usefulLinks.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="transition hover:text-amber-700 dark:hover:text-amber-300"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
