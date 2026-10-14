<script lang="ts">
	const skillGroups = [
		{
			category: 'Languages & Systems',
			skills: ['Rust', 'Java 17+', 'Python', 'TypeScript', 'C++', 'C# / .NET', 'SQL']
		},
		{
			category: 'Frameworks & Web',
			skills: ['Quarkus', 'Svelte / SvelteKit', 'React', 'Next.js', 'Django', 'Tailwind CSS']
		},
		{
			category: 'Cloud & Infrastructure',
			skills: ['Apache Kafka', 'Docker', 'PostgreSQL', 'Supabase', 'Git', 'REST APIs']
		}
	];
</script>

<section id="skills" class="py-12 border-b border-hairline/60">
	<h2 class="font-serif text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
		Skills &amp; Technologies
	</h2>

	<div class="mt-8 space-y-5">
		{#each skillGroups as group (group.category)}
			<div class="flex flex-col gap-2 sm:flex-row sm:items-baseline">
				<span class="w-48 shrink-0 text-sm font-semibold text-ink">
					{group.category}
				</span>
				<div class="flex flex-wrap gap-1.5">
					{#each group.skills as skill (skill)}
						<span class="rounded bg-paper-card border border-hairline/60 px-2.5 py-1 text-xs text-ink-muted">
							{skill}
						</span>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>
