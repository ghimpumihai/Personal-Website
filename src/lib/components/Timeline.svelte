<script lang="ts">
	interface ExperienceItem {
		id: string;
		title: string;
		companyOrSchool: string;
		period: string;
		stack: string[];
		description: string;
	}

	const experiences: ExperienceItem[] = [
		{
			id: 'exp-1',
			title: 'Working Student',
			companyOrSchool: 'Bosch',
			period: 'July 2026 – Present',
			stack: ['Rust', 'Svelte', 'TypeScript'],
			description:
				'Building tools for internal engineering teams to streamline workflows and boost daily productivity.'
		},
		{
			id: 'exp-2',
			title: 'Software Engineer Intern',
			companyOrSchool: 'BMW TechWorks Romania',
			period: 'Nov 2025 – June 2026',
			stack: ['Java 17+', 'Quarkus', 'REST APIs', 'Cloud'],
			description:
				'Engineered and validated high-performance RESTful APIs using Java 17+ and Quarkus for enterprise systems.'
		},
		{
			id: 'exp-3',
			title: 'B.Sc. in Computer Science',
			companyOrSchool: 'Babeș-Bolyai University',
			period: '2024 – 2027',
			stack: ['System Architecture', 'Algorithms', 'Data Structures'],
			description:
				'Studying core software engineering, distributed systems, and advanced algorithmic data structures.'
		}
	];
</script>

<section id="experience" class="py-12 border-b border-hairline/60">
	<h2 class="font-serif text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
		Experience
	</h2>

	<div class="mt-8 space-y-8">
		{#each experiences as exp (exp.id)}
			<article class="space-y-2">
				<div class="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
					<h3 class="text-base font-semibold text-ink">
						{exp.title}
						<span class="font-normal text-ink-muted">· {exp.companyOrSchool}</span>
					</h3>
					<time class="shrink-0 text-xs font-medium text-ink-muted sm:text-right">
						{exp.period}
					</time>
				</div>

				<p class="text-sm leading-relaxed text-ink-muted max-w-xl">
					{exp.description}
				</p>

				<div class="flex flex-wrap gap-1.5 pt-0.5">
					{#each exp.stack as tech (tech)}
						<span class="rounded bg-paper-elevated px-2 py-0.5 text-xs text-ink-muted">
							{tech}
						</span>
					{/each}
				</div>
			</article>
		{/each}
	</div>
</section>
