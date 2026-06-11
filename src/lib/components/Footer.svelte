<script>
    const year = new Date().getFullYear();
</script>

<footer class="foot">
    <div class="shell inner">
        <span class="sig font-display">Tommy's Fun House</span>
        <span class="meta">Built for fun · {year}</span>
    </div>
</footer>

<style>
    .foot {
        margin-top: var(--space-16);
        border-top: var(--stroke);
        background: var(--ink);
        color: var(--paper);
    }

    .inner {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        justify-content: space-between;
        gap: var(--space-2);
        padding-block: var(--space-6);
    }

    .sig {
        font-size: 1.4rem;
        color: var(--ember);
    }

    .meta {
        font-size: 0.85rem;
        opacity: 0.75;
    }
</style>
