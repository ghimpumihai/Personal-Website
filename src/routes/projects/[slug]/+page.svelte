<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const project = $derived(data.project);
	const allProjects = $derived(data.allProjects);

	function getYoutubeEmbedUrl(url: string | undefined): string | null {
		if (!url) return null;
		const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/);
		if (!match) return null;
		return `https://www.youtube.com/embed/${match[1]}`;
	}

	const youtubeEmbedUrl = $derived(getYoutubeEmbedUrl(project.demoUrl));
</script>

<svelte:head>
	<title>{project.title} | Ștefan Ghimpu</title>
	<meta name="description" content={project.description} />
</svelte:head>

<article class="sheet-enter py-10 sm:py-14">
	<!-- Navigation -->
	<div class="mb-8">
		<a
			href="/"
			class="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-copper"
		>
			<svg
				class="h-4 w-4"
				viewBox="0 0 16 16"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				aria-hidden="true"
			>
				<path d="M10 12L6 8l4-4" />
			</svg>
			<span>Back to Projects</span>
		</a>
	</div>

	<!-- Header -->
	<header class="border-b border-hairline/60 pb-8">
		<div class="text-xs font-semibold text-copper">
			{project.domain}
		</div>

		<h1 class="mt-2 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
			{project.title}
		</h1>

		<p class="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
			{project.description}
		</p>

		<!-- Action buttons -->
		<div class="mt-6 flex flex-wrap items-center gap-3">
			{#if project.githubUrl}
				<a
					href={project.githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 rounded-md bg-copper px-4 py-2 text-xs font-medium text-copper-contrast transition-opacity hover:opacity-90"
				>
					<span>View Source Code</span>
					<span aria-hidden="true">↗</span>
				</a>
			{/if}

			{#if project.demoUrl}
				<a
					href={project.demoUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 rounded-md border border-hairline bg-paper-card px-4 py-2 text-xs font-medium text-ink transition-colors hover:border-copper hover:text-copper"
				>
					<span>Live Demo</span>
					<span aria-hidden="true">↗</span>
				</a>
			{/if}
		</div>
	</header>

	<!-- Media Preview -->
	{#if youtubeEmbedUrl}
		<div class="mt-8 overflow-hidden rounded-lg border border-hairline/80 bg-paper-card">
			<div class="relative aspect-video w-full overflow-hidden">
				<iframe
					src={youtubeEmbedUrl}
					title="{project.title} video demonstration"
					class="h-full w-full border-0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			</div>
		</div>
	{:else if project.image}
		<div class="mt-8 overflow-hidden rounded-lg border border-hairline/80 bg-paper-card">
			<div class="relative aspect-video w-full overflow-hidden">
				<img
					src={project.image}
					alt={project.title}
					class="h-full w-full object-cover"
				/>
			</div>
		</div>
	{/if}

	<!-- Architecture & Description -->
	<section class="mt-10">
		<h2 class="font-serif text-xl font-semibold text-ink sm:text-2xl">
			Overview &amp; Architecture
		</h2>
		<p class="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
			{project.longDescription}
		</p>
	</section>

	<!-- Technologies Used -->
	<section class="mt-10 border-t border-hairline/60 pt-8">
		<h2 class="text-sm font-semibold text-ink">
			Technologies Used
		</h2>
		<div class="mt-3 flex flex-wrap gap-1.5">
			{#each project.tags as tag (tag)}
				<span class="rounded bg-paper-card border border-hairline/60 px-2.5 py-1 text-xs text-ink-muted">
					{tag}
				</span>
			{/each}
		</div>
	</section>

	<!-- Other Projects Navigation -->
	<section class="mt-12 border-t border-hairline/60 pt-8">
		<h2 class="text-sm font-semibold text-ink">
			More Projects
		</h2>
		<div class="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
			{#each allProjects.filter((p) => p.slug !== project.slug) as item (item.slug)}
				<a
					href="/projects/{item.slug}"
					class="flex items-center justify-between rounded-md border border-hairline/60 bg-paper-card p-3 text-sm text-ink transition-colors hover:border-copper/60 hover:text-copper"
				>
					<span class="font-medium">{item.title}</span>
					<span class="text-xs text-ink-muted group-hover:text-copper">→</span>
				</a>
			{/each}
		</div>
	</section>
</article>
