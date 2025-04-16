<script lang="ts">
	import { Button } from '$ui/button';
	import { IconPlus } from '@tabler/icons-svelte';
	import BOMTable from '$routeComponents/bom/table.svelte';
	import AddBOMDialog from '$routeComponents/bom/add-bom-dialog.svelte';
	import type { PageData } from './$types.js';
	import { setPageTitle } from '$lib/context';

	let { data }: { data: PageData } = $props();

	let isAddBOMOpen = $state(false);

	$effect(() => {
		setPageTitle('Bills of Material');
	});
</script>

<div class="px-4 lg:px-6">
	<div class="mb-4 flex items-center justify-end gap-2">
		<Button variant="outline" size="sm" onclick={() => (isAddBOMOpen = !isAddBOMOpen)}>
			<IconPlus />
			<span class="hidden lg:inline">Add New BOM</span>
		</Button>
	</div>

	<BOMTable />
	<AddBOMDialog {data} isOpen={isAddBOMOpen} onClose={() => (isAddBOMOpen = false)} />
</div>
