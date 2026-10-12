import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { uploadBlogImage } from '$lib/blog-storage';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.formData();
		const file = formData.get('file');
		const slug = formData.get('slug');

		if (!(file instanceof File)) {
			return json({ error: 'Image file is required.' }, { status: 400 });
		}

		const result = await uploadBlogImage(file, typeof slug === 'string' ? slug : undefined);

		return json(result, { status: 201 });
	} catch (err) {
		return json(
			{
				error: err instanceof Error ? err.message : 'Failed to upload image.'
			},
			{ status: 400 }
		);
	}
};
