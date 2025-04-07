<script lang="ts">
	import * as Dialog from '$ui/dialog';
	import AddWarehouseForm from './add-warehouse-form.svelte';
	import { type FormSchema } from '$routesApp/warehouse/schema';
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
			<Dialog.Title>Add New Warehouse to the Master List</Dialog.Title>
			<Dialog.Description>
				Add a new warehouse to your inventory. Fill in the required details including warehouse code, and warehouse name
				information.
			</Dialog.Description>
		</Dialog.Header>

		<AddWarehouseForm {data} />
	</Dialog.ScrollContent>
</Dialog.Root>
