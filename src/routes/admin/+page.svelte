<script lang="ts">
	import type { PageData } from './$types';
	import AdminBlogPanel from '$lib/components/AdminBlogPanel.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Admin | Blog — Portfolio</title>
</svelte:head>

<section class="sheet-enter">
	<div
		class="flex flex-col justify-between gap-3 border-b border-hairline-strong bg-paper-elevated px-6 py-8 sm:px-10 md:px-14"
	>
		<div class="flex flex-wrap items-baseline justify-between gap-4">
			<h1 class="font-serif text-4xl font-normal tracking-tight text-ink">
				Blog Management Panel
			</h1>
			<a href="/admin/uploads" class="font-mono text-xs font-semibold text-copper hover:underline">
				STANDALONE IMAGE UPLOADER →
			</a>
		</div>
		<p class="max-w-[68ch] text-base text-ink-muted">
			Create articles, update existing posts, and manage bibliography and figure references.
			Canonical store: <span class="font-mono text-xs text-ink">{data.blobPathname}</span>
		</p>
	</div>

	<AdminBlogPanel initialPosts={data.posts} blobConfigured={data.blobConfigured} />
</section>
