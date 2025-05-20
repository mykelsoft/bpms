import { PUBLIC_API_URL } from '$env/static/public';
// Types
export interface SessionResponse {
    accessToken: string;
    refreshToken: string;
}

export interface CreateSessionInput {
    email: string;
    password: string;
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
        const token = btoa(`${input.email}:${input.password}`);

        const response = await fetch<SessionResponse>(`${PUBLIC_API_URL}/auth/session`, {
            method: 'POST',
            body: JSON.stringify({
                username: input.email,
                password: input.password
            }),
            headers: {
                Authorization: `Basic ${token}`,
                Accept: 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Login failed (${response.status}): ${errorText}`);
        }

        return response.json();
    },

    async refreshSession() {
        return await fetch<SessionResponse>(`${PUBLIC_API_URL}/auth/session:refresh`, {
            method: 'POST'
        });
    },

    async forgotPassword(input: ForgotPasswordInput) {
        return await fetch<{ key: string }>(`${PUBLIC_API_URL}/auth/forgotPassword`, {
            method: 'POST',
            body: JSON.stringify(input),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        });
    },

    async resetPassword(input: ResetPasswordInput) {
        return await fetch<void>(`${PUBLIC_API_URL}/auth/resetPassword`, {
            method: 'POST',
            body: JSON.stringify(input),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        });
    }
};
