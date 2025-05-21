// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            user: {
                id: string;
                username: string;
                email: string;
                firstName: string;
                lastName: string;
                contactNo: string;
                warehouse: string | null;
                role: string;
                dateTimeCreated: string;
                dateTimeUpdated: string;
            } | null;
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export { };
