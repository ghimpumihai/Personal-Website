<script lang="ts">
	import { projects } from '$lib/projects';
</script>

<section id="projects" class="border-b border-hairline-strong">
	<div
		class="flex flex-col justify-between gap-2 border-b border-hairline-strong bg-paper-elevated px-6 py-7 sm:flex-row sm:items-baseline sm:px-10 md:px-14"
	>
		<div>
			<h2 class="font-serif text-3xl font-normal tracking-tight text-ink sm:text-4xl">
				Featured Projects
			</h2>
			<p class="mt-1 text-base text-ink-muted">
				Select any specification plate to inspect its full system architecture, tech stack, and
				source repository.
			</p>
		</div>
		<span class="font-mono text-xs uppercase tracking-wider text-copper">
			SEC 03 // 6 ARCHITECTURAL PLATES
		</span>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
		{#each projects as project, idx (project.slug)}
			<article
				class="group flex flex-col justify-between border-b border-hairline bg-paper-card transition-colors hover:bg-paper-elevated {idx %
					3 !==
				2
					? 'lg:border-r'
					: ''} {idx % 2 === 0 ? 'md:border-r lg:border-r' : 'md:border-r-0'}"
			>
				<a href="/projects/{project.slug}" class="flex grow flex-col p-6 sm:p-8">
					<div
						class="flex items-center justify-between gap-2 border-b border-hairline pb-3 font-mono text-xs"
					>
						<span class="font-semibold text-copper">{project.plateCode} // {project.domain}</span>
						<span
							class="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-ink-muted group-hover:text-copper"
						>
							<span>SPEC</span>
							<svg
								class="h-3 w-3"
								viewBox="0 0 12 12"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								aria-hidden="true"
							>
								<path d="M2 6h8M6.5 2.5L10 6 6.5 9.5" />
							</svg>
						</span>
					</div>

					<div
						class="relative mt-4 aspect-video w-full overflow-hidden border border-hairline bg-paper"
					>
						{#if project.image}
							<img
								src={project.image}
								alt={project.title}
								class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
							/>
						{:else if project.slug === 'jobscanr'}
							<div
								class="flex h-full w-full flex-col justify-between bg-paper-elevated p-4 font-mono text-xs sm:p-5"
							>
								<div class="flex justify-between border-b border-hairline pb-2 text-copper">
									<span>PIPELINE // 3,600+ EU CAREER BOARDS</span>
									<span>PYTHON + SUPABASE</span>
								</div>
								<div class="my-auto grid grid-cols-[1fr_20px_1fr_20px_1fr] items-center py-2">
									<div class="border border-hairline-strong bg-paper-card p-2 text-center">
										<span class="block font-semibold text-copper">7 ATS APIS</span>
										<span class="text-ink-muted">50k+ Jobs</span>
									</div>
									<svg
										class="h-3 w-5 text-copper"
										viewBox="0 0 20 12"
										fill="none"
										aria-hidden="true"
									>
										<line x1="0" y1="6" x2="16" y2="6" stroke="currentColor" stroke-width="1.25" />
										<path d="M13 3l4 3-4 3" stroke="currentColor" stroke-width="1.25" />
									</svg>
									<div class="border border-copper bg-copper-soft p-2 text-center">
										<span class="block font-semibold text-copper">AI HEALER</span>
										<span class="text-ink">Groq + Filter</span>
									</div>
									<svg
										class="h-3 w-5 text-copper"
										viewBox="0 0 20 12"
										fill="none"
										aria-hidden="true"
									>
										<line x1="0" y1="6" x2="16" y2="6" stroke="currentColor" stroke-width="1.25" />
										<path d="M13 3l4 3-4 3" stroke="currentColor" stroke-width="1.25" />
									</svg>
									<div class="border border-hairline-strong bg-paper-card p-2 text-center">
										<span class="block font-semibold text-copper">DIGEST</span>
										<span class="text-ink-muted">06:00 UTC</span>
									</div>
								</div>
								<div class="flex justify-between border-t border-hairline pt-2 text-ink-muted">
									<span>GITHUB ACTIONS CRON · $0/MO</span>
									<span>FIG 02</span>
								</div>
							</div>
						{:else if project.slug === 'kickcollect'}
							<div
								class="flex h-full w-full flex-col justify-between bg-paper-elevated p-4 font-mono text-xs sm:p-5"
							>
								<div class="flex justify-between border-b border-hairline pb-2 text-copper">
									<span>SCHEMA // PACK &amp; INVENTORY CRUD</span>
									<span>NEXT.JS + RADIX</span>
								</div>
								<div class="my-auto grid grid-cols-[1fr_20px_1fr_20px_1fr] items-center py-2">
									<div class="border border-hairline-strong bg-paper-card p-2 text-center">
										<span class="block font-semibold text-copper">PACK #01</span>
										<span class="text-ink-muted">Rarity</span>
									</div>
									<svg
										class="h-3 w-5 text-copper"
										viewBox="0 0 20 12"
										fill="none"
										aria-hidden="true"
									>
										<line x1="0" y1="6" x2="16" y2="6" stroke="currentColor" stroke-width="1.25" />
										<path d="M13 3l4 3-4 3" stroke="currentColor" stroke-width="1.25" />
									</svg>
									<div class="border border-copper bg-copper-soft p-2 text-center">
										<span class="block font-semibold text-copper">VAULT DB</span>
										<span class="text-ink">CRUD</span>
									</div>
									<svg
										class="h-3 w-5 text-copper"
										viewBox="0 0 20 12"
										fill="none"
										aria-hidden="true"
									>
										<line x1="0" y1="6" x2="16" y2="6" stroke="currentColor" stroke-width="1.25" />
										<path d="M13 3l4 3-4 3" stroke="currentColor" stroke-width="1.25" />
									</svg>
									<div class="border border-hairline-strong bg-paper-card p-2 text-center">
										<span class="block font-semibold text-copper">STATS UI</span>
										<span class="text-ink-muted">Metrics</span>
									</div>
								</div>
								<div class="flex justify-between border-t border-hairline pt-2 text-ink-muted">
									<span>CLIENT STATE + VITEST SUITE</span>
									<span>FIG 05</span>
								</div>
							</div>
						{:else}
							<div
								class="flex h-full w-full flex-col justify-between bg-paper-elevated p-4 font-mono text-xs sm:p-5"
							>
								<div class="flex justify-between border-b border-hairline pb-2 text-copper">
									<span>TOPOLOGY // KAFKA EVENT PIPELINE</span>
									<span>QUARKUS + OIDC</span>
								</div>
								<div class="my-auto grid grid-cols-[1fr_20px_1fr_20px_1fr] items-center py-2">
									<div class="border border-hairline-strong bg-paper-card p-2 text-center">
										<span class="block font-semibold text-copper">GATEWAY</span>
										<span class="text-ink-muted">Keycloak</span>
									</div>
									<svg
										class="h-3 w-5 text-copper"
										viewBox="0 0 20 12"
										fill="none"
										aria-hidden="true"
									>
										<line x1="0" y1="6" x2="16" y2="6" stroke="currentColor" stroke-width="1.25" />
										<path d="M13 3l4 3-4 3" stroke="currentColor" stroke-width="1.25" />
									</svg>
									<div class="border border-copper bg-copper-soft p-2 text-center">
										<span class="block font-semibold text-copper">KAFKA BUS</span>
										<span class="text-ink">USD→BRL</span>
									</div>
									<svg
										class="h-3 w-5 text-copper"
										viewBox="0 0 20 12"
										fill="none"
										aria-hidden="true"
									>
										<line x1="0" y1="6" x2="16" y2="6" stroke="currentColor" stroke-width="1.25" />
										<path d="M13 3l4 3-4 3" stroke="currentColor" stroke-width="1.25" />
									</svg>
									<div class="border border-hairline-strong bg-paper-card p-2 text-center">
										<span class="block font-semibold text-copper">POSTGRES</span>
										<span class="text-ink-muted">Reports</span>
									</div>
								</div>
								<div class="flex justify-between border-t border-hairline pt-2 text-ink-muted">
									<span>MULTI-MODULE MICROSERVICES</span>
									<span>FIG 06</span>
								</div>
							</div>
						{/if}
					</div>

					<h3
						class="mt-5 font-serif text-2xl font-semibold text-ink transition-colors group-hover:text-copper"
					>
						{project.title}
					</h3>

					<p class="mt-2.5 text-base leading-relaxed text-ink-muted">
						{project.description}
					</p>

					<div class="mt-5 flex flex-wrap gap-1.5 pt-2">
						{#each project.tags as tag (tag)}
							<span class="border border-hairline bg-paper px-2.5 py-1 font-mono text-xs text-ink">
								{tag}
							</span>
						{/each}
					</div>
				</a>

				<div
					class="flex items-center justify-between gap-3 border-t border-hairline bg-paper px-6 py-3.5 sm:px-8"
				>
					<a
						href={project.githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-ink transition-colors hover:text-copper"
					>
						<span>Code (GitHub)</span>
						<svg
							class="h-3 w-3 text-copper"
							viewBox="0 0 12 12"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							aria-hidden="true"
						>
							<path d="M2.5 9.5L9.5 2.5M4 2.5h5.5V8" />
						</svg>
					</a>

					<div class="flex items-center gap-4">
						{#if project.demoUrl}
							<a
								href={project.demoUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-copper hover:underline"
							>
								<span>Demo</span>
								<svg
									class="h-3 w-3"
									viewBox="0 0 12 12"
									fill="none"
									stroke="currentColor"
									stroke-width="1.5"
									aria-hidden="true"
								>
									<path d="M2.5 9.5L9.5 2.5M4 2.5h5.5V8" />
								</svg>
							</a>
						{:else}
							<span class="font-mono text-xs text-ink-muted">{project.plateCode}</span>
						{/if}
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>
