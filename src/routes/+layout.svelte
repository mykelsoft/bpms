<script lang="ts">
	import '../app.postcss';

	import { browser } from '$app/environment';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import { Toaster } from '$ui/sonner';
	import 'nprogress/nprogress.css';
	import NProgress from 'nprogress';

	import { beforeNavigate, afterNavigate } from '$app/navigation';

	let { children } = $props();

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	NProgress.configure({
		// Full list:
		minimum: 0.16
	});

	$effect(() => {
		const unsubscribe = beforeNavigate(() => {
			NProgress.start();
		});

		afterNavigate(() => {
			NProgress.done();
		});

		return unsubscribe;
	});
</script>

{#if children}
	<QueryClientProvider client={queryClient}>
		{@render children()}
		<SvelteQueryDevtools />
	</QueryClientProvider>
{:else}
	<p>fallback content</p>
{/if}

<Toaster />
