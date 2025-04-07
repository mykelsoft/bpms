import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
        adapter: adapter({
			maxDuration: 300,
			memory: 3008
		}),

		alias: {
			$components: './src/lib/components',
			$ui: './src/lib/components/ui',
			$hooks: './src/lib/hooks',
			$icons: './src/lib/icons',
			$routes: './src/routes',
			$routeComponents: './src/lib/components/routes',
			$routesApp: './src/routes/(app)',
			$stores: './src/lib/stores',
			$utils: './src/lib/utils'
		}
	}
};

export default config;
