import { Metadata } from 'next'
import { getAllEvents } from '@/lib/content'
import PageHeader from "@/components/page-header"
import EventList from '@/components/EventList'

export const metadata: Metadata = {
  title: 'Events',
  description: 'List of upcoming and past events by Plurality Tokyo',
}

export default function EventsPage() {
  const allEvents = getAllEvents()

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
        <PageHeader title="Events" backLink={{ href: "/", label: "Home" }} />
        <EventList events={allEvents} />
      </div>
    </div>
  )
}
