<script lang="ts">
	import '../../theme.postcss';

	import * as Sidebar from '$ui/sidebar';
	import AppSidebar from '$components/app-sidebar.svelte';
	import SiteHeader from '$components/site-header.svelte';
	import { Toaster } from '$ui/sonner';
	import { getPageTitle } from '$lib/context';

	let { children } = $props();

	const title = getPageTitle();
</script>

<Sidebar.Provider style="--sidebar-width: calc(var(--spacing) * 72)">
	<AppSidebar variant="inset" />
	<Sidebar.Inset>
		<SiteHeader title={$title} />
		<div class="flex flex-1 flex-col">
			<div class="@container/main flex flex-1 flex-col gap-2">
				<div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					{@render children?.()}
				</div>
			</div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>

<Toaster />
