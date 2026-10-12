import { browser } from '$app/environment';

type ThemeMode = 'light' | 'dark';

function createThemeState() {
	let current = $state<ThemeMode>('light');

	function init() {
		if (!browser) return;
		const saved = localStorage.getItem('theme');
		if (saved === 'dark') {
			current = 'dark';
			document.documentElement.classList.add('dark');
		} else {
			current = 'light';
			document.documentElement.classList.remove('dark');
		}
	}

	function toggle() {
		current = current === 'light' ? 'dark' : 'light';
		if (browser) {
			localStorage.setItem('theme', current);
			document.documentElement.classList.toggle('dark', current === 'dark');
		}
	}

	return {
		get current() {
			return current;
		},
		init,
		toggle
	};
}

export const themeState = createThemeState();
