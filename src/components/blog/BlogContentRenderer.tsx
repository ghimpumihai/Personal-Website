import Image from "next/image";
import { parseBlogContent } from "@/lib/blog-render";

interface BlogContentRendererProps {
  content: string;
}

export function BlogContentRenderer({ content }: BlogContentRendererProps) {
  const blocks = parseBlogContent(content);

  if (blocks.length === 0) {
    return (
      <p className="text-base leading-8 text-slate-500 dark:text-slate-400">
        No article content yet.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2
              key={`${block.type}-${index}`}
              className="font-serif text-2xl font-semibold text-slate-900 dark:text-slate-50 md:text-3xl"
            >
              {block.content as string}
            </h2>
          );
        }

        if (block.type === "list") {
          return (
            <ul
              key={`${block.type}-${index}`}
              className="space-y-3 text-base leading-8 text-slate-700 dark:text-slate-300"
            >
              {(block.content as string[]).map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-3 h-2 w-2 rounded-full bg-amber-500" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "image") {
          const image = block.content as { alt: string; src: string };

          return (
            <figure
              key={`${block.type}-${index}`}
              className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950"
            >
              <Image
                src={image.src}
                alt={image.alt || "Blog image"}
                width={1200}
                height={800}
                className="h-auto w-full object-cover"
              />
              {image.alt && (
                <figcaption className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
                  {image.alt}
                </figcaption>
              )}
            </figure>
          );
        }

        if (block.type === "code") {
          return (
            <figure
              key={`${block.type}-${index}`}
              className="overflow-hidden rounded-[1.25rem] border border-slate-800 bg-slate-950 shadow-[0_18px_45px_-35px_rgba(15,23,42,0.9)]"
            >
              {block.language && (
                <figcaption className="border-b border-slate-800 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-amber-300">
                  {block.language}
                </figcaption>
              )}
              <pre className="overflow-x-auto p-5 text-sm leading-7 text-slate-100">
                <code>{block.content as string}</code>
              </pre>
            </figure>
          );
        }

        return (
          <p
            key={`${block.type}-${index}`}
            className="text-base leading-8 text-slate-700 dark:text-slate-300"
          >
            {block.content as string}
          </p>
        );
      })}
    </div>
  );
}
