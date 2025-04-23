import { Metadata } from 'next'
import { getAllEvents } from '@/lib/content'
import { EventList } from '@/components/EventList'
import { cookies } from 'next/headers'
import { Locale, defaultLocale, translate } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Events organized by Plurality Tokyo',
}

export default function EventsPage() {
  // サーバーサイドでロケールを取得
  const cookieStore = cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE');
  const locale = (localeCookie?.value || defaultLocale) as Locale;

  const t = (key: string) => translate(locale, key);
  const allEvents = getAllEvents();

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6">
          {t('navigation.events')}
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold mt-12 mb-8">
          {t('home.upcomingEvents')}
        </h2>
        <EventList
          events={allEvents}
          showPast={false}
          showUpcoming={true}
          showHeaders={false}
        />

        <h2 className="text-2xl sm:text-3xl font-bold mt-24 mb-8">
          {t('home.pastEvents')}
        </h2>
        <EventList
          events={allEvents}
          showPast={true}
          showUpcoming={false}
          showHeaders={false}
        />
      </div>
    </div>
  )
}
