<script>
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select/index.js';

	const DEFAULT_THEMES = [
		{
			name: 'Default',
			value: 'default'
		},
		{
			name: 'Blue',
			value: 'blue'
		},
		{
			name: 'Green',
			value: 'green'
		},
		{
			name: 'Amber',
			value: 'amber'
		}
	];

	const SCALED_THEMES = [
		{
			name: 'Default',
			value: 'default-scaled'
		},
		{
			name: 'Blue',
			value: 'blue-scaled'
		}
	];

	const MONO_THEMES = [
		{
			name: 'Mono',
			value: 'mono-scaled'
		}
	];

	let myValue = $state('');
</script>

<div class="flex items-center gap-2">
	<Label for="theme-selector" class="sr-only">Theme</Label>
	<Select.Root
		type="single"
		value={myValue}
		onValueChange={(value) => {
			console.log(value);
		}}>
		<Select.Trigger size="sm" aria-label="Select a theme" class="justify-start font-normal *:data-[slot=select-value]:w-12">
			<span class="text-muted-foreground hidden sm:block"> Select a theme: </span>
			<span class="text-muted-foreground block sm:hidden">Theme</span>
		</Select.Trigger>
		<Select.Content align="end">
			<Select.Group>
				<Select.GroupHeading>Default</Select.GroupHeading>
				{#each DEFAULT_THEMES as theme (theme.name)}
					<Select.Item value={theme.value} label={theme.name} />
				{/each}
			</Select.Group>
			<Select.Separator />
			<Select.Group>
				<Select.GroupHeading>Scaled</Select.GroupHeading>
				{#each SCALED_THEMES as theme (theme.name)}
					<Select.Item value={theme.value} label={theme.name} />
				{/each}
			</Select.Group>
			<Select.Group>
				<Select.GroupHeading>Monospaced</Select.GroupHeading>
				{#each MONO_THEMES as theme (theme.name)}
					<Select.Item value={theme.value} label={theme.name} />
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
</div>
