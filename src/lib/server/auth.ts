import type { RequestEvent } from '@sveltejs/kit'
import { accountApi } from '$lib/api/account'

export const authenticateUser = async (event: RequestEvent) => {
    // get the cookies from the request
    const { cookies } = event

    // get the user token from the cookie
    const accessToken = cookies.get('access_token')

    if (!accessToken) {
        return null
    }

    const user = await accountApi.getSelf(accessToken);


    return user
}

export const logoutUser = async (event: RequestEvent) => {
    const { cookies } = event;
    cookies.delete('access_token', { path: '/' });
}