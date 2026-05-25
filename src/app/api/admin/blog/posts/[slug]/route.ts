import { NextRequest, NextResponse } from "next/server";
import { deleteBlogPost, getBlogPostBySlug, updateBlogPost } from "@/lib/blog-storage";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: {
    slug: string;
  };
}

export async function GET(_: NextRequest, { params }: RouteContext) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }

  return NextResponse.json({ post });
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const body = await request.json();
    const post = await updateBlogPost(params.slug, body);
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to update post.",
      },
      { status: 400 },
    );
  }
}

export async function DELETE(_: NextRequest, { params }: RouteContext) {
  try {
    await deleteBlogPost(params.slug);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to delete post.",
      },
      { status: 400 },
    );
  }
}
