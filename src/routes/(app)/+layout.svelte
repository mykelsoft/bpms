<script lang="ts">
	import '../../theme.postcss';

	import * as Sidebar from '$ui/sidebar';
	import AppSidebar from '$components/app-sidebar.svelte';
	import SiteHeader from '$components/site-header.svelte';
	import { getPageTitle } from '$lib/context';
	import { setContext, getContext } from 'svelte';
	import type { PageData } from './$types';

	let { children, data } = $props<{ data: PageData }>();

	const title = getPageTitle();

	let userData = $state<Record<string, any>>({});
	setContext('user', userData);

	const userContext = getContext<Record<string, any>>('user');

	$effect(() => {
		// assign each property reactively in data.user to an equivalent
		// property in your 'user' context
		for (const key in data.user) {
			if (Object.prototype.hasOwnProperty.call(data.user, key)) {
				const userProperty = data.user[key];
				userContext[key] = userProperty;
			}
		}

		// remove any properties from userContext that are not in data.user
		// from your 'user' context
		for (const key in userContext) {
			if (!Object.prototype.hasOwnProperty.call(data.user, key)) {
				delete userContext[key];
			}
		}
	});
</script>

<Sidebar.Provider style="--sidebar-width: calc(var(--spacing) * 72)">
	<AppSidebar variant="inset" />
	<Sidebar.Inset>
		<SiteHeader title={$title} />
		<div class="flex flex-1 flex-col">
			<div class="@container/main flex flex-1 flex-col gap-2">
				<div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					{@render children?.()}
				</div>
			</div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
