<script lang="ts">
	import { getStores } from '$app/stores';

	import HomeFilledIcon from '$lib/icons/HomeFilledIcon.svg?raw';
	import HomeIcon from '$lib/icons/HomeIcon.svg?raw';
	import ContractFilledIcon from '$lib/icons/ContractFilledIcon.svg?raw';
	import ContractIcon from '$lib/icons/ContractIcon.svg?raw';
	import InventoryFilledIcon from '$lib/icons/InventoryFilledIcon.svg?raw';
	import InventoryIcon from '$lib/icons/InventoryIcon.svg?raw';
	import OrganizationFilledIcon from '$lib/icons/OrganizationFilledIcon.svg?raw';
	import OrganizationIcon from '$lib/icons/OrganizationIcon.svg?raw';
	import PersonFilledIcon from '$lib/icons/PersonFilledIcon.svg?raw';
	import PersonIcon from '$lib/icons/OrganizationIcon.svg?raw';

	import { onMount } from 'svelte';
	let pathname = $state();

	onMount(() => {
		const { page } = getStores();
		page.subscribe(({ url }) => {
			pathname = url.pathname;
		});
	});

	const links = [
		{ name: 'Home', href: '/', icon: HomeFilledIcon, iconActive: HomeIcon },
		{ name: 'Inventory', href: '/inventory', icon: InventoryFilledIcon, iconActive: InventoryIcon },
		{ name: 'Suppliers', href: '/suppliers', icon: OrganizationFilledIcon, iconActive: OrganizationIcon },
		{ name: 'Customers', href: '/customers', icon: PersonFilledIcon, iconActive: PersonIcon },
		{ name: 'Reports', href: '/reports', icon: ContractFilledIcon, iconActive: ContractIcon }
	];
</script>

<aside
	class="bg-brand-700 fixed top-0 left-0 z-10 h-full flex-auto translate-0 items-stretch outline-none sm:top-14 sm:left-0 sm:z-0 sm:flex sm:h-[calc(100%-var(--header-height))]">
	<div class="relative">
		<nav
			class="rounded-r-0 sm:rounded-tr-0 bg-gray-true-100 relative mt-14 flex h-full min-h-full w-full max-w-[360px] min-w-[var(--sidebar-width)] flex-col items-stretch rounded-tl-xl sm:mt-0 sm:max-w-[var(--sidebar-width)]">
			<div
				class="sm:rounded-tr-0 scrollbar sm:rounded-tr-xl-0 isolate flex max-h-none w-full max-w-full flex-1 flex-col items-stretch overflow-auto supports-h-svh:h-[calc(100svh-var(--header-height))] sm:pt-3">
				<div class="space-y-3">
					<ul class="sidebar-navigation-section space-y-0.5">
						{#each links as link}
							<li class="sidebar-navigation-item">
								<div class="sidebar-navigation-itemWrapper">
									<div class="sidebar-navigation-itemInnerWrapper">
										<a
											href={link.href}
											class:is-active={pathname === link.href}
											class="text-gray-true-600 relative m-0 flex grow cursor-pointer items-start gap-x-2 rounded-lg px-2 py-1 text-left text-sm font-medium no-underline">
											<span class="h-5 w-5">
												{#if pathname === link.href}
													{@html link.iconActive}
												{:else}
													{@html link.icon}
												{/if}
											</span>
											<span>{link.name}</span>
										</a>
									</div>
								</div>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</nav>
	</div>
</aside>

<style>
	@reference '../../../app.postcss';

	a.is-active {
		background-color: var(--color-white);
		color: var(--color-gray-true-800);
		box-shadow: var(--shadow-xs);
	}

	.scrollbar {
		scrollbar-width: thin;
		scrollbar-gutter: stable;
		scrollbar-color: var(--color-gray-true-400) transparent;
		transition: scrollbar-color var(--motion-duration-100) var(--motion-ease-in);
	}

	.sidebar-navigation-section {
		list-style-type: none;
	}

	.sidebar-navigation-item {
		position: relative;
		display: flex;
		flex-wrap: wrap;
	}

	@supports (scrollbar-gutter: stable) {
		.sidebar-navigation-itemWrapper {
			padding: 0 calc(12px - 11px) 0 12px;
		}
	}

	.sidebar-navigation-itemWrapper {
		width: 100%;
	}

	.sidebar-navigation-itemInnerWrapper {
		position: relative;
		display: flex;
		width: 100%;
		flex-wrap: nowrap;
		border-radius: 8px;
	}

	.sidebar-navigation-itemInnerWrapper:is(:hover, :focus-visible) {
		@apply bg-gray-true-25/70;
		text-decoration: none;
	}

	.sidebar-navigation-itemInnerWrapper a:active:hover:not(.is-active) {
		background-color: var(--color-white);
		color: var(--color-gray-true-800);
		transform: scale(0.98);
	}
</style>
