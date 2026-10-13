<script lang="ts">
	import { page } from '$app/state';
	import { themeState } from '$lib/theme.svelte';
	import { projects } from '$lib/projects';

	let isDrawerOpen = $state(false);

	const navLinks = [
		{ name: 'Home', href: '/', match: (p: string) => p === '/' },
		{ name: 'Experience', href: '/#experience', match: () => false },
		{ name: 'Skills', href: '/#skills', match: () => false },
		{ name: 'Projects', href: '/#projects', match: (p: string) => p.startsWith('/projects') },
		{ name: 'Blog', href: '/blog', match: (p: string) => p.startsWith('/blog') }
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

<header class="sticky top-0 z-50 w-full border-b border-hairline-strong bg-paper-card">
	<div class="mx-auto max-w-[1360px] border-x border-hairline-strong">
		<div class="flex items-stretch justify-between">
			<a
				href="/"
				onclick={closeDrawer}
				class="flex items-center gap-3 border-r border-hairline px-4 py-3.5 transition-colors hover:bg-paper-elevated sm:px-6"
			>
				<span
					class="border border-copper bg-copper-soft px-2 py-0.5 font-mono text-xs font-semibold text-copper"
				>
					ȘG
				</span>
				<span class="font-serif text-lg font-semibold tracking-tight text-ink sm:text-xl">
					Ștefan Ghimpu
				</span>
				<span class="sr-only">Portfolio</span>
			</a>

			<nav aria-label="Global" class="hidden md:flex md:items-stretch">
				<ul class="flex items-stretch">
					{#each navLinks as link (link.name)}
						<li class="flex items-stretch">
							<a
								href={link.href}
								class="flex items-center border-r border-hairline px-5 font-mono text-xs uppercase tracking-wider transition-colors {link.match(
									page.url.pathname
								)
									? 'bg-copper-soft font-semibold text-copper'
									: 'text-ink-muted hover:bg-paper-elevated hover:text-ink'}"
							>
								{link.name}
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<div class="flex items-stretch">
				<div
					class="hidden items-center border-r border-hairline px-4 font-mono text-xs text-ink-muted lg:flex"
				>
					CLUJ-NAPOCA · SCALE 1:1
				</div>

				<button
					type="button"
					onclick={() => themeState.toggle()}
					aria-label="Toggle dark mode"
					class="flex items-center gap-2 border-l border-hairline bg-paper-elevated px-4 py-3 font-mono text-xs text-ink transition-colors hover:bg-copper-soft hover:text-copper sm:px-5"
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
						<span class="hidden sm:inline">CREAM</span>
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
						<span class="hidden sm:inline">DARK</span>
					{/if}
				</button>

				<button
					type="button"
					onclick={() => (isDrawerOpen = !isDrawerOpen)}
					aria-label="Toggle mobile menu"
					aria-expanded={isDrawerOpen}
					aria-controls="mobile-drawer"
					class="flex items-center gap-1.5 border-l border-hairline bg-paper px-4 py-3 font-mono text-xs font-medium text-ink transition-colors hover:bg-paper-elevated md:hidden"
				>
					<span>{isDrawerOpen ? 'CLOSE' : 'MENU'}</span>
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

		<!-- Mobile Quick-Jump Strip (All 5 Routes Visible at 390px) -->
		<nav aria-label="Mobile quick links" class="grid grid-cols-5 border-t border-hairline bg-paper-elevated md:hidden">
			{#each navLinks as link, i (link.name)}
				<a
					href={link.href}
					onclick={closeDrawer}
					class="flex min-h-[44px] items-center justify-center px-1 py-2 text-center font-mono text-xs uppercase tracking-tight {i < 4
						? 'border-r border-hairline'
						: ''} {link.match(page.url.pathname)
						? 'bg-copper-soft font-semibold text-copper'
						: 'text-ink-muted hover:text-ink'}"
				>
					{link.name}
				</a>
			{/each}
		</nav>

		<!-- Mobile Slide-Down Blueprint Index Drawer -->
		{#if isDrawerOpen}
			<div id="mobile-drawer" class="border-t border-hairline-strong bg-paper-card p-4 md:hidden">
				<nav aria-label="Mobile" class="space-y-4">
					<div class="grid gap-2">
						{#each navLinks as link (link.name)}
							<a
								href={link.href}
								onclick={closeDrawer}
								class="flex min-h-[44px] items-center justify-between border border-hairline bg-paper px-3.5 py-2.5 font-mono text-xs text-ink transition-colors hover:border-copper hover:text-copper"
							>
								<span>{link.name}</span>
								<span class="text-copper">→</span>
							</a>
						{/each}
					</div>

					<div class="border-t border-hairline pt-3">
						<div class=" grid grid-cols-2 gap-2">
							{#each projects as proj (proj.slug)}
								<a
									href="/projects/{proj.slug}"
									onclick={closeDrawer}
									class="flex min-h-[44px] items-center border border-hairline bg-paper px-3 py-2 font-mono text-xs text-ink-muted transition-colors hover:border-copper hover:text-copper"
								>
									{proj.title}
								</a>
							{/each}
						</div>
					</div>
				</nav>
			</div>
		{/if}
	</div>
</header>
