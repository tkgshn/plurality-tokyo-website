import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"
import { getEventBySlug, getAllEvents, Event } from "@/lib/events"
import { EventContent } from "@/types/content"
import { Metadata } from "next"
import ReactMarkdown from "react-markdown"

interface EventPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event: Event = getEventBySlug(params.slug)
  return {
    title: `${event.title} | Plurality Tokyo`,
    description: event.description,
  }
}

export default function EventPage({ params }: EventPageProps) {
  const event: Event = getEventBySlug(params.slug)
  const fallbackImage = "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000"

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="relative h-64 md:h-96 mb-8">
        <Image
          src={event.coverImage || fallbackImage}
          alt={event.title}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>
      <h1 className="text-4xl font-bold mb-4">{event.title}</h1>

      {/* 日付と場所の表示 */}
      <div className="flex items-center text-gray-500 mb-6">
        <time dateTime={event.date} className="mr-4">
          {new Date(event.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
          {event.end_date && ` - ${new Date(event.end_date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}`}
        </time>
        {event.location && (
          <span className="flex items-center">
            <span className="mx-2">•</span>
            {event.location}
          </span>
        )}
      </div>

      {/* スピーカーの表示 */}
      {event.speakers && event.speakers.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Speakers</h2>
          <div className="flex flex-wrap gap-6">
            {event.speakers.map((speaker, index) => (
              <div key={index} className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3">
                  <Image
                    src={`/images/speakers/${speaker.name.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                    alt={speaker.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{speaker.name}</div>
                  {speaker.role && <div className="text-sm text-gray-500">{speaker.role}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>{event.content}</ReactMarkdown>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const events = getAllEvents()
  return events.map((event) => ({
    slug: event.slug,
  }))
}
