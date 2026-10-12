<script lang="ts">
	interface SkillItem {
		name: string;
		iconClass: string;
	}

	interface SkillCategory {
		code: string;
		title: string;
		subtitle: string;
		skills: SkillItem[];
	}

	const categories: SkillCategory[] = [
		{
			code: 'DOM 01',
			title: 'Backend & Systems',
			subtitle: 'Compiled languages, enterprise runtimes, and relational data stores.',
			skills: [
				{ name: 'Rust', iconClass: 'devicon-rust-plain' },
				{ name: 'Java', iconClass: 'devicon-java-plain' },
				{ name: 'Quarkus', iconClass: 'devicon-quarkus-plain' },
				{ name: 'C++', iconClass: 'devicon-cplusplus-plain' },
				{ name: 'C#', iconClass: 'devicon-csharp-plain' },
				{ name: '.NET', iconClass: 'devicon-dot-net-plain' },
				{ name: 'Python', iconClass: 'devicon-python-plain' },
				{ name: 'SQL', iconClass: 'devicon-azuresqldatabase-plain' }
			]
		},
		{
			code: 'DOM 02',
			title: 'Frontend & Web',
			subtitle: 'Reactive component architectures, type-safe interfaces, and styling systems.',
			skills: [
				{ name: 'Svelte', iconClass: 'devicon-svelte-plain' },
				{ name: 'React', iconClass: 'devicon-react-original' },
				{ name: 'Next.js', iconClass: 'devicon-nextjs-plain' },
				{ name: 'Angular', iconClass: 'devicon-angularjs-plain' },
				{ name: 'TypeScript', iconClass: 'devicon-typescript-plain' },
				{ name: 'HTML/CSS', iconClass: 'devicon-html5-plain' },
				{ name: 'Tailwind CSS', iconClass: 'devicon-tailwindcss-original' }
			]
		},
		{
			code: 'DOM 03',
			title: 'Tools & Infrastructure',
			subtitle: 'Containerization, API specifications, version control, and desktop frameworks.',
			skills: [
				{ name: 'Docker', iconClass: 'devicon-docker-plain' },
				{ name: 'Git', iconClass: 'devicon-git-plain' },
				{ name: 'Supabase', iconClass: 'devicon-supabase-plain' },
				{ name: 'Swagger/OpenAPI', iconClass: 'devicon-swagger-plain' },
				{ name: 'Qt', iconClass: 'devicon-qt-original' },
				{ name: 'RESTful APIs', iconClass: '' }
			]
		}
	];
</script>

<section id="skills" class="border-b border-hairline-strong">
	<div
		class="flex flex-col justify-between gap-2 border-b border-hairline-strong bg-paper-elevated px-6 py-7 sm:flex-row sm:items-baseline sm:px-10 md:px-14"
	>
		<div>
			<h2 class="font-serif text-3xl font-normal tracking-tight text-ink sm:text-4xl">
				Technical Toolkit
			</h2>
			<p class="mt-1 text-base text-ink-muted">
				Core languages, frameworks, and infrastructure tools used across production and academic
				systems.
			</p>
		</div>
		<span class="font-mono text-xs uppercase tracking-wider text-copper">
			SEC 02 // 21 VERIFIED TECHNOLOGIES
		</span>
	</div>

	<div class="grid lg:grid-cols-3">
		{#each categories as category, idx (category.title)}
			<div
				class="flex flex-col justify-between border-b border-hairline bg-paper p-6 sm:p-10 lg:border-b-0 {idx <
				2
					? 'lg:border-r'
					: ''}"
			>
				<div>
					<div class="flex items-center justify-between border-b border-hairline pb-3">
						<h3 class="font-serif text-2xl font-semibold text-ink">{category.title}</h3>
						<span class="font-mono text-xs font-semibold text-copper">{category.code}</span>
					</div>

					<p class="mt-3 text-sm leading-relaxed text-ink-muted">
						{category.subtitle}
					</p>

					<div class="mt-6 flex flex-wrap gap-2.5">
						{#each category.skills as skill (skill.name)}
							<span
								class="inline-flex items-center gap-2 border border-hairline-strong bg-paper-card px-3 py-2 font-mono text-xs font-medium text-ink transition-colors hover:border-copper"
							>
								{#if skill.iconClass}
									<i class="{skill.iconClass} text-base text-copper" aria-hidden="true"></i>
								{:else}
									<svg
										class="h-4 w-4 shrink-0 text-copper"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="1.75"
										aria-hidden="true"
									>
										<path d="M4 9h16M4 15h16M9 4v16M15 4v16" />
									</svg>
								{/if}
								<span>{skill.name}</span>
							</span>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>
