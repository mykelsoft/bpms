import { PUBLIC_API_URL } from '$env/static/public';

// Types
export interface Account {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    contactNo: string;
    role: string;
}

export interface CreateAccountInput {
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    contactNo: string;
    role: string;
}

export interface UpdateAccountInput {
    id: string;
    email?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    contactNo?: string;
    role?: string;
}

export interface ListAccountsInput {
    data?: {
        role?: string;
    };
    limit?: number;
    offset?: number;
}

// API Functions
export const accountApi = {
    async getSelf(accessToken: string) {
        const response = await fetch(`${PUBLIC_API_URL}/account/self`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            return null;
        }

        return response.json();
    },

    async list(input: ListAccountsInput = {}) {
        const { data: filters = {}, limit = 10, offset = 0 } = input;
        return fetch<Account[]>(`${PUBLIC_API_URL}/account/list`, {
            method: 'POST',
            body: JSON.stringify({
                data: filters,
                limit,
                offset
            })
        });
    },

    async create(input: CreateAccountInput) {
        return fetch<Account>(`${PUBLIC_API_URL}/account/create`, {
            method: 'POST',
            body: JSON.stringify(input)
        });
    },

    async update(input: UpdateAccountInput) {
        return fetch<Account>(`${PUBLIC_API_URL}/account/update`, {
            method: 'POST',
            body: JSON.stringify(input)
        });
    },

    async delete(id: string) {
        return fetch<void>(`${PUBLIC_API_URL}/account/delete`, {
            method: 'POST',
            body: JSON.stringify({ id })
        });
    }
};
