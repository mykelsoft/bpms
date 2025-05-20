import { fetchApi } from '$lib/helper/fetch-api';
// Types
export type TicketType = 'ISSUE' | 'REQUEST' | 'INQUIRY' | 'TRANSFER';
export type TicketStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface TicketItem {
    material: string;
    quantity: number;
    lotCode?: string;
    expirationDate?: string;
}

export interface Ticket {
    id: string;
    type: TicketType;
    status: TicketStatus;
    destinationWarehouse: string;
    originWarehouse: string;
    receivedBy?: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    items: TicketItem[];
}

export interface CreateTicketInput {
    title: string;
    description: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
    status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
    type: 'ISSUE' | 'REQUEST' | 'INQUIRY';
    assignedTo?: string;
    relatedEntities?: {
        materialId?: string;
        warehouseId?: string;
        productId?: string;
    };
}

export interface ListTicketsInput {
    skip?: number;
    take?: number;
    data?: {
        status?: TicketStatus;
        type?: TicketType;
    };
}

export interface UpdateTicketInput {
    id: string;
    type?: TicketType;
    destinationWarehouse?: string;
    status?: TicketStatus;
    receivedBy?: string;
    items?: TicketItem[];
    originWarehouse?: string;
}

// API Functions
export const ticketApi = {
    async create(input: CreateTicketInput) {
        return fetchApi<Ticket>('/ticket/create', {
            method: 'POST',
            body: JSON.stringify(input)
        });
    },

    async list(input: ListTicketsInput = {}) {
        const { skip = 0, take = 10, data: filters = {} } = input;
        return fetchApi<Ticket[]>('/ticket/list', {
            method: 'POST',
            body: JSON.stringify({
                data: filters,
                skip,
                take
            })
        });
    },

    async update(input: UpdateTicketInput) {
        return fetchApi<Ticket>('/ticket/update', {
            method: 'POST',
            body: JSON.stringify(input)
        });
    },

    async delete(id: string) {
        return fetchApi<void>('/ticket/delete', {
            method: 'POST',
            body: JSON.stringify({ id })
        });
    },

    async approve(id: string) {
        return fetchApi<Ticket>('/ticket/approve', {
            method: 'POST',
            body: JSON.stringify({ id })
        });
    },

    async cancel(id: string) {
        return fetchApi<Ticket>('/ticket/cancel', {
            method: 'POST',
            body: JSON.stringify({ id })
        });
    }
};
