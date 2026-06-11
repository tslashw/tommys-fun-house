<script>
    /**
     * Renders a Lucide device icon for one supported device.
     * @type {{ device: 'desktop' | 'mobile' }}
     */
    let { device } = $props();

    const labels = { desktop: 'Desktop', mobile: 'Mobile' };
</script>

<span class="device-icon" role="img" aria-label={labels[device] ?? device} title={labels[device] ?? device}>
    {#if device === 'desktop'}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect width="20" height="14" x="2" y="3" rx="2" />
            <line x1="8" x2="16" y1="21" y2="21" />
            <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
    {:else if device === 'mobile'}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
            <path d="M12 18h.01" />
        </svg>
    {/if}
</span>

<style>
    .device-icon {
        display: inline-flex;
    }
    svg {
        width: 1.2rem;
        height: 1.2rem;
    }
</style>
