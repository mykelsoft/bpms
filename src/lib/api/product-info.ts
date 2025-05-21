import { fetchApi } from '$lib/helper/fetch-api';

// Types
export interface Product {
    id: string;
    partNumber: string;
    name: string;
    description?: string;
    addedBy: string;
}

export interface CreateProductInput {
    id?: string;
    partNumber: string;
    name: string;
    description?: string;
}

export interface UpdateProductInput {
    id: string;
    name?: string;
    description?: string;
}

export interface ListProductsInput {
    skip?: number;
    take?: number;
    data?: {
        name?: string;
    };
}

// API Functions
export const productInfoApi = {
    async create(input: CreateProductInput) {
        return fetchApi<Product>('/product-info/create', {
            method: 'POST',
            body: JSON.stringify(input)
        });
    },

    async list(input: ListProductsInput = {}) {
        const { skip = 0, take = 10, data: filters = {} } = input;
        return fetchApi<Product[]>('/product-info/list', {
            method: 'POST',
            body: JSON.stringify({
                data: filters,
                skip,
                take
            })
        });
    },

    async update(input: UpdateProductInput) {
        return fetchApi<Product>('/product-info/update', {
            method: 'POST',
            body: JSON.stringify(input)
        });
    },

    async delete(id: string) {
        return fetchApi<void>('/product-info/delete', {
            method: 'POST',
            body: JSON.stringify({ id })
        });
    }
};
