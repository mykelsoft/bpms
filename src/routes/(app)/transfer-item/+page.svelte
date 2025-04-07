<script lang="ts">
	import { setPageTitle } from '$lib/context';

	$effect(() => {
		setPageTitle('Transfer Item');
	});
</script>

<div class="container mx-auto px-4 py-8">
	<div class="rounded-lg bg-white p-6 shadow">
		<h2 class="mb-4 text-2xl font-semibold">Item Transfer</h2>
		<p class="text-gray-600">This page will contain the form for transferring items between locations.</p>
	</div>
</div>
