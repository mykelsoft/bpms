<script lang="ts">
	import { CalendarIcon, InfoIcon } from 'lucide-svelte';

	// UI Components
	import { Button } from '$ui/button';
	import * as Dialog from '$ui/dialog';
	import { Input } from '$ui/input';
	import * as Select from '$ui/select';
	import * as Tooltip from '$ui/tooltip';
	import * as Card from '$ui/card';
	import * as Popover from '$ui/popover';
	import { Calendar } from '$ui/calendar';

	import { Badge } from '$ui/badge';

	// Props
	const { isOpen, onClose } = $props<{
		isOpen: boolean;
		onClose: () => void;
	}>();
</script>

<Dialog.Root open={isOpen} onOpenChange={onClose}>
	<Dialog.ScrollContent class="sm:max-w-[650px]">
		<Dialog.Header>
			<Dialog.Title>Add New Entry</Dialog.Title>
			<Dialog.Description>Newly received items data entry & transfer to different warehouses</Dialog.Description>
		</Dialog.Header>

		<div>
			<div class="mb-6 flex items-center justify-between">
				<div class="text-muted-foreground flex items-center gap-2 text-sm">
					<CalendarIcon class="h-4 w-4" />
					<span>Sun, Apr 6</span>
				</div>
				<Badge variant="outline" class="border-amber-200 bg-amber-50 text-amber-700">Newly Received</Badge>
			</div>

			<form class="space-y-6">
				<Card.Root>
					<Card.Header>
						<Card.Title class="text-lg">Warehouse Information</Card.Title>
						<Card.Description>Specify source and destination warehouses</Card.Description>
					</Card.Header>
					<Card.Content class="grid gap-6 md:grid-cols-2">
						<div>
							<label for="fromWarehouse" class="text-sm font-medium">From Warehouse</label>
							<Input id="fromWarehouse" type="text" class="bg-slate-50" />
							<p class="text-muted-foreground mt-1 text-xs">Source warehouse code</p>
						</div>

						<div>
							<label for="toWarehouse" class="text-sm font-medium">To Warehouse</label>
							<Select.Root type="single">
								<Select.Trigger class="w-full bg-slate-50">Select destination</Select.Trigger>
								<Select.Content>
									<Select.Item value="W102">W102 - Main Storage</Select.Item>
									<Select.Item value="W103">W103 - Distribution Center</Select.Item>
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
					<Card.Content class="space-y-6">
						<div class="grid gap-6 md:grid-cols-2">
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
								<Input id="partNumber" type="text" placeholder="e.g. NT.SWTPO.011" />
							</div>

							<div>
								<label for="description" class="text-sm font-medium">Description</label>
								<Input id="description" type="text" readonly class="bg-slate-50" />
								<p class="text-muted-foreground mt-1 text-xs">Auto-populated based on part number</p>
							</div>
						</div>

						<div class="grid gap-6 md:grid-cols-2">
							<div>
								<label for="quantity" class="text-sm font-medium">Quantity</label>
								<Input id="quantity" type="number" step="0.01" placeholder="0.00" />
							</div>

							<div>
								<label for="units" class="text-sm font-medium">Units</label>
								<Input id="units" type="text" readonly class="bg-slate-50" />
								<p class="text-muted-foreground mt-1 text-xs">Auto-populated based on part number</p>
							</div>
						</div>
					</Card.Content>
				</Card.Root>

				<Card.Root>
					<Card.Header>
						<Card.Title class="text-lg">Tracking Information</Card.Title>
						<Card.Description>Specify lot and expiry information</Card.Description>
					</Card.Header>
					<Card.Content class="grid gap-6 md:grid-cols-2">
						<div>
							<label for="lotDateCode" class="text-sm font-medium">Lot/Date Code</label>
							<Input id="lotDateCode" type="text" placeholder="Enter lot number" />
							<p class="text-muted-foreground mt-1 text-xs">Batch or production code</p>
						</div>

						<div>
							<label for="expiryDate" class="text-sm font-medium">Expiry Date</label>
							<Popover.Root>
								<Popover.Trigger class="block">
									<Button variant="outline" class="w-full pl-3 text-left font-normal">
										<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
									</Button>
								</Popover.Trigger>
								<Popover.Content class="w-auto p-0" align="start">
									<Calendar type="single" initialFocus />
								</Popover.Content>
							</Popover.Root>
							<p class="text-muted-foreground mt-1 text-xs">When this item expires</p>
						</div>
					</Card.Content>
				</Card.Root>

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

						Save Item
					</Button>
				</div>
			</form>
		</div>
	</Dialog.ScrollContent>
</Dialog.Root>
