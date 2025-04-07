<script lang="ts">
	import SectionCards from '$components/section-cards.svelte';
	import { setPageTitle } from '$lib/context';

	$effect(() => {
		setPageTitle('Dashboard');
	});
</script>

<SectionCards />
