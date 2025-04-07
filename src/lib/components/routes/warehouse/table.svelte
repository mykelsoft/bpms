<script lang="ts">
	import * as Table from '$ui/table';
	import { IconDotsVertical } from '@tabler/icons-svelte';
	import { Button } from '$ui/button';
	import * as DropdownMenu from '$ui/dropdown-menu';

	type ProductItem = {
		id: string;
		warehouseCode: string;
		warehouseName: string;
	};

	const initialData: ProductItem[] = [
		{
			id: '1',
			warehouseCode: 'WH001',
			warehouseName: 'Main Storage'
		},
		{
			id: '2',
			warehouseCode: 'WH002',
			warehouseName: 'Distribution Center'
		},
		{
			id: '3',
			warehouseCode: 'WH003',
			warehouseName: 'Cold Storage'
		},
		{
			id: '4',
			warehouseCode: 'WH004',
			warehouseName: 'Dry Storage'
		},
		{
			id: '5',
			warehouseCode: 'WH005',
			warehouseName: 'Processing Center'
		},
		{
			id: '6',
			warehouseCode: 'WH006',
			warehouseName: 'Packaging Center'
		},
		{
			id: '7',
			warehouseCode: 'WH007',
			warehouseName: 'Quality Control'
		}
	];
</script>

<div class="overflow-x-auto rounded-lg border">
	<Table.Root>
		<Table.Header class="bg-muted sticky top-0 z-10">
			<Table.Row>
				<Table.Head>Warehouse Code</Table.Head>
				<Table.Head>WarehouseName</Table.Head>
				<Table.Head class="w-24 text-center">Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body class="**:data-[slot=table-cell]:first:w-8">
			{#each initialData as item (item.id)}
				<Table.Row>
					<Table.Cell>{item.warehouseCode}</Table.Cell>
					<Table.Cell>{item.warehouseName}</Table.Cell>
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
									<DropdownMenu.Item>Edit</DropdownMenu.Item>
									<DropdownMenu.Item>Print</DropdownMenu.Item>
									<DropdownMenu.Separator />
									<DropdownMenu.Item variant="destructive">Delete</DropdownMenu.Item>
								</DropdownMenu.Group>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
