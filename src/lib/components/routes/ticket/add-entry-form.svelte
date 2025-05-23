<script lang="ts">
	import { CalendarIcon, InfoIcon } from 'lucide-svelte';
	import { z } from 'zod';

	// UI Components
	import { Button } from '$ui/button';
	import * as Dialog from '$ui/dialog';
	import { Input } from '$ui/input';
	import * as Select from '$ui/select';
	import * as Tooltip from '$ui/tooltip';
	import * as Card from '$ui/card';
	import InventoryTable from '$lib/components/inventory-table.svelte';
	import { inventoryStore } from '$lib/stores/inventory';
	import type { InventoryItem, Units } from '$lib/types';

	// Props
	const { isOpen, onClose } = $props<{
		isOpen: boolean;
		onClose: () => void;
	}>();

	const formSchema = z.object({
		partNumber: z.string().min(1, 'Part number is required'),
		description: z.string().min(1, 'Description is required'),
		quantity: z.number().min(0.01, 'Quantity must be greater than 0'),
		units: z.string().min(1, 'Units is required')
	});

	const entryTypes = [
		{ value: 'transfer-entry', label: 'Transfer Entry' },
		{ value: 'received-entry', label: 'Received Entry' }
	];

	const destinationWarehouses = [
		{ value: 'W102', label: 'W102 - Main Storage' },
		{ value: 'W103', label: 'W103 - Distribution Center' }
	];

	const receivingWarehouses = [
		{ value: 'W101', label: 'W101 - Receiving Area' },
		{ value: 'W102', label: 'W102 - Main Storage' }
	];

	let value = $state('transfer-entry');
	let fromWarehouse = $state('');
	let toWarehouse = $state('');
	let partNumber = $state('');
	let description = $state('');
	let quantity = $state<number>(0);
	let units = $state('');
	let errors = $state<Record<string, string>>({});

	const triggerContent = $derived(entryTypes.find((f) => f.value === value)?.label ?? 'Select a entry type');
	const availableDestinations = $derived(value === 'transfer-entry' ? destinationWarehouses : receivingWarehouses);

	$effect(() => {
		if (value === 'transfer-entry') {
			fromWarehouse = 'Transfer';
			toWarehouse = 'W103';
		} else if (value === 'received-entry') {
			fromWarehouse = 'Receiving';
			toWarehouse = 'W101';
		}
	});

	// Handle part number change to auto-populate description and units
	$effect(() => {
		if (partNumber) {
			const item = inventoryStore.getItemByPartNumber(partNumber);
			if (item) {
				description = item.description;
				units = item.units;
			} else {
				description = '';
				units = '';
			}
		}
	});

	function handleSaveItem() {
		try {
			const formData = {
				partNumber,
				description,
				quantity,
				units
			};

			const validatedData = formSchema.parse(formData);
			errors = {};

			const newItem: InventoryItem = {
				id: crypto.randomUUID(), // dummy id
				itemNo: $inventoryStore.length + 1,
				partNumber: validatedData.partNumber,
				description: validatedData.description,
				quantity: validatedData.quantity,
				units: validatedData.units
			};

			inventoryStore.addItem(newItem);

			// Reset form
			partNumber = '';
			description = '';
			quantity = 0;
			units = '';
		} catch (error) {
			if (error instanceof z.ZodError) {
				errors = error.errors.reduce(
					(acc, err) => {
						acc[err.path[0]] = err.message;
						return acc;
					},
					{} as Record<string, string>
				);
			}
		}
	}
</script>

