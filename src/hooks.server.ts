import { authenticateUser } from '$lib/server/auth'
import { redirect, type Handle } from '@sveltejs/kit'
import { PROTECTED_ROUTES, AUTH_ROUTES } from '$lib/constant'

export const handle: Handle = async ({ event, resolve }) => {
    // Stage 1
    event.locals.user = await authenticateUser(event);

    // Handle root path as an app route
    if (PROTECTED_ROUTES.includes(event.url.pathname)) {
        if (!event.locals.user) {
            throw redirect(303, '/login')
        }
    }

    if (AUTH_ROUTES.includes(event.url.pathname)) {
        if (event.locals.user) {
            throw redirect(303, '/')
        }
    }

    // Stage 2
    const response = await resolve(event)

    // Stage 3
    return response
}