<script lang="ts">
	import { IconCreditCard, IconDotsVertical, IconLogout, IconNotification, IconUserCircle } from '@tabler/icons-svelte';

	import * as Avatar from '$ui/avatar';

	import * as DropdownMenu from '$ui/dropdown-menu';
	import * as Sidebar from '$ui/sidebar';
	import { useSidebar } from '$components/ui/sidebar/context.svelte';

	const { user } = $props<{
		user: {
			name: string;
			email: string;
			avatar?: string;
			role: string;
		};
	}>();

	const sidebar = useSidebar();
	const isMobile = $derived(sidebar.isMobile);
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-full rounded-md">
				<Sidebar.MenuButton size="lg">
					<Avatar.Root class="h-8 w-8 rounded-lg grayscale">
						<Avatar.Image src={user.avatar} alt={user.name} />
						<Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
					</Avatar.Root>
					<div class="grid flex-1 text-left text-sm leading-tight">
						<span class="truncate font-medium">{user.name}</span>
						<span class="text-muted-foreground truncate text-xs">
							{user.role}
						</span>
					</div>
					<IconDotsVertical class="ml-auto size-4" />
				</Sidebar.MenuButton>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-(--bits-dropdown-menu-trigger-width) min-w-56 rounded-lg"
				side={isMobile ? 'bottom' : 'right'}
				align="end"
				sideOffset={4}>
				<DropdownMenu.Label class="p-0 font-normal">
					<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar.Root class="h-8 w-8 rounded-lg">
							<Avatar.Image src={user.avatar} alt={user.name} />
							<Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-medium">{user.name}</span>
							<span class="text-muted-foreground truncate text-xs">
								{user.email}
							</span>
						</div>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						<IconUserCircle />
						Account
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<IconCreditCard />
						Billing
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<IconNotification />
						Notifications
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<IconLogout />
					Log out
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
