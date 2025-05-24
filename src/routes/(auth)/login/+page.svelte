<script lang="ts">
	import Login from '$routeComponents/login/index.svelte';
	import type { PageData } from './$types.js';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="flex justify-center p-24">
	<Login {data} />
</div>
