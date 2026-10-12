<script lang="ts">
	import type { PageData } from './$types';
	import BlogIndex from '$lib/components/BlogIndex.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Blog | Portfolio — Ștefan Ghimpu</title>
	<meta
		name="description"
		content="Chronological engineering articles with theme filters, bibliography sections, and useful links."
	/>
</svelte:head>

<section class="sheet-enter">
	<div
		class="flex flex-col justify-between gap-4 border-b border-hairline-strong bg-paper-elevated px-6 py-8 sm:px-10 md:px-14"
	>
		<div class="flex flex-wrap items-baseline justify-between gap-4">
			<h1 class="font-serif text-4xl font-normal tracking-tight text-ink sm:text-5xl">
				Notes, articles, and learning trails
			</h1>
			<span class="font-mono text-xs uppercase tracking-wider text-copper">
				BLOG ARCHIVE // CHRONOLOGICAL
			</span>
		</div>

		<p class="max-w-[68ch] text-base leading-relaxed text-ink-muted sm:text-lg">
			Posts are ordered from newest to oldest, with technical theme filters on the right like a
			classic long-form engineering archive.
		</p>

		{#if !data.blobConfigured}
			<div class="border border-copper bg-copper-soft px-4 py-3 font-mono text-xs text-ink">
				Vercel Blob is not configured yet, so the blog currently displays in-memory cached posts from
				the server process.
			</div>
		{/if}

		{#if data.blobConfigured && data.posts.length === 0 && data.cacheInfo.hasCache}
			<div class="border border-copper bg-copper-soft px-4 py-3 font-mono text-xs text-ink">
				Blob could not be reached, so the page is showing the most recent in-memory cached version.
			</div>
		{/if}
	</div>

	<BlogIndex posts={data.posts} />
</section>
