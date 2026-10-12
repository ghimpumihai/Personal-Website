import type { PageServerLoad } from './$types';
import { getAllBlogPosts, getBlogCacheInfo, isBlobConfigured } from '$lib/blog-storage';

export const load: PageServerLoad = async () => {
	const posts = await getAllBlogPosts();
	const blobConfigured = isBlobConfigured();
	const cacheInfo = getBlogCacheInfo();

	return {
		posts,
		blobConfigured,
		cacheInfo
	};
};
