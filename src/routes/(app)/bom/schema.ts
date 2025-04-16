import { z } from 'zod';

export const formSchema = z.object({
    productPartNumber: z.string().min(1, 'Product P/N is required').max(50),
    name: z.string().min(1, 'Name is required').max(100),
    description: z.string().min(1, 'Description is required').max(200),
    bomLevel: z.string().min(1, 'BOM Level is required').max(50),
    partNumber: z.string().min(1, 'Part number is required').max(50),
    quantity: z.string().min(1, 'Quantity is required').max(50),
    units: z.string().min(1, 'Units is required').max(50)
});

export type FormSchema = typeof formSchema;
