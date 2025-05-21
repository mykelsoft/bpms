<script lang="ts">
	import { Button } from '$ui/button';
	import { IconPlus, IconPrinter } from '@tabler/icons-svelte';
	import TicketTable from '$routeComponents/ticket/ticket-table.svelte';
	import AddEntryForm from '$routeComponents/ticket/add-entry-form.svelte';
	import PrintTicketDialog from '$routeComponents/ticket/print-ticket-dialog.svelte';
	import { setPageTitle } from '$lib/context';

	let isAddEntryOpen = $state(false);
	let isPrintTicketOpen = $state(false);

	$effect(() => {
		setPageTitle('Ticket');
	});
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

	<TicketTable />
	<AddEntryForm isOpen={isAddEntryOpen} onClose={() => (isAddEntryOpen = false)} />
	<PrintTicketDialog isOpen={isPrintTicketOpen} onClose={() => (isPrintTicketOpen = false)} />
</div>
