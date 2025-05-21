import { PUBLIC_API_URL } from '$env/static/public';
import qs from 'qs';

interface ApiError extends Error {
    status?: number;
    code?: string;
}

export async function fetchApi<T>(
    path: string,
    params: Record<string, unknown> = {},
    options: RequestInit = {}
): Promise<T> {
    const {
        method = 'GET',
        headers = {},
        ...restOptions
    } = options;


    const queryParams = { ...params };

    // Construct URL with query parameters
    const url = new URL(path, PUBLIC_API_URL);
    const urlWithParams = queryParams ? `${url.href}?${qs.stringify(queryParams)}` : url.href;

    // Prepare headers
    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
        // ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers
    };

    try {
        const response = await fetch(urlWithParams, {
            method,
            headers: defaultHeaders,
            cache: 'no-store',
            ...restOptions
        });

        // Handle non-OK responses
        if (!response.ok) {
            const error: ApiError = new Error('API request failed');
            error.status = response.status;

            try {
                const errorData = await response.json();
                error.message = errorData.message || error.message;
                error.code = errorData.code;
            } catch {
                // If parsing error response fails, use status text
                error.message = response.statusText;
            }

            throw error;
        }

        // Handle empty responses
        if (response.status === 204) {
            return {} as T;
        }

        // Parse JSON response
        const data = await response.json();
        return data as T;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('An unexpected error occurred');
    }
}
