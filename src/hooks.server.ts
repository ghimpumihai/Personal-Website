import type { Handle } from '@sveltejs/kit';
import { validateBasicAuthHeader } from '$lib/basic-auth';

function isProtectedPath(pathname: string): boolean {
	return pathname.startsWith('/admin') || pathname.startsWith('/api/admin');
}

export function isLocalhost(hostname: string): boolean {
	return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
}

export const handle: Handle = async ({ event, resolve }) => {
	if (isProtectedPath(event.url.pathname)) {
		// Localhost-only defense: On production domains, admin routes return 404 Not Found.
		if (!isLocalhost(event.url.hostname)) {
			return new Response('Not found', { status: 404 });
		}

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
