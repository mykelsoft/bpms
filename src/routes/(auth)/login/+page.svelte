<script lang="ts">
	import Login from '$routeComponents/login/index.svelte';
	import type { PageData } from './$types.js';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex justify-center p-24">
	<Login {data} />
</div>
