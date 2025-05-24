import { z } from 'zod';

export const formSchema = z.object({
    code: z.string().min(1, 'Warehouse code is required'),
    name: z.string().min(1, 'Warehouse name is required')
});

export type FormSchema = typeof formSchema;
