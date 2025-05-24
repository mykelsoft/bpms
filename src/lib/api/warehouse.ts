import { PUBLIC_API_URL } from '$env/static/public';

// Types
export interface Warehouse {
    id: string;
    code: string;
    name: string;
}

export interface CreateWarehouseInput {
    code: string;
    name: string;
}

export interface UpdateWarehouseInput {
    id: string;
    code: string;
    name: string;
}

export interface DeleteWarehouseInput {
    id: string;
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
export const warehouseApi = (accessToken: string) => ({
    create: async (input: CreateWarehouseInput) => {
        const response = await fetch(`${PUBLIC_API_URL}/warehouse/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify(input)
        });

        const responseText = await response.text();

        if (!response.ok) {
            console.error('Update Warehouse Error:', {
                status: response.status,
                statusText: response.statusText,
                error: responseText
            });
            return null;
        }

        try {
            const data = responseText ? JSON.parse(responseText) : null;
            return data;
        } catch (error) {
            console.error('JSON Parse Error:', {
                error,
                responseText
            });
            return null;
        }
    },

    list: async () => {
        const response = await fetch(`${PUBLIC_API_URL}/warehouse/list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            },
        });

        if (!response.ok) {
            return null;
        }

        return response.json();
    },

    update: async (input: UpdateWarehouseInput) => {
        const response = await fetch(`${PUBLIC_API_URL}/warehouse/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: input.id,
                code: input.code,
                name: input.name
            })
        });

        const responseText = await response.text();

        if (!response.ok) {
            console.error('Update Warehouse Error:', {
                status: response.status,
                statusText: response.statusText,
                error: responseText
            });
            return null;
        }

        try {
            const data = responseText ? JSON.parse(responseText) : null;
            return data;
        } catch (error) {
            console.error('JSON Parse Error:', {
                error,
                responseText
            });
            return null;
        }
    },

    delete: async (id: string) => {
        const response = await fetch(`${PUBLIC_API_URL}/warehouse/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify({ id }),
        });


        const responseText = await response.text();

        if (!response.ok) {
            console.error('Update Warehouse Error:', {
                status: response.status,
                statusText: response.statusText,
                error: responseText
            });
            return null;
        }

        try {
            const data = responseText ? JSON.parse(responseText) : null;
            return data;
        } catch (error) {
            console.error('JSON Parse Error:', {
                error,
                responseText
            });
            return null;
        }
    }
});