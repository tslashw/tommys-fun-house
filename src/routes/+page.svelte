<script>
    import Button from '$lib/components/Button.svelte';
    import GameCard from '$lib/components/GameCard.svelte';
    import WavyHeading from '$lib/components/WavyHeading.svelte';
    import { games } from '$lib/games.js';
</script>

<svelte:head>
    <title>Tommy's Fun House — games & experiments</title>
    <meta
        name="description"
        content="The home of Tommy's games and code experiments."
    />
</svelte:head>

<!-- GAMES -->
<section id="games" class="block shell">
    <div class="panel">
        <div class="block-head">
            <WavyHeading text="The Arcade" />
        </div>

        <div class="grid">
            {#each games as game (game.href)}
                <GameCard {...game} />
            {/each}

            <!-- "coming soon" placeholder keeps the grid lively while small -->
            <div class="soon">
                <span class="soon-text">More coming soon</span>
            </div>
        </div>
    </div>
</section>

<!-- ABOUT -->
<section id="about" class="block shell">
    <div class="about-intro panel">
        <WavyHeading text="About" />
        <div class="about-body">
            <img
                class="avatar"
                src="/tommy.png"
                alt="Pixel-art portrait of Tommy wearing a beanie and glasses"
                width="1254"
                height="1254"
            />
            <p class="lede">
                Hi I'm Tommy. A full stack software engineer based in the UK. This site is where I host some of the projects that I have made.
            </p>
        </div>
    </div>
</section>

<style>
    /* Sections sit under a sticky navbar — offset anchor jumps so the
       heading isn't hidden behind it. */
    section[id] {
        scroll-margin-top: 5.5rem;
    }

    /* ---- BLOCKS (shared) ---- */
    .block {
        margin-top: clamp(var(--space-12), 7vw, var(--space-16));
    }

    .block-head {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: var(--space-4);
        margin-bottom: var(--space-3);
    }

    /* Poster wall: fixed-width tracks so cards keep their 2:3 shape
       instead of stretching to fill the row. Left-aligned to sit flush
       with the "The Arcade" heading. */
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 280px));
        justify-content: start;
        gap: var(--space-6);
    }

    /* coming-soon tile, dashed to read as a placeholder */
    .soon {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--space-2);
        aspect-ratio: 2 / 3;
        padding: var(--space-6);
        border: var(--border-w) dashed var(--ink);
        border-radius: var(--radius);
        color: var(--ink);
        opacity: 0.6;
    }
    .soon-text { font-weight: 700; }

    /* Shared bordered card wrapper used by the Arcade + About sections */
    .panel {
        /* roomy sides + bottom, tighter top so headings sit higher */
        padding: clamp(var(--space-4), 3vw, var(--space-6))
                 clamp(var(--space-6), 4vw, var(--space-12))
                 clamp(var(--space-6), 4vw, var(--space-12));
        background: var(--ember-tint);
        border: var(--stroke);
        border-radius: var(--radius);
        box-shadow: var(--shadow-hard-lg);
    }

    /* ---- ABOUT ---- */
    .about-intro {
        margin-bottom: var(--space-8);
    }
    .about-intro .lede {
        max-width: 60ch;
    }

    /* avatar + bio side by side, stacking on narrow screens */
    .about-body {
        display: flex;
        align-items: center;
        gap: clamp(var(--space-4), 4vw, var(--space-8));
        margin-top: var(--space-4);
    }
    .about-body .lede {
        margin: 0;
    }
    .avatar {
        flex: 0 0 auto;
        width: clamp(120px, 26vw, 190px);
        height: auto;
        aspect-ratio: 1;
        border: var(--stroke);
        border-radius: var(--radius);
        box-shadow: var(--shadow-hard);
        background: var(--paper-raised);
    }
    @media (max-width: 560px) {
        .about-body {
            flex-direction: column;
            align-items: flex-start;
        }
    }

    .lede {
        font-size: clamp(1.05rem, 1rem + 0.5vw, 1.3rem);
        margin: var(--space-3) 0 var(--space-8);
    }
    .lede em {
        font-style: normal;
        color: var(--ember-deep);
        font-weight: 700;
    }
</style>
