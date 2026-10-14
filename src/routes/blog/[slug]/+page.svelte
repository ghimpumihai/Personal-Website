<script lang="ts">
	import type { PageData } from './$types';
	import BlogContentRenderer from '$lib/components/BlogContentRenderer.svelte';
	import { formatBlogDate } from '$lib/blog';

	let { data }: { data: PageData } = $props();
	const post = $derived(data.post);
</script>

<svelte:head>
	<title>{post.title} | Ștefan Ghimpu</title>
	<meta name="description" content={post.excerpt} />
</svelte:head>

<article class="sheet-enter py-10 sm:py-14">
	<!-- Top Navigation -->
	<div class="mb-8 flex items-center justify-between text-xs text-ink-muted">
		<a
			href="/blog"
			class="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-copper"
		>
			<span aria-hidden="true">←</span>
			<span>Back to articles</span>
		</a>

		<time>{formatBlogDate(post.publishedAt)}</time>
	</div>

	<!-- Post Header -->
	<header class="border-b border-hairline/60 pb-8">
		<div class="flex flex-wrap gap-1.5 mb-3">
			{#each post.themes as theme (theme)}
				<span class="rounded bg-paper-card border border-hairline/60 px-2.5 py-0.5 text-xs font-medium text-copper">
					{theme}
				</span>
			{/each}
		</div>

		<h1 class="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
			{post.title}
		</h1>

		{#if post.introduction}
			<p class="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
				{post.introduction}
			</p>
		{/if}
	</header>

	<!-- Content -->
	<div class="mt-8">
		<BlogContentRenderer content={post.content} />

		{#if (post.bibliography && post.bibliography.length > 0) || (post.usefulLinks && post.usefulLinks.length > 0)}
			<div class="mt-12 grid gap-8 border-t border-hairline/60 pt-8 sm:grid-cols-2">
				{#if post.bibliography && post.bibliography.length > 0}
					<section>
						<h2 class="font-serif text-lg font-semibold text-ink">Bibliography</h2>
						<ul class="mt-3 space-y-2 text-sm text-ink-muted">
							{#each post.bibliography as item (item.href)}
								<li>
									<a
										href={item.href}
										target="_blank"
										rel="noreferrer"
										class="transition-colors hover:text-copper underline-offset-4 hover:underline"
									>
										{item.label} ↗
									</a>
								</li>
							{/each}
						</ul>
					</section>
				{/if}

				{#if post.usefulLinks && post.usefulLinks.length > 0}
					<section>
						<h2 class="font-serif text-lg font-semibold text-ink">Useful Links</h2>
						<ul class="mt-3 space-y-2 text-sm text-ink-muted">
							{#each post.usefulLinks as item (item.href)}
								<li>
									<a
										href={item.href}
										target="_blank"
										rel="noreferrer"
										class="transition-colors hover:text-copper underline-offset-4 hover:underline"
									>
										{item.label} ↗
									</a>
								</li>
							{/each}
						</ul>
					</section>
				{/if}
			</div>
		{/if}
	</div>
</article>
