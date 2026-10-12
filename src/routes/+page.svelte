<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Projects from '$lib/components/Projects.svelte';
</script>

<svelte:head>
	<title>Ștefan Ghimpu | Portfolio — Software Engineering</title>
	<meta
		name="description"
		content="Personal portfolio and technical blog of Ștefan Ghimpu, Working Student at Bosch and Computer Science student at Babeș-Bolyai University."
	/>
</svelte:head>

<div class="sheet-enter flex w-full flex-col">
	<Hero />
	<Timeline />
	<Skills />
	<Projects />
</div>
