<script lang="ts">
	import * as Table from '$ui/table';
	import { IconDotsVertical } from '@tabler/icons-svelte';
	import { Button } from '$ui/button';
	import * as DropdownMenu from '$ui/dropdown-menu';

	type InventoryItem = {
		id: string;
		createdBy: string;
		status: string;
	};

	const initialData: InventoryItem[] = [
		{
			id: '1',
			createdBy: 'John Doe',
			status: 'Pending'
		},
		{
			id: '2',
			createdBy: 'Jane Smith',
			status: 'Approved'
		},
		{
			id: '3',
			createdBy: 'Mike Johnson',
			status: 'Rejected'
		},
		{
			id: '4',
			createdBy: 'Sarah Wilson',
			status: 'Pending'
		},
		{
			id: '5',
			createdBy: 'David Brown',
			status: 'Approved'
		},
		{
			id: '6',
			createdBy: 'Lisa Anderson',
			status: 'Pending'
		},
		{
			id: '7',
			createdBy: 'Tom Harris',
			status: 'Approved'
		}
	];
</script>

<div class="overflow-x-auto rounded-lg border">
	<Table.Root>
		<Table.Header class="bg-muted sticky top-0 z-10">
			<Table.Row>
				<Table.Head class="w-3xs text-center">Transaction ID</Table.Head>
				<Table.Head>Created By</Table.Head>
				<Table.Head>Status</Table.Head>
				<Table.Head class="w-24 text-center">Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body class="**:data-[slot=table-cell]:first:w-8">
			{#each initialData as item (item.id)}
				<Table.Row>
					<Table.Cell class="text-center">{item.id}</Table.Cell>
					<Table.Cell>{item.createdBy}</Table.Cell>
					<Table.Cell>{item.status}</Table.Cell>
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
									<DropdownMenu.Item>View</DropdownMenu.Item>
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
