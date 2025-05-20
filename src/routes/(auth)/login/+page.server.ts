import type { Actions, PageServerLoad } from './$types.js';

import { authApi } from '$lib/api/auth';
// import { authApi } from '$lib/api/auth';
import { formSchema } from './schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(formSchema))
    };
};

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(formSchema));

        if (!form.valid) {
            return fail(400, {
                form
            });
        }

        try {
            const session = await authApi.createSession(form.data);
            return { form, session };
        } catch (error) {
            return fail(401, {
                form,
                error: error instanceof Error ? error.message : 'Authentication failed'
            });
        }
    }
};
