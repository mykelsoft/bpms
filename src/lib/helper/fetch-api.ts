import { API_URL } from '$env/static/private';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetchOptions extends RequestInit {
    method?: HttpMethod;
    params?: Record<string, string>;
}

interface ApiError extends Error {
    status?: number;
    code?: string;
}

export async function fetchApi<T>(
    endpoint: string,
    options: FetchOptions = {}
): Promise<T> {
    const {
        method = 'GET',
        params,
        headers = {},
        ...restOptions
    } = options;

    // Construct URL with query parameters
    const url = new URL(`${API_URL}${endpoint}`);
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
    }

    // Get the session token
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    // Prepare headers
    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers
    };

    try {
        const response = await fetch(url.toString(), {
            method,
            headers: defaultHeaders,
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

// Example usage:
/*
// GET request
const data = await fetchApi<MyType>('/endpoint', {
    params: { filter: 'value' }
});

// POST request
const result = await fetchApi<ResponseType>('/endpoint', {
    method: 'POST',
    body: JSON.stringify(payload)
});

// With custom headers
const response = await fetchApi<MyType>('/endpoint', {
    headers: {
        'Custom-Header': 'value'
    }
});
*/
