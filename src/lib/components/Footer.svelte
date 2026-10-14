<script lang="ts">
	const currentYear = new Date().getFullYear();

	const socialLinks = [
		{
			name: 'GitHub',
			href: 'https://github.com/ghimpumihai'
		},
		{
			name: 'LinkedIn',
			href: 'https://www.linkedin.com/in/stefan-ghimpu-8a6532332/'
		},
		{
			name: 'Email',
			href: 'mailto:stefanghimpu2005@yahoo.com'
		},
		{
			name: 'Blog',
			href: '/blog'
		}
	];
</script>

<footer class="mt-auto border-t border-hairline/60 py-8">
	<div class="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 text-sm text-ink-muted">
		<div class="flex items-center gap-2">
			<span class="font-medium text-ink">Ștefan Ghimpu</span>
			<span>·</span>
			<span>Cluj-Napoca, Romania</span>
		</div>

		<div class="flex items-center gap-5">
			{#each socialLinks as item (item.name)}
				<a
					href={item.href}
					target={item.href.startsWith('http') ? '_blank' : undefined}
					rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
					class="transition-colors hover:text-copper"
				>
					{item.name}
				</a>
			{/each}
		</div>

		<div class="text-xs text-ink-muted/80">
			&copy; {currentYear} All rights reserved.
		</div>
	</div>
</footer>
