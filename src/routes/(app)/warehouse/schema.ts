import { z } from 'zod';

export const formSchema = z.object({
	warehouseCode: z.string().min(1, 'Warehouse code is required').max(50),
	warehouseName: z.string().min(1, 'Warehouse name is required').max(100)
});

export type FormSchema = typeof formSchema;
