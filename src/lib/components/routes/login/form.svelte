<script lang="ts">
	import { formSchema, type FormSchema } from '$routesAuth/login/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { IconLoader2 } from '@tabler/icons-svelte';

	// UI Components
	import * as Form from '$ui/form';
	import { Input } from '$ui/input';

	let {
		data
	}: {
		data: { form: SuperValidated<Infer<FormSchema>> };
	} = $props();

	let isSubmitting = $state(false);
	let isLoginError = $state(false);

	const form = superForm(data.form, {
		validators: zodClient(formSchema),
		onResult: ({ result }) => {
			if (result.type === 'success') {
				isLoginError = false;
			} else if (result.type === 'failure' && result.status === 401) {
				isLoginError = true;
			} else if (result.type === 'error' && result.status === 500) {
				isLoginError = true;
			}

			isSubmitting = false;
		},
		onSubmit: async () => {
			isSubmitting = true;
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

		{#if isLoginError}
			<div class="rounded-md bg-red-50 p-4">
				<div class="flex">
					<div class="flex-shrink-0">
						<svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
								clip-rule="evenodd" />
						</svg>
					</div>
					<div class="ml-3">
						<h3 class="text-sm font-medium text-red-800">Authentication Failed</h3>
						<div class="mt-2 text-sm text-red-700">
							<p>We couldn't verify your credentials. Please check your email and password and try again.</p>
						</div>
					</div>
				</div>
			</div>
		{/if}

		<!-- Submit Button -->
		<Form.Button class="w-full" disabled={isSubmitting}>
			{#if isSubmitting}
				<IconLoader2 class="mr-2 h-4 w-4 animate-spin" />
				Signing in...
			{:else}
				Sign in
			{/if}
		</Form.Button>
	</div>
</form>
