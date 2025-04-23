"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import LanguageSwitcher from '@/components/LanguageSwitcher'
import SafeI18n from "@/components/SafeI18n"
import { Locale } from "@/lib/i18n"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <SafeI18n>
      {({ locale, t }) => {
        const navigation = [
          { name: t('navigation.home'), href: `/${locale}` },
          { name: t('navigation.articles'), href: `/${locale}/articles` },
          { name: t('navigation.events'), href: `/${locale}/events` },
          { name: t('navigation.about'), href: `/${locale}/about` },
        ]

        return (
          <header className="bg-black text-white border-b border-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <Link href={`/${locale}`} className="flex items-center space-x-2">
                    <div className="w-10 h-10 relative">
                      <Image
                        src="https://storage.googleapis.com/studio-design-asset-files/projects/xNWYn73XOl/s-200x202_webp_f5c2bb89-31db-46ca-b3cc-a7b051cb99c3.webp"
                        alt="Plurality Tokyo Logo"
                        fill
                        className="object-contain brightness-200 contrast-125"
                        priority
                        sizes="(max-width: 768px) 40px, 40px"
                        quality={100}
                      />
                    </div>
                    <span className="text-lg font-medium">Plurality Tokyo</span>
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-center space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "px-3 py-2 text-sm font-medium hover:text-gray-300",
                          pathname === item.href ? "text-white" : "text-gray-300"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Button
                      asChild
                      variant="outline"
                      className="ml-4 border-white text-white hover:bg-white hover:text-black"
                    >
                      <Link href={`/${locale}/join`}>{t('navigation.join')}</Link>
                    </Button>
                    <LanguageSwitcher />
                  </div>
                </div>
                <div className="md:hidden flex items-center">
                  <Button variant="ghost" size="icon" onClick={toggleMenu}>
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
              <div className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "block px-3 py-2 text-base font-medium",
                        pathname === item.href ? "text-white" : "text-gray-300"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Button
                    asChild
                    variant="outline"
                    className="mt-4 w-full border-white text-white hover:bg-white hover:text-black"
                  >
                    <Link href={`/${locale}/join`} onClick={() => setIsMenuOpen(false)}>
                      {t('navigation.join')}
                    </Link>
                  </Button>
                  <div className="mt-4 px-3">
                    <LanguageSwitcher />
                  </div>
                </div>
              </div>
            )}
          </header>
        );
      }}
    </SafeI18n>
  )
}
