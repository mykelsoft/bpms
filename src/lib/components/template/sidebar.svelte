<script lang="ts">
	import HomeIcon from '$lib/icons/HomeIcon.svg?raw';

	const links = [
		{ name: 'Home', href: '/', icon: HomeIcon },
		{ name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
		{ name: 'Team', href: '/team', icon: HomeIcon },
		{ name: 'Projects', href: '/projects', icon: HomeIcon },
		{ name: 'Calendar', href: '/calendar', icon: HomeIcon },
		{ name: 'Documents', href: '/documents', icon: HomeIcon }
	];
</script>

<aside
	class="bg-brand-700 fixed top-0 left-0 z-10 h-full flex-auto translate-0 items-stretch outline-none sm:top-14 sm:left-0 sm:z-0 sm:flex sm:h-[calc(100%-var(--header-height))]">
	<div class="relative">
		<nav
			class="rounded-r-0 sm:rounded-tr-0 relative mt-14 flex h-full min-h-full w-full max-w-[360px] min-w-[var(--sidebar-width)] flex-col items-stretch rounded-tl-xl bg-gray-50 sm:mt-0 sm:max-w-[var(--sidebar-width)]">
			<div
				class="sm:rounded-tr-0 scrollbar sm:rounded-tr-xl-0 isolate flex max-h-none w-full max-w-full flex-1 flex-col items-stretch overflow-auto supports-h-svh:h-[calc(100svh-var(--header-height))] sm:pt-3">
				<div class="space-y-3">
					<ul class="sidebar-navigation-section">
						{#each links as link}
							<li class="sidebar-navigation-item">
								<div class="sidebar-navigation-itemWrapper">
									<div class="sidebar-navigation-itemInnerWrapper">
										<a
											href={link.href}
											class="relative m-0 flex grow cursor-pointer items-start rounded-lg px-2 py-1 text-left text-sm font-semibold text-gray-600 no-underline">
											{link.name}
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
		background-color: var(--color-gray-50);
	}
</style>
