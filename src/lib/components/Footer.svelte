<script lang="ts">
	import { projects } from '$lib/projects';

	const currentYear = new Date().getFullYear();

	const socialLinks = [
		{
			name: 'GitHub',
			href: 'https://github.com/ghimpumihai',
			label: 'github.com/ghimpumihai'
		},
		{
			name: 'LinkedIn',
			href: 'https://www.linkedin.com/in/stefan-ghimpu-8a6532332/',
			label: 'linkedin.com/in/stefan-ghimpu'
		},
		{
			name: 'Email',
			href: 'mailto:stefanghimpu2005@yahoo.com',
			label: 'stefanghimpu2005@yahoo.com'
		}
	];
</script>

<footer class="border-t border-hairline-strong bg-paper-elevated">
	<div class="mx-auto max-w-[1360px] border-x border-hairline-strong">
		<div class="grid border-b border-hairline md:grid-cols-3">
			<div class="border-b border-hairline p-6 sm:p-8 md:border-b-0 md:border-r">
				<h2 class="font-serif text-xl font-semibold text-ink">Ștefan Ghimpu</h2>
				<p class="mt-2 text-sm leading-relaxed text-ink-muted">
					Working Student at Bosch and Computer Science student at Babeș-Bolyai University.
					Engineering backend systems, developer tooling, and full-stack web applications.
				</p>
				<p class="mt-4 font-mono text-xs text-copper">
					CLUJ-NAPOCA, ROMANIA · 46.7712° N, 23.6236° E
				</p>
			</div>

			<div class="border-b border-hairline p-6 sm:p-8 md:border-b-0 md:border-r">
				<h2 class="font-serif text-xl font-semibold text-ink">Site Directory</h2>
				<ul class="mt-3 grid grid-cols-2 gap-2 font-mono text-xs">
					<li><a href="/" class="text-ink-muted hover:text-copper">Home Sheet</a></li>
					<li><a href="/#experience" class="text-ink-muted hover:text-copper">Experience</a></li>
					<li><a href="/#skills" class="text-ink-muted hover:text-copper">Skills Matrix</a></li>
					<li><a href="/#projects" class="text-ink-muted hover:text-copper">Projects</a></li>
					<li><a href="/blog" class="text-ink-muted hover:text-copper">Blog Archive</a></li>
					<li><a href="/admin" class="text-ink-muted hover:text-copper">Blog Admin</a></li>
				</ul>
			</div>

			<div class="p-6 sm:p-8">
				<h2 class="font-serif text-xl font-semibold text-ink">Engineering Domains</h2>
				<ul class="mt-3 grid grid-cols-2 gap-2 font-mono text-xs text-ink-muted">
					<li>01 · Rust &amp; Svelte Tooling</li>
					<li>02 · Java 17+ &amp; Quarkus</li>
					<li>03 · Kafka Microservices</li>
					<li>04 · Earth Engine &amp; Python</li>
					<li>05 · Computer Vision &amp; IoT</li>
					<li>06 · JobScanr ATS Radar</li>
				</ul>
			</div>
		</div>

		<div
			class="flex flex-col items-center justify-between gap-4 px-6 py-5 sm:flex-row sm:px-8"
		>
			<div class="flex flex-wrap items-center gap-6">
				{#each socialLinks as item (item.name)}
					<a
						href={item.href}
						target={item.href.startsWith('http') ? '_blank' : undefined}
						rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
						class="inline-flex items-center gap-2 font-mono text-xs text-ink-muted transition-colors hover:text-copper"
					>
						<span>{item.name}</span>
						<span class="text-copper">↗</span>
					</a>
				{/each}
			</div>

			<p class="font-mono text-xs text-ink-muted">
				&copy; {currentYear} Ghimpu Mihai-Stefan. All rights reserved.
			</p>
		</div>
	</div>
</footer>
