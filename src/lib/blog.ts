export interface BlogLink {
  label: string;
  href: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  themes: string[];
  introduction: string;
  content: string;
  bibliography: BlogLink[];
  usefulLinks: BlogLink[];
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function sortBlogPosts(posts: BlogPost[]) {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getAllBlogThemes(posts: BlogPost[]) {
  return Array.from(new Set(posts.flatMap((post) => post.themes))).sort((a, b) =>
    a.localeCompare(b),
  );
}

export function createEmptyBlogPost(): BlogPost {
  return {
    slug: "",
    title: "",
    excerpt: "",
    publishedAt: new Date().toISOString().slice(0, 10),
    themes: [],
    introduction: "",
    content: "",
    bibliography: [{ label: "", href: "" }],
    usefulLinks: [{ label: "", href: "" }],
  };
}
