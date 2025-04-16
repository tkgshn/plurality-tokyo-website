import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPersonBySlug, getAllEvents } from "@/lib/content"
import { formatDate } from "@/lib/utils"
import { Metadata } from "next"

interface AuthorPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  try {
    const person = getPersonBySlug(params.slug)
    return {
      title: `${person.metadata.title} | Plurality Tokyo`,
      description: person.metadata.description || `${person.metadata.title}のプロフィール`,
    }
  } catch (error) {
    return {
      title: "著者 | Plurality Tokyo",
      description: "著者プロフィール",
    }
  }
}

export default async function AuthorPage({ params }: { params: { slug: string } }) {
  try {
    // 人物情報を取得
    const person = getPersonBySlug(params.slug)

    // Eventsを取得
    const allEvents = getAllEvents()

    // この人物に関連するEventsを抽出
    const relatedEvents = allEvents.filter(event =>
      event.metadata.speakers &&
      event.metadata.speakers.some(speaker =>
        speaker.name.toLowerCase().includes(person.metadata.title.toLowerCase())
      )
    )

    return (
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col md:flex-row md:items-center gap-8 mb-12">
            <div className="relative h-32 w-32 md:h-48 md:w-48 flex-shrink-0">
              {person.metadata.image ? (
                <Image
                  src={person.metadata.image || "/placeholder.svg"}
                  alt={person.metadata.title}
                  fill
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="h-full w-full rounded-full bg-primary"></div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{person.metadata.title}</h1>
              {person.metadata.position && (
                <p className="text-lg text-muted-foreground mb-4">{person.metadata.position}</p>
              )}
              <div className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: person.content }} />

              {/* ソーシャルリンク */}
              {person.metadata.social && (
                <div className="flex gap-4 mt-4">
                  {person.metadata.social.twitter && (
                    <a href={`https://twitter.com/${person.metadata.social.twitter}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                      Twitter
                    </a>
                  )}
                  {person.metadata.social.linkedin && (
                    <a href={`https://linkedin.com/in/${person.metadata.social.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
                      LinkedIn
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {relatedEvents.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-8">Events</h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {relatedEvents.map((event) => (
                  <div key={event.metadata.slug} className="flex flex-col">
                    <div className="relative aspect-[16/9] w-full">
                      <Image
                        src={event.metadata.cover_image_url || "/placeholder.svg?height=400&width=600"}
                        alt={event.metadata.title}
                        fill
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center gap-x-4 text-xs mb-2">
                        <time dateTime={event.metadata.date} className="text-muted-foreground">
                          {formatDate(event.metadata.date)}
                        </time>
                        {event.metadata.speakers?.find(s =>
                          s.name.toLowerCase().includes(person.metadata.title.toLowerCase())
                        )?.role && (
                            <span className="text-primary">
                              {event.metadata.speakers.find(s =>
                                s.name.toLowerCase().includes(person.metadata.title.toLowerCase())
                              )?.role}
                            </span>
                          )}
                      </div>
                      <h3 className="text-lg font-bold hover:text-primary">
                        <Link href={`/events/${event.metadata.slug}`}>{event.metadata.title}</Link>
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
  } catch (error) {
    console.error("Error fetching person data:", error)
    return notFound()
  }
}
