<script lang="ts">
	import { type BlogPost, formatBlogDate, getAllBlogThemes } from '$lib/blog';

	let { posts }: { posts: BlogPost[] } = $props();

	let selectedThemes = $state<string[]>([]);

	const allThemes = $derived(getAllBlogThemes(posts));

	const filteredPosts = $derived(
		selectedThemes.length === 0
			? posts
			: posts.filter((post) => selectedThemes.every((theme) => post.themes.includes(theme)))
	);

	function toggleThemeFilter(theme: string) {
		if (selectedThemes.includes(theme)) {
			selectedThemes = selectedThemes.filter((item) => item !== theme);
		} else {
			selectedThemes = [...selectedThemes, theme];
		}
	}
</script>

<div class="grid lg:grid-cols-[1fr_320px]">
	<!-- Main Chronological Articles Column -->
	<div class="divide-y divide-hairline border-b border-hairline lg:border-b-0 lg:border-r">
		{#each filteredPosts as post, idx (post.slug)}
			<article class="bg-paper-card p-6 transition-colors hover:bg-paper-elevated sm:p-10">
				<div
					class="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-3 font-mono text-xs"
				>
					<span class="font-semibold text-copper">
						NOTE {String(idx + 1).padStart(2, '0')} // {formatBlogDate(post.publishedAt)}
					</span>
					<span class="text-ink-muted">{post.themes.length} THEMES</span>
				</div>

				<a href="/blog/{post.slug}" class="group mt-5 block">
					<h2
						class="font-serif text-3xl font-semibold text-ink transition-colors group-hover:text-copper"
					>
						{post.title}
					</h2>
				</a>

				<p class="mt-3 max-w-[68ch] text-base leading-relaxed text-ink-muted">
					{post.excerpt}
				</p>

				<div class="mt-5 flex flex-wrap gap-2">
					{#each post.themes as theme (theme)}
						<button
							type="button"
							onclick={() => toggleThemeFilter(theme)}
							class="border px-3 py-1 font-mono text-xs transition-colors {selectedThemes.includes(
								theme
							)
								? 'border-copper bg-copper-soft font-semibold text-copper'
								: 'border-hairline bg-paper text-ink-muted hover:border-copper hover:text-ink'}"
						>
							{theme}
						</button>
					{/each}
				</div>

				<div class="mt-6 pt-2">
					<a
						href="/blog/{post.slug}"
						class="inline-flex items-center gap-2 border border-copper bg-copper px-4 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-[#FAF7F1] transition-opacity hover:opacity-90 dark:text-[#161412]"
					>
						<span>Read Article</span>
						<span aria-hidden="true">→</span>
					</a>
				</div>
			</article>
		{/each}

		{#if filteredPosts.length === 0}
			<div class="bg-paper-card p-8 sm:p-12">
				<h2 class="font-serif text-2xl font-semibold text-ink">No matching engineering notes</h2>
				<p class="mt-2 max-w-[60ch] text-base text-ink-muted">
					No published articles match the active theme filter yet. Reset the filter on the right or
					publish a new note via the <a href="/admin" class="text-copper underline">Blog Admin</a>
					panel.
				</p>
				{#if selectedThemes.length > 0}
					<button
						type="button"
						onclick={() => (selectedThemes = [])}
						class="mt-5 border border-copper bg-copper-soft px-4 py-2 font-mono text-xs font-semibold text-copper"
					>
						Reset Theme Filters
					</button>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Right Theme Filter Rail -->
	<aside class="bg-paper-elevated p-6 sm:p-8">
		<div class="lg:sticky lg:top-24">
			<div class="flex items-center justify-between border-b border-hairline pb-3">
				<h2 class="font-serif text-2xl font-semibold text-ink">Filter by Theme</h2>
				{#if selectedThemes.length > 0}
					<button
						type="button"
						onclick={() => (selectedThemes = [])}
						class="font-mono text-xs font-semibold text-copper hover:underline"
					>
						Reset
					</button>
				{/if}
			</div>

			<p class="mt-3 text-sm leading-relaxed text-ink-muted">
				Select one or more technical domains to narrow the chronological archive.
			</p>

			{#if allThemes.length > 0}
				<div class="mt-5 flex flex-wrap gap-2 lg:flex-col">
					{#each allThemes as theme (theme)}
						{@const active = selectedThemes.includes(theme)}
						<button
							type="button"
							onclick={() => toggleThemeFilter(theme)}
							class="border px-3.5 py-2.5 text-left font-mono text-xs transition-colors {active
								? 'border-copper bg-copper-soft font-semibold text-copper'
								: 'border-hairline-strong bg-paper-card text-ink hover:border-copper'}"
						>
							{theme}
						</button>
					{/each}
				</div>
			{:else}
				<div class="mt-5 border border-dashed border-hairline-strong bg-paper-card p-4 font-mono text-xs text-ink-muted">
					Themes appear automatically as articles are published.
				</div>
			{/if}
		</div>
	</aside>
</div>
