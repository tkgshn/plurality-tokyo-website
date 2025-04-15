import { redirect } from "next/navigation"
// import { createServerSupabaseClient } from "@/lib/supabase"
// import AdminDashboard from "@/components/admin/dashboard"

export default async function AdminPage() {
  // Temporarily disabled for production build
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-lg">This functionality is currently under maintenance.</p>
    </div>
  )

  /* Original functionality
  const supabase = createServerSupabaseClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login?redirect=/admin")
  }

  // Fetch counts for dashboard
  const [{ count: postsCount }, { count: eventsCount }, { count: authorsCount }] = await Promise.all([
    supabase.from("posts").select("*", { count: "exact", head: true }),
    supabase.from("events").select("*", { count: "exact", head: true }),
    supabase.from("authors").select("*", { count: "exact", head: true }),
  ])

  return <AdminDashboard postsCount={postsCount || 0} eventsCount={eventsCount || 0} authorsCount={authorsCount || 0} />
  */
}
