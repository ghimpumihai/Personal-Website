<script lang="ts">
	import { projects } from '$lib/projects';
</script>

<section id="projects" class="py-12 border-b border-hairline/60">
	<div class="flex items-baseline justify-between">
		<h2 class="font-serif text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
			Featured Projects
		</h2>
		<span class="text-xs text-ink-muted">
			{projects.length} selected works
		</span>
	</div>

	<div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
		{#each projects as project (project.slug)}
			<a
				href="/projects/{project.slug}"
				class="group flex flex-col justify-between rounded-lg border border-hairline/70 bg-paper-card p-5 transition-all hover:border-copper/60 hover:bg-paper-elevated"
			>
				<div>
					<div class="flex items-center justify-between text-xs font-medium text-copper">
						<span>{project.domain}</span>
						<svg
							class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
							viewBox="0 0 16 16"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							aria-hidden="true"
						>
							<path d="M4 12L12 4M5 4h7v7" />
						</svg>
					</div>

					<h3 class="mt-2 text-lg font-semibold text-ink group-hover:text-copper transition-colors">
						{project.title}
					</h3>

					<p class="mt-2 text-sm leading-relaxed text-ink-muted line-clamp-3">
						{project.description}
					</p>
				</div>

				<div class="mt-4 flex flex-wrap gap-1.5 pt-2 border-t border-hairline/40">
					{#each project.tags.slice(0, 4) as tag (tag)}
						<span class="rounded bg-paper px-2 py-0.5 text-xs text-ink-muted">
							{tag}
						</span>
					{/each}
				</div>
			</a>
		{/each}
	</div>
</section>
