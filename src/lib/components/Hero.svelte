<script lang="ts">
	interface SystemNode {
		id: string;
		code: string;
		label: string;
		role: string;
		summary: string;
		stack: string[];
		href: string;
	}

	const systemNodes: SystemNode[] = [
		{
			id: 'bosch',
			code: '01 · BOSCH',
			label: 'Rust & Svelte',
			role: 'Working Student @ Bosch (July 2026 – Present)',
			summary:
				'Engineering internal developer tools that streamline workflows and boost daily engineering productivity across teams.',
			stack: ['Rust', 'Svelte', 'TypeScript', 'Internal Tooling'],
			href: '/#experience'
		},
		{
			id: 'bmw',
			code: '02 · BMW TECHWORKS',
			label: 'Java & Quarkus',
			role: 'Software Engineer Intern @ BMW TechWorks Romania (Nov 2025 – June 2026)',
			summary:
				'Designed and validated high-performance RESTful APIs in Java 17+ and Quarkus for scalable enterprise cloud systems.',
			stack: ['Java 17+', 'Quarkus', 'RESTful APIs', 'Cloud-Native'],
			href: '/#experience'
		},
		{
			id: 'rospin',
			code: '03 · ROSPIN',
			label: 'Earth Engine',
			role: 'Full-Stack Developer @ ROSPIN (Oct – Dec 2025)',
			summary:
				'Built a Django geospatial backend integrating Google Earth Engine with interactive React telemetry dashboards.',
			stack: ['Django', 'Python', 'Google Earth Engine', 'React'],
			href: '/projects/skywind'
		},
		{
			id: 'quotation',
			code: '04 · KAFKA',
			label: 'Quotation Svc',
			role: 'Event-Driven Microservices Architecture',
			summary:
				'Multi-module Quarkus backend combining synchronous REST gateways with asynchronous Kafka streams and Keycloak OIDC.',
			stack: ['Quarkus', 'Apache Kafka', 'PostgreSQL', 'Keycloak'],
			href: '/projects/quotation-service'
		},
		{
			id: 'seebump',
			code: '05 · VISION',
			label: 'SeeBump IoT',
			role: 'PoliHack 2025 Computer Vision & Hardware Control',
			summary:
				'Real-time OpenCV vehicle speed detection paired with ESP32 smart speed-bump actuation and a live web dashboard.',
			stack: ['Python', 'OpenCV', 'ESP32', 'C++', 'Supabase'],
			href: '/projects/seebump'
		},
		{
			id: 'jobscanr',
			code: '06 · PYTHON',
			label: 'JobScanr Radar',
			role: 'Automated European Tech Job Radar (3,600+ Boards)',
			summary:
				'Scans 50,000+ postings daily across 7 ATS platforms with Groq AI self-healing link repair, Supabase storage, and daily email digests.',
			stack: ['Python', 'PostgreSQL', 'Supabase', 'GitHub Actions', 'Groq LLM'],
			href: '/projects/jobscanr'
		}
	];

	const schematicRows = [
		{ org: 'BOSCH', spec: 'Internal tooling · Rust & Svelte' },
		{ org: 'BMW', spec: 'BMW TechWorks Romania · Java 17+ & Quarkus' },
		{ org: 'ROSPIN', spec: 'Satellite pipeline · Django & GEE' },
		{ org: 'BBU CLUJ', spec: 'B.Sc. Computer Science (2024–2027)' }
	];

	let activeNodeIndex = $state(0);
	const activeNode = $derived(systemNodes[activeNodeIndex]);

	function handleNodeKeydown(e: KeyboardEvent, idx: number) {
		if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
			e.preventDefault();
			activeNodeIndex = (idx + 1) % systemNodes.length;
		} else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
			e.preventDefault();
			activeNodeIndex = (idx - 1 + systemNodes.length) % systemNodes.length;
		}
	}
</script>

