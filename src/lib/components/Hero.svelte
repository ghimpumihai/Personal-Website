<script lang="ts">
	const links = [
		{ name: 'GitHub', href: 'https://github.com/ghimpumihai', external: true },
		{ name: 'LinkedIn', href: 'https://www.linkedin.com/in/stefan-ghimpu-8a6532332/', external: true },
		{ name: 'Email', href: 'mailto:stefanghimpu2005@yahoo.com', external: false },
		{ name: 'Blog', href: '/blog', external: false }
	];
</script>

<section id="hero" class="py-12 sm:py-16 border-b border-hairline/60">
	<div class="flex flex-col-reverse gap-8 sm:flex-row sm:items-center sm:justify-between">
		<div class="max-w-xl">
			<h1 class="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
				Ștefan Ghimpu
			</h1>

			<p class="mt-3 text-base font-medium text-copper sm:text-lg">
				Working Student @ Bosch · Computer Science @ Babeș-Bolyai University
			</p>

			<p class="mt-4 text-base leading-relaxed text-ink-muted">
				Engineering backend systems, developer tooling, and distributed software. Experienced in Rust,
				Java/Quarkus, Python, and TypeScript.
			</p>

			<div class="mt-6 flex flex-wrap items-center gap-4 text-sm font-medium">
				{#each links as link (link.name)}
					<a
						href={link.href}
						target={link.external ? '_blank' : undefined}
						rel={link.external ? 'noopener noreferrer' : undefined}
						class="inline-flex items-center gap-1 text-ink-muted transition-colors hover:text-copper underline-offset-4 hover:underline"
					>
						<span>{link.name}</span>
						{#if link.external}
							<svg
								class="h-3 w-3 opacity-70"
								viewBox="0 0 12 12"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								aria-hidden="true"
							>
								<path d="M2.5 9.5L9.5 2.5M4 2.5h5.5V8" />
							</svg>
						{/if}
					</a>
				{/each}
			</div>
		</div>

		<div class="shrink-0">
			<img
				src="/images/profile/profile.jpg"
				alt="Ștefan Ghimpu"
				class="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover border-2 border-hairline/80 shadow-sm"
			/>
		</div>
	</div>
</section>
