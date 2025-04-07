import { z } from "zod";

export const formSchema = z.object({
    partNumber: z.string().min(1, 'Part number is required').max(50),
    description: z.string().min(1, 'Description is required').max(200),
    brand: z.string().min(1, 'Brand is required').max(50)
});

export type FormSchema = typeof formSchema;
