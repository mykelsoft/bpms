<script lang="ts">
	import * as Table from '$ui/table';
	import { IconDotsVertical } from '@tabler/icons-svelte';
	import { Button } from '$ui/button';
	import * as DropdownMenu from '$ui/dropdown-menu';

	type BOMItem = {
		id: string;
		productPartNumber: string;
		name: string;
		description: string;
		bomLevel: string;
		partNumber: string;
		quantity: number;
		units: string;
	};

	const initialData: BOMItem[] = [
		{
			id: '1',
			productPartNumber: '1234567890',
			name: 'Product 1',
			description: 'Product 1 description',
			bomLevel: '1',
			partNumber: '1234567890',
			quantity: 1,
			units: 'pcs'
		},
		{
			id: '2',
			productPartNumber: '1234567890',
			name: 'Product 2',
			description: 'Product 2 description',
			bomLevel: '2',
			partNumber: '1234567890',
			quantity: 2,
			units: 'pcs'
		},
		{
			id: '3',
			productPartNumber: '1234567890',
			name: 'Product 3',
			description: 'Product 3 description',
			bomLevel: '3',
			partNumber: '1234567890',
			quantity: 3,
			units: 'pcs'
		},
		{
			id: '4',
			productPartNumber: '1234567890',
			name: 'Product 4',
			description: 'Product 4 description',
			bomLevel: '4',
			partNumber: '1234567890',
			quantity: 4,
			units: 'pcs'
		},
		{
			id: '5',
			productPartNumber: '1234567890',
			name: 'Product 5',
			description: 'Product 5 description',
			bomLevel: '5',
			partNumber: '1234567890',
			quantity: 5,
			units: 'pcs'
		},
		{
			id: '6',
			productPartNumber: '1234567890',
			name: 'Product 6',
			description: 'Product 6 description',
			bomLevel: '6',
			partNumber: '1234567890',
			quantity: 6,
			units: 'pcs'
		},
		{
			id: '7',
			productPartNumber: '1234567890',
			name: 'Product 7',
			description: 'Product 7 description',
			bomLevel: '7',
			partNumber: '1234567890',
			quantity: 7,
			units: 'pcs'
		}
	];
</script>

<div class="overflow-x-auto rounded-lg border">
	<Table.Root>
		<Table.Header class="bg-muted sticky top-0 z-10">
			<Table.Row>
				<Table.Head>BOM Level</Table.Head>
				<Table.Head>Item Part Number</Table.Head>
				<Table.Head>Name</Table.Head>
				<Table.Head>Quantity</Table.Head>
				<Table.Head>Units</Table.Head>
				<Table.Head class="w-24 text-center">Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body class="**:data-[slot=table-cell]:first:w-8">
			{#each initialData as item (item.id)}
				<Table.Row>
					<Table.Cell>{item.bomLevel}</Table.Cell>
					<Table.Cell>{item.description}</Table.Cell>
					<Table.Cell>{item.name}</Table.Cell>
					<Table.Cell>{item.quantity}</Table.Cell>
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
