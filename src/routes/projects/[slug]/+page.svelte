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
	<title>{project.title} | Projects — Portfolio</title>
	<meta name="description" content={project.description} />
</svelte:head>

<section class="sheet-enter">
	<!-- Top Navigation Strip -->
	<div
		class="flex flex-wrap items-center justify-between gap-4 border-b border-hairline-strong bg-paper-elevated px-6 py-5 sm:px-10 md:px-14"
	>
		<div class="flex flex-wrap items-center gap-4">
			<a
				href="/"
				class="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-wider text-ink transition-colors hover:text-copper"
			>
				<svg
					class="h-3.5 w-3.5 text-copper"
					viewBox="0 0 16 16"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					aria-hidden="true"
				>
					<path d="M13.5 8h-11M6.5 4l-4 4 4 4" />
				</svg>
				<span>Back to Projects</span>
			</a>
			<a
				href="/#projects"
				class="inline-flex min-h-[44px] items-center border border-hairline-strong bg-paper-card px-3 py-1 font-mono text-xs text-ink-muted transition-colors hover:border-copper hover:text-copper"
			>
				SEC 03 // All Plates
			</a>
		</div>

		<span class="font-mono text-xs uppercase tracking-wider text-copper">
			{project.plateCode} // {project.domain}
		</span>
	</div>

	<!-- Main Project Specification Grid -->
	<div class="grid lg:grid-cols-[1.35fr_0.65fr]">
		<div class="border-b border-hairline p-6 sm:p-10 md:p-14 lg:border-b-0 lg:border-r">
			<h1 class="font-serif text-4xl font-normal tracking-tight text-ink sm:text-5xl">
				{project.title}
			</h1>

			<p class="mt-4 max-w-[65ch] text-lg leading-relaxed text-ink-muted sm:text-xl">
				{project.description}
			</p>

			<!-- Media Plate: YouTube Video or Project Image -->
			<div class="mt-8 overflow-hidden border border-hairline-strong bg-paper-card p-3">
				<div
					class="mb-2.5 flex items-center justify-between border-b border-hairline pb-2 font-mono text-xs text-ink-muted"
				>
					<span>{project.plateCode} — VISUAL TELEMETRY &amp; INTERFACE</span>
					<span class="text-copper">{project.slug.toUpperCase()}</span>
				</div>

				{#if youtubeEmbedUrl}
					<div class="relative aspect-video w-full overflow-hidden bg-paper">
						<iframe
							src={youtubeEmbedUrl}
							title="{project.title} video demonstration"
							class="h-full w-full border-0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
						></iframe>
					</div>
				{:else if project.image}
					<div class="relative aspect-video w-full overflow-hidden bg-paper">
						<img
							src={project.image}
							alt={project.title}
							class="h-full w-full object-cover"
						/>
					</div>
				{:else}
					<div
						class="flex aspect-video w-full flex-col justify-between bg-paper-elevated p-6 sm:p-10 font-mono text-xs"
					>
						<div class="flex justify-between border-b border-hairline pb-3 text-copper">
							<span>{project.plateCode} // SYSTEM ARCHITECTURE TOPOLOGY</span>
							<span>{project.domain.toUpperCase()}</span>
						</div>
						<div class="my-auto grid grid-cols-1 items-center gap-3 py-4 sm:grid-cols-[1fr_28px_1fr_28px_1fr]">
							{#each project.tags.slice(0, 3) as coreTag, i (coreTag)}
								<div class="border border-hairline-strong bg-paper-card p-4">
									<span class="block font-semibold text-copper">NODE 0{i + 1}</span>
									<span class="mt-1 block font-serif text-xl text-ink">{coreTag}</span>
								</div>
								{#if i < 2}
									<svg
										class="mx-auto hidden h-3 w-7 text-copper sm:block"
										viewBox="0 0 28 12"
										fill="none"
										aria-hidden="true"
									>
										<line x1="0" y1="6" x2="23" y2="6" stroke="currentColor" stroke-width="1.25" />
										<path d="M19 2.5L24 6l-5 3.5" stroke="currentColor" stroke-width="1.25" />
									</svg>
								{/if}
							{/each}
						</div>
						<div class="flex justify-between border-t border-hairline pt-3 text-ink-muted">
							<span>VERIFIED SOURCE REPOSITORY</span>
							<span>{project.tags.join(' · ')}</span>
						</div>
					</div>
				{/if}
			</div>

			<!-- Detailed Architectural Prose -->
			<div class="mt-8 border border-hairline bg-paper-card p-6 sm:p-8">
				<h2 class="font-serif text-2xl font-semibold text-ink">
					System Architecture &amp; Implementation
				</h2>
				<p class="mt-3 max-w-[68ch] text-base leading-8 text-ink-muted sm:text-lg">
					{project.longDescription}
				</p>
			</div>
		</div>

		<!-- Right Specification Sidebar -->
		<aside class="flex flex-col justify-between bg-paper-elevated p-6 sm:p-10">
			<div class="space-y-8">
				<div class="border border-hairline-strong bg-paper-card p-6">
					<h2 class="font-serif text-2xl font-semibold text-ink">Tech Stack</h2>
					<div class="mt-4 flex flex-wrap gap-2">
						{#each project.tags as tag (tag)}
							<span
								class="border border-hairline-strong bg-paper px-3 py-1.5 font-mono text-xs font-medium text-ink"
							>
								{tag}
							</span>
						{/each}
					</div>
				</div>

				<div class="border border-hairline-strong bg-paper-card p-6">
					<h2 class="font-serif text-2xl font-semibold text-ink">Repository &amp; Links</h2>
					<div class="mt-4 flex flex-col gap-3">
						{#if project.githubUrl}
							<a
								href={project.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center justify-between border border-copper bg-copper px-4 py-3 font-mono text-xs font-medium uppercase tracking-wider text-copper-contrast transition-opacity hover:opacity-90 min-h-[44px]"
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
								class="inline-flex items-center justify-between border border-hairline-strong bg-paper px-4 py-3 font-mono text-xs font-medium uppercase tracking-wider text-ink transition-colors hover:border-copper hover:text-copper"
							>
								<span>Live Demo</span>
								<span aria-hidden="true">↗</span>
							</a>
						{/if}
					</div>
				</div>

				<div class="border border-hairline-strong bg-paper-card p-6">
					<h2 class="font-serif text-xl font-semibold text-ink">Switch Project Plate</h2>
					<div class="mt-4 grid gap-2">
						{#each allProjects as item (item.slug)}
							<a
								href="/projects/{item.slug}"
								class="flex min-h-[44px] items-center justify-between border px-3.5 py-2.5 font-mono text-xs transition-colors {item.slug ===
								project.slug
									? 'border-copper bg-copper-soft font-semibold text-copper'
									: 'border-hairline bg-paper text-ink hover:border-copper'}"
							>
								<span>{item.plateCode} · {item.title}</span>
								<span aria-hidden="true">→</span>
							</a>
						{/each}
					</div>
				</div>
			</div>
		</aside>
	</div>
</section>
