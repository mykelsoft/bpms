import { writable } from 'svelte/store';

export const authStore = writable<{
    accessToken: string | null,
    refreshToken: string | null
} | null>(null);

export const setAuth = (auth: {
    accessToken: string | null,
    refreshToken: string | null
}) => {
    authStore.set(auth);
}

export const getAuth = () => {
    return authStore.get();
}

export const clearAuth = () => {
    authStore.set(null);
}