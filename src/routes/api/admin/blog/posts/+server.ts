import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createBlogPost, getAllBlogPosts } from '$lib/blog-storage';

export const GET: RequestHandler = async () => {
	const posts = await getAllBlogPosts();
	return json({ posts });
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const post = await createBlogPost(body);
		return json({ post }, { status: 201 });
	} catch (err) {
		return json(
			{
				error: err instanceof Error ? err.message : 'Failed to create post.'
			},
			{ status: 400 }
		);
	}
};
