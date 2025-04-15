import { redirect } from "next/navigation"
// import { createServerSupabaseClient } from "@/lib/supabase"
// import PostForm from "@/components/admin/post-form"

export default async function NewPostPage() {
  // Temporarily disabled for production build
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">New Post</h1>
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
    redirect("/login?redirect=/admin/posts/new")
  }

  return <PostForm />
  */
}
