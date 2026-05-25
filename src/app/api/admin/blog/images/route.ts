import { NextRequest, NextResponse } from "next/server";
import { uploadBlogImage } from "@/lib/blog-storage";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const slug = formData.get("slug");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Image file is required." }, { status: 400 });
    }

    const result = await uploadBlogImage(
      file,
      typeof slug === "string" ? slug : undefined,
    );

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to upload image.",
      },
      { status: 400 },
    );
  }
}
