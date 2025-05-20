import { fetchApi } from '$lib/helper/fetch-api';

// Types
export interface Warehouse {
    id: string;
    code: string;
    name: string;
    description?: string;
}

export interface CreateWarehouseInput {
    name: string;
    code: string;
    description?: string;
}

export interface UpdateWarehouseInput {
    id: string;
    code?: string;
    name?: string;
    description?: string;
}

export interface ListWarehousesInput {
    data?: {
        code?: string;
        name?: string;
    };
    skip?: number;
    take?: number;
}

// API Functions
export const warehouseApi = {
    async create(input: CreateWarehouseInput) {
        return fetchApi<Warehouse>('/warehouse/create', {
            method: 'POST',
            body: JSON.stringify(input)
        });
    },

    async list(input: ListWarehousesInput = {}) {
        const { data: filters = {}, skip = 0, take = 10 } = input;
        return fetchApi<Warehouse[]>('/warehouse/list', {
            method: 'POST',
            body: JSON.stringify({
                data: filters,
                skip,
                take
            })
        });
    },

    async update(input: UpdateWarehouseInput) {
        return fetchApi<Warehouse>('/warehouse/update', {
            method: 'POST',
            body: JSON.stringify(input)
        });
    },

    async delete(id: string) {
        return fetchApi<void>('/warehouse/delete', {
            method: 'POST',
            body: JSON.stringify({ id })
        });
    }
};
