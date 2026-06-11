<script>
    /**
     * Pixelout heading combining a thick 3D extrusion with the per-letter
     * wave + glowing shadow-dance ported from the Blackjack Tycoon splash.
     *
     * The shadow is applied directly to each letter span with literal
     * values (no var(), color-mix or custom properties) so it renders
     * reliably in Safari, which is fragile about animating/inheriting
     * text-shadow built from custom properties.
     *
     * @type {{ text: string, tag?: string }}
     */
    let { text, tag = 'h2' } = $props();

    function getWordGroups(t) {
        const totalLetters = t.replace(/ /g, '').length || 1;
        let globalIndex = 0;
        return t.split(' ').map((word) =>
            word.split('').map((char) => ({
                char,
                delay: (globalIndex++ / totalLetters).toFixed(2),
            }))
        );
    }
</script>

<svelte:element
    this={tag}
    class="wavy-title wave-text font-display"
    aria-label={text}
>
    {#each getWordGroups(text) as word}
        <span class="word" aria-hidden="true">
            {#each word as { char, delay }}
                <span class="letter" style="animation-delay: {delay}s">{char}</span>
            {/each}
        </span>
    {/each}
</svelte:element>

<style>
    .wavy-title {
        color: var(--ember); /* orange front face */
        font-size: clamp(1.8rem, 1.3rem + 2vw, 2.8rem);
        margin: 0;
        padding: 0;
        letter-spacing: 0.2em;
        display: flex;
        flex-wrap: wrap;
        gap: 0.35em;
    }

    .word {
        display: inline-flex;
    }

    /* The 3D extrusion (yellow -> black) lives on the letter itself.
       Resting state, also used when animation is disabled. */
    .letter {
        display: inline-block;
        text-shadow:
            1px 1px 0 #ffc83d,
            2px 2px 0 #ffc83d,
            3px 3px 0 #ffc83d,
            4px 4px 0 #ffc83d,
            5px 5px 0 #a4802b,
            6px 6px 0 #6b5320,
            7px 7px 0 #1c1410,
            8px 8px 0 #1c1410,
            4px 4px 12px #ff6a1a;
        animation: letter-dance 2s ease-in-out infinite;
    }

    /* Bounce + glow on each letter. The extrusion stays put while the
       last (blurred) shadow grows and shifts orange -> yellow. */
    @keyframes letter-dance {
        0%, 100% {
            transform: translateY(0);
            text-shadow:
                1px 1px 0 #ffc83d,
                2px 2px 0 #ffc83d,
                3px 3px 0 #ffc83d,
                4px 4px 0 #ffc83d,
                5px 5px 0 #a4802b,
                6px 6px 0 #6b5320,
                7px 7px 0 #1c1410,
                8px 8px 0 #1c1410,
                4px 4px 12px #ff6a1a;
        }
        50% {
            transform: translateY(-10px);
            text-shadow:
                1px 1px 0 #ffc83d,
                2px 2px 0 #ffc83d,
                3px 3px 0 #ffc83d,
                4px 4px 0 #ffc83d,
                5px 5px 0 #a4802b,
                6px 6px 0 #6b5320,
                7px 7px 0 #1c1410,
                8px 8px 0 #1c1410,
                10px 10px 28px #ffc83d;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .letter {
            animation: none;
        }
    }
</style>
