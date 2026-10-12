import type { PageServerLoad } from './$types';
import { isBlobConfigured } from '$lib/blog-storage';

export const load: PageServerLoad = async () => {
	return {
		blobConfigured: isBlobConfigured()
	};
};
