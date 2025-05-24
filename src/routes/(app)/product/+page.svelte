<script lang="ts">
	import { Button } from '$ui/button';
	import { IconPlus } from '@tabler/icons-svelte';
	import ProductTable from '$routeComponents/product/table.svelte';
	import AddProductDialog from '$routeComponents/product/add-product-dialog.svelte';
	import type { PageData } from './$types.js';

	let { data }: { data: PageData } = $props();
	let isAddProductOpen = $state(false);
</script>

<svelte:head>
	<title>Product</title>
</svelte:head>

<div class="px-4 lg:px-6">
	<div class="mb-4 flex items-center justify-end gap-2">
		<Button variant="outline" size="sm" onclick={() => (isAddProductOpen = !isAddProductOpen)}>
			<IconPlus />
			<span class="hidden lg:inline">Add New Entry</span>
		</Button>
	</div>

	<ProductTable />
	<AddProductDialog {data} isOpen={isAddProductOpen} onClose={() => (isAddProductOpen = false)} />
</div>
