<script lang="ts">
	import { formSchema, type FormSchema } from '$routesApp/warehouse/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import CircleCheckIcon from '@lucide/svelte/icons/circle-check';
	import * as Alert from '$ui/alert';

	// UI Components
	import * as Form from '$ui/form';
	import { Input } from '$ui/input';
	import { Loader2 } from 'lucide-svelte';

	let {
		data
	}: {
		data: { form: SuperValidated<Infer<FormSchema>> };
	} = $props();

	let error = $state<string | null>(null);
	let isSubmitting = $state(false);
	let isSuccess = $state(false);

	const form = superForm(data.form, {
		validators: zodClient(formSchema),
		onResult: ({ result }) => {
			if (result.type === 'success') {
				error = null;
				isSuccess = true;
			} else if (result.type === 'failure') {
				error = result.data?.error;
			} else if (result.type === 'error') {
				error = 'An error occurred';
			}

			isSubmitting = false;
		},
		onSubmit: async () => {
			isSubmitting = true;
		}
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="space-y-6">
	<div>
		<Form.Field {form} name="code">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Warehouse Code</Form.Label>
					<Input {...props} bind:value={$formData.code} placeholder="e.g. NT.SWTPO.011" />
				{/snippet}
			</Form.Control>
			<Form.Description>Enter the warehouse code</Form.Description>
			<Form.FieldErrors />
			<div class="text-destructive text-[0.8rem] font-medium">{error}</div>
		</Form.Field>
	</div>

	<div>
		<Form.Field {form} name="name">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Warehouse Name</Form.Label>
					<Input {...props} bind:value={$formData.name} placeholder="e.g. sweet potato, cubed" />
				{/snippet}
			</Form.Control>
			<Form.Description>Enter the warehouse name</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	{#if isSuccess}
		<Alert.Root variant="success">
			<CircleCheckIcon class="size-4" />
			<Alert.Title>Success</Alert.Title>
			<Alert.Description>Warehouse added successfully.</Alert.Description>
		</Alert.Root>
	{/if}

	<div class="text-right">
		<Form.Button disabled={isSubmitting}>
			{#if isSubmitting}
				<Loader2 class="size-4 animate-spin" />
				Submitting...
			{:else}
				Submit
			{/if}
		</Form.Button>
	</div>
</form>
