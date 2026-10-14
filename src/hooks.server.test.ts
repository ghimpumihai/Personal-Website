import { describe, expect, it, vi } from 'vitest';
import { handle, isLocalhost } from './hooks.server';
import type { RequestEvent } from '@sveltejs/kit';

describe('hooks.server handle', () => {
	it('correctly identifies localhost hostnames', () => {
		expect(isLocalhost('localhost')).toBe(true);
		expect(isLocalhost('127.0.0.1')).toBe(true);
		expect(isLocalhost('::1')).toBe(true);
		expect(isLocalhost('ghimpumihai.com')).toBe(false);
		expect(isLocalhost('portfolio-sigma.vercel.app')).toBe(false);
		expect(isLocalhost('192.168.1.10')).toBe(false);
	});

	it('blocks non-localhost access to /admin with 404 Not Found', async () => {
		const mockEvent = {
			url: new URL('https://ghimpumihai.com/admin'),
			request: new Request('https://ghimpumihai.com/admin'),
			getClientAddress: () => '203.0.113.1'
		} as unknown as RequestEvent;

		const resolve = vi.fn();
		const response = await handle({ event: mockEvent, resolve });

		expect(response.status).toBe(404);
		expect(await response.text()).toBe('Not found');
		expect(resolve).not.toHaveBeenCalled();
	});

	it('blocks non-localhost access to /api/admin/blog/images with 404 Not Found', async () => {
		const mockEvent = {
			url: new URL('https://ghimpumihai.com/api/admin/blog/images'),
			request: new Request('https://ghimpumihai.com/api/admin/blog/images', { method: 'POST' }),
			getClientAddress: () => '203.0.113.1'
		} as unknown as RequestEvent;

		const resolve = vi.fn();
		const response = await handle({ event: mockEvent, resolve });

		expect(response.status).toBe(404);
		expect(resolve).not.toHaveBeenCalled();
	});

	it('allows public routes to pass through regardless of host', async () => {
		const mockEvent = {
			url: new URL('https://ghimpumihai.com/blog'),
			request: new Request('https://ghimpumihai.com/blog')
		} as unknown as RequestEvent;

		const mockResponse = new Response('Blog page');
		const resolve = vi.fn().mockResolvedValue(mockResponse);

		const response = await handle({ event: mockEvent, resolve });

		expect(response).toBe(mockResponse);
		expect(resolve).toHaveBeenCalledWith(mockEvent);
	});
});
