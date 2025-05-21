import type { InventoryItem } from '$lib/types';
import { writable } from 'svelte/store';

export interface InventoryItem {
    id: string;
    itemNo: number;
    partNumber: string;
    description: string;
    quantity: number;
    units: string;
}

const initialData: InventoryItem[] = [
    {
        id: '1',
        itemNo: 1,
        partNumber: 'NT.SWTPO.011',
        description: 'sweet potato, cubed',
        quantity: 200,
        units: 'Kg'
    },
    {
        id: '2',
        itemNo: 2,
        partNumber: 'PR.FISH1.001',
        description: 'fish sauce',
        quantity: 0.75,
        units: 'L'
    },
    {
        id: '3',
        itemNo: 3,
        partNumber: 'VG.ONION.002',
        description: 'red onion, diced',
        quantity: 5,
        units: 'Kg'
    },
    {
        id: '4',
        itemNo: 4,
        partNumber: 'SP.CHILI.003',
        description: 'chili powder',
        quantity: 0.5,
        units: 'Kg'
    },
    {
        id: '5',
        itemNo: 5,
        partNumber: 'GR.RICE1.001',
        description: 'jasmine rice',
        quantity: 25,
        units: 'Kg'
    },
    {
        id: '6',
        itemNo: 6,
        partNumber: 'MT.CHICK.002',
        description: 'chicken breast, sliced',
        quantity: 10,
        units: 'Kg'
    },
    {
        id: '7',
        itemNo: 7,
        partNumber: 'VG.GARLI.001',
        description: 'garlic, minced',
        quantity: 1,
        units: 'Kg'
    }
];

export const inventory = writable<InventoryItem[]>(initialData);

// Helper functions to manage inventory
export const inventoryStore = {
    subscribe: inventory.subscribe,
    addItem: (item: InventoryItem) => {
        inventory.update(items => [...items, item]);
    },
    updateItem: (id: string, updatedItem: Partial<InventoryItem>) => {
        inventory.update(items =>
            items.map(item =>
                item.id === id ? { ...item, ...updatedItem } : item
            )
        );
    },
    removeItem: (id: string) => {
        inventory.update(items => items.filter(item => item.id !== id));
    },
    getItemByPartNumber: (partNumber: string) => {
        let result: InventoryItem | undefined;
        inventory.subscribe(items => {
            result = items.find(item => item.partNumber === partNumber);
        })();
        return result;
    }
};