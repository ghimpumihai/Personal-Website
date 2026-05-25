export interface BlogContentBlock {
  type: "heading" | "paragraph" | "list" | "image";
  content: string | string[] | { alt: string; src: string };
}

export function parseBlogContent(content: string): BlogContentBlock[] {
  const blocks = content
    .trim()
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks.map((block) => {
    if (block.startsWith("## ")) {
      return {
        type: "heading" as const,
        content: block.replace(/^## /, "").trim(),
      };
    }

    const imageMatch = block.match(/^!\[(.*)\]\((https?:\/\/[^)\s]+)\)$/);
    if (imageMatch) {
      return {
        type: "image" as const,
        content: {
          alt: imageMatch[1].trim(),
          src: imageMatch[2].trim(),
        },
      };
    }

    const lines = block.split("\n").map((line) => line.trim());
    const listItems = lines
      .filter((line) => line.startsWith("- "))
      .map((line) => line.replace(/^- /, "").trim());

    if (listItems.length === lines.length && listItems.length > 0) {
      return {
        type: "list" as const,
        content: listItems,
      };
    }

    return {
      type: "paragraph" as const,
      content: lines.join(" "),
    };
  });
}
