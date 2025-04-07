<script lang="ts">
	import { formSchema, type FormSchema } from '$routesApp/warehouse/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	// UI Components
	import * as Form from '$ui/form';
	import { Input } from '$ui/input';

	let {
		data
	}: {
		data: { form: SuperValidated<Infer<FormSchema>> };
	} = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="space-y-6">
	<div>
		<Form.Field {form} name="warehouseCode">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Warehouse Code</Form.Label>
					<Input {...props} bind:value={$formData.warehouseCode} placeholder="e.g. NT.SWTPO.011" />
				{/snippet}
			</Form.Control>
			<Form.Description>Enter the warehouse code</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<div>
		<Form.Field {form} name="warehouseName">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Warehouse Name</Form.Label>
					<Input {...props} bind:value={$formData.warehouseName} placeholder="e.g. sweet potato, cubed" />
				{/snippet}
			</Form.Control>
			<Form.Description>Enter the warehouse name</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<div class="text-right">
		<Form.Button>Submit</Form.Button>
	</div>
</form>
