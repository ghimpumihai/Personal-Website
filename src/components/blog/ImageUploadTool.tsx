"use client";

import { DragEvent, useState, useTransition } from "react";

interface ImageUploadToolProps {
  slug?: string;
  blobConfigured: boolean;
  onUseImage?: (payload: { alt: string; url: string; markdown: string }) => void;
  compact?: boolean;
}

export function ImageUploadTool({
  slug,
  blobConfigured,
  onUseImage,
  compact = false,
}: ImageUploadToolProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [manualUrl, setManualUrl] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, startUploadTransition] = useTransition();

  const activeUrl = uploadedUrl || manualUrl.trim();
  const activeAlt = altText.trim() || "Image";
  const markdown = activeUrl ? `![${activeAlt}](${activeUrl})` : "";

  const handleUpload = () => {
    if (!selectedFile) {
      setError("Choose an image file before uploading.");
      setMessage(null);
      return;
    }

    setError(null);
    setMessage(null);

    startUploadTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        if (slug) {
          formData.append("slug", slug);
        }

        const response = await fetch("/api/admin/blog/images", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? "Failed to upload image.");
        }

        setUploadedUrl(data.url as string);
        setManualUrl(data.url as string);
        if (!altText.trim()) {
          setAltText((selectedFile.name || "image").replace(/\.[^.]+$/, ""));
        }
        setMessage("Image uploaded to Vercel Blob.");
      } catch (uploadError) {
        setError(
          uploadError instanceof Error ? uploadError.message : "Failed to upload image.",
        );
      }
    });
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragActive(false);
    const file = event.dataTransfer.files?.[0] ?? null;
    setSelectedFile(file);
    if (file) {
      setMessage(`Selected ${file.name}.`);
      setError(null);
    }
  };

  const handleUseImage = () => {
    if (!activeUrl || !onUseImage) {
      return;
    }

    onUseImage({
      alt: activeAlt,
      url: activeUrl,
      markdown,
    });
    setMessage("Image markdown inserted.");
    setError(null);
  };

  const handleCopy = async () => {
    if (!markdown) {
      return;
    }

    try {
      await navigator.clipboard.writeText(markdown);
      setMessage("Markdown copied to clipboard.");
      setError(null);
    } catch {
      setError("Could not copy to clipboard.");
      setMessage(null);
    }
  };

  const handleCopyUrl = async () => {
    if (!activeUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(activeUrl);
      setMessage("Image URL copied to clipboard.");
      setError(null);
    } catch {
      setError("Could not copy the image URL.");
      setMessage(null);
    }
  };

  return (
    <div
      className={`rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,#fff8eb_0%,#ffffff_100%)] p-5 dark:border-slate-800 dark:bg-[linear-gradient(180deg,rgba(51,65,85,0.28)_0%,rgba(15,23,42,0.96)_100%)] ${
        compact ? "" : "shadow-[0_20px_60px_-48px_rgba(15,23,42,0.65)]"
      }`}
    >
      <div className="flex flex-col gap-2">
        <h3 className="font-serif text-2xl font-semibold text-slate-900 dark:text-slate-50">
          Upload or paste image
        </h3>
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
          Upload a local file to Vercel Blob or paste an existing image URL, then
          copy or insert the markdown.
        </p>
      </div>

      {!blobConfigured && (
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-500/40 dark:bg-amber-400/10 dark:text-amber-100">
          `BLOB_READ_WRITE_TOKEN` is required for uploads. You can still paste an existing image URL below.
        </div>
      )}

      {(message || error) && (
        <div
          className={`mt-4 rounded-2xl px-4 py-3 text-sm ${
            error
              ? "border border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-500/40 dark:bg-rose-400/10 dark:text-rose-100"
              : "border border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-500/40 dark:bg-sky-400/10 dark:text-sky-100"
          }`}
        >
          {error ?? message}
        </div>
      )}

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          Alt text
          <input
            value={altText}
            onChange={(event) => setAltText(event.target.value)}
            placeholder="Describe the image"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-amber-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          Image URL
          <input
            value={manualUrl}
            onChange={(event) => {
              setManualUrl(event.target.value);
              setUploadedUrl("");
            }}
            placeholder="https://..."
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-amber-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end">
        <label
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragActive(true);
          }}
          onDragLeave={() => setIsDragActive(false)}
          onDrop={handleDrop}
          className={`flex-1 flex cursor-pointer flex-col gap-2 rounded-[1.5rem] border border-dashed px-4 py-4 text-sm font-medium transition ${
            isDragActive
              ? "border-amber-500 bg-amber-50 text-amber-900 dark:border-amber-400 dark:bg-amber-400/10 dark:text-amber-100"
              : "border-slate-300 bg-white text-slate-700 hover:border-amber-300 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-amber-500"
          }`}
        >
          <span>Local image file</span>
          <span className="text-xs font-normal leading-6 text-slate-500 dark:text-slate-400">
            Drag and drop here or click to choose a file.
            {selectedFile ? ` Selected: ${selectedFile.name}` : ""}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
            className="sr-only"
          />
        </label>

        <button
          type="button"
          onClick={handleUpload}
          disabled={isUploading || !blobConfigured}
          className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-amber-300"
        >
          {isUploading ? "Uploading..." : "Upload to Blob"}
        </button>
      </div>

      {markdown && (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Image URL
          </p>
          <input
            readOnly
            value={activeUrl}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          />
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Markdown
          </p>
          <input
            readOnly
            value={markdown}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCopyUrl}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              Copy URL
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              Copy markdown
            </button>
            {onUseImage && (
              <button
                type="button"
                onClick={handleUseImage}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-amber-300"
              >
                Insert into article
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
