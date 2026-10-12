<script lang="ts">
	import type { PageData } from './$types';
	import BlogContentRenderer from '$lib/components/BlogContentRenderer.svelte';
	import { formatBlogDate } from '$lib/blog';

	let { data }: { data: PageData } = $props();
	const post = $derived(data.post);
</script>

<svelte:head>
	<title>{post.title} | Blog — Portfolio</title>
	<meta name="description" content={post.excerpt} />
</svelte:head>

<section class="sheet-enter">
	<div
		class="flex flex-wrap items-center justify-between gap-4 border-b border-hairline-strong bg-paper-elevated px-6 py-5 sm:px-10 md:px-14"
	>
		<a
			href="/blog"
			class="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-wider text-ink transition-colors hover:text-copper"
		>
			<span aria-hidden="true">←</span>
			<span>Back to all articles</span>
		</a>

		<span class="font-mono text-xs uppercase tracking-wider text-copper">
			PUBLISHED {formatBlogDate(post.publishedAt)}
		</span>
	</div>

	<div class="mx-auto max-w-4xl px-6 py-10 sm:px-10 md:py-14">
		<header class="border border-hairline-strong bg-paper-card p-6 sm:p-10">
			<h1 class="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
				{post.title}
			</h1>

			<div class="mt-4 flex flex-wrap gap-2">
				{#each post.themes as theme (theme)}
					<span
						class="border border-copper bg-copper-soft px-3 py-1 font-mono text-xs font-medium text-copper"
					>
						{theme}
					</span>
				{/each}
			</div>

			<p class="mt-6 max-w-[68ch] text-lg leading-8 text-ink-muted">
				{post.introduction}
			</p>
		</header>

		<article class="mt-8 border border-hairline-strong bg-paper-card p-6 sm:p-10">
			<BlogContentRenderer content={post.content} />

			<div class="mt-12 grid gap-8 border-t border-hairline pt-8 md:grid-cols-2">
				<section>
					<h2 class="font-serif text-2xl font-semibold text-ink">Bibliography</h2>
					<ul class="mt-4 space-y-2.5 text-base leading-7 text-ink-muted">
						{#each post.bibliography as item (item.href)}
							<li>
								<a
									href={item.href}
									target="_blank"
									rel="noreferrer"
									class="transition-colors hover:text-copper"
								>
									{item.label} ↗
								</a>
							</li>
						{/each}
					</ul>
				</section>

				<section>
					<h2 class="font-serif text-2xl font-semibold text-ink">Useful links</h2>
					<ul class="mt-4 space-y-2.5 text-base leading-7 text-ink-muted">
						{#each post.usefulLinks as item (item.href)}
							<li>
								<a
									href={item.href}
									target="_blank"
									rel="noreferrer"
									class="transition-colors hover:text-copper"
								>
									{item.label} ↗
								</a>
							</li>
						{/each}
					</ul>
				</section>
			</div>
		</article>
	</div>
</section>
