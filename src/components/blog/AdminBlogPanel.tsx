"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import { BlogContentRenderer } from "@/components/blog/BlogContentRenderer";
import { ImageUploadTool } from "@/components/blog/ImageUploadTool";
import { BlogLink, BlogPost, createEmptyBlogPost, normalizeSlug } from "@/lib/blog";

interface AdminBlogPanelProps {
  initialPosts: BlogPost[];
  blobConfigured: boolean;
}

interface FormState {
  originalSlug: string | null;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  themes: string;
  introduction: string;
  content: string;
  bibliography: BlogLink[];
  usefulLinks: BlogLink[];
}

function toFormState(post: BlogPost): FormState {
  return {
    originalSlug: post.slug || null,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    themes: post.themes.join(", "),
    introduction: post.introduction,
    content: post.content,
    bibliography: post.bibliography.length > 0 ? post.bibliography : [{ label: "", href: "" }],
    usefulLinks: post.usefulLinks.length > 0 ? post.usefulLinks : [{ label: "", href: "" }],
  };
}

function toPayload(form: FormState) {
  return {
    slug: form.slug,
    title: form.title,
    excerpt: form.excerpt,
    publishedAt: form.publishedAt,
    themes: form.themes
      .split(",")
      .map((theme) => theme.trim())
      .filter(Boolean),
    introduction: form.introduction,
    content: form.content,
    bibliography: form.bibliography,
    usefulLinks: form.usefulLinks,
  };
}

