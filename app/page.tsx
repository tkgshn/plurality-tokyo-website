import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getAllArticles } from "@/lib/articles"
import { CurationItem } from "@/components/CurationItem"
import { Globe, Users, Calendar, ArrowRight, CalendarDays, ExternalLink, Building2, Lightbulb, BookOpen, Microscope, BarChart3 } from "lucide-react"
import { getAllEvents } from "@/lib/content"
import { Card, CardContent } from "@/components/ui/card"
import { EventList } from "@/components/EventList"

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

        {/* Plurality Tokyo Week Special Section */}
        <section className="bg-gray-900 py-16 rounded-3xl overflow-hidden my-20 relative">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2688&auto=format&fit=crop"
              alt="Tokyo cityscape at night"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>

          <div className="mx-auto max-w-6xl px-4 lg:px-6 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center gap-10">
              <div className="md:flex-1">
                <div className="inline-block bg-white text-black px-4 py-1 rounded-full text-sm font-bold mb-4">
                  Special Event
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Tokyo Plurality Week 2025</h2>
                <p className="text-gray-300 mb-8 max-w-xl leading-relaxed">
                  From May 6th to 12th, join us for a week of dialogue on plurality with Audrey Tang and E. Glen Weyl across Tokyo. Don't miss this special week featuring sessions at the University of Tokyo, Keio University, SusHi Tech Tokyo, and Tokyo College.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild className="bg-white text-black hover:bg-gray-200">
                    <Link href="/plurality-week">
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="md:flex-1 md:flex md:justify-end">
                <div className="bg-gray-800 rounded-lg p-6 shadow-xl w-full max-w-md transform rotate-1 border border-gray-700">
                  <div className="relative h-48 w-full mb-4 overflow-hidden rounded-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2000&auto=format&fit=crop"
                      alt="Tokyo College Conference"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-2 left-2">
                      <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white">
                        May 12th
                      </div>
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">Tokyo College Conference</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    The Future of Technology and Democracy
                  </p>
                  <div className="flex items-center text-gray-300 text-sm mb-1">
                    <CalendarDays className="w-4 h-4 mr-2" />
                    <span>May 12th, 2024 15:00-17:45</span>
                  </div>
                  <div className="flex items-center text-gray-300 text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    <span>Audrey Tang, Glen Weyl & others</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* What's the Plurality Tokyo? */}
        <section className="mb-24">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">What's the Plurality Tokyo?</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 bg-gray-900 p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-lime-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="bg-lime-500/10 p-3 rounded-xl">
                    <Calendar className="h-6 w-6 text-lime-400" />
                  </div>
                  <h3 className="text-xl font-bold ml-4">Conference</h3>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Conferences held irregularly to promote discussions about plurality in Japan.
                </p>
                <Link href="/events" className="inline-flex items-center text-lime-400 hover:text-lime-300 transition-colors">
                  View all events <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="flex-1 bg-gray-900 p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-lime-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="bg-lime-500/10 p-3 rounded-xl">
                    <Users className="h-6 w-6 text-lime-400" />
                  </div>
                  <h3 className="text-xl font-bold ml-4">Discord group</h3>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  An online community for daily discussions and exchange of ideas about plurality.
                </p>
                <Link
                  href="https://discord.com/invite/y4QXe6KtHh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-lime-400 hover:text-lime-300 transition-colors"
                >
                  Join Discord <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="flex-1 bg-gray-900 p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-lime-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="bg-lime-500/10 p-3 rounded-xl">
                    <Globe className="h-6 w-6 text-lime-400" />
                  </div>
                  <h3 className="text-xl font-bold ml-4">Meetup</h3>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Smaller meetups held irregularly as a place for more intimate exchanges.
                </p>
                <Link
                  href="https://scrapbox.io/plurality-tokyo/search/page?q=salon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-lime-400 hover:text-lime-300 transition-colors"
                >
                  Check next meetup <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
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

        {/* Events Section */}
        <section className="mb-24">
          <div className="flex justify-between items-end mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold">Events</h2>
            <Link href="/events" className="text-lime-400 hover:text-lime-300 flex items-center">
              See all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <EventList
            events={allEvents}
            showPast={true}
            showUpcoming={true}
            maxItems={3}
          />
        </section>

        {/* Ecosystem Section */}
        <section className="text-white py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6">Our Ecosystem</h2>
            <p className="text-gray-300 mb-10 max-w-3xl">
              Plurality Tokyo connects with a global network of organizations and initiatives focused on innovative social technologies, digital democracy, and community governance.
            </p>

            {/* ロゴスライダーセクション */}
            <div className="overflow-hidden py-8 relative">
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-950 to-transparent z-10"></div>
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-950 to-transparent z-10"></div>

              <div className="flex items-center space-x-20 overflow-hidden">
                <div className="flex items-center space-x-20 animate-scroll">
                  {/* Plurality Institute */}
                  <Link
                    href="https://plurality.institute/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center min-w-[120px] group"
                  >
                    <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md mb-3 transition-transform group-hover:scale-110 duration-300">
                      <Building2 className="w-10 h-10 text-lime-600" />
                    </div>
                    <span className="font-medium text-sm text-center group-hover:text-lime-400 transition-colors">Plurality Institute</span>
                  </Link>

                  {/* RadicalxChange */}
                  <Link
                    href="https://www.radicalxchange.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center min-w-[120px] group"
                  >
                    <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md mb-3 transition-transform group-hover:scale-110 duration-300">
                      <Lightbulb className="w-10 h-10 text-blue-600" />
                    </div>
                    <span className="font-medium text-sm text-center group-hover:text-blue-400 transition-colors">RadicalxChange</span>
                  </Link>

                  {/* Funding the Commons */}
                  <Link
                    href="https://fundingthecommons.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center min-w-[120px] group"
                  >
                    <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md mb-3 transition-transform group-hover:scale-110 duration-300">
                      <BookOpen className="w-10 h-10 text-purple-600" />
                    </div>
                    <span className="font-medium text-sm text-center group-hover:text-purple-400 transition-colors">Funding the Commons</span>
                  </Link>

                  {/* DeSci Tokyo */}
                  <Link
                    href="https://scrapbox.io/hirotaiyohamada/Welcome_to_the_Decentralized_Science_(DeSci)_Tokyo_2023_Conference:_A_Brief_History_of_DeSci_Tokyo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center min-w-[120px] group"
                  >
                    <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md mb-3 transition-transform group-hover:scale-110 duration-300">
                      <Microscope className="w-10 h-10 text-green-600" />
                    </div>
                    <span className="font-medium text-sm text-center group-hover:text-green-400 transition-colors">DeSci Tokyo</span>
                  </Link>

                  {/* SMRI Digital Democracy Unit */}
                  <Link
                    href="https://smartnews-smri.com/research/research-2601/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center min-w-[120px] group"
                  >
                    <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md mb-3 transition-transform group-hover:scale-110 duration-300">
                      <BarChart3 className="w-10 h-10 text-orange-600" />
                    </div>
                    <span className="font-medium text-sm text-center group-hover:text-orange-400 transition-colors">SMRI Digital Democracy Unit</span>
                  </Link>

                  {/* ループさせるために同じアイテムを繰り返し */}
                  {/* Plurality Institute */}
                  <Link
                    href="https://plurality.institute/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center min-w-[120px] group"
                  >
                    <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md mb-3 transition-transform group-hover:scale-110 duration-300">
                      <Building2 className="w-10 h-10 text-lime-600" />
                    </div>
                    <span className="font-medium text-sm text-center group-hover:text-lime-400 transition-colors">Plurality Institute</span>
                  </Link>

                  {/* RadicalxChange */}
                  <Link
                    href="https://www.radicalxchange.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center min-w-[120px] group"
                  >
                    <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md mb-3 transition-transform group-hover:scale-110 duration-300">
                      <Lightbulb className="w-10 h-10 text-blue-600" />
                    </div>
                    <span className="font-medium text-sm text-center group-hover:text-blue-400 transition-colors">RadicalxChange</span>
                  </Link>

                  {/* Funding the Commons */}
                  <Link
                    href="https://fundingthecommons.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center min-w-[120px] group"
                  >
                    <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md mb-3 transition-transform group-hover:scale-110 duration-300">
                      <BookOpen className="w-10 h-10 text-purple-600" />
                    </div>
                    <span className="font-medium text-sm text-center group-hover:text-purple-400 transition-colors">Funding the Commons</span>
                  </Link>

                  {/* DeSci Tokyo */}
                  <Link
                    href="https://scrapbox.io/hirotaiyohamada/Welcome_to_the_Decentralized_Science_(DeSci)_Tokyo_2023_Conference:_A_Brief_History_of_DeSci_Tokyo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center min-w-[120px] group"
                  >
                    <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md mb-3 transition-transform group-hover:scale-110 duration-300">
                      <Microscope className="w-10 h-10 text-green-600" />
                    </div>
                    <span className="font-medium text-sm text-center group-hover:text-green-400 transition-colors">DeSci Tokyo</span>
                  </Link>

                  {/* SMRI Digital Democracy Unit */}
                  <Link
                    href="https://smartnews-smri.com/research/research-2601/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center min-w-[120px] group"
                  >
                    <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md mb-3 transition-transform group-hover:scale-110 duration-300">
                      <BarChart3 className="w-10 h-10 text-orange-600" />
                    </div>
                    <span className="font-medium text-sm text-center group-hover:text-orange-400 transition-colors">SMRI Digital Democracy Unit</span>
                  </Link>
                </div>
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
