<script>
    import DeviceIcon from './DeviceIcon.svelte';

    /**
     * A project / game tile. The whole card is the link.
     *
     * @type {{
     *   href: string,
     *   title: string,
     *   blurb?: string,
     *   devices?: ('desktop' | 'mobile')[],
     * }}
     */
    let { href, title, blurb = '', devices = [] } = $props();

    const external = $derived(/^https?:/.test(href));

    // Render in a consistent order regardless of how they're listed.
    const order = ['desktop', 'mobile'];
    const sortedDevices = $derived(
        [...devices].sort((a, b) => order.indexOf(a) - order.indexOf(b))
    );
</script>

<a
    class="card"
    {href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
>
    <h3 class="title">{title}</h3>
    {#if blurb}
        <p class="blurb">{blurb}</p>
    {/if}

    {#if sortedDevices.length}
        <div class="devices" aria-label="Supported devices">
            {#each sortedDevices as device (device)}
                <DeviceIcon {device} />
            {/each}
        </div>
    {/if}
</a>

<style>
    .card {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        aspect-ratio: 2 / 3;
        padding: var(--space-4);
        background: var(--paper-raised);
        border: var(--stroke);
        border-radius: var(--radius);
        box-shadow: var(--shadow-hard);

        transition:
            transform 160ms var(--ease-pop),
            box-shadow 160ms var(--ease-pop);
    }

    .title {
        font-family: var(--font-heading);
        font-size: clamp(1.4rem, 1.1rem + 1.4vw, 1.9rem);
        color: var(--ink);
    }

    .blurb {
        margin: 0;
        font-size: 0.95rem;
        opacity: 0.85;
    }

    /* Supported-device icons, pinned to the bottom of the card */
    .devices {
        display: flex;
        gap: var(--space-2);
        margin-top: auto;
        padding-top: var(--space-4);
        color: var(--ink);
        opacity: 0.65;
    }

    /* Hover lift — pointer devices only, so touch doesn't stick in hover. */
    @media (hover: hover) {
        .card:hover {
            transform: translate(-3px, -3px);
            box-shadow: var(--shadow-hard-xl);
        }
    }

    .card:active {
        transform: translate(2px, 2px);
        box-shadow: var(--shadow-hard);
    }
</style>
