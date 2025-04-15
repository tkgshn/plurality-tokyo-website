import { notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase"
import PostCard from "@/components/PostCard"

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

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Posts tagged with: {tag.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <p>No posts found with this tag.</p>
        )}
      </div>
    </div>
  )
}
