import type { LayoutServerLoad } from './$types.js';

export const load: LayoutServerLoad = async ({ locals }: { locals: App.Locals }) => {
    return {
        user: locals.user
    }
}
