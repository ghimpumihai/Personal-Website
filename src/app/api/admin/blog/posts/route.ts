import { NextRequest, NextResponse } from "next/server";
import { createBlogPost, getAllBlogPosts } from "@/lib/blog-storage";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await getAllBlogPosts();
  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const post = await createBlogPost(body);
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to create post.",
      },
      { status: 400 },
    );
  }
}
