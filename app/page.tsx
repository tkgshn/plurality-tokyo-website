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
import { YouTubeSection } from "@/components/YouTubeSection"
import { cookies } from 'next/headers'
import { Locale, defaultLocale, translate } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "Plurality Tokyo",
  description: "A community for building a plural future for everyone",
}

export default function Home() {
  // サーバーサイドでロケールを取得
  const cookieStore = cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE');
  const locale = (localeCookie?.value || defaultLocale) as Locale;

  const t = (key: string) => translate(locale, key);
  const articles = getAllArticles()
  const allEvents = getAllEvents()
  const now = new Date()

  // エコシステムの組織データ
  const organizations = [
    {
      name: "Plurality Institute",
      description: "Global organization researching and promoting Plurality principles",
      url: "https://plurality.institute/",
      icon: Building2,
      iconColor: "text-lime-600",
      hoverColor: "group-hover:text-lime-400"
    },
    {
      name: "RadicalxChange",
      description: "Community exploring innovative social technologies for collective action",
      url: "https://www.radicalxchange.org/",
      icon: Lightbulb,
      iconColor: "text-blue-600",
      hoverColor: "group-hover:text-blue-400"
    },
    {
      name: "Funding the Commons",
      description: "Initiative exploring new funding models for public goods",
      url: "https://fundingthecommons.io/",
      icon: BarChart3,
      iconColor: "text-purple-600",
      hoverColor: "group-hover:text-purple-400"
    },
    {
      name: "DeSci Tokyo",
      description: "Organization building decentralized infrastructure for scientific research",
      url: "https://scrapbox.io/hirotaiyohamada/Welcome_to_the_Decentralized_Science_(DeSci)_Tokyo_2023_Conference:_A_Brief_History_of_DeSci_Tokyo",
      icon: Microscope,
      iconColor: "text-green-600",
      hoverColor: "group-hover:text-green-400"
    },
    {
      name: "Smart News Research",
      description: "Research institute focused on media and information technology",
      url: "https://smartnews-smri.com/research/research-2601/",
      icon: BookOpen,
      iconColor: "text-orange-600",
      hoverColor: "group-hover:text-orange-400"
    }
  ];

  // イベントデータの準備
  const events = [
    {
      title: 'Glen in Japan 2024',
      date: '2024-03-15',
      description: 'Glen Weylと共に、Pluralityの未来について議論します。Web3とDAOの可能性を探ります。',
      image: 'https://images.unsplash.com/photo-1555169062-013468b47731?q=80&w=2000&auto=format&fit=crop',
      link: '/events/glen-in-japan-2024',
    },
    {
      title: 'FTC Tokyo 2024',
      date: '2024-04-20',
      description: 'Funding the Commonsカンファレンス東京編。公共財の未来を考えます。',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=2000&auto=format&fit=crop',
      link: '/events/ftc-tokyo-2024',
    },
    {
      title: 'Plurality Week Tokyo 2023',
      date: '2023-05-12',
      description: '2023年に開催されたPlurality Week Tokyoのアーカイブ',
      image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2000&auto=format&fit=crop',
      link: '/events/plurality-week-2023',
    },
    {
      title: 'DeSci Tokyo Conference',
      date: '2023-11-30',
      description: '分散型サイエンスの可能性を探るカンファレンス',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2000&auto=format&fit=crop',
      link: '/events/desci-tokyo-2023',
    },
    {
      title: 'Plurality Salon #3',
      date: '2023-09-15',
      description: 'コミュニティメンバーとの少人数での深い対話セッション',
      image: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?q=80&w=2000&auto=format&fit=crop',
      link: '/events/plurality-salon-3',
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
        {/* <PageHeader title="Plurality Tokyo" /> */}

        {/* Hero Section */}
        <section className="mb-24">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            {t('home.title')}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl">
            {t('home.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/directory"
              className="inline-block px-4 py-2 text-white border border-white rounded-md hover:bg-white/10 transition-colors"
            >
              {t('home.copyForLLM')}
            </Link>
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
                  {t('home.specialEvent')}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">{t('home.pluralityWeekTitle')}</h2>
                <p className="text-gray-300 mb-8 max-w-xl leading-relaxed">
                  {t('home.pluralityWeekDescription')}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild className="bg-white text-black hover:bg-gray-200">
                    <Link href="/plurality-week">
                      {t('home.viewDetails')}
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="md:flex-1 md:flex md:justify-end">
                <div className="relative w-full max-w-md">
                  <Image
                    src="/images/plurality-book.jpg"
                    alt="Plurality Book"
                    width={400}
                    height={600}
                    className="object-cover rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* What's the Plurality Tokyo? */}
        <section className="mb-24">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">{t('home.whatIsPluralityTokyo')}</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 bg-gray-900 p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-lime-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="bg-lime-500/10 p-3 rounded-xl">
                    <Calendar className="h-6 w-6 text-lime-400" />
                  </div>
                  <h3 className="text-xl font-bold ml-4">{t('events.conference')}</h3>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {t('events.conferenceDesc')}
                </p>
                <Link href="/events" className="inline-flex items-center text-lime-400 hover:text-lime-300 transition-colors">
                  {t('events.viewAllEvents')} <ArrowRight className="ml-2 h-4 w-4" />
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
                  <h3 className="text-xl font-bold ml-4">{t('events.discordGroup')}</h3>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {t('events.discordDesc')}
                </p>
                <Link
                  href="https://discord.com/invite/y4QXe6KtHh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-lime-400 hover:text-lime-300 transition-colors"
                >
                  {t('events.joinDiscord')} <ArrowRight className="ml-2 h-4 w-4" />
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
                  <h3 className="text-xl font-bold ml-4">{t('events.meetup')}</h3>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {t('events.meetupDesc')}
                </p>
                <Link
                  href="https://scrapbox.io/plurality-tokyo/search/page?q=salon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-lime-400 hover:text-lime-300 transition-colors"
                >
                  {t('events.checkNextMeetup')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* News from the Ecosystem */}
        <section className="mb-24">
          <div className="flex justify-between items-end mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold">{t('home.newsFromEcosystem')}</h2>
            <Link href="/articles" className="text-lime-400 hover:text-lime-300 flex items-center">
              {t('home.seeAll')} <ArrowRight className="ml-2 h-4 w-4" />
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
                <div className="flex flex-col gap-3">
                  <div className="flex items-center text-gray-400 text-sm">
                    <span>{item.author}</span>
                  </div>
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
              </div>
            ))}
          </div>
        </section>

        {/* Events Section */}
        <section className="mb-24">
          <div className="flex justify-between items-end mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold">{t('home.events')}</h2>
            <Link href="/events" className="text-lime-400 hover:text-lime-300 flex items-center">
              {t('home.seeAll')} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <EventList
            events={allEvents}
            showPast={true}
            showUpcoming={true}
            maxItems={3}
            showHeaders={true}
          />
        </section>

        {/* YouTube Section */}
        <YouTubeSection className="mb-24" />

        {/* Ecosystem Section */}
        <section className="text-white py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6">{t('home.ourEcosystem')}</h2>
            <p className="text-gray-300 mb-10 max-w-3xl">
              {t('home.ecosystemDescription')}
            </p>

            {/* ロゴスライダーセクション */}
            <div className="overflow-hidden py-8 relative hover:pause-all-animations">
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-950 to-transparent z-10"></div>
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-950 to-transparent z-10"></div>

              <div className="flex w-full">
                <div className="flex animate-scroll">
                  {/* 3セット分のアイコンを配置してシームレスなループを実現 */}
                  {[0, 1, 2].map((setIndex) => (
                    <div
                      key={`set-${setIndex}`}
                      className="inline-flex items-start"
                      style={{
                        gap: '80px',
                        ...(setIndex > 0 ? { marginLeft: '80px' } : {})
                      }}
                    >
                      {organizations.map((org) => {
                        const Icon = org.icon;
                        return (
                          <Link
                            key={`${org.name}-${setIndex}`}
                            href={org.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex flex-col items-center w-[100px] group shrink-0"
                          >
                            <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md mb-3 transition-transform group-hover:scale-110 duration-300">
                              <Icon className={`w-8 h-8 ${org.iconColor}`} />
                            </div>
                            <span className={`font-medium text-xs text-center ${org.hoverColor} transition-colors max-w-full`}>
                              {org.name}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join Community Section */}
        <section className="bg-lime-400 text-black py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">{t('home.joinCommunity')}</h2>
            <p className="text-gray-800 mb-10 max-w-2xl mx-auto">
              {t('home.joinDescription')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-black text-white hover:bg-gray-800">
                <Link href="https://discord.com/invite/y4QXe6KtHh" target="_blank" rel="noopener noreferrer">
                  {t('home.joinDiscord')}
                </Link>
              </Button>
              <Button asChild className="bg-black text-white hover:bg-gray-800">
                <Link href="/events">
                  {t('home.events')}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
