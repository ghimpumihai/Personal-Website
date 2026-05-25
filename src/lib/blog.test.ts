import { describe, expect, it } from "vitest";
import {
  formatBlogDate,
  getAllBlogThemes,
  normalizeSlug,
  sortBlogPosts,
} from "@/lib/blog";
import { parseBlogContent } from "@/lib/blog-render";

describe("blog data", () => {
  it("orders posts from newest to oldest", () => {
    expect(
      sortBlogPosts([
        {
          slug: "older",
          title: "Older",
          excerpt: "Older",
          publishedAt: "2026-03-14",
          themes: ["Learning"],
          introduction: "Intro",
          content: "Content",
          bibliography: [],
          usefulLinks: [],
        },
        {
          slug: "newer",
          title: "Newer",
          excerpt: "Newer",
          publishedAt: "2026-05-18",
          themes: ["Backend"],
          introduction: "Intro",
          content: "Content",
          bibliography: [],
          usefulLinks: [],
        },
      ]).map((post) => post.slug),
    ).toEqual([
      "newer",
      "older",
    ]);
  });

  it("collects unique blog themes", () => {
    expect(
      getAllBlogThemes([
        {
          slug: "one",
          title: "One",
          excerpt: "One",
          publishedAt: "2026-03-14",
          themes: ["Learning", "Backend"],
          introduction: "Intro",
          content: "Content",
          bibliography: [],
          usefulLinks: [],
        },
        {
          slug: "two",
          title: "Two",
          excerpt: "Two",
          publishedAt: "2026-05-18",
          themes: ["Design", "Learning"],
          introduction: "Intro",
          content: "Content",
          bibliography: [],
          usefulLinks: [],
        },
      ]),
    ).toEqual([
      "Backend",
      "Design",
      "Learning",
    ]);
  });

  it("normalizes slugs and formats dates", () => {
    expect(normalizeSlug(" Designing Personal Projects for Clarity ")).toBe(
      "designing-personal-projects-for-clarity",
    );
    expect(formatBlogDate("2026-05-18")).toBe("May 18, 2026");
  });

  it("parses blog content blocks", () => {
    expect(
      parseBlogContent(`## Heading\n\nParagraph text.\n\n![Diagram](https://example.com/image.png)\n\n- Item one\n- Item two`),
    ).toEqual([
      { type: "heading", content: "Heading" },
      { type: "paragraph", content: "Paragraph text." },
      { type: "image", content: { alt: "Diagram", src: "https://example.com/image.png" } },
      { type: "list", content: ["Item one", "Item two"] },
    ]);
  });
});
