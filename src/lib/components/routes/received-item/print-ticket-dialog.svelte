<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table/index.js';
	import { toast } from 'svelte-sonner';

	const { isOpen, onClose, items } = $props<{
		isOpen: boolean;
		onClose: () => void;
		items: any[];
	}>();

	let printRef = $state<HTMLDivElement | null>(null);

	function printRefAction(node: HTMLDivElement) {
		printRef = node;
		return {
			destroy() {
				printRef = null;
			}
		};
	}

	function handlePrint() {
		toast.success('Printing Ticket', {
			description: 'Sending 2 copies to printer...',
			action: {
				label: 'Undo',
				onClick: () => console.info('Undo')
			}
		});

		// In a real app, we would use window.print() with proper CSS
		// For this demo, we'll just simulate printing
		setTimeout(() => {
			onClose();
		}, 1000);
	}

	// Get current date in format "MM/DD/YYYY"
	function getCurrentDate() {
		const date = new Date();
		return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} (system date/time)`;
	}
</script>

<Dialog.Root open={isOpen} onOpenChange={onClose}>
	<Dialog.ScrollContent class="max-w-3xl p-0">
		<div use:printRefAction class="print-container">
			<div class="flex items-center gap-2 bg-yellow-400 p-2">
				<div class="flex h-8 w-8 items-center justify-center bg-yellow-600 font-bold text-white">2</div>
				<Dialog.Title class="font-bold text-black">Ticket Preview (will print 2 copies)</Dialog.Title>
			</div>

			<div class="m-4 border border-gray-300 p-6">
				<h2 class="mb-4 text-xl font-bold">Bestfriend Goodies Ticket</h2>

				<div class="mb-6 grid grid-cols-2 gap-4">
					<div class="flex">
						<div class="w-24 font-semibold">Date:</div>
						<div class="italic">{getCurrentDate()}</div>
					</div>
					<div class="flex">
						<div class="w-24 font-semibold">Ticket no.:</div>
						<div class="bg-gray-200 px-2 italic">(system generated)</div>
					</div>
					<div class="flex">
						<div class="w-24 font-semibold">From WH:</div>
						<div class="bg-gray-200 px-2">RECV</div>
					</div>
					<div class="flex">
						<div class="w-24 font-semibold">To WH:</div>
						<div class="bg-gray-200 px-2">W102</div>
					</div>
				</div>

				<div class="mb-2 font-semibold">Details</div>
				<Table.Root class="border-t border-b border-dotted border-gray-400">
					<Table.Header>
						<Table.Row>
							<Table.Head class="font-semibold text-black">Item No.</Table.Head>
							<Table.Head class="font-semibold text-black">Item Part number</Table.Head>
							<Table.Head class="font-semibold text-black">Description</Table.Head>
							<Table.Head class="text-right font-semibold text-black">Quantity</Table.Head>
							<Table.Head class="font-semibold text-black">Units</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each items.slice(0, 3) as item (item.id)}
							<Table.Row>
								<Table.Cell>{item.itemNo}</Table.Cell>
								<Table.Cell>{item.partNumber}</Table.Cell>
								<Table.Cell>{item.description}</Table.Cell>
								<Table.Cell class="text-right">{item.quantity}</Table.Cell>
								<Table.Cell>{item.units}</Table.Cell>
							</Table.Row>
						{/each}
						<Table.Row>
							<Table.Cell colspan={5} class="py-2">
								<div class="flex flex-col items-center">
									<div>:</div>
									<div>:</div>
									<div>n</div>
								</div>
							</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table.Root>

				<div class="mt-8 grid grid-cols-2 gap-8">
					<div>
						<div class="mb-2 font-semibold">Issued by:</div>
						<div class="h-6 border-b border-gray-400"></div>
					</div>
					<div>
						<div class="mb-2 font-semibold">Received by:</div>
						<div class="h-6 border-b border-gray-400"></div>
					</div>
				</div>

				<div class="mt-8 text-center">
					<div class="mb-2 font-semibold">Approved by:</div>
					<div class="mx-auto h-6 w-64 border-b border-gray-400"></div>
				</div>

				<div class="mt-8 flex">
					<Button onclick={handlePrint} class="flex-1 rounded-none bg-green-200 text-green-800 hover:bg-green-300">
						Print
					</Button>
					<Button onclick={onClose} variant="outline" class="flex-1 rounded-none bg-white hover:bg-gray-100">
						Cancel
					</Button>
				</div>
			</div>
		</div>
	</Dialog.ScrollContent>
</Dialog.Root>
