<script lang="ts">
	import * as Sidebar from '$ui/sidebar';
	import {
		IconCamera,
		// IconDashboard,
		IconDatabase,
		IconFileAi,
		IconFileDescription,
		IconFileWord,
		IconInnerShadowTop,
		IconTicket,
		IconReport,
		IconSettings,
		IconBrandMinecraft,
		IconBox,
		IconBuildingWarehouse,
		IconForklift
	} from '@tabler/icons-svelte';

	import NavMain from './nav-main.svelte';
	import NavUser from './nav-user.svelte';
	import NavSecondary from './nav-secondary.svelte';

	const { ...props } = $props();

	const data = {
		user: {
			name: 'michael',
			email: 'michael@gmail.com',
			role: 'admin',
			avatar: '/avatar.jpg'
		},
		navMain: [
			//? will use if needed
			// {
			// 	title: 'Dashboard',
			// 	url: '/',
			// 	icon: IconDashboard
			// },
			{
				title: 'Ticket',
				url: '/ticket',
				icon: IconTicket
			},
			{
				title: 'Material',
				url: '/material',
				icon: IconBrandMinecraft
			},
			{
				title: 'Product',
				url: '/product',
				icon: IconBox
			},
			{
				title: 'Warehouse',
				url: '/warehouse',
				icon: IconBuildingWarehouse
			},
			{
				title: 'BOM',
				url: '/bom',
				icon: IconForklift
			}
		],
		navClouds: [
			{
				title: 'Capture',
				icon: IconCamera,
				isActive: true,
				url: '#',
				items: [
					{
						title: 'Active Proposals',
						url: '#'
					},
					{
						title: 'Archived',
						url: '#'
					}
				]
			},
			{
				title: 'Proposal',
				icon: IconFileDescription,
				url: '#',
				items: [
					{
						title: 'Active Proposals',
						url: '#'
					},
					{
						title: 'Archived',
						url: '#'
					}
				]
			},
			{
				title: 'Prompts',
				icon: IconFileAi,
				url: '#',
				items: [
					{
						title: 'Active Proposals',
						url: '#'
					},
					{
						title: 'Archived',
						url: '#'
					}
				]
			}
		],
		navSecondary: [
			{
				title: 'Settings',
				url: '/settings',
				icon: IconSettings
			}
		],
		documents: [
			{
				name: 'Data Library',
				url: '#',
				icon: IconDatabase
			},
			{
				name: 'Reports',
				url: '#',
				icon: IconReport
			},
			{
				name: 'Word Assistant',
				url: '#',
				icon: IconFileWord
			}
		]
	};
</script>

<Sidebar.Root collapsible="offcanvas" {...props}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton class="data-[slot=sidebar-menu-button]:!p-1.5">
					{#snippet child()}
						<a
							href="/"
							class="peer/menu-button ring-sidebar-ring active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex h-8 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-medium data-[slot=sidebar-menu-button]:!p-1.5 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0">
							<IconInnerShadowTop class="!size-5" />
							<span class="text-base font-semibold">Acme Inc.</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
		<NavSecondary items={data.navSecondary} class="mt-auto" />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
</Sidebar.Root>
