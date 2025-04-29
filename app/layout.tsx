import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import type { Metadata } from "next"
import { cookies } from 'next/headers'
import { defaultLocale } from "@/lib/i18n"
import Providers from "@/components/Providers"
import { getMetadata } from "@/lib/metadata"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE');
  const locale = localeCookie?.value || defaultLocale;
  
  return getMetadata(locale);
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Cookieからロケールを取得
  const cookieStore = cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE');
  const locale = localeCookie?.value || defaultLocale;

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Plurality Tokyo',
    url: 'https://plurality.tokyo',
    logo: 'https://plurality.tokyo/logo.png',
    description: locale === 'en'
      ? 'Plurality Tokyo is a community focused on diversity and inclusivity.'
      : 'Plurality Tokyoは、多様性と包括性を重視したコミュニティです。'
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={inter.className}>
        <div className="h-screen">
          <Providers>
            <div className="flex min-h-screen flex-col bg-black text-white">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </Providers>
        </div>
      </body>
    </html>
  )
}


import './globals.css'
