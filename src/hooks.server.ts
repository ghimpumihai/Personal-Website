import type { Handle } from '@sveltejs/kit';
import { validateBasicAuthHeader } from '$lib/basic-auth';

function isProtectedPath(pathname: string) {
	return pathname.startsWith('/admin') || pathname.startsWith('/api/admin');
}

export const handle: Handle = async ({ event, resolve }) => {
	if (isProtectedPath(event.url.pathname)) {
		const result = validateBasicAuthHeader(event.request.headers.get('authorization'));
		if (!result.ok) {
			return result.response;
		}
	}

	return resolve(event);
};
