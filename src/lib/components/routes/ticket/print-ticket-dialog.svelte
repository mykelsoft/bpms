<script lang="ts">
	import * as Dialog from '$ui/dialog';
	import PrintTicketForm from './print-ticket-form.svelte';

	const { isOpen, onClose } = $props<{
		isOpen: boolean;
		onClose: () => void;
	}>();
</script>

<Dialog.Root open={isOpen} onOpenChange={onClose}>
	<Dialog.ScrollContent class="sm:max-w-4xl">
		<Dialog.Header>
			<Dialog.Title>Ticket Preview</Dialog.Title>
			<Dialog.Description>Print 2 copies</Dialog.Description>
		</Dialog.Header>

		<PrintTicketForm {onClose} items={[]} />
	</Dialog.ScrollContent>
</Dialog.Root>
