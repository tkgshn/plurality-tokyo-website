import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase"
import PostForm from "@/components/admin/post-form"

export default async function NewPostPage() {
  const supabase = createServerSupabaseClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login?redirect=/admin/posts/new")
  }

  // Fetch authors for the form
  const { data: authors } = await supabase.from("authors").select("id, name").order("name")

  // Fetch tags for the form
  const { data: tags } = await supabase.from("tags").select("id, name").order("name")

  return <PostForm authors={authors || []} tags={tags || []} />
}
