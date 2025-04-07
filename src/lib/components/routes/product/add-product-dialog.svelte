<script lang="ts">
	import * as Dialog from '$ui/dialog';
	import AddProductForm from './add-product-form.svelte';
	import { type FormSchema } from '$routesApp/product/schema';
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
			<Dialog.Title>Add New Product to the Master List</Dialog.Title>
			<Dialog.Description>
				Add a new product to your inventory. Fill in the required details including part number, product name, and
				description information.
			</Dialog.Description>
		</Dialog.Header>

		<AddProductForm {data} />
	</Dialog.ScrollContent>
</Dialog.Root>
