<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { themeState } from '$lib/theme.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children }: { children: Snippet } = $props();

	onMount(() => {
		themeState.init();
	});
</script>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="mx-auto w-full max-w-[1360px] grow border-x border-hairline-strong bg-paper">
		{@render children()}
	</main>
	<Footer />
</div>
