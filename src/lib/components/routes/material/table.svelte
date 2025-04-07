<script lang="ts">
	import * as Table from '$ui/table';
	import { IconDotsVertical } from '@tabler/icons-svelte';
	import { Button } from '$ui/button';
	import * as DropdownMenu from '$ui/dropdown-menu';

	type MaterialItem = {
		id: string;
		partNumber: string;
		description: string;
		brand: string;
	};

	const initialData: MaterialItem[] = [
		{
			id: '1',
			partNumber: 'NT.SWTPO.011',
			description: 'sweet potato, cubed',
			brand: 'Fresh Produce'
		},
		{
			id: '2',
			partNumber: 'PR.FISH1.001',
			description: 'fish sauce',
			brand: 'Premium'
		},
		{
			id: '3',
			partNumber: 'VG.ONION.002',
			description: 'red onion, diced',
			brand: 'Fresh Produce'
		},
		{
			id: '4',
			partNumber: 'SP.CHILI.003',
			description: 'chili powder',
			brand: 'Spice Master'
		},
		{
			id: '5',
			partNumber: 'GR.RICE1.001',
			description: 'jasmine rice',
			brand: 'Golden Grain'
		},
		{
			id: '6',
			partNumber: 'MT.CHICK.002',
			description: 'chicken breast, sliced',
			brand: 'Fresh Poultry'
		},
		{
			id: '7',
			partNumber: 'VG.GARLI.001',
			description: 'garlic, minced',
			brand: 'Fresh Produce'
		}
	];
</script>

<div class="overflow-x-auto rounded-lg border">
	<Table.Root>
		<Table.Header class="bg-muted sticky top-0 z-10">
			<Table.Row>
				<Table.Head>Part Number</Table.Head>
				<Table.Head>Description</Table.Head>
				<Table.Head>Brand</Table.Head>
				<Table.Head class="w-24 text-center">Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body class="**:data-[slot=table-cell]:first:w-8">
			{#each initialData as item (item.id)}
				<Table.Row>
					<Table.Cell>{item.partNumber}</Table.Cell>
					<Table.Cell>{item.description}</Table.Cell>
					<Table.Cell>{item.brand}</Table.Cell>
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
