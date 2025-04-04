<script lang="ts">
	import { setContext } from 'svelte';

	// Constants
	const COOKIE_NAME = 'active_theme';
	const DEFAULT_THEME = 'default';

	// Create store for theme state
	const { initialTheme, children } = $props<{
		initialTheme?: string;
		children?: () => any;
	}>();
	let activeTheme = $state(initialTheme || DEFAULT_THEME);

	// Helper function to set theme cookie
	function setThemeCookie(theme: string) {
		if (typeof window === 'undefined') return;

		document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=31536000; SameSite=Lax; ${window.location.protocol === 'https:' ? 'Secure;' : ''}`;
	}

	// Function to update theme
	function setActiveTheme(theme: string) {
		activeTheme = theme;
	}

	// Make theme functions available via context
	setContext('theme', {
		getActiveTheme: () => activeTheme,
		setActiveTheme
	});

	// Effect for theme changes
	$effect(() => {
		setThemeCookie(activeTheme);

		if (typeof window !== 'undefined') {
			Array.from(document.body.classList)
				.filter((className) => className.startsWith('theme-'))
				.forEach((className) => {
					document.body.classList.remove(className);
				});

			document.body.classList.add(`theme-${activeTheme}`);

			if (activeTheme.endsWith('-scaled')) {
				document.body.classList.add('theme-scaled');
			}
		}
	});
</script>

{@render children?.()}
