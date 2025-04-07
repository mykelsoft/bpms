<script lang="ts">
	import * as Sidebar from '$ui/sidebar';
	import { page } from '$app/state';
	import { cn } from '$lib/utils';

	const { items } = $props();
	let currentPath = $derived(page.url.pathname);

	// Function to determine if a link is active
	function isActive(path: string) {
		// Exact match for most paths
		if (currentPath === path) return true;

		// Special case for home page to prevent matching everything
		if (path === '/' && currentPath !== '/') return false;

		// For nested routes, check if current path starts with link path
		// This will make parent routes active when on child routes
		return currentPath.startsWith(path);
	}
</script>

<Sidebar.Group>
	<Sidebar.GroupContent class="flex flex-col gap-2">
		<Sidebar.Menu>
			{#each items as item (item.url)}
				<Sidebar.MenuItem>
					<Sidebar.MenuButton>
						{#snippet child({ props }: { props: Record<string, unknown> & { class?: string } })}
							<a
								href={item.url}
								{...props}
								class={cn(
									isActive(item.url) ? 'bg-sidebar-accent text-sidebar-accent-foreground' : '',
									props.class
								)}>
								<item.icon />
								<span>{item.title}</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			{/each}
		</Sidebar.Menu>
	</Sidebar.GroupContent>
</Sidebar.Group>
