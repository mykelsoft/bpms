<script lang="ts">
	import * as Dialog from '$ui/dialog';
	import AddMaterialForm from './add-material-form.svelte';
	import { type FormSchema } from '$routesApp/material/schema';
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
			<Dialog.Title>Add New Material to the Master List</Dialog.Title>
			<Dialog.Description>
				Add a new material to your inventory. Fill in the required details including part number, description, and brand
				information.
			</Dialog.Description>
		</Dialog.Header>

		<AddMaterialForm {data} />
	</Dialog.ScrollContent>
</Dialog.Root>
