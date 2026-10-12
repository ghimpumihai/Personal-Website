import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getBlogPostBySlug } from '$lib/blog-storage';

export const load: PageServerLoad = async ({ params }) => {
	const post = await getBlogPostBySlug(params.slug);

	if (!post) {
		error(404, 'Article not found');
	}

	return {
		post
	};
};
