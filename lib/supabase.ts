// Mock Supabase client for build
export const createServerSupabaseClient = () => {
    return {
        auth: {
            getSession: () => Promise.resolve({ data: { session: null } })
        },
        from: (table: string) => ({
            select: (query: string, options?: any) => {
                return Promise.resolve({
                    data: [],
                    count: 0,
                    error: null
                })
            }
        })
    }
}
