<script>
    /**
     * Neo-brutalist arcade button.
     * Renders an <a> when `href` is set, otherwise a <button>.
     *
     * @type {{
     *   href?: string,
     *   variant?: 'ember' | 'sky' | 'lime' | 'grape' | 'ghost',
     *   size?: 'sm' | 'md' | 'lg',
     *   type?: 'button' | 'submit',
     *   onclick?: (e: MouseEvent) => void,
     *   children: import('svelte').Snippet,
     *   [key: string]: unknown,
     * }}
     */
    let {
        href = undefined,
        variant = 'ember',
        size = 'md',
        type = 'button',
        onclick = undefined,
        children,
        ...rest
    } = $props();
</script>

<svelte:element
    this={href ? 'a' : 'button'}
    {href}
    type={href ? undefined : type}
    role={href ? undefined : 'button'}
    class="btn {variant} {size}"
    {onclick}
    {...rest}
>
    <span class="label">{@render children()}</span>
</svelte:element>

<style>
    .btn {
        --btn-bg: var(--ember);
        --btn-fg: var(--ink);

        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-2);

        font-family: var(--font-ui);
        font-weight: 700;
        line-height: 1;
        text-align: center;
        white-space: nowrap;

        color: var(--btn-fg);
        background: var(--btn-bg);
        border: var(--stroke);
        border-radius: var(--radius-sm);
        box-shadow: var(--shadow-hard);

        cursor: pointer;
        user-select: none;
        transition:
            transform 120ms var(--ease-pop),
            box-shadow 120ms var(--ease-pop),
            background 120ms ease;
    }

    /* Sizes */
    .sm { padding: 0.4rem 0.8rem;  font-size: 0.9rem; }
    .md { padding: 0.65rem 1.15rem; font-size: 1.05rem; }
    .lg { padding: 0.9rem 1.6rem;   font-size: 1.25rem; }

    /* Variants */
    .ember { --btn-bg: var(--ember); }
    .sky   { --btn-bg: var(--sky);   color: #fff; }
    .lime  { --btn-bg: var(--lime);  color: #fff; }
    .grape { --btn-bg: var(--grape); color: #fff; }
    .ghost {
        --btn-bg: var(--paper-raised);
        box-shadow: var(--shadow-hard);
    }

    /* Hover: lift up + push shadow out */
    .btn:hover {
        transform: translate(-2px, -2px);
        box-shadow: var(--shadow-hard-lg);
    }

    /* Active: slam down into the page, shadow collapses */
    .btn:active {
        transform: translate(4px, 4px);
        box-shadow: 0 0 0 var(--ink);
    }

    /* The label can wiggle independently on hover for arcade feel */
    .btn:hover .label {
        animation: wiggle 320ms ease-in-out infinite;
    }

    @keyframes wiggle {
        0%, 100% { transform: rotate(-1.5deg); }
        50%      { transform: rotate(1.5deg); }
    }
</style>
