import type { Actions, PageServerLoad } from './$types.js';

import { dehydrate } from '@tanstack/svelte-query'
import { fail } from '@sveltejs/kit';
import { formSchema } from './schema';
import { queryClient } from '$lib/helper/query-client';
import { superValidate } from 'sveltekit-superforms';
import { warehouseApi, type Warehouse } from '$lib/api/warehouse';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async (event) => {
    const accessToken = event.cookies.get('access_token')

    await queryClient.prefetchQuery({
        queryKey: ['warehouses'],
        queryFn: warehouseApi(accessToken ?? '').list
    })

    return {
        dehydratedState: dehydrate(queryClient),
        form: await superValidate(zod(formSchema))
    };
};

export const actions: Actions = {
    default: async (event) => {
        const accessToken = event.cookies.get('access_token')
        const form = await superValidate(event, zod(formSchema));

        if (!form.valid) {
            return fail(400, {
                form
            });
        }

        // Check if warehouse code already exists
        const warehouses = await warehouseApi(accessToken ?? '').list();
        const existingWarehouse = warehouses?.find((w: Warehouse) => w.code === form.data.code);

        if (existingWarehouse) {
            return fail(400, {
                form,
                error: 'Warehouse code already exists'
            });
        }

        await warehouseApi(accessToken ?? '').create(form.data);

        return {
            form
        };
    },
};
