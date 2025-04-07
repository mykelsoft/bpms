<script lang="ts">
	import { IconBrightness } from '@tabler/icons-svelte';
	import { onMount } from 'svelte';
	import * as Sidebar from '$ui/sidebar';
	import { Skeleton } from '$ui/skeleton';
	import { Switch } from '$ui/switch';

	const { items, ...restProps } = $props();

	// Create reactive state for theme
	let mounted = $state(false);
	let resolvedTheme = $state('light');

	// Function to toggle theme
	function setTheme(theme: string) {
		resolvedTheme = theme;
		document.documentElement.classList.toggle('dark', theme === 'dark');
		localStorage.setItem('theme', theme);
	}

	// Similar to useEffect for theme initialization
	onMount(() => {
		// Initialize theme from localStorage or system preference
		const savedTheme = localStorage.getItem('theme');
		const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

		resolvedTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
		document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');

		mounted = true;
	});
</script>

<Sidebar.Group {...restProps}>
	<Sidebar.GroupContent>
		<Sidebar.Menu>
			{#each items as item (item.title)}
				<Sidebar.MenuItem>
					<Sidebar.MenuButton>
						{#snippet child({ props }: { props: Record<string, unknown> })}
							<a href={item.url} {...props}>
								<item.icon />
								<span>{item.title}</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			{/each}
			<Sidebar.MenuItem class="group-data-[collapsible=icon]:hidden">
				<Sidebar.MenuButton>
					{#snippet child({ props }: { props: Record<string, unknown> })}
						<label {...props}>
							<IconBrightness />
							<span>Dark Mode</span>
							{#if mounted}
								<Switch
									class="ml-auto"
									checked={resolvedTheme !== 'light'}
									onCheckedChange={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')} />
							{:else}
								<Skeleton class="ml-auto h-4 w-8 rounded-full" />
							{/if}
						</label>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.GroupContent>
</Sidebar.Group>
