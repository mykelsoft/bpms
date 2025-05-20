<script lang="ts">
	import { formSchema, type FormSchema } from '$routesAuth/login/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	// UI Components
	import * as Form from '$ui/form';
	import { Input } from '$ui/input';
	import { authApi } from '$lib/api/auth';
	import { writable } from 'svelte/store';

	let {
		data
	}: {
		data: { form: SuperValidated<Infer<FormSchema>> };
	} = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema),
		onResult: ({ result }) => {
			console.log(result);
			if (result.type === 'success') {
				console.log('Form submitted successfully');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<div class="space-y-6">
		<div class="space-y-5">
			<!-- Email Field -->
			<div>
				<Form.Field {form} name="email">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Email:</Form.Label>
							<Input {...props} bind:value={$formData.email} type="email" placeholder="Enter your email" />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<!-- Password Field -->
			<div>
				<Form.Field {form} name="password">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Password:</Form.Label>
							<Input {...props} bind:value={$formData.password} type="password" placeholder="Password" />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
		</div>

		<!-- Submit Button -->
		<Form.Button class="w-full">Sign in</Form.Button>
	</div>
</form>
