<script lang="ts">
	import { formSchema, type FormSchema } from '$routesApp/bom/schema';
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
		<Form.Field {form} name="productPartNumber">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Product P/N:</Form.Label>
					<Input {...props} bind:value={$formData.productPartNumber} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<div>
		<Form.Field {form} name="name">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Product Name</Form.Label>
					<Input {...props} bind:value={$formData.name} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<div>
		<Form.Field {form} name="description">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Product Description</Form.Label>
					<Input {...props} bind:value={$formData.description} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<div>
		<Form.Field {form} name="bomLevel">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>BOM Level</Form.Label>
					<Input {...props} bind:value={$formData.bomLevel} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<div>
		<Form.Field {form} name="partNumber">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Item Part Number</Form.Label>
					<Input {...props} bind:value={$formData.partNumber} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<div class="grid grid-cols-2 gap-4">
		<div>
			<Form.Field {form} name="quantity">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Quantity</Form.Label>
						<Input {...props} bind:value={$formData.quantity} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>

		<div>
			<Form.Field {form} name="units">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Units</Form.Label>
						<Input {...props} bind:value={$formData.units} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>
	</div>

	<div class="text-right">
		<Form.Button>Submit</Form.Button>
	</div>
</form>
