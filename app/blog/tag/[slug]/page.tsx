import { notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase"

export default async function TagPage({ params }: { params: { slug: string } }) {
  const supabase = createServerSupabaseClient()
  
  // Fetch tag by slug
  const { data: tag } = await supabase
    .from('tags')
    .select('*')
    .eq('slug', params.slug)
    .single()
  
  if (!tag) {
    notFound()
  }
  
  // Fetch posts with this tag
  const { data: postTags } = await supabase
    .from('post_tags')
    .select(`
      posts(
        id, 
        title, 
        slug, 
        short_description, 
        cover_image_url, 
        published_at,
        authors(id, name, avatar_url)
      )
    `)
    .eq('tag_id', tag.id)
  
  const posts = postTags
    ?.map(pt => pt.posts)
    .filter(post => post)
    .sort((a, b) => {
      if (!a.published_at || !b.published_at) return 0
      return new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    })
