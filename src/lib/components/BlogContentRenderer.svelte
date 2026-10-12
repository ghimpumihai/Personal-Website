<script lang="ts">
	import { parseBlogContent } from '$lib/blog-render';

	let { content }: { content: string } = $props();

	const blocks = $derived(parseBlogContent(content));
</script>

{#if blocks.length === 0}
	<p class="text-base leading-relaxed text-ink-muted">No article content yet.</p>
{:else}
	<div class="space-y-7">
		{#each blocks as block, index (`${block.type}-${index}`)}
			{#if block.type === 'heading'}
				<h2 class="mt-8 font-serif text-2xl font-semibold text-ink sm:text-3xl">
					{block.content as string}
				</h2>
			{:else if block.type === 'list'}
				<ul class="space-y-3 text-base leading-relaxed text-ink-muted">
					{#each block.content as string[] as point (point)}
						<li class="flex gap-3">
							<span class="mt-2.5 h-1.5 w-1.5 shrink-0 bg-copper" aria-hidden="true"></span>
							<span>{point}</span>
						</li>
					{/each}
				</ul>
			{:else if block.type === 'image'}
				{@const image = block.content as { alt: string; src: string }}
				<figure class="overflow-hidden border border-hairline-strong bg-paper-elevated">
					<img
						src={image.src}
						alt={image.alt || 'Blog figure'}
						class="h-auto w-full object-cover"
						loading="lazy"
					/>
					{#if image.alt}
						<figcaption
							class="border-t border-hairline px-4 py-3 font-mono text-xs text-ink-muted"
						>
							FIG // {image.alt}
						</figcaption>
					{/if}
				</figure>
			{:else if block.type === 'code'}
				<figure class="overflow-hidden border border-hairline-strong bg-paper-elevated">
					{#if block.language}
						<figcaption
							class="border-b border-hairline bg-paper-card px-4 py-2 font-mono text-xs uppercase tracking-wider text-copper"
						>
							CODE // {block.language}
						</figcaption>
					{/if}
					<pre
						class="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-ink"><code>{block.content as string}</code></pre>
				</figure>
			{:else}
				<p class="max-w-[70ch] text-base leading-8 text-ink sm:text-lg">
					{block.content as string}
				</p>
			{/if}
		{/each}
	</div>
{/if}
