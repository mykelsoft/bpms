<script lang="ts">
	import { inventoryStore } from '$lib/stores/inventory';
	import * as Table from '$ui/table';
	import { IconDotsVertical } from '@tabler/icons-svelte';
	import { Button } from '$ui/button';
	import * as DropdownMenu from '$ui/dropdown-menu';
	import { Input } from '$ui/input';

	const items = $derived($inventoryStore);
	let editingId: string | null = $state(null);
	let editQuantity = $state('');

	function handleEdit(item: (typeof items)[0]) {
		editingId = item.id;
		editQuantity = item.quantity.toString();
	}

	function handleSave(item: (typeof items)[0]) {
		const newQuantity = parseFloat(editQuantity);
		if (!isNaN(newQuantity) && newQuantity >= 0) {
			inventoryStore.updateItem(item.id, { quantity: newQuantity });
		}
		editingId = null;
		editQuantity = '';
	}

	function handleDelete(id: string) {
		inventoryStore.removeItem(id);
	}
</script>

<div class="overflow-x-auto rounded-lg border">
	<Table.Root>
		<Table.Header class="bg-muted sticky top-0 z-10">
			<Table.Row>
				<Table.Head class="w-[100px] text-center">Item No.</Table.Head>
				<Table.Head>Item Part Number</Table.Head>
				<Table.Head>Description</Table.Head>
				<Table.Head>Quantity</Table.Head>
				<Table.Head>Units</Table.Head>
				<Table.Head class="w-24 text-center">Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body class="**:data-[slot=table-cell]:first:w-8">
			{#each items as item (item.id)}
				<Table.Row>
					<Table.Cell class="text-center">{item.itemNo}</Table.Cell>
					<Table.Cell>{item.partNumber}</Table.Cell>
					<Table.Cell>{item.description}</Table.Cell>
					<Table.Cell>
						{#if editingId === item.id}
							<div class="flex items-center gap-2">
								<Input type="number" step="0.01" bind:value={editQuantity} class="w-24" />
								<Button variant="outline" size="sm" class="h-[36px]" onclick={() => handleSave(item)}>
									Save
								</Button>
							</div>
						{:else}
							{item.quantity}
						{/if}
					</Table.Cell>
					<Table.Cell>{item.units}</Table.Cell>
					<Table.Cell class="text-center">
						<DropdownMenu.Root>
							<DropdownMenu.Trigger class="data-[state=open]:bg-muted rounded-md">
								<Button variant="ghost" class="text-muted-foreground flex size-8" size="icon">
									<IconDotsVertical />
									<span class="sr-only">Open menu</span>
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content align="end" class="w-32">
								<DropdownMenu.Group>
									<DropdownMenu.Item onclick={() => handleEdit(item)}>Edit</DropdownMenu.Item>
									<DropdownMenu.Separator />
									<DropdownMenu.Item variant="destructive" onclick={() => handleDelete(item.id)}
										>Delete</DropdownMenu.Item>
								</DropdownMenu.Group>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
