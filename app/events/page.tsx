import { Metadata } from 'next'
import { getAllEvents } from '@/lib/content'
import PageHeader from "@/components/page-header"
import EventList from '@/components/EventList'

export const metadata: Metadata = {
  title: 'イベント',
  description: 'Plurality Tokyoが主催する今後のイベントと過去のイベント一覧',
}

export default function EventsPage() {
  const allEvents = getAllEvents()

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
        <PageHeader title="イベント" backLink={{ href: "/", label: "ホーム" }} />
        <EventList events={allEvents} />
      </div>
    </div>
  )
}
