<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} | Portfolio</title>
</svelte:head>

<section class="flex min-h-[70vh] flex-col items-center justify-center p-8 text-center">
	<div class="max-w-lg border border-hairline-strong bg-paper-card p-8 sm:p-12">
		<h1 class="font-serif text-6xl font-semibold text-copper">{page.status}</h1>
		<h2 class="mt-4 font-serif text-2xl font-normal text-ink">
			{page.status === 404
				? 'This page could not be found.'
				: (page.error?.message ?? 'An unexpected error occurred.')}
		</h2>
		<p class="mt-3 text-base text-ink-muted">
			The requested specification plate or article URL does not exist in this directory.
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-3">
			<a
				href="/"
				class="border border-copper bg-copper px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-[#FAF7F1] dark:text-[#161412]"
			>
				Back to Home →
			</a>
			<a
				href="/blog"
				class="border border-hairline-strong bg-paper px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-ink hover:border-copper"
			>
				Blog Archive
			</a>
		</div>
	</div>
</section>
