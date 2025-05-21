<script lang="ts">
	import * as Dialog from '$ui/dialog';
	import AddBOMForm from './add-bom-form.svelte';
	import { type FormSchema } from '$routesApp/bom/schema';
	import { type SuperValidated, type Infer } from 'sveltekit-superforms';

	let {
		isOpen,
		onClose,
		data
	}: {
		isOpen: boolean;
		onClose: () => void;
		data: { form: SuperValidated<Infer<FormSchema>> };
	} = $props();
</script>

<Dialog.Root open={isOpen} onOpenChange={onClose}>
	<Dialog.ScrollContent>
		<Dialog.Header>
			<Dialog.Title>Add New BOM Entry</Dialog.Title>
			<Dialog.Description>
				Add a new BOM entry to the database. Fill in the required details including product part number, name,
				description, and quantity.
			</Dialog.Description>
		</Dialog.Header>

		<AddBOMForm {data} />
	</Dialog.ScrollContent>
</Dialog.Root>
