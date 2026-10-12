import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { deleteBlogPost, getBlogPostBySlug, updateBlogPost } from '$lib/blog-storage';

export const GET: RequestHandler = async ({ params }) => {
	const post = await getBlogPostBySlug(params.slug);

	if (!post) {
		return json({ error: 'Post not found.' }, { status: 404 });
	}

	return json({ post });
};

export const PUT: RequestHandler = async ({ request, params }) => {
	try {
		const body = await request.json();
		const post = await updateBlogPost(params.slug, body);
		return json({ post });
	} catch (err) {
		return json(
			{
				error: err instanceof Error ? err.message : 'Failed to update post.'
			},
			{ status: 400 }
		);
	}
};

export const DELETE: RequestHandler = async ({ params }) => {
	try {
		await deleteBlogPost(params.slug);
		return json({ success: true });
	} catch (err) {
		return json(
			{
				error: err instanceof Error ? err.message : 'Failed to delete post.'
			},
			{ status: 400 }
		);
	}
};
