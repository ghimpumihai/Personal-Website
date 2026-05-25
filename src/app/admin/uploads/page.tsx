import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ImageUploadTool } from "@/components/blog/ImageUploadTool";
import { isBlobConfigured } from "@/lib/blog-storage";

export const metadata: Metadata = {
  title: "Admin Uploads | Blog",
  description: "Upload blog images to Vercel Blob and copy markdown.",
};

export const dynamic = "force-dynamic";

export default function AdminUploadsPage() {
  const blobConfigured = isBlobConfigured();

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-700 dark:text-amber-400">
            Uploads
          </p>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
            Image uploader for article content
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
            Drag in a local image or pick a file, upload it to Vercel Blob, then copy the markdown or URL into your article.
          </p>
          <div className="mt-5">
            <Link
              href="/admin"
              className="text-sm font-medium text-amber-700 transition hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-200"
            >
              Back to blog admin
            </Link>
          </div>
        </div>

        <div className="max-w-4xl">
          <ImageUploadTool blobConfigured={blobConfigured} />
        </div>
      </Container>
    </section>
  );
}
