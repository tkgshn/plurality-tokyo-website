import { Metadata } from "next"
import Link from "next/link"
import { cookies } from 'next/headers'
import { Locale, defaultLocale, translate } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"

export const metadata: Metadata = {
  title: "Join Us",
  description: "Join the Plurality Tokyo community",
}

export default function JoinPage() {
  // サーバーサイドでロケールを取得
  const cookieStore = cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE');
  const locale = (localeCookie?.value || defaultLocale) as Locale;

  const t = (key: string) => translate(locale, key);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6">
          {t('navigation.join')}
        </h1>

        <div className="prose prose-lg prose-invert max-w-3xl">
          <p className="text-xl text-gray-300">
            {t('home.joinDescription')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <Button asChild className="bg-lime-400 text-black hover:bg-lime-500 w-full sm:w-auto">
              <Link
                href="https://discord.com/invite/y4QXe6KtHh"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('home.joinDiscord')}
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/events">
                {t('home.events')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
