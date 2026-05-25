"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BlogPost, formatBlogDate, getAllBlogThemes } from "@/lib/blog";

interface BlogIndexProps {
  posts: BlogPost[];
}

export function BlogIndex({ posts }: BlogIndexProps) {
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

  const allThemes = useMemo(() => getAllBlogThemes(posts), [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedThemes.length === 0) {
      return posts;
    }

    return posts.filter((post) =>
      selectedThemes.every((theme) => post.themes.includes(theme)),
    );
  }, [posts, selectedThemes]);

  const toggleTheme = (theme: string) => {
    setSelectedThemes((current) =>
      current.includes(theme)
        ? current.filter((item) => item !== theme)
        : [...current, theme],
    );
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_290px] lg:items-start">
      <div className="space-y-8">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-48px_rgba(15,23,42,0.65)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_-42px_rgba(15,23,42,0.55)] dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <span>{formatBlogDate(post.publishedAt)}</span>
              <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
              <span>{post.themes.length} themes</span>
            </div>

            <Link href={`/blog/${post.slug}`} className="group block">
              <h2 className="font-serif text-3xl font-semibold text-slate-900 transition group-hover:text-amber-700 dark:text-slate-50 dark:group-hover:text-amber-300">
                {post.title}
              </h2>
            </Link>

            <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
              {post.excerpt}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {post.themes.map((theme) => (
                <button
                  key={theme}
                  type="button"
                  onClick={() => toggleTheme(theme)}
                  className={`rounded-full border px-3 py-1 text-sm transition ${
                    selectedThemes.includes(theme)
                      ? "border-amber-500 bg-amber-100 text-amber-900 dark:border-amber-400 dark:bg-amber-400/10 dark:text-amber-200"
                      : "border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-800 dark:border-slate-700 dark:text-slate-300 dark:hover:border-amber-500 dark:hover:text-amber-200"
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-amber-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-amber-300"
              >
                Read article
              </Link>
            </div>
          </article>
        ))}

        {filteredPosts.length === 0 && (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-slate-600 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300">
            No articles match the selected themes yet. Try removing one of the
            filters to broaden the list.
          </div>
        )}
      </div>

      <aside className="lg:sticky lg:top-24">
        <div className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-[0_20px_50px_-45px_rgba(15,23,42,0.65)] dark:border-slate-800 dark:bg-[linear-gradient(180deg,rgba(51,65,85,0.32)_0%,rgba(15,23,42,0.92)_100%)]">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-serif text-2xl font-semibold text-slate-900 dark:text-slate-50">
              Filter by theme
            </h2>
            {selectedThemes.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedThemes([])}
                className="text-sm font-medium text-amber-700 transition hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-200"
              >
                Reset
              </button>
            )}
          </div>

          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Select one or more themes to narrow the archive.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 lg:flex-col">
            {allThemes.map((theme) => {
              const active = selectedThemes.includes(theme);

              return (
                <button
                  key={theme}
                  type="button"
                  onClick={() => toggleTheme(theme)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                    active
                      ? "border-amber-500 bg-amber-100 text-amber-900 dark:border-amber-400 dark:bg-amber-400/10 dark:text-amber-100"
                      : "border-slate-200 bg-white text-slate-700 hover:border-amber-300 hover:bg-amber-50 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:border-amber-500 dark:hover:bg-slate-900"
                  }`}
                >
                  {theme}
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}
