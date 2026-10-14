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

<div class="flex min-h-screen flex-col bg-paper text-ink">
	<Header />
	<main class="mx-auto w-full max-w-4xl grow px-4 sm:px-6">
		{@render children()}
	</main>
	<Footer />
</div>
