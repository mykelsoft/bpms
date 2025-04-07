import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

const titleStore = writable<string>('Dashboard');

export function setPageTitle(newTitle: string) {
	titleStore.set(newTitle);
	setContext('title', titleStore);
}

export function getPageTitle() {
	return getContext<Writable<string>>('title') || titleStore;
}
