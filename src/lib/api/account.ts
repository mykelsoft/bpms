import { fetchApi } from '$lib/helper/fetch-api';

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
    async getSelf() {
        return fetchApi<Account>('/account/self', {
            method: 'POST'
        });
    },

    async list(input: ListAccountsInput = {}) {
        const { data: filters = {}, limit = 10, offset = 0 } = input;
        return fetchApi<Account[]>('/account/list', {
            method: 'POST',
            body: JSON.stringify({
                data: filters,
                limit,
                offset
            })
        });
    },

    async create(input: CreateAccountInput) {
        return fetchApi<Account>('/account/create', {
            method: 'POST',
            body: JSON.stringify(input)
        });
    },

    async update(input: UpdateAccountInput) {
        return fetchApi<Account>('/account/update', {
            method: 'POST',
            body: JSON.stringify(input)
        });
    },

    async delete(id: string) {
        return fetchApi<void>('/account/delete', {
            method: 'POST',
            body: JSON.stringify({ id })
        });
    }
};
