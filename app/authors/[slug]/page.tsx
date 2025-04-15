import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase"
import { formatDate } from "@/lib/utils"

export default async function AuthorPage({ params }: { params: { slug: string } }) {
  const supabase = createServerSupabaseClient()

  // Fetch author by slug
  const { data: author } = await supabase.from("authors").select("*").eq("slug", params.slug).single()

  if (!author) {
    notFound()
  }

  // Fetch posts by author
  const { data: posts } = await supabase
    .from("posts")
    .select(`
      id, 
      title, 
      slug, 
      short_description, 
      cover_image_url, 
      published_at
    `)
    .eq("author_id", author.id)
    .order("published_at", { ascending: false })

  // Fetch events where author is a speaker
  const { data: eventSpeakers } = await supabase
    .from("event_speakers")
    .select(`
      role,
      events(id, title, slug, start_date, cover_image_url, status)
    `)
    .eq("author_id", author.id)

  const events = eventSpeakers
    ?.map((es) => ({ ...es.events, role: es.role }))
    .filter((event) => event)
    .sort((a, b) => {
      if (!a.start_date || !b.start_date) return 0
      return new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
    })

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col md:flex-row md:items-center gap-8 mb-12">
          <div className="relative h-32 w-32 md:h-48 md:w-48 flex-shrink-0">
            {author.avatar_url ? (
              <Image
                src={author.avatar_url || "/placeholder.svg"}
                alt={author.name}
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <div className="h-full w-full rounded-full bg-primary"></div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{author.name}</h1>
            {author.role && <p className="text-lg text-muted-foreground mb-4">{author.role}</p>}
            {author.bio && <p className="text-muted-foreground">{author.bio}</p>}
          </div>
        </div>

        {posts && posts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Posts</h2>
            <div className="space-y-12">
              {posts.map((post) => (
                <article key={post.id} className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="md:col-span-1">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={post.cover_image_url || "/placeholder.svg?height=400&width=600"}
                        alt={post.title}
                        fill
                        className="rounded-lg object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <div className="flex items-center gap-x-4 text-xs mb-2">
                      <time dateTime={post.published_at} className="text-muted-foreground">
                        {formatDate(post.published_at)}
                      </time>
                    </div>
                    <h3 className="text-xl font-bold mb-2 hover:text-primary">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-muted-foreground line-clamp-3">{post.short_description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {events && events.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8">Events</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {events.map((event) => (
                <div key={event.id} className="flex flex-col">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={event.cover_image_url || "/placeholder.svg?height=400&width=600"}
                      alt={event.title}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center gap-x-4 text-xs mb-2">
                      <time dateTime={event.start_date} className="text-muted-foreground">
                        {formatDate(event.start_date)}
                      </time>
                      {event.role && <span className="text-primary">{event.role}</span>}
                    </div>
                    <h3 className="text-lg font-bold hover:text-primary">
                      <Link href={`/events/${event.slug}`}>{event.title}</Link>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
