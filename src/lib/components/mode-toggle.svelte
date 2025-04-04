<script>
	import { IconBrightness } from '@tabler/icons-svelte';

	const isBrowser = typeof window !== 'undefined';
	let theme = isBrowser ? (document.documentElement.classList.contains('dark') ? 'dark' : 'light') : 'light';

	// Function to toggle between light and dark theme
	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';

		if (isBrowser) {
			// Update the document class list
			document.documentElement.classList.toggle('dark', theme === 'dark');
			// Optionally store the preference in localStorage
			localStorage.setItem('theme', theme);
		}
	}
</script>

<button class="group/toggle variant-secondary btn btn-icon size-8" onclick={toggleTheme}>
	<IconBrightness />
	<span class="sr-only">Toggle theme</span>
</button>
