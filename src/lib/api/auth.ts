import { fetchApi } from '$lib/helper/fetch-api';

// Types
export interface SessionResponse {
    accessToken: string;
    refreshToken: string;
}

export interface CreateSessionInput {
    email: string;
    password: string;
    ttl?: string;
}

export interface ForgotPasswordInput {
    email: string;
    refUrl: string;
}

export interface ResetPasswordInput {
    key: string;
    password: string;
}

// API Functions
export const authApi = {
    async createSession(input: CreateSessionInput) {
        return fetchApi<SessionResponse>('/auth/session', {
            method: 'POST',
            body: JSON.stringify(input)
        });
    },

    async refreshSession() {
        return fetchApi<SessionResponse>('/auth/session:refresh', {
            method: 'POST'
        });
    },

    async forgotPassword(input: ForgotPasswordInput) {
        return fetchApi<{ key: string }>('/auth/forgotPassword', {
            method: 'POST',
            body: JSON.stringify(input)
        });
    },

    async resetPassword(input: ResetPasswordInput) {
        return fetchApi<void>('/auth/resetPassword', {
            method: 'POST',
            body: JSON.stringify(input)
        });
    }
};
