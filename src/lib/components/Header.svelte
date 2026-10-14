<script lang="ts">
	import { page } from '$app/state';
	import { themeState } from '$lib/theme.svelte';

	let isDrawerOpen = $state(false);

	const navLinks = [
		{ name: 'Experience', href: '/#experience' },
		{ name: 'Projects', href: '/#projects' },
		{ name: 'Blog', href: '/blog' }
	];

	function closeDrawer() {
		isDrawerOpen = false;
	}
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape' && isDrawerOpen) {
			closeDrawer();
		}
	}}
/>

<header class="sticky top-0 z-50 w-full border-b border-hairline/60 bg-paper/90 backdrop-blur-sm">
	<div class="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
		<a
			href="/"
			onclick={closeDrawer}
			class="group flex items-center gap-2.5 transition-colors"
		>
			<span class="font-serif text-lg font-semibold tracking-tight text-ink group-hover:text-copper transition-colors">
				Ștefan Ghimpu
			</span>
			<span class="sr-only">Portfolio</span>
		</a>

		<div class="flex items-center gap-6">
			<nav aria-label="Global" class="hidden sm:flex sm:items-center sm:gap-6">
				{#each navLinks as link (link.name)}
					<a
						href={link.href}
						class="text-sm font-medium text-ink-muted transition-colors hover:text-ink {page.url.pathname === link.href || (link.href !== '/' && page.url.pathname.startsWith(link.href))
							? 'text-copper font-semibold'
							: ''}"
					>
						{link.name}
					</a>
				{/each}
			</nav>

			<div class="flex items-center gap-2">
				<button
					type="button"
					onclick={() => themeState.toggle()}
					aria-label="Toggle theme"
					class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-hairline bg-paper-card text-ink-muted transition-colors hover:border-hairline-strong hover:text-ink"
				>
					{#if themeState.current === 'light'}
						<svg
							class="h-4 w-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.75"
							aria-hidden="true"
						>
							<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
						</svg>
					{:else}
						<svg
							class="h-4 w-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.75"
							aria-hidden="true"
						>
							<circle cx="12" cy="12" r="4" />
							<path
								d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
							/>
						</svg>
					{/if}
				</button>

				<button
					type="button"
					onclick={() => (isDrawerOpen = !isDrawerOpen)}
					aria-label="Toggle menu"
					aria-expanded={isDrawerOpen}
					aria-controls="mobile-nav"
					class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-hairline bg-paper-card text-ink transition-colors hover:border-hairline-strong sm:hidden"
				>
					<svg
						class="h-4 w-4"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.75"
						aria-hidden="true"
					>
						{#if isDrawerOpen}
							<path d="M18 6 6 18M6 6l12 12" />
						{:else}
							<path d="M4 7h16M4 12h16M4 17h16" />
						{/if}
					</svg>
				</button>
			</div>
		</div>
	</div>

	{#if isDrawerOpen}
		<!-- Backdrop to close menu when clicking outside -->
		<button
			type="button"
			class="fixed inset-0 top-14 z-40 bg-ink/10 backdrop-blur-[1px] sm:hidden"
			onclick={closeDrawer}
			aria-label="Close menu backdrop"
			tabindex="-1"
		></button>

		<nav
			id="mobile-nav"
			aria-label="Mobile"
			class="absolute left-0 top-full z-50 w-full border-b border-hairline bg-paper/98 px-4 py-2.5 shadow-md backdrop-blur-md sm:hidden"
		>
			<div class="mx-auto flex max-w-4xl flex-col space-y-1">
				{#each navLinks as link (link.name)}
					<a
						href={link.href}
						onclick={closeDrawer}
						class="flex min-h-[44px] items-center rounded-md px-3 text-sm font-medium text-ink transition-colors hover:bg-paper-elevated hover:text-copper"
					>
						{link.name}
					</a>
				{/each}
			</div>
		</nav>
	{/if}
</header>
