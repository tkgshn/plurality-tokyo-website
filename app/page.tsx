import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getAllArticles } from "@/lib/articles"
import { CurationItem } from "@/components/CurationItem"
import PageHeader from "@/components/page-header"
import { Globe, Users, Calendar, ArrowRight, CalendarDays, ExternalLink } from "lucide-react"
import { getAllEvents } from "@/lib/content"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Plurality Tokyo",
  description: "A community exploring the concept of Plurality in Tokyo, Japan",
}

export default function Home() {
  const articles = getAllArticles()
  const allEvents = getAllEvents()
  const now = new Date()

  // Sort events by date (most recent first)
  const sortedEvents = [...allEvents].sort((a, b) =>
    new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  )

  // Get upcoming events (events with a date in the future)
  const upcomingEvents = sortedEvents
    .filter(event =>
      new Date(event.metadata.date) >= now ||
      (event.metadata.end_date && new Date(event.metadata.end_date) >= now)
    )
    .slice(0, 3) // Get only the 3 most recent upcoming events

  // イベントセクションの画像パスを一時的にUnsplashのプレースホルダー画像に変更
  const events = [
    {
      title: 'Glen in Japan 2024',
      date: '2024-03-15',
      description: 'Glen Weylと共に...',
      image: 'https://images.unsplash.com/photo-1555169062-013468b47731?q=80&w=2000&auto=format&fit=crop',
      link: '/events/glen-in-japan-2024'
    },
    {
      title: 'FTC Tokyo 2024',
      date: '2024-04-20',
      description: 'FTCカンファレンス...',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=2000&auto=format&fit=crop',
      link: '/events/ftc-tokyo-2024'
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
        {/* <PageHeader title="Plurality Tokyo" /> */}

        {/* Hero Section */}
        <section className="mb-24">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            Plurality Tokyo
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl">
            A community exploring new social technological ideas in Japan, connecting global theory with local practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-lime-400 text-black hover:bg-lime-500">
              <Link href="/events">Explore Events</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <Link href="https://discord.com/invite/y4QXe6KtHh" target="_blank" rel="noopener noreferrer">
                Join Discord
              </Link>
            </Button>
          </div>
        </section>

        {/* Plurality Book Section */}
        <section className="bg-white text-black py-12 rounded-xl overflow-hidden my-12">
          <div className="mx-auto max-w-4xl px-4 lg:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h2 className="text-xl font-bold mb-3">Plurality Book is NOW available!</h2>
                <p className="text-gray-600 mb-3 text-sm">
                  Audrey Tang's "PLURALITY: Collaborative Technology and the Future of Democracy" presents a new vision for democracy in the digital age. <span className="font-bold text-black">The Japanese translation is now available.</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className="bg-black text-white hover:bg-gray-800 text-sm">
                    <Link
                      href="https://www.amazon.co.jp/dp/4909044574"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      Buy on Amazon JP
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="bg-white border-black text-black hover:bg-black hover:text-white text-sm">
                    <Link
                      href="https://www.plurality.net/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      Official Website
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative w-full max-w-[200px] mx-auto">
                <Image
                  src="/images/plurality-book.jpg"
                  alt="PLURALITY: Collaborative Technology and the Future of Democracy by Audrey Tang"
                  width={200}
                  height={267}
                  className="rounded-lg shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* What's the Plurality Tokyo? */}
        <section className="mb-24">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">What's the Plurality Tokyo?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <Calendar className="h-8 w-8 text-lime-400 mr-3" />
                <h3 className="text-xl font-bold">Conference</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Conferences held irregularly to promote discussions about plurality in Japan.
              </p>
              <Link href="/events" className="text-lime-400 hover:underline">
                View all events →
              </Link>
            </div>

            <div className="bg-gray-900 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-lime-400 mr-3" />
                <h3 className="text-xl font-bold">Discord group</h3>
              </div>
              <p className="text-gray-300 mb-4">
                An online community for daily discussions and exchange of ideas about plurality.
              </p>
              <Link
                href="https://discord.com/invite/y4QXe6KtHh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-400 hover:underline"
              >
                Join Discord →
              </Link>
            </div>

            <div className="bg-gray-900 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <Globe className="h-8 w-8 text-lime-400 mr-3" />
                <h3 className="text-xl font-bold">Meetup</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Smaller meetups held irregularly as a place for more intimate exchanges.
              </p>
              <Link href="https://scrapbox.io/plurality-tokyo/search/page?q=salon" target="_blank" rel="noopener noreferrer" className="text-lime-400 hover:underline">
                Check next meetup →
              </Link>
            </div>
          </div>
        </section>

        {/* News from the Ecosystem */}
        <section className="mb-24">
          <div className="flex justify-between items-end mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold">News from the Ecosystem</h2>
            <Link href="/articles" className="text-lime-400 hover:text-lime-300 flex items-center">
              See all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.slice(0, 3).map((item) => (
              <div key={item.id} className="bg-gray-900 p-6 rounded-lg">
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <h3 className="text-xl font-bold mb-3 hover:text-lime-400">{item.title}</h3>
                </Link>
                <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    {item.tags && item.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Previous Event */}
        <section>
          <div className="flex justify-between items-end mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold">Previous Event</h2>
            <Link href="/events" className="text-lime-400 hover:text-lime-300 flex items-center">
              See all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {sortedEvents.slice(0, 2).map((event) => (
              <div key={event.metadata.slug} className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1555169062-013468b47731?q=80&w=2000&auto=format&fit=crop"
                    alt={event.metadata.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">
                    <Link href={`/events/${event.metadata.slug}`} className="hover:text-lime-400">
                      {event.metadata.title}
                    </Link>
                  </h3>
                  <div className="flex items-center text-gray-400 mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(event.metadata.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}</span>
                  </div>
                  <p className="text-gray-300 mb-4 line-clamp-2">{event.metadata.description}</p>
                  <Link href={`/events/${event.metadata.slug}`} className="text-lime-400 hover:underline">
                    View details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Events Section */}
        {upcomingEvents.length > 0 && (
          <section className="bg-black text-white py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="text-3xl font-bold">Upcoming Events</h2>
                  <p className="text-gray-400 mt-2">Join us at one of our upcoming events</p>
                </div>
                <Link href="/events" className="text-lime-400 flex items-center hover:text-lime-300">
                  View all events <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event) => (
                  <Card key={event.metadata.slug} className="bg-gray-900 border-gray-800 overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=2000&auto=format&fit=crop"
                        alt={event.metadata.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center text-gray-400 text-sm mb-3">
                        <CalendarDays className="h-4 w-4 mr-2" />
                        {new Date(event.metadata.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-lime-400">{event.metadata.title}</h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{event.metadata.description}</p>

                      {event.metadata.speakers_count && (
                        <div className="flex items-center text-gray-400 text-sm mb-4">
                          <Users className="h-4 w-4 mr-2" />
                          {event.metadata.speakers_count} speakers
                        </div>
                      )}

                      <Button asChild className="w-full bg-gray-800 hover:bg-gray-700 mt-2">
                        <Link href={`/events/${event.metadata.slug}`}>
                          View Event Details
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Ecosystem Section */}
        <section className="bg-black text-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6">Our Ecosystem</h2>
            <p className="text-gray-300 mb-12 max-w-3xl">
              Plurality Tokyo connects with a global network of organizations and initiatives focused on innovative social technologies, digital democracy, and community governance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              <div className="bg-gray-900 p-6 rounded-lg">
                <Link href="https://plurality.institute/" target="_blank" rel="noopener noreferrer" className="block">
                  <h3 className="font-bold mb-2 hover:text-lime-400 flex items-center">
                    Plurality Institute
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </h3>
                  <p className="text-sm text-gray-400">Global organization researching and promoting Plurality principles.</p>
                </Link>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg">
                <Link href="https://www.radicalxchange.org/" target="_blank" rel="noopener noreferrer" className="block">
                  <h3 className="font-bold mb-2 hover:text-lime-400 flex items-center">
                    RadicalxChange
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </h3>
                  <p className="text-sm text-gray-400">Community exploring innovative social technologies for collective action.</p>
                </Link>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg">
                <Link href="https://fundingthecommons.io/" target="_blank" rel="noopener noreferrer" className="block">
                  <h3 className="font-bold mb-2 hover:text-lime-400 flex items-center">
                    Funding the Commons
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </h3>
                  <p className="text-sm text-gray-400">Initiative exploring new funding models for public goods.</p>
                </Link>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg">
                <Link href="https://scrapbox.io/hirotaiyohamada/Welcome_to_the_Decentralized_Science_(DeSci)_Tokyo_2023_Conference:_A_Brief_History_of_DeSci_Tokyo" target="_blank" rel="noopener noreferrer" className="block">
                  <h3 className="font-bold mb-2 hover:text-lime-400 flex items-center">
                    DeSci Tokyo
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </h3>
                  <p className="text-sm text-gray-400">Organization building decentralized infrastructure for scientific research.</p>
                </Link>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg">
                <Link href="https://smartnews-smri.com/research/research-2601/" target="_blank" rel="noopener noreferrer" className="block">
                  <h3 className="font-bold mb-2 hover:text-lime-400 flex items-center">
                    SMRI Digital Democracy Unit
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </h3>
                  <p className="text-sm text-gray-400">Research unit exploring the implementation and scalability of digital democracy mechanisms in Japan.</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Join Community Section */}
        <section className="bg-lime-400 text-black py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
            <p className="text-gray-800 mb-10 max-w-2xl mx-auto">
              Connect with other members interested in Plurality, stay updated about upcoming events, and participate in discussions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-black text-white hover:bg-gray-800">
                <Link href="https://discord.com/invite/y4QXe6KtHh" target="_blank" rel="noopener noreferrer">
                  Join Discord
                </Link>
              </Button>
              <Button asChild className="bg-black text-white hover:bg-gray-800">
                <Link href="/events">
                  Explore Events
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
