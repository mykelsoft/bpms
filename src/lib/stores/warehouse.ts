import type { Warehouse } from "$lib/api/warehouse";
import { writable } from "svelte/store";

function createWarehouseStore() {
    const { subscribe, update } = writable<Warehouse[]>([]);

    return {
        subscribe,
        addWarehouse: (warehouse: Warehouse) => {
            update(warehouses => [...warehouses, warehouse]);
        },
        updateWarehouse: (warehouse: Warehouse) => {
            update(warehouses => warehouses.map(w => w.id === warehouse.id ? warehouse : w));
        },
        deleteWarehouse: (id: string) => {
            update(warehouses => warehouses.filter(w => w.id !== id));
        }
    }
}

export const warehouseStore = createWarehouseStore();