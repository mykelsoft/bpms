<script lang="ts">
	import { Button } from '$ui/button';
	import { IconPlus } from '@tabler/icons-svelte';
	import WarehouseTable from '$routeComponents/warehouse/table.svelte';
	import AddWarehouseDialog from '$routeComponents/warehouse/add-warehouse-dialog.svelte';
	import type { PageData } from './$types.js';

	let { data }: { data: PageData } = $props();
	let isAddWarehouseOpen = $state(false);
</script>

<div class="px-4 lg:px-6">
	<div class="mb-4 flex items-center justify-end gap-2">
		<Button variant="outline" size="sm" onclick={() => (isAddWarehouseOpen = !isAddWarehouseOpen)}>
			<IconPlus />
			<span class="hidden lg:inline">Add New Entry</span>
		</Button>
	</div>

	<WarehouseTable />
	<AddWarehouseDialog {data} isOpen={isAddWarehouseOpen} onClose={() => (isAddWarehouseOpen = false)} />
</div>
