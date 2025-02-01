<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	let checked = $state(false);
</script>

<form method="POST">
	<div class="space-y-6">
		<div class="space-y-5">
			<Input type="email" placeholder="Enter your email" />
			<Input type="password" placeholder="Password" />
		</div>
		<div class="flex items-center space-x-2">
			<Checkbox id="terms" bind:checked aria-labelledby="terms-label" />
			<label id="terms-label" for="terms" class="text-sm leading-none font-medium text-gray-700">
				Remember for 30 days
			</label>
		</div>
		<Button class="w-full">Sign in</Button>
	</div>
</form>
