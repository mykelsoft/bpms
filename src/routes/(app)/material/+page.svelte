<script lang="ts">
	import { Button } from '$ui/button';
	import { IconPlus } from '@tabler/icons-svelte';
	import MaterialTable from '$routeComponents/material/table.svelte';
	import AddMaterialDialog from '$routeComponents/material/add-material-dialog.svelte';
	import type { PageData } from './$types.js';
	import { setPageTitle } from '$lib/context';

	let { data }: { data: PageData } = $props();

	let isAddMaterialOpen = $state(false);

	$effect(() => {
		setPageTitle('Material');
	});
</script>

<div class="px-4 lg:px-6">
	<div class="mb-4 flex items-center justify-end gap-2">
		<Button variant="outline" size="sm" onclick={() => (isAddMaterialOpen = !isAddMaterialOpen)}>
			<IconPlus />
			<span class="hidden lg:inline">Add New Material</span>
		</Button>
	</div>

	<MaterialTable />
	<AddMaterialDialog {data} isOpen={isAddMaterialOpen} onClose={() => (isAddMaterialOpen = false)} />
</div>
