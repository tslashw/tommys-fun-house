<script>
	import favicon from '$lib/assets/favicon.png';
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Background from '$lib/components/background/Background.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Tommy's Fun House</title>
</svelte:head>

<div class="bg-layer" aria-hidden="true">
	<Background colour="Orange" speed={0.5} resolution={128} />
</div>

<div class="page">
	<NavBar />
	<main>
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	/* Animated noise canvas behind everything */
	.bg-layer {
		position: fixed;
		inset: 0;
		z-index: -1;
		background: #2a1a0e; /* dark fallback before the canvas paints */
		pointer-events: none;
	}

	.page {
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
	}

	main {
		flex: 1;
	}
</style>
