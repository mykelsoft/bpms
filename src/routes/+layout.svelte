<script lang="ts">
	import Header from '$lib/components/template/header.svelte';
	import Sidebar from '$lib/components/template/sidebar.svelte';
	import '../app.postcss';

	let { children } = $props();
</script>

<div>
	<Header />
	<div>
		<Sidebar />
		<main class="bg-gray-25 flex-1">
			{@render children()}
		</main>
	</div>
</div>
