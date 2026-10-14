import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { uploadBlogImage } from '$lib/blog-storage';

const MAX_IMAGE_BYTES = 4.5 * 1024 * 1024; // 4.5 MB Vercel Serverless body limit
const ALLOWED_MIME_TYPES = new Set([
	'image/jpeg',
	'image/png',
	'image/webp',
	'image/gif',
	'image/svg+xml'
]);

export const POST: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.formData();
		const file = formData.get('file');
		const slug = formData.get('slug');

		if (!(file instanceof File)) {
			return json({ error: 'Image file is required.' }, { status: 400 });
		}

		if (file.size > MAX_IMAGE_BYTES) {
			return json(
				{ error: 'File exceeds maximum allowed size of 4.5 MB.' },
				{ status: 413 }
			);
		}

		if (!ALLOWED_MIME_TYPES.has(file.type)) {
			return json(
				{ error: `File type '${file.type}' is not supported. Use JPG, PNG, WebP, GIF, or SVG.` },
				{ status: 415 }
			);
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
