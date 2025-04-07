<script lang="ts">
	import { IconDots, IconFolder, IconShare3, IconTrash, type Icon } from '@tabler/icons-svelte';

	import * as DropdownMenu from '$ui/dropdown-menu';
	import * as Sidebar from '$ui/sidebar';
	import { useSidebar } from '$ui/sidebar/context.svelte.js';

	const { items } = $props();

	const sidebar = useSidebar();
	const isMobile = $derived(sidebar.isMobile);
</script>

<Sidebar.Group class="group-data-[collapsible=icon]:hidden">
	<Sidebar.GroupLabel>Documents</Sidebar.GroupLabel>
	<Sidebar.Menu>
		{#each items as item (item.name)}
			<Sidebar.MenuItem>
				<Sidebar.MenuButton>
					{#snippet child({ props }: { props: any })}
						<a href={item.url} {...props}>
							<item.icon />
							<span>{item.title}</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Sidebar.MenuAction showOnHover class="data-[state=open]:bg-accent rounded-sm">
							<IconDots />
							<span class="sr-only">More</span>
						</Sidebar.MenuAction>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content
						class="w-24 rounded-lg"
						side={isMobile ? 'bottom' : 'right'}
						align={isMobile ? 'end' : 'start'}>
						<DropdownMenu.Item>
							<IconFolder />
							<span>Open</span>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<IconShare3 />
							<span>Share</span>
						</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>
							<IconTrash />
							<span>Delete</span>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</Sidebar.MenuItem>
		{/each}
		<Sidebar.MenuItem>
			<Sidebar.MenuButton class="text-sidebar-foreground/70">
				<IconDots class="text-sidebar-foreground/70" />
				<span>More</span>
			</Sidebar.MenuButton>
		</Sidebar.MenuItem>
	</Sidebar.Menu>
</Sidebar.Group>
