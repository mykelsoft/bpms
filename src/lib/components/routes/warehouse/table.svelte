<script lang="ts">
	import * as Table from '$ui/table';
	import { IconDotsVertical } from '@tabler/icons-svelte';
	import { Button } from '$ui/button';
	import * as DropdownMenu from '$ui/dropdown-menu';
	import { warehouseApi, type Warehouse, type UpdateWarehouseInput, type DeleteWarehouseInput } from '$lib/api/warehouse';
	import { Input } from '$ui/input';
	import { createQuery, createMutation } from '@tanstack/svelte-query';
	import { queryClient } from '$lib/helper/query-client';

	let { data }: { data: { accessToken: string } } = $props();

	let editingId: string | null = $state(null);
	let editForm = $state({
		code: '',
		name: ''
	});
	let deleteDialogOpen = $state(false);
	let warehouseToDelete: Warehouse | null = $state(null);

	function handleEdit(warehouse: Warehouse) {
		editingId = warehouse.id;
		editForm = {
			code: warehouse.code,
			name: warehouse.name
		};
	}

	function handleCancel() {
		editingId = null;
	}

	function handleDeleteClick(warehouse: Warehouse) {
		warehouseToDelete = warehouse;
		deleteDialogOpen = true;
	}

	async function handleDelete() {
		if (!warehouseToDelete) return;

		try {
			// await warehouseApi.delete(warehouseToDelete.id);
			deleteDialogOpen = false;
			warehouseToDelete = null;
		} catch (e) {
			console.error(e);
		}
	}

	const warehouseQuery = createQuery({
		queryKey: ['warehouses'],
		queryFn: () => warehouseApi(data.accessToken ?? '').list()
	});

	const updateWarehouseMutation = createMutation({
		mutationFn: (input: UpdateWarehouseInput) => {
			editingId = null;
			return warehouseApi(data.accessToken ?? '').update(input);
		},
		onSuccess: () => {
			$warehouseQuery.refetch();
		},
		onMutate: (input) => {
			console.log('mutate', input);
		}
	});

	const deleteWarehouseMutation = createMutation({
		mutationFn: (id: string) => {
			return warehouseApi(data.accessToken ?? '').delete(id);
		},
		onSuccess: () => {
			console.log('update');
			$warehouseQuery.refetch();
		}
	});
</script>

<div class="overflow-x-auto rounded-lg border">
	<Table.Root>
		<Table.Header class="bg-muted sticky top-0 z-10">
			<Table.Row>
				<Table.Head>Warehouse Code</Table.Head>
				<Table.Head>Warehouse Name</Table.Head>
				<Table.Head class="w-24 text-center">Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body class="**:data-[slot=table-cell]:first:w-8">
			{#if $warehouseQuery.isPending}
				<Table.Row>
					<Table.Cell colspan={3} class="text-center">Loading warehouses...</Table.Cell>
				</Table.Row>
			{/if}
			{#if $warehouseQuery.isSuccess}
				{#each $warehouseQuery.data as warehouse (warehouse.id)}
					<Table.Row>
						<Table.Cell>
							{#if editingId === warehouse.id}
								<Input bind:value={editForm.code} class="w-full" placeholder="Enter warehouse code" />
							{:else}
								{warehouse.code}
							{/if}
						</Table.Cell>
						<Table.Cell>
							{#if editingId === warehouse.id}
								<Input bind:value={editForm.name} class="w-full" placeholder="Enter warehouse name" />
							{:else}
								{warehouse.name}
							{/if}
						</Table.Cell>
						<Table.Cell class="text-center">
							{#if editingId === warehouse.id}
								<div class="flex justify-center gap-2">
									<Button
										variant="outline"
										size="sm"
										onclick={() => {
											$updateWarehouseMutation.mutate({
												id: warehouse.id,
												code: editForm.code,
												name: editForm.name
											});
										}}>Save</Button>
									<Button variant="ghost" size="sm" onclick={handleCancel}>Cancel</Button>
								</div>
							{:else}
								<DropdownMenu.Root>
									<DropdownMenu.Trigger class="data-[state=open]:bg-muted rounded-md">
										<Button variant="ghost" class="text-muted-foreground flex size-8" size="icon">
											<IconDotsVertical />
											<span class="sr-only">Open menu</span>
										</Button>
									</DropdownMenu.Trigger>
									<DropdownMenu.Content align="end" class="w-32">
										<DropdownMenu.Group>
											<DropdownMenu.Item onclick={() => handleEdit(warehouse)}>Edit</DropdownMenu.Item>
											<DropdownMenu.Item>Print</DropdownMenu.Item>
											<DropdownMenu.Separator />
											<DropdownMenu.Item
												variant="destructive"
												onclick={() => $deleteWarehouseMutation.mutate(warehouse.id)}>
												Delete
											</DropdownMenu.Item>
										</DropdownMenu.Group>
									</DropdownMenu.Content>
								</DropdownMenu.Root>
							{/if}
						</Table.Cell>
					</Table.Row>
				{/each}
				{#if $warehouseQuery.isFetching}
					<Table.Row>
						<Table.Cell colspan={3} class="text-center">Background Updating...</Table.Cell>
					</Table.Row>
				{/if}
			{/if}
			{#if $warehouseQuery.error}
				<Table.Row>
					<Table.Cell colspan={3} class="text-center">
						{$warehouseQuery.error.message}
					</Table.Cell>
				</Table.Row>
			{/if}
			{#if $warehouseQuery.isError}
				<Table.Row>
					<Table.Cell colspan={3} class="text-center">
						{$warehouseQuery.error.message}
					</Table.Cell>
				</Table.Row>
			{/if}
		</Table.Body>
	</Table.Root>
</div>
