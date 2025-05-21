import { fetchApi } from '$lib/helper/fetch-api';

// Types
export interface Material {
    id: string;
    partNumber: string;
    name: string;
    description?: string;
    brand?: string;
    unit: string;
}

export interface CreateMaterialInput {
    id?: string;
    partNumber: string;
    name: string;
    description?: string;
    brand?: string;
    unit: string;
}

export interface UpdateMaterialInput {
    id: string;
    name?: string;
    description?: string;
    unit?: string;
}

export interface ListMaterialsInput {
    data?: {
        partNumber?: string;
        name?: string;
        brand?: string;
        unit?: string;
    };
    skip?: number;
    take?: number;
}

// API Functions
export const materialInfoApi = {
    async create(input: CreateMaterialInput) {
        return fetchApi<Material>('/material-info/create', {
            method: 'POST',
            body: JSON.stringify(input)
        });
    },

    async list(input: ListMaterialsInput = {}) {
        const { data: filters = {}, skip = 0, take = 10 } = input;
        return fetchApi<Material[]>('/material-info/list', {
            method: 'POST',
            body: JSON.stringify({
                data: filters,
                skip,
                take
            })
        });
    },

    async update(input: UpdateMaterialInput) {
        return fetchApi<Material>('/material-info/update', {
            method: 'POST',
            body: JSON.stringify(input)
        });
    },

    async delete(id: string) {
        return fetchApi<void>('/material-info/delete', {
            method: 'POST',
            body: JSON.stringify({ id })
        });
    }
};
