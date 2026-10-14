<script lang="ts">
	import type { PageData } from './$types';
	import BlogIndex from '$lib/components/BlogIndex.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Blog | Ștefan Ghimpu</title>
	<meta
		name="description"
		content="Engineering notes, technical articles, and learning trails by Ștefan Ghimpu."
	/>
</svelte:head>

<section class="sheet-enter py-10 sm:py-14">
	<div class="border-b border-hairline/60 pb-8">
		<h1 class="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
			Writing
		</h1>
		<p class="mt-2 text-base text-ink-muted">
			Articles on distributed systems, backend architectures, and engineering workflows.
		</p>

		{#if !data.blobConfigured}
			<div class="mt-4 rounded-md border border-hairline bg-paper-card px-4 py-2.5 text-xs text-ink-muted">
				Displaying in-memory cached posts.
			</div>
		{/if}

		{#if data.blobConfigured && data.posts.length === 0 && data.cacheInfo.hasCache}
			<div class="mt-4 rounded-md border border-hairline bg-paper-card px-4 py-2.5 text-xs text-ink-muted">
				Showing recent cached version.
			</div>
		{/if}
	</div>

	<BlogIndex posts={data.posts} />
</section>
