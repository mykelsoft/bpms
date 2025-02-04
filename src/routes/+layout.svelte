<script lang="ts">
	import '../app.postcss';

	let { children } = $props();
</script>

{#if children}
	{@render children()}
{:else}
	<p>fallback content</p>
{/if}
