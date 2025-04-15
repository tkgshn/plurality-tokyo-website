import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"
import { getEventBySlug } from "@/lib/content"
import { EventContent } from "@/types/content"
import { Metadata } from "next"
import ReactMarkdown from "react-markdown"

interface EventPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  try {
    const event = getEventBySlug(params.slug)
    return {
      title: event.metadata.title,
      description: event.metadata.description,
      openGraph: {
        title: event.metadata.title,
        description: event.metadata.description,
        images: event.metadata.cover_image_url ? [event.metadata.cover_image_url] : [],
      },
    }
  } catch {
    return {
      title: "Event not found",
      description: "The event you're looking for doesn't exist",
    }
  }
}

export default function EventPage({ params }: EventPageProps) {
  // Fetch event data
  let event: EventContent
  try {
    event = getEventBySlug(params.slug)
  } catch (error) {
    notFound()
  }

  if (!event) {
    notFound()
  }

  // Check if event has ended
  const isEnded = event.metadata.end_date
    ? new Date(event.metadata.end_date) < new Date()
    : new Date(event.metadata.date) < new Date()

  // Format date for display
  const formatEventDate = (startDate: string, endDate?: string) => {
    const start = new Date(startDate)

    if (!endDate)
      return start.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })

    const end = new Date(endDate)

    // If same day event
    if (start.toDateString() === end.toDateString()) {
      return `${start.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })} ${start.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })} - ${end.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })}`
    }

    // Multi-day event
    return `${start.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })} - ${end.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`
  }

  // Extract YouTube video ID if present
  const getYoutubeEmbedUrl = (url?: string) => {
    if (!url) return null

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)

    return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null
  }

  const youtubeEmbedUrl = getYoutubeEmbedUrl(event.metadata.video_url)

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <PageHeader
            title={event.metadata.title}
            backLink={{ href: "/events", label: "Back to Events" }}
            className="mb-0"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            {isEnded && (
              <div className="text-red-500 font-bold text-xl mb-8">
                THIS EVENT HAS ENDED, Thank you
              </div>
            )}

            <div className="border-t border-gray-800 my-8"></div>

            {event.metadata.date && (
              <div className="mb-4 text-xl">
                {formatEventDate(event.metadata.date, event.metadata.end_date)}
              </div>
            )}

            {event.metadata.location && <div className="mb-8 text-xl">{event.metadata.location}</div>}

            <div className="text-gray-300 mb-12 text-lg whitespace-pre-line">{event.metadata.description}</div>

            <div className="flex flex-wrap gap-4 mb-12">
              {event.metadata.report_url && (
                <Button asChild className="bg-lime-400 text-black hover:bg-lime-500">
                  <Link href={event.metadata.report_url} target="_blank">
                    Event report
                  </Link>
                </Button>
              )}
              {event.metadata.event_page_url && (
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  <Link href={event.metadata.event_page_url} target="_blank">
                    Event page
                  </Link>
                </Button>
              )}
            </div>

            {/* YouTube video */}
            {youtubeEmbedUrl && (
              <div className="mt-12 mb-16">
                <div className="aspect-video w-full">
                  <iframe
                    src={youtubeEmbedUrl}
                    title={event.metadata.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            )}

            {/* Event Content using ReactMarkdown */}
            <div className="prose prose-invert max-w-none space-y-8">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-4xl font-bold mb-6">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-3xl font-bold mb-6 mt-12">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-2xl font-bold mb-4 mt-8">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-lg leading-relaxed text-gray-300 mb-4">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 text-gray-300 mb-4">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-lg leading-relaxed">{children}</li>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lime-400 hover:text-lime-300 underline"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {event.content}
              </ReactMarkdown>
            </div>

            {/* Attendees section */}
            {(event.metadata.speakers_count || event.metadata.attendees_count) && (
              <div className="mt-16">
                <h2 className="text-4xl font-bold mb-6">Attendees</h2>

                {event.metadata.video_url && !youtubeEmbedUrl && (
                  <p className="text-gray-300 mb-6">
                    Video available soon.
                  </p>
                )}

                <div className="grid grid-cols-2 gap-8 mt-8">
                  {event.metadata.speakers_count && (
                    <div className="text-center">
                      <div className="text-5xl font-bold mb-2">{event.metadata.speakers_count}</div>
                      <div className="text-gray-400">speakers</div>
                    </div>
                  )}
                  {event.metadata.attendees_count && (
                    <div className="text-center">
                      <div className="text-5xl font-bold mb-2">{event.metadata.attendees_count}+</div>
                      <div className="text-gray-400">participated</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar / Event image */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {event.metadata.cover_image_url && (
                <div className="rounded-lg overflow-hidden mb-8">
                  <Image
                    src={event.metadata.cover_image_url || "/placeholder.svg"}
                    alt={event.metadata.title}
                    width={600}
                    height={400}
                    className="w-full"
                  />
                </div>
              )}

              {/* Speakers */}
              {event.metadata.speakers && event.metadata.speakers.length > 0 && (
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Speakers</h3>
                  <div className="space-y-4">
                    {event.metadata.speakers.map((speaker, index) => (
                      <div key={index} className="flex items-center gap-3">
                        {speaker.avatar_url && (
                          <div className="h-12 w-12 rounded-full overflow-hidden relative">
                            <Image
                              src={speaker.avatar_url}
                              alt={speaker.name || "Speaker"}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{speaker.name}</div>
                          {speaker.role && (
                            <div className="text-sm text-gray-400">{speaker.role}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
