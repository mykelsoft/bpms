import { formSchema } from './schema'
import { hydrate } from '@tanstack/svelte-query'
import { queryClient } from '$lib/helper/query-client'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'

export const load = async ({ data }) => {
    if (data.dehydratedState) {
        hydrate(queryClient, data.dehydratedState)
    }

    return {
        form: await superValidate(zod(formSchema))
    }
}