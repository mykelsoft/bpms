import { writable } from 'svelte/store';

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
}

function createAuthStore() {
    const { subscribe, set, update } = writable<AuthState>({
        accessToken: null,
        refreshToken: null,
    });

    return {
        subscribe,
        setAccessToken: (token: string) => {
            update(state => ({
                ...state,
                accessToken: token
            }));
        },
        setRefreshToken: (token: string) => {
            update(state => ({
                ...state,
                refreshToken: token
            }));
        },
        clearAccessToken: () => {
            set({
                accessToken: null,
                refreshToken: null
            });
        },
        getAccessToken: () => {
            let token: string | null = null;
            subscribe(state => {
                token = state.accessToken;
            })();
            return token;
        },
        getRefreshToken: () => {
            let token: string | null = null;
            subscribe(state => {
                token = state.refreshToken;
            })();
            return token;
        }
    };
}

export const auth = createAuthStore();
