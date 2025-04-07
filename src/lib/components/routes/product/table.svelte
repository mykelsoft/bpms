<script lang="ts">
	import * as Table from '$ui/table';
	import { IconDotsVertical } from '@tabler/icons-svelte';
	import { Button } from '$ui/button';
	import * as DropdownMenu from '$ui/dropdown-menu';

	type ProductItem = {
		id: string;
		partNumber: string;
		productName: string;
		description: string;
	};

	const initialData: ProductItem[] = [
		{
			id: '1',
			partNumber: 'NT.SWTPO.011',
			productName: 'sweet potato, cubed',
			description: 'Fresh Produce'
		},
		{
			id: '2',
			partNumber: 'PR.FISH1.001',
			productName: 'fish sauce',
			description: 'Premium'
		},
		{
			id: '3',
			partNumber: 'VG.ONION.002',
			productName: 'red onion, diced',
			description: 'Fresh Produce'
		},
		{
			id: '4',
			partNumber: 'SP.CHILI.003',
			productName: 'chili powder',
			description: 'Spice Master'
		},
		{
			id: '5',
			partNumber: 'GR.RICE1.001',
			productName: 'jasmine rice',
			description: 'Golden Grain'
		},
		{
			id: '6',
			partNumber: 'MT.CHICK.002',
			productName: 'chicken breast, sliced',
			description: 'Fresh Poultry'
		},
		{
			id: '7',
			partNumber: 'VG.GARLI.001',
			productName: 'garlic, minced',
			description: 'Fresh Produce'
		}
	];
</script>

<div class="overflow-x-auto rounded-lg border">
	<Table.Root>
		<Table.Header class="bg-muted sticky top-0 z-10">
			<Table.Row>
				<Table.Head>Part Number</Table.Head>
				<Table.Head>Product Name</Table.Head>
				<Table.Head>Description</Table.Head>
				<Table.Head class="w-24 text-center">Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body class="**:data-[slot=table-cell]:first:w-8">
			{#each initialData as item (item.id)}
				<Table.Row>
					<Table.Cell>{item.partNumber}</Table.Cell>
					<Table.Cell>{item.productName}</Table.Cell>
					<Table.Cell>{item.description}</Table.Cell>
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
