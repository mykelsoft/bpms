<script lang="ts">
	import { Checkbox as CheckboxPrimitive, type WithoutChildrenOrChild } from 'bits-ui';
	import { Check } from 'lucide-svelte';
	import { Minus } from 'lucide-svelte';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		checked = $bindable(false),
		indeterminate = $bindable(false),
		...restProps
	}: WithoutChildrenOrChild<CheckboxPrimitive.RootProps> = $props();
</script>

<CheckboxPrimitive.Root
	class={cn(
		'focus-visible:ring-ring data-[state=checked]:bg-brand-600  data-[state=checked]:border-brand-600 peer box-content size-4 shrink-0 rounded-sm border border-gray-300 focus-visible:ring-1 focus-visible:ring-3 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50 data-[state=checked]:text-white',
		className
	)}
	bind:checked
	bind:ref
	bind:indeterminate
	{...restProps}>
	{#snippet children({ checked, indeterminate })}
		<span class="flex items-center justify-center text-gray-700">
			{#if indeterminate}
				<Minus class="size-4" />
			{:else}
				<Check class={cn('size-4', !checked ? 'text-transparent' : 'text-white')} />
			{/if}
		</span>
	{/snippet}
</CheckboxPrimitive.Root>
