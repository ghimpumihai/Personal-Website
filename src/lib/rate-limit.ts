interface RateLimitEntry {
	count: number;
	resetAt: number;
}

const attempts = new Map<string, RateLimitEntry>();

// Maximum failed login attempts allowed within the window
const MAX_ATTEMPTS = 5;
// Window duration: 15 minutes
const WINDOW_MS = 15 * 60 * 1000;

export function checkRateLimit(key: string): { allowed: boolean; retryAfterSeconds?: number } {
	const now = Date.now();
	const entry = attempts.get(key);

	if (!entry || now > entry.resetAt) {
		return { allowed: true };
	}

	if (entry.count >= MAX_ATTEMPTS) {
		const retryAfterSeconds = Math.ceil((entry.resetAt - now) / 1000);
		return { allowed: false, retryAfterSeconds };
	}

	return { allowed: true };
}

export function recordFailedAttempt(key: string): void {
	const now = Date.now();
	const entry = attempts.get(key);

	if (!entry || now > entry.resetAt) {
		attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
	} else {
		entry.count += 1;
	}

	// Auto-prune stale entries to keep memory strictly bounded
	if (attempts.size > 1000) {
		for (const [k, v] of attempts) {
			if (now > v.resetAt) {
				attempts.delete(k);
			}
		}
	}
}

export function resetRateLimit(key: string): void {
	attempts.delete(key);
}
