<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import { IconDotsVertical } from '@tabler/icons-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

	type InventoryItem = {
		id: string;
		itemNo: number;
		partNumber: string;
		description: string;
		quantity: number;
		units: string;
	};

	const initialData: InventoryItem[] = [
		{
			id: '1',
			itemNo: 1,
			partNumber: 'NT.SWTPO.011',
			description: 'sweet potato, cubed',
			quantity: 200,
			units: 'Kg'
		},
		{
			id: '2',
			itemNo: 2,
			partNumber: 'PR.FISH1.001',
			description: 'fish sauce',
			quantity: 0.75,
			units: 'L'
		},
		{
			id: '3',
			itemNo: 3,
			partNumber: 'VG.ONION.002',
			description: 'red onion, diced',
			quantity: 5,
			units: 'Kg'
		},
		{
			id: '4',
			itemNo: 4,
			partNumber: 'SP.CHILI.003',
			description: 'chili powder',
			quantity: 0.5,
			units: 'Kg'
		},
		{
			id: '5',
			itemNo: 5,
			partNumber: 'GR.RICE1.001',
			description: 'jasmine rice',
			quantity: 25,
			units: 'Kg'
		},
		{
			id: '6',
			itemNo: 6,
			partNumber: 'MT.CHICK.002',
			description: 'chicken breast, sliced',
			quantity: 10,
			units: 'Kg'
		},
		{
			id: '7',
			itemNo: 7,
			partNumber: 'VG.GARLI.001',
			description: 'garlic, minced',
			quantity: 1,
			units: 'Kg'
		}
	];
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
			{#each initialData as item (item.id)}
				<Table.Row>
					<Table.Cell class="text-center">{item.itemNo}</Table.Cell>
					<Table.Cell>{item.partNumber}</Table.Cell>
					<Table.Cell>{item.description}</Table.Cell>
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
