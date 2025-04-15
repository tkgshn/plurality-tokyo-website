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
