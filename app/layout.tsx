import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import type { Metadata } from "next"
import { cookies } from 'next/headers'
import { defaultLocale } from "@/lib/i18n"
import Providers from "@/components/Providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Plurality Tokyo",
    template: "%s | Plurality Tokyo",
  },
  description: "Plurality Tokyoは、多様性と包括性を重視したコミュニティです。",
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

  return (
    <html lang={locale} suppressHydrationWarning>
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
