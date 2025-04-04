<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import SiteHeader from '$lib/components/site-header.svelte';

	let { children } = $props();

	import '../../theme.postcss';
</script>

<Sidebar.Provider style="--sidebar-width: calc(var(--spacing) * 72)">
	<AppSidebar variant="inset" />
	<Sidebar.Inset>
		<SiteHeader />
		<div class="flex flex-1 flex-col">{@render children?.()}</div>
	</Sidebar.Inset>
</Sidebar.Provider>
