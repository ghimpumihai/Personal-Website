<script lang="ts">
	import type { PageData } from './$types';
	import ImageUploadTool from '$lib/components/ImageUploadTool.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Admin Uploads | Blog — Portfolio</title>
</svelte:head>

<section class="sheet-enter">
	<div
		class="flex flex-wrap items-center justify-between gap-4 border-b border-hairline-strong bg-paper-elevated px-6 py-6 sm:px-10 md:px-14"
	>
		<div>
			<h1 class="font-serif text-3xl font-normal text-ink sm:text-4xl">
				Image Uploader for Article Content
			</h1>
			<p class="mt-1 text-base text-ink-muted">
				Upload local figures to Vercel Blob and copy markdown into your article.
			</p>
		</div>
		<a href="/admin" class="font-mono text-xs font-semibold text-copper hover:underline">
			← BACK TO BLOG ADMIN
		</a>
	</div>

	<div class="p-6 sm:p-10 md:p-14">
		<ImageUploadTool blobConfigured={data.blobConfigured} />
	</div>
</section>
