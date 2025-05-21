export type InventoryItem = {
    id: string;
    itemNo: number;
    partNumber: string;
    description: string;
    quantity: number;
    units: string;
};

export type Units = 'kg' | 'g' | 'ml' | 'l' | 'pcs';