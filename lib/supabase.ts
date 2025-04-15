// Mock Supabase client for build
export const createServerSupabaseClient = () => {
    return {
        auth: {
            getSession: () => Promise.resolve({ data: { session: null } })
        },
        from: (table: string) => ({
            select: () => ({
                count: "exact",
                head: true
            })
        })
    }
}
