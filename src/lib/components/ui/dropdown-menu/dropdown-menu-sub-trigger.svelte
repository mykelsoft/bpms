<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive, type WithoutChild } from 'bits-ui';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		inset,
		children,
		...restProps
	}: WithoutChild<DropdownMenuPrimitive.SubTriggerProps> & {
		inset?: boolean;
	} = $props();
</script>

<DropdownMenuPrimitive.SubTrigger
	bind:ref
	data-inset={inset}
	class={cn(
		'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none',
		inset && 'pl-8',
		className
	)}
	{...restProps}>
	{@render children?.()}
	<ChevronRight class="ml-auto" />
</DropdownMenuPrimitive.SubTrigger>
