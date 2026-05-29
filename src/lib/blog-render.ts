export interface BlogContentBlock {
  type: "heading" | "paragraph" | "list" | "image" | "code";
  content: string | string[] | { alt: string; src: string };
  language?: string;
}

export function parseBlogContent(content: string): BlogContentBlock[] {
  const blocks: string[] = [];
  const lines = content.trim().split("\n");
  let currentBlock: string[] = [];
  let codeBlock: string[] = [];
  let codeLanguage = "";
  let isInsideCodeBlock = false;

  const pushCurrentBlock = () => {
    const block = currentBlock.join("\n").trim();
    if (block) {
      blocks.push(block);
    }
    currentBlock = [];
  };

  lines.forEach((line) => {
    if (line.startsWith("```")) {
      if (isInsideCodeBlock) {
        blocks.push(`\`\`\`${codeLanguage}\n${codeBlock.join("\n")}\n\`\`\``);
        codeBlock = [];
        codeLanguage = "";
        isInsideCodeBlock = false;
      } else {
        pushCurrentBlock();
        codeLanguage = line.replace(/^```/, "").trim();
        isInsideCodeBlock = true;
      }
      return;
    }

    if (isInsideCodeBlock) {
      codeBlock.push(line);
      return;
    }

    if (!line.trim()) {
      pushCurrentBlock();
      return;
    }

    currentBlock.push(line);
  });

  if (isInsideCodeBlock) {
    blocks.push(`\`\`\`${codeLanguage}\n${codeBlock.join("\n")}`);
  }
  pushCurrentBlock();

  return blocks.map((block) => {
    if (block.startsWith("## ")) {
      return {
        type: "heading" as const,
        content: block.replace(/^## /, "").trim(),
      };
    }

    const codeMatch = block.match(/^```([^\n]*)\n?([\s\S]*?)(?:\n```)?$/);
    if (codeMatch) {
      return {
        type: "code" as const,
        language: codeMatch[1].trim(),
        content: codeMatch[2].replace(/\n$/, ""),
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