export function AdminBlogPanel({
  initialPosts,
  blobConfigured,
}: AdminBlogPanelProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialPosts[0]?.slug ?? null);
  const [form, setForm] = useState<FormState>(() =>
    toFormState(initialPosts[0] ?? createEmptyBlogPost()),
  );
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const [isPending, startTransition] = useTransition();
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    [posts],
  );

  const handleNewPost = () => {
    setSelectedSlug(null);
    setMessage(null);
    setError(null);
    setForm(toFormState(createEmptyBlogPost()));
  };

  const handleSelectPost = (post: BlogPost) => {
    setSelectedSlug(post.slug);
    setMessage(null);
    setError(null);
    setForm(toFormState(post));
  };

  const handleFieldChange = (field: keyof FormState, value: string) => {
    setForm((current) => {
      if (field === "title" && !current.originalSlug) {
        return {
          ...current,
          title: value,
          slug: normalizeSlug(value),
        };
      }

      return {
        ...current,
        [field]: value,
      };
    });
  };

  const handleLinkChange = (
    section: "bibliography" | "usefulLinks",
    index: number,
    field: keyof BlogLink,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [section]: current[section].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const addLinkRow = (section: "bibliography" | "usefulLinks") => {
    setForm((current) => ({
      ...current,
      [section]: [...current[section], { label: "", href: "" }],
    }));
  };

  const removeLinkRow = (section: "bibliography" | "usefulLinks", index: number) => {
    setForm((current) => ({
      ...current,
      [section]:
        current[section].length === 1
          ? [{ label: "", href: "" }]
          : current[section].filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const refreshPosts = async () => {
    const response = await fetch("/api/admin/blog/posts", { cache: "no-store" });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error ?? "Failed to refresh posts.");
    }

    const nextPosts = data.posts as BlogPost[];
    setPosts(nextPosts);

    if (selectedSlug) {
      const nextSelectedPost = nextPosts.find((post) => post.slug === selectedSlug);
      if (nextSelectedPost) {
        setForm(toFormState(nextSelectedPost));
      }
    }
  };

  const handleSave = () => {
    setMessage(null);
    setError(null);

    startTransition(async () => {
      try {
        const isEditing = Boolean(form.originalSlug);
        const endpoint = isEditing
          ? `/api/admin/blog/posts/${form.originalSlug}`
          : "/api/admin/blog/posts";
        const method = isEditing ? "PUT" : "POST";

        const response = await fetch(endpoint, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(toPayload(form)),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? "Failed to save post.");
        }

        const savedPost = data.post as BlogPost;
        await refreshPosts();
        setSelectedSlug(savedPost.slug);
        setForm(toFormState(savedPost));
        setMessage(isEditing ? "Post updated successfully." : "Post created successfully.");
      } catch (saveError) {
        setError(saveError instanceof Error ? saveError.message : "Failed to save post.");
      }
    });
  };

  const handleDelete = () => {
    if (!form.originalSlug) {
      return;
    }

    const confirmed = window.confirm(`Delete "${form.title}"?`);

    if (!confirmed) {
      return;
    }

    setMessage(null);
    setError(null);

    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/blog/posts/${form.originalSlug}`, {
          method: "DELETE",
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? "Failed to delete post.");
        }

        const remainingPosts = posts.filter((post) => post.slug !== form.originalSlug);
        setPosts(remainingPosts);

        if (remainingPosts[0]) {
          setSelectedSlug(remainingPosts[0].slug);
          setForm(toFormState(remainingPosts[0]));
        } else {
          handleNewPost();
        }

        setMessage("Post deleted successfully.");
      } catch (deleteError) {
        setError(
          deleteError instanceof Error ? deleteError.message : "Failed to delete post.",
        );
      }
    });
  };

  const insertImageMarkdownAtCursor = (markdown: string) => {
    const textarea = contentRef.current;

    setForm((current) => {
      if (!textarea) {
        const nextContent = current.content.trim()
          ? `${current.content.trim()}\n\n${markdown}`
          : markdown;
        return { ...current, content: nextContent };
      }

      const start = textarea.selectionStart ?? current.content.length;
      const end = textarea.selectionEnd ?? current.content.length;
      const before = current.content.slice(0, start);
      const after = current.content.slice(end);
      const shouldPrefixBreak = before.length > 0 && !before.endsWith("\n\n");
      const shouldSuffixBreak = after.length > 0 && !after.startsWith("\n");
      const insertion = `${shouldPrefixBreak ? "\n\n" : ""}${markdown}${shouldSuffixBreak ? "\n\n" : ""}`;

      return {
        ...current,
        content: `${before}${insertion}${after}`,
      };
    });

    setIsImageModalOpen(false);
    setMessage("Image markdown inserted into the article.");
    setError(null);
  };

  return (
    <>
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.7)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400">
                  Image Insert
                </p>
                <h2 className="mt-2 font-serif text-3xl font-semibold text-slate-900 dark:text-slate-50">
                  Add an image into the article
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-950"
              >
                Close
              </button>
            </div>

            <div className="mt-6">
              <ImageUploadTool
                slug={form.slug}
                blobConfigured={blobConfigured}
                compact
                onUseImage={({ markdown }) => insertImageMarkdownAtCursor(markdown)}
              />
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-8 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-48px_rgba(15,23,42,0.65)] dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-serif text-2xl font-semibold text-slate-900 dark:text-slate-50">
              Posts
            </h2>
            <button
              type="button"
              onClick={handleNewPost}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-amber-300"
            >
              New
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {sortedPosts.map((post) => (
              <button
                key={post.slug}
                type="button"
                onClick={() => handleSelectPost(post)}
                className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                  selectedSlug === post.slug
                    ? "border-amber-500 bg-amber-50 dark:border-amber-400 dark:bg-amber-400/10"
                    : "border-slate-200 hover:border-amber-300 dark:border-slate-700 dark:hover:border-amber-500"
                }`}
              >
                <p className="text-sm text-slate-500 dark:text-slate-400">{post.publishedAt}</p>
                <p className="mt-2 font-medium text-slate-900 dark:text-slate-50">{post.title}</p>
                <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
                  {post.excerpt}
                </p>
              </button>
            ))}

            {sortedPosts.length === 0 && (
              <p className="rounded-2xl border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                No posts yet. Create the first one from this panel.
              </p>
            )}
          </div>
        </aside>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-48px_rgba(15,23,42,0.65)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
          {!blobConfigured && (
            <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-500/40 dark:bg-amber-400/10 dark:text-amber-100">
              CRUD actions are disabled until `BLOB_READ_WRITE_TOKEN` is configured.
              This admin panel no longer uses hardcoded local blog seed data.
            </div>
          )}

          {(message || error) && (
            <div
              className={`mb-6 rounded-2xl px-4 py-3 text-sm ${
                error
                  ? "border border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-500/40 dark:bg-rose-400/10 dark:text-rose-100"
                  : "border border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-400/10 dark:text-emerald-100"
              }`}
            >
              {error ?? message}
            </div>
          )}

          <div className="mb-8 flex flex-wrap gap-3 rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,#fff8eb_0%,#ffffff_100%)] p-3 dark:border-slate-800 dark:bg-[linear-gradient(180deg,rgba(51,65,85,0.28)_0%,rgba(15,23,42,0.96)_100%)]">
            <button
              type="button"
              onClick={() => setActiveTab("editor")}
              className={`rounded-full px-5 py-3 text-sm font-medium transition ${
                activeTab === "editor"
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950"
                  : "border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-950"
              }`}
            >
              Creation
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`rounded-full px-5 py-3 text-sm font-medium transition ${
                activeTab === "preview"
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950"
                  : "border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-950"
              }`}
            >
              Preview
            </button>
          </div>

          {activeTab === "editor" && (
            <>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  Title
                  <input
                    value={form.title}
                    onChange={(event) => handleFieldChange("title", event.target.value)}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-amber-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  Slug
                  <input
                    value={form.slug}
                    onChange={(event) => handleFieldChange("slug", normalizeSlug(event.target.value))}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-amber-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  Publish date
                  <input
                    type="date"
                    value={form.publishedAt}
                    onChange={(event) => handleFieldChange("publishedAt", event.target.value)}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-amber-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  Themes
                  <input
                    value={form.themes}
                    onChange={(event) => handleFieldChange("themes", event.target.value)}
                    placeholder="Learning, Backend, AI"
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-amber-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                  />
                </label>
              </div>

              <label className="mt-5 flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                Excerpt
                <textarea
                  value={form.excerpt}
                  onChange={(event) => handleFieldChange("excerpt", event.target.value)}
                  rows={3}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-amber-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                />
              </label>

              <label className="mt-5 flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                Introduction
                <textarea
                  value={form.introduction}
                  onChange={(event) => handleFieldChange("introduction", event.target.value)}
                  rows={5}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-amber-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                />
              </label>

              <label className="mt-5 flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                Article content
                <p className="text-xs font-normal leading-6 text-slate-500 dark:text-slate-400">
                  Use `## Heading` for section titles, `- item` for bullet lists, and
                  `![Alt text](https://...)` to place images directly in the article.
                  Wrap code between triple backticks to render it as a code block.
                </p>
                <textarea
                  ref={contentRef}
                  value={form.content}
                  onChange={(event) => handleFieldChange("content", event.target.value)}
                  rows={18}
                  placeholder={"Write markdown-like content, including image lines like ![Example](https://your-image-url)."}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-900 outline-none transition focus:border-amber-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                />
              </label>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setIsImageModalOpen(true)}
                  className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-amber-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-amber-300"
                >
                  Insert image
                </button>
              </div>
            </>
          )}

          {activeTab === "preview" && (
            <div className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[0_20px_60px_-48px_rgba(15,23,42,0.65)] dark:border-slate-800 dark:bg-[linear-gradient(180deg,rgba(51,65,85,0.2)_0%,rgba(15,23,42,0.94)_100%)] md:p-8">
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400">
                  Live Preview
                </p>
                <h3 className="mt-2 font-serif text-3xl font-semibold text-slate-900 dark:text-slate-50">
                  How the article will read
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  This preview updates as you write and uses the same renderer as the public blog page.
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-wrap gap-2">
                  {form.themes
                    .split(",")
                    .map((theme) => theme.trim())
                    .filter(Boolean)
                    .map((theme) => (
                      <span
                        key={theme}
                        className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-sm text-amber-900 dark:border-amber-500/60 dark:bg-amber-400/10 dark:text-amber-100"
                      >
                        {theme}
                      </span>
                    ))}
                </div>

                <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                  {form.title || "Untitled article"}
                </h1>

                <p className="mt-4 text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  {form.publishedAt || "No publish date"}
                </p>

                <p className="mt-6 text-lg leading-8 text-slate-700 dark:text-slate-300">
                  {form.introduction || "Your introduction will appear here."}
                </p>

                <div className="mt-10 border-t border-slate-200 pt-8 dark:border-slate-800">
                  <BlogContentRenderer content={form.content} />
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 grid gap-8 xl:grid-cols-2">
            {(["bibliography", "usefulLinks"] as const).map((section) => (
              <div key={section}>
                <div className="mb-3 flex items-center justify-between gap-4">
                  <h3 className="font-serif text-2xl font-semibold text-slate-900 dark:text-slate-50">
                    {section === "bibliography" ? "Bibliography" : "Useful links"}
                  </h3>
                  <button
                    type="button"
                    onClick={() => addLinkRow(section)}
                    className="text-sm font-medium text-amber-700 transition hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-200"
                  >
                    Add row
                  </button>
                </div>

                <div className="space-y-4">
                  {form[section].map((item, index) => (
                    <div
                      key={`${section}-${index}`}
                      className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700"
                    >
                      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                        Label
                        <input
                          value={item.label}
                          onChange={(event) =>
                            handleLinkChange(section, index, "label", event.target.value)
                          }
                          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-amber-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                        />
                      </label>
                      <label className="mt-3 flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                        URL
                        <input
                          value={item.href}
                          onChange={(event) =>
                            handleLinkChange(section, index, "href", event.target.value)
                          }
                          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-amber-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => removeLinkRow(section, index)}
                        className="mt-3 text-sm font-medium text-rose-700 transition hover:text-rose-900 dark:text-rose-300 dark:hover:text-rose-200"
                      >
                        Remove row
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={isPending || !blobConfigured}
              className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-amber-300"
            >
              {isPending ? "Saving..." : form.originalSlug ? "Update post" : "Create post"}
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending || !blobConfigured || !form.originalSlug}
              className="rounded-full border border-rose-300 px-5 py-3 text-sm font-medium text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-rose-500/40 dark:text-rose-300 dark:hover:bg-rose-400/10"
            >
              Delete post
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
