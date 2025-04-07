import { z } from 'zod';

export const formSchema = z.object({
	partNumber: z.string().min(1, 'Part number is required').max(50),
	productName: z.string().min(1, 'Product name is required').max(200),
	description: z.string().min(1, 'Description is required').max(50)
});

export type FormSchema = typeof formSchema;
