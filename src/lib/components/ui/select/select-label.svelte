<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	type $$Props = SelectPrimitive.LabelProps;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<SelectPrimitive.Label class={cn("text-muted-foreground px-2 py-1.5 text-xs", className)} {...$$restProps}>
	<slot />
</SelectPrimitive.Label>
