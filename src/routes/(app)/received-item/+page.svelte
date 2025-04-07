<script lang="ts">
	import { Button } from '$ui/button';
	import { IconPlus, IconPrinter } from '@tabler/icons-svelte';
	import InventoryTable from '$components/inventory-table.svelte';
	import AddEntryForm from '$routeComponents/received-item/add-entry-form.svelte';
	import PrintTicketDialog from '$routeComponents/received-item/print-ticket-dialog.svelte';

	let isAddEntryOpen = $state(false);
	let isPrintTicketOpen = $state(false);
</script>

<div class="px-4 lg:px-6">
	<div class="mb-4 flex items-center justify-end gap-2">
		<Button variant="outline" size="sm" onclick={() => (isAddEntryOpen = !isAddEntryOpen)}>
			<IconPlus />
			<span class="hidden lg:inline">Add New Entry</span>
		</Button>

		<Button size="sm" onclick={() => (isPrintTicketOpen = !isPrintTicketOpen)}>
			<IconPrinter />
			<span class="hidden lg:inline">Print Ticket</span>
		</Button>
	</div>

	<InventoryTable />
	<AddEntryForm isOpen={isAddEntryOpen} onClose={() => (isAddEntryOpen = false)} onSubmit={() => {}} />
	<PrintTicketDialog isOpen={isPrintTicketOpen} onClose={() => (isPrintTicketOpen = false)} />
</div>
