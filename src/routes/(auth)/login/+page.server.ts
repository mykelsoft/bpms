import type { Actions, PageServerLoad } from './$types.js';
import { fail, redirect } from '@sveltejs/kit';

import { auth } from '$lib/stores/auth';
import { authApi } from '$lib/api/auth';
import { formSchema } from './schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

// Load the form
export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(formSchema))
    };
};

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(formSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        const session = await authApi.createSession(form.data);
        if (session) {
            event.cookies.set('access_token', session.accessToken, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
            })

            event.cookies.set('refresh_token', session.refreshToken, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
            })

            auth.setAccessToken(session.accessToken)
            auth.setRefreshToken(session.refreshToken)

            throw redirect(303, '/')
        }

        return fail(401, {
            form,
            error: 'Authentication failed'
        });
    }
};
