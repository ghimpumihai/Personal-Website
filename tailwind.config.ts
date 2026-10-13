import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: 'class',
	content: [
		'./src/app.html',
		'./src/routes/**/*.{svelte,ts}',
		'./src/lib/**/*.{svelte,ts}'
	],
	theme: {
		extend: {
			fontFamily: {
				serif: ['Spectral', 'Georgia', 'serif'],
				sans: ['Public Sans', 'system-ui', 'sans-serif'],
				mono: ['Azeret Mono', 'monospace']
			},
			colors: {
				paper: {
					DEFAULT: 'var(--bg-paper)',
					elevated: 'var(--bg-elevated)',
					card: 'var(--bg-card)'
				},
				ink: {
					DEFAULT: 'var(--ink-primary)',
					muted: 'var(--ink-muted)'
				},
				copper: {
					DEFAULT: 'var(--accent-copper)',
					soft: 'var(--accent-copper-soft)',
					contrast: 'var(--copper-contrast)'
				},
				hairline: {
					DEFAULT: 'var(--line-subtle)',
					strong: 'var(--line-strong)'
				}
			}
		}
	},
	plugins: []
};

export default config;
