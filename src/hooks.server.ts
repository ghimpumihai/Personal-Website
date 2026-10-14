import type { Handle } from '@sveltejs/kit';
import { validateBasicAuthHeader } from '$lib/basic-auth';

function isProtectedPath(pathname: string) {
	return pathname.startsWith('/admin') || pathname.startsWith('/api/admin');
}

export const handle: Handle = async ({ event, resolve }) => {
	if (isProtectedPath(event.url.pathname)) {
		let clientIp = '127.0.0.1';
		try {
			clientIp = event.getClientAddress();
		} catch {
			// In tests or environments without an address hook, fallback to default
		}

		const result = validateBasicAuthHeader(event.request.headers.get('authorization'), clientIp);
		if (!result.ok) {
			return result.response;
		}
	}

	return resolve(event);
};
