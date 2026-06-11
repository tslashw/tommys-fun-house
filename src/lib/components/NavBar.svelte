<header class="bar">
    <nav class="shell inner">
        <a class="brand font-display" href="/">Tommy's Fun House</a>
    </nav>
</header>

<style>
    .bar {
        background: var(--ink);
        border-bottom: var(--stroke);
    }

    .inner {
        display: flex;
        align-items: center;
        padding-block: var(--space-3);
    }

    /* Match the footer signature styling */
    .brand {
        font-size: clamp(1.7rem, 1.4rem + 1.2vw, 2.4rem);
        color: var(--ember);
        white-space: nowrap;
    }
</style>
