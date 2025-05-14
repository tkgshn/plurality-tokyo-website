import { Metadata } from "next"
import { cookies } from 'next/headers'
import { Locale, defaultLocale, translate } from "@/lib/i18n"
import PageHeader from "@/components/page-header"
import Link from "next/link"
import { CopyToMarkdownButton } from "@/components/copy-to-markdown-button"
import Markdown from "@/components/markdown"
import { GlobeIcon, UsersIcon, CalendarIcon } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  // サーバーサイドでロケールを取得
  const cookieStore = cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE');
  const locale = (localeCookie?.value || defaultLocale) as Locale;

  const t = (key: string) => translate(locale, key);

  return {
    title: locale === 'ja' ? 'プルラリティ東京について' : 'About Us',
    description: locale === 'ja' ? 'プルラリティ東京についての情報' : 'About Plurality Tokyo',
  }
}

const aboutPageMarkdown = `
# About Plurality Tokyo

Plurality Tokyo is a community based in Tokyo, Japan, inspired by the global Plurality movement. We explore how technology can foster cooperation and diversity across social and cultural differences.

## Our Vision

We believe in using technology not as a replacement for human connection, but as a tool to channel social diversity into progress and growth. Our approach contrasts with traditional reductionist systems, focusing instead on respecting diverse values through nuanced frameworks.

## Key Activities

### Events
- Major conferences and talks
- Regular salons and meetups
- Collaborative workshops

### Community
- Knowledge sharing through Scrapbox
- Active Discord community
- Partnerships with global initiatives

## Our Network

We collaborate with:
- Plurality Institute
- Funding the Commons
- DeSci Tokyo
- Global Plurality advocates

## Join Us

We welcome anyone interested in exploring how technology can create more inclusive and cooperative societies. Join our community to learn, share, and build together.
`;

export default function AboutPage() {
  // サーバーサイドでロケールを取得
  const cookieStore = cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE');
  const locale = (localeCookie?.value || defaultLocale) as Locale;

  const t = (key: string) => translate(locale, key);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <PageHeader
          title={t('about.title')}
          backLink={{ href: "/", label: t('about.backLink') }}
        />

        <div className="flex justify-end mb-12">
          <CopyToMarkdownButton markdown={aboutPageMarkdown} />
        </div>

        <div className="space-y-16">
          {/* Introduction */}
          <section className="relative">
            <div className="absolute -left-5 h-full w-1 bg-gradient-to-b from-lime-400 to-blue-500" />
            <h2 className="text-3xl font-bold mb-6">
              <span className="bg-gradient-to-r from-lime-400 to-blue-500 bg-clip-text text-transparent">
                {t('about.introduction')}
              </span>
            </h2>
            <p className="text-xl leading-relaxed text-gray-300">
              {t('about.introductionText')}
            </p>
          </section>

          {/* Vision */}
          <section className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <GlobeIcon className="h-8 w-8 text-white" />
              <span>{t('about.ourVision')}</span>
            </h2>
            <p className="text-lg leading-relaxed text-gray-300">
              {t('about.visionText')}
            </p>
          </section>

          {/* Activities */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <CalendarIcon className="h-8 w-8 text-white" />
              <span>{t('about.keyActivities')}</span>
            </h2>
            <div className="grid gap-8">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold mb-4">{t('about.events')}</h3>
                <ul className="space-y-2 text-gray-300">
                  {locale === 'ja' || locale === 'en' ? (
                    <>
                      <li>{t('about.eventsItems.0')}</li>
                      <li>{t('about.eventsItems.1')}</li>
                      <li>{t('about.eventsItems.2')}</li>
                    </>
                  ) : (
                    <>
                      <li>• Major conferences and talks</li>
                      <li>• Regular salons and meetups</li>
                      <li>• Collaborative workshops</li>
                    </>
                  )}
                </ul>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold mb-4">{t('about.community')}</h3>
                <ul className="space-y-2 text-gray-300">
                  {locale === 'ja' || locale === 'en' ? (
                    <>
                      <li>{t('about.communityItems.0')}</li>
                      <li>{t('about.communityItems.1')}</li>
                      <li>{t('about.communityItems.2')}</li>
                    </>
                  ) : (
                    <>
                      <li>• Knowledge sharing through Scrapbox</li>
                      <li>• Active Discord community</li>
                      <li>• Partnerships with global initiatives</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </section>

          {/* Network */}
          <section className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <UsersIcon className="h-8 w-8 text-white" />
              <span>{t('about.ourNetwork')}</span>
            </h2>
            <p className="text-lg leading-relaxed text-gray-300 mb-4">
              {t('about.networkText')}
            </p>
            <ul className="space-y-2 text-gray-300">
              {locale === 'ja' || locale === 'en' ? (
                <>
                  <li>{t('about.networkItems.0')}</li>
                  <li>{t('about.networkItems.1')}</li>
                  <li>{t('about.networkItems.2')}</li>
                  <li>{t('about.networkItems.3')}</li>
                </>
              ) : (
                <>
                  <li>• Plurality Institute</li>
                  <li>• Funding the Commons</li>
                  <li>• DeSci Tokyo</li>
                  <li>• Global Plurality advocates</li>
                </>
              )}
            </ul>
          </section>

          {/* Join Us */}
          <section>
            <h2 className="text-3xl font-bold mb-6">{t('about.joinUs')}</h2>
            <p className="text-lg leading-relaxed text-gray-300">
              {t('about.joinUsText')}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
