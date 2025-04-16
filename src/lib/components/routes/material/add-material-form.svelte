<script lang="ts">
	import { formSchema, type FormSchema } from '$routesApp/material/schema';
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
		<Form.Field {form} name="partNumber">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Part Number</Form.Label>
					<Input {...props} bind:value={$formData.partNumber} placeholder="e.g. NT.SWTPO.011" />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<div>
		<Form.Field {form} name="description">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Description</Form.Label>
					<Input {...props} bind:value={$formData.description} placeholder="e.g. sweet potato, cubed" />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<div>
		<Form.Field {form} name="brand">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Brand</Form.Label>
					<Input {...props} bind:value={$formData.brand} placeholder="e.g. Fresh Produce" />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<div class="text-right">
		<Form.Button>Submit</Form.Button>
	</div>
</form>