<section id="hero" class="border-b border-hairline-strong">
	<div class="grid lg:grid-cols-[1.25fr_0.95fr]">
		<!-- Left Architectural Thesis Column -->
		<div
			class="flex flex-col justify-between border-b border-hairline p-6 sm:p-10 md:p-14 lg:border-b-0 lg:border-r"
		>
			<div>
				<h1
					class="font-serif text-4xl font-normal leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]"
				>
					Software engineered for <span class="font-semibold text-copper">real-world load</span> —
					and notes from the journey.
				</h1>

				<p class="mt-6 max-w-[64ch] text-base leading-relaxed text-ink-muted sm:text-lg">
					I’m <strong class="font-semibold text-ink">Ștefan Ghimpu</strong>, currently a Working
					Student at <strong class="font-semibold text-ink">Bosch</strong> and a Computer Science
					student at <strong class="font-semibold text-ink">Babeș-Bolyai University</strong>. I
					specialize in scalable backend services, internal developer tools, and full-stack systems
					across Rust, Java/Quarkus, Python, and TypeScript.
				</p>

				<div class="mt-8 flex flex-wrap items-center gap-3.5">
					<a
						href="#projects"
						class="inline-flex items-center gap-2 border border-copper bg-copper px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider text-copper-contrast transition-opacity hover:opacity-90"
					>
						<span>Explore Projects (6)</span>
						<svg
							class="h-3.5 w-3.5"
							viewBox="0 0 16 16"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							aria-hidden="true"
						>
							<path d="M2.5 8h11M9.5 4l4 4-4 4" />
						</svg>
					</a>
					<a
						href="/blog"
						class="inline-flex items-center gap-2 border border-hairline-strong bg-paper-card px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider text-ink transition-colors hover:border-copper hover:text-copper"
					>
						<span>Read Technical Blog</span>
					</a>
					<a
						href="#experience"
						class="inline-flex items-center gap-2 border border-hairline bg-paper px-4 py-3 font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors hover:border-hairline-strong hover:text-ink"
					>
						<span>Experience Ledger</span>
					</a>
				</div>
			</div>

			<!-- Interactive 6-Step System & Career Node Selector -->
			<div class="mt-12 border-t border-hairline pt-6">
				<div role="tablist" aria-label="Career and project nodes" class="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
					{#each systemNodes as node, idx (node.id)}
						<button
							type="button"
							role="tab"
							id="tab-{node.id}"
							aria-selected={activeNodeIndex === idx}
							aria-controls="panel-system-node"
							tabindex={activeNodeIndex === idx ? 0 : -1}
							onclick={() => (activeNodeIndex = idx)}
							onkeydown={(e) => handleNodeKeydown(e, idx)}
							class="border p-3 text-left font-mono text-xs transition-colors {activeNodeIndex ===
							idx
								? 'border-copper bg-copper-soft text-ink'
								: 'border-hairline-strong bg-paper-card text-ink-muted hover:border-copper'}"
						>
							<span class="block font-semibold text-copper">{node.code}</span>
							<span class="mt-0.5 block">{node.label}</span>
						</button>
					{/each}
				</div>

				<div
					id="panel-system-node"
					role="tabpanel"
					aria-labelledby="tab-{activeNode.id}"
					class="mt-3 flex flex-col justify-between gap-4 border border-hairline bg-paper-card p-4 sm:flex-row sm:items-center"
				>
					<div>
						<div class="font-mono text-xs font-semibold text-copper">{activeNode.role}</div>
						<p class="mt-1 text-sm text-ink-muted">{activeNode.summary}</p>
					</div>
					<a
						href={activeNode.href}
						class="inline-flex shrink-0 items-center gap-1.5 border border-hairline-strong bg-paper px-3.5 py-2 font-mono text-xs text-ink transition-colors hover:border-copper hover:text-copper"
					>
						<span>Inspect</span>
						<svg
							class="h-3.5 w-3.5 text-copper"
							viewBox="0 0 16 16"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							aria-hidden="true"
						>
							<path d="M2.5 8h11M9.5 4l4 4-4 4" />
						</svg>
					</a>
				</div>
			</div>
		</div>

		<!-- Right Engineer Profile Plate & System Schematic -->
		<div class="flex flex-col justify-between bg-paper-elevated p-6 sm:p-10 md:p-12">
			<div class="border border-hairline-strong bg-paper-card p-6">
				<div
					class="flex items-center justify-between border-b border-hairline pb-3 font-mono text-xs text-ink-muted"
				>
					<span>FIG 1.0 — ENGINEER SPECIFICATION</span>
					<span class="text-copper">REV 2026</span>
				</div>

				<div class="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
					<div
						class="relative h-24 w-24 shrink-0 overflow-hidden border border-copper bg-paper p-1"
					>
						<img
							src="/images/profile/profile.jpg"
							alt="Ștefan Ghimpu"
							class="h-full w-full object-cover"
						/>
					</div>

					<div>
						<h2 class="font-serif text-2xl font-semibold text-ink">Ghimpu Mihai-Ștefan</h2>
						<p class="mt-1 font-mono text-xs text-copper">
							WORKING STUDENT @ BOSCH · BBU CS ’27
						</p>
						<p class="mt-2 text-sm text-ink-muted">
							Backend Architecture · Distributed Systems · Full-Stack Engineering
						</p>
					</div>
				</div>

				<div class="mt-6 space-y-2.5 border-t border-dashed border-hairline-strong pt-5">
					{#each schematicRows as row (row.org)}
						<div
							class="grid grid-cols-[84px_32px_1fr] items-center border border-hairline bg-paper px-3 py-2.5 font-mono text-xs sm:grid-cols-[96px_36px_1fr]"
						>
							<span class="font-semibold text-copper">{row.org}</span>
							<span class="flex items-center justify-center text-copper" aria-hidden="true">
								<svg class="h-3 w-6" viewBox="0 0 24 12" fill="none">
									<line x1="1" y1="6" x2="19" y2="6" stroke="currentColor" stroke-width="1.25" />
									<path d="M16 2.5L20.5 6L16 9.5" stroke="currentColor" stroke-width="1.25" />
								</svg>
							</span>
							<span class="text-ink">{row.spec}</span>
						</div>
					{/each}
				</div>
			</div>

			<div
				class="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-4 font-mono text-xs text-ink-muted"
			>
				<a
					href="https://github.com/ghimpumihai"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1 hover:text-copper"
				>
					<span>GITHUB: /ghimpumihai</span>
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
				<a
					href="https://www.linkedin.com/in/stefan-ghimpu-8a6532332/"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1 hover:text-copper"
				>
					<span>LINKEDIN: /stefan-ghimpu</span>
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
				<a href="mailto:stefanghimpu2005@yahoo.com" class="text-copper hover:underline">
					CONTACT VIA EMAIL
				</a>
			</div>
		</div>
	</div>
</section>
