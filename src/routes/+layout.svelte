<script>
	import favicon from '$lib/assets/favicon.png';
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Background from '$lib/components/background/Background.svelte';

	let { children } = $props();

	// The header/footer are position:fixed, so <main> needs padding equal to
	// their heights to clear them. Measured live (Svelte uses a ResizeObserver
	// for bind:offsetHeight) so responsive height changes stay correct. Seeded
	// with approximate values so the first paint before hydration doesn't tuck
	// content under the header.
	let headerH = $state(72);
	let footerH = $state(76);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Tommy's Fun House</title>
</svelte:head>

<div class="bg-layer" aria-hidden="true">
	<Background colour="Orange" speed={0.5} resolution={128} />
</div>

<div class="page">
	<div class="chrome chrome-top" bind:offsetHeight={headerH}>
		<NavBar />
	</div>

	<main style="padding-top: {headerH}px; padding-bottom: {footerH}px;">
		{@render children()}
	</main>

	<div class="chrome chrome-bottom" bind:offsetHeight={footerH}>
		<Footer />
	</div>
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

	/* The page itself is the scroll container again (so it rubber-bands
	   naturally on iOS). The header/footer are lifted out of flow and pinned
	   to the viewport edges; <main> is padded to clear them. Overscrolling
	   then bounces the content while these stay put, opening a gap that
	   reveals the animated background. */
	.chrome {
		position: fixed;
		left: 0;
		right: 0;
		z-index: 10;
	}
	.chrome-top {
		top: 0;
	}
	.chrome-bottom {
		bottom: 0;
	}
</style>
