<script lang="ts">
	import { Button } from '$ui/button';
	import { IconPlus } from '@tabler/icons-svelte';
	import type { PageData } from './$types.js';
	import WarehouseTable from '$routeComponents/warehouse/table.svelte';

	let { data }: { data: PageData } = $props();

	let isAddWarehouseOpen = $state(false);

	let LazyAddWarehouseDialog = import('$routeComponents/warehouse/add-warehouse-dialog.svelte');
</script>

<svelte:head>
	<title>Warehouse</title>
</svelte:head>

<div class="px-4 lg:px-6">
	<div class="mb-4 flex items-center justify-end gap-2">
		<Button variant="outline" size="sm" onclick={() => (isAddWarehouseOpen = !isAddWarehouseOpen)}>
			<IconPlus />
			<span class="hidden lg:inline">Add New Entry</span>
		</Button>
	</div>

	<WarehouseTable data={{ accessToken: data.accessToken ?? '' }} />

	{#if LazyAddWarehouseDialog}
		{#await LazyAddWarehouseDialog then { default: LazyAddWarehouseDialog }}
			<LazyAddWarehouseDialog {data} isOpen={isAddWarehouseOpen} onClose={() => (isAddWarehouseOpen = false)} />
		{/await}
	{/if}
</div>
