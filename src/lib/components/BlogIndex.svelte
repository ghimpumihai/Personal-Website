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

<div class="mt-6">
	{#if allThemes.length > 0}
		<div class="flex flex-wrap items-center gap-2 pb-6 border-b border-hairline/60">
			<button
				type="button"
				onclick={() => (selectedThemes = [])}
				class="rounded-md px-3 py-1 text-xs font-medium transition-colors {selectedThemes.length === 0
					? 'bg-copper text-copper-contrast'
					: 'bg-paper-card border border-hairline text-ink-muted hover:text-ink'}"
			>
				All
			</button>
			{#each allThemes as theme (theme)}
				{@const active = selectedThemes.includes(theme)}
				<button
					type="button"
					aria-pressed={active}
					onclick={() => toggleThemeFilter(theme)}
					class="rounded-md px-3 py-1 text-xs font-medium transition-colors {active
						? 'bg-copper text-copper-contrast'
						: 'bg-paper-card border border-hairline text-ink-muted hover:text-ink'}"
				>
					{theme}
				</button>
			{/each}
		</div>
	{/if}

	<div class="divide-y divide-hairline/60">
		{#each filteredPosts as post (post.slug)}
			<article class="py-8 first:pt-6">
				<div class="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
					<time>{formatBlogDate(post.publishedAt)}</time>
					{#if post.themes.length > 0}
						<span>·</span>
						<div class="flex flex-wrap gap-1.5">
							{#each post.themes as theme (theme)}
								<span class="text-copper">{theme}</span>
							{/each}
						</div>
					{/if}
				</div>

				<a href="/blog/{post.slug}" class="group mt-2 block">
					<h2 class="font-serif text-2xl font-semibold text-ink transition-colors group-hover:text-copper">
						{post.title}
					</h2>
				</a>

				<p class="mt-2 text-base leading-relaxed text-ink-muted">
					{post.excerpt}
				</p>

				<div class="mt-3">
					<a
						href="/blog/{post.slug}"
						class="inline-flex items-center gap-1 text-sm font-medium text-copper hover:underline"
					>
						<span>Read article</span>
						<span aria-hidden="true">→</span>
					</a>
				</div>
			</article>
		{/each}

		{#if filteredPosts.length === 0}
			<div class="py-12 text-center">
				<h2 class="font-serif text-xl font-semibold text-ink">No articles found</h2>
				<p class="mt-2 text-sm text-ink-muted">
					No published articles match the selected filter.
				</p>
				{#if selectedThemes.length > 0}
					<button
						type="button"
						onclick={() => (selectedThemes = [])}
						class="mt-4 text-xs font-medium text-copper underline hover:text-copper/80"
					>
						Clear filters
					</button>
				{/if}
			</div>
		{/if}
	</div>
</div>
