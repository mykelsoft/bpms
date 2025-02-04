<script lang="ts">
	import Header from '$lib/components/template/header.svelte';
	import Sidebar from '$lib/components/template/sidebar.svelte';

	let { children } = $props();
</script>

<div class="flex h-screen flex-col">
	<Header />
	<div class="flex flex-1">
		<Sidebar />
		<main class="bg-brand-700 mt-14 min-w-0 flex-1 pl-[var(--sidebar-width)]">
			<div
				class="scrollable-frame bg-gray-true-50 relative isolate h-screen h-svh max-h-none overflow-x-hidden overflow-y-auto rounded-tr-xl">
				<div class="px-6">
					{@render children()}
				</div>
			</div>
		</main>
	</div>
</div>

<style>
	@supports (height: 100svh) {
		.scrollable-frame {
			height: calc(100svh - var(--header-height));
		}
	}

	.scrollable-frame {
		opacity: 1;
		transition: opacity 50ms;
		scrollbar-width: thin;
		scrollbar-color: var(--color-gray-true-400) transparent;
	}
</style>