<Dialog.Root open={isOpen} onOpenChange={onClose}>
	<Dialog.ScrollContent class="sm:max-w-7xl">
		<Dialog.Header>
			<Dialog.Title>Add New Entry</Dialog.Title>
			<Dialog.Description>Received & transfer entry to different warehouses</Dialog.Description>
		</Dialog.Header>

		<div>
			<div class="mb-6 flex items-center justify-between">
				<div class="text-muted-foreground flex items-center gap-2 text-sm">
					<CalendarIcon class="h-4 w-4" />
					<span>Sun, Apr 6</span>
				</div>
				<Select.Root type="single" name="entry-type" bind:value>
					<Select.Trigger>
						{triggerContent}
					</Select.Trigger>
					<Select.Content>
						{#each entryTypes as entry (entry.value)}
							<Select.Item value={entry.value} label={entry.label}>{entry.label}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>

			<form class="space-y-6">
				<div class="space-y-6">
					<Card.Root>
						<Card.Header>
							<Card.Title class="text-lg">Warehouse Information</Card.Title>
							<Card.Description>Specify source and destination warehouses</Card.Description>
						</Card.Header>
						<Card.Content class="grid gap-6 md:grid-cols-2">
							<div>
								<label for="fromWarehouse" class="text-sm font-medium">From Warehouse</label>
								<Input id="fromWarehouse" type="text" class="bg-slate-50" disabled bind:value={fromWarehouse} />
								<p class="text-muted-foreground mt-1 text-xs">Source warehouse code</p>
							</div>

							<div>
								<label for="toWarehouse" class="text-sm font-medium">To Warehouse</label>
								<Select.Root type="single" bind:value={toWarehouse}>
									<Select.Trigger class="w-full">
										{availableDestinations.find((w) => w.value === toWarehouse)?.label ??
											'Select destination'}
									</Select.Trigger>
									<Select.Content>
										{#each availableDestinations as warehouse (warehouse.value)}
											<Select.Item value={warehouse.value} label={warehouse.label}>
												{warehouse.label}
											</Select.Item>
										{/each}
									</Select.Content>
								</Select.Root>
								<p class="text-muted-foreground mt-1 text-xs">Destination warehouse</p>
							</div>
						</Card.Content>
					</Card.Root>

					<Card.Root>
						<Card.Header>
							<Card.Title class="text-lg">Item Details</Card.Title>
							<Card.Description>Specify the item information</Card.Description>
						</Card.Header>
						<Card.Content class="space-y-4">
							<div class="grid gap-4 md:grid-cols-2">
								<div>
									<label for="partNumber" class="text-sm leading-[24px] font-medium">
										<span class="flex items-center gap-2">
											Part Number
											<Tooltip.Provider>
												<Tooltip.Root>
													<Tooltip.Trigger>
														<InfoIcon class="text-muted-foreground h-3.5 w-3.5 cursor-help" />
													</Tooltip.Trigger>
													<Tooltip.Content>
														<p>Enter the unique part identifier</p>
													</Tooltip.Content>
												</Tooltip.Root>
											</Tooltip.Provider>
										</span>
									</label>
									<Input
										id="partNumber"
										type="text"
										placeholder="e.g. NT.SWTPO.011"
										bind:value={partNumber}
										class={errors.partNumber ? 'border-red-500' : ''} />
									{#if errors.partNumber}
										<p class="mt-1 text-xs text-red-500">{errors.partNumber}</p>
									{/if}
								</div>

								<div>
									<label for="description" class="text-sm font-medium">Description</label>
									<Input
										id="description"
										type="text"
										class={`bg-slate-50 ${errors.description ? 'border-red-500' : ''}`}
										bind:value={description} />
									{#if errors.description}
										<p class="mt-1 text-xs text-red-500">{errors.description}</p>
									{/if}
								</div>
							</div>

							<div class="grid gap-4 md:grid-cols-2">
								<div>
									<label for="quantity" class="text-sm font-medium">Quantity</label>
									<Input
										id="quantity"
										type="number"
										step="0.01"
										placeholder="0.00"
										bind:value={quantity}
										class={errors.quantity ? 'border-red-500' : ''} />
									{#if errors.quantity}
										<p class="mt-1 text-xs text-red-500">{errors.quantity}</p>
									{/if}
								</div>

								<div>
									<label for="units" class="text-sm font-medium">Units</label>
									<Input
										id="units"
										type="text"
										class={`bg-slate-50 ${errors.units ? 'border-red-500' : ''}`}
										bind:value={units} />
									{#if errors.units}
										<p class="mt-1 text-xs text-red-500">{errors.units}</p>
									{/if}
								</div>
							</div>

							<div class="flex justify-end">
								<Button
									class="bg-blue-600 text-white hover:bg-blue-700"
									onclick={handleSaveItem}
									disabled={!partNumber || !quantity}>
									Save Item
								</Button>
							</div>
						</Card.Content>
					</Card.Root>
				</div>

				<InventoryTable />
				<div class="flex justify-end gap-3">
					<button
						type="button"
						onclick={onClose}
						class="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
						Cancel
					</button>
					<Button type="submit" class="bg-blue-600 text-white hover:bg-blue-700">
						<!-- {#if isSubmitting}
							<Loader2 class="mr-2 h-4 w-4 animate-spin" />
							Saving...
						{:else}
							Save Item
						{/if} -->

						Save Ticket
					</Button>
				</div>
			</form>
		</div>
	</Dialog.ScrollContent>
</Dialog.Root>
