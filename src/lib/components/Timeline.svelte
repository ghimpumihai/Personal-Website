<script lang="ts">
	interface ExperienceItem {
		id: string;
		code: string;
		type: 'Work' | 'Education';
		title: string;
		companyOrSchool: string;
		period: string;
		stack: string[];
		description: string[];
	}

	const experiences: ExperienceItem[] = [
		{
			id: 'exp-1',
			code: 'LOG 01',
			type: 'Work',
			title: 'Working Student',
			companyOrSchool: 'Bosch',
			period: 'July 2026 – Present',
			stack: ['Rust', 'Svelte', 'TypeScript'],
			description: [
				'Building tools for internal teams to improve efficiency and productivity using Rust and Svelte.'
			]
		},
		{
			id: 'exp-2',
			code: 'LOG 02',
			type: 'Work',
			title: 'Software Engineer Intern',
			companyOrSchool: 'BMW TechWorks Romania',
			period: 'November 2025 – June 2026',
			stack: ['Java 17+', 'Quarkus', 'REST APIs', 'Cloud'],
			description: [
				'Engineered and validated RESTful APIs using Java 17+ and Quarkus for high-performance enterprise systems.',
				'Collaborated with senior engineers to implement scalable, cloud-native solutions and refine complex business logic.'
			]
		},
		{
			id: 'exp-3',
			code: 'LOG 03',
			type: 'Work',
			title: 'Full-Stack Developer',
			companyOrSchool: 'ROSPIN Satellite Data Processing',
			period: 'October – December 2025',
			stack: ['Django', 'Python', 'Google Earth Engine', 'React'],
			description: [
				'Engineered a Django backend integrating Google Earth Engine for efficient satellite imagery processing.',
				'Developed interactive React dashboards to provide real-time data visualizations and actionable insights.'
			]
		},
		{
			id: 'exp-4',
			code: 'LOG 04',
			type: 'Education',
			title: 'Bachelor of Computer Science',
			companyOrSchool: 'Babeș-Bolyai University',
			period: '2024 – 2027',
			stack: ['Algorithms', 'System Architecture', 'Data Structures'],
			description: [
				'Pursuing a comprehensive Computer Science curriculum with a focus on modern software engineering.',
				'Specializing in advanced algorithms, system architecture, and high-performance data structures.'
			]
		}
	];
</script>

<section id="experience" class="border-b border-hairline-strong">
	<div
		class="flex flex-col justify-between gap-2 border-b border-hairline-strong bg-paper-elevated px-6 py-7 sm:flex-row sm:items-baseline sm:px-10 md:px-14"
	>
		<div>
			<h2 class="font-serif text-3xl font-normal tracking-tight text-ink sm:text-4xl">
				Experience &amp; Education
			</h2>
			<p class="mt-1 text-base text-ink-muted">
				Industry engineering roles and academic foundation in Computer Science.
			</p>
		</div>
		<span class="font-mono text-xs uppercase tracking-wider text-copper">
			SEC 01 // 4 MILESTONES (2024–PRESENT)
		</span>
	</div>

	<div class="grid md:grid-cols-2">
		{#each experiences as exp, idx (exp.id)}
			<article
				class="flex flex-col justify-between border-b border-hairline bg-paper-card p-6 sm:p-10 {idx %
					2 ===
				0
					? 'md:border-r'
					: ''}"
			>
				<div>
					<div class="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-3">
						<div class="flex items-center gap-2.5">
							<span
								class="border border-copper bg-copper-soft px-2 py-0.5 font-mono text-xs font-semibold text-copper"
							>
								{exp.code} · {exp.type.toUpperCase()}
							</span>
							<span class="font-mono text-xs font-medium text-ink">{exp.companyOrSchool}</span>
						</div>
						<span class="font-mono text-xs text-ink-muted">{exp.period}</span>
					</div>

					<h3 class="mt-5 font-serif text-2xl font-semibold text-ink">
						{exp.title}
					</h3>

					<ul class="mt-4 space-y-2.5 text-base leading-relaxed text-ink-muted">
						{#each exp.description as point (point)}
							<li class="flex gap-3">
								<span class="mt-2 h-1.5 w-1.5 shrink-0 bg-copper" aria-hidden="true"></span>
								<span>{point}</span>
							</li>
						{/each}
					</ul>
				</div>

				<div class="mt-6 flex flex-wrap gap-2 border-t border-dashed border-hairline pt-4">
					{#each exp.stack as item (item)}
						<span class="border border-hairline bg-paper px-2.5 py-1 font-mono text-xs text-ink">
							{item}
						</span>
					{/each}
				</div>
			</article>
		{/each}
	</div>
</section>
