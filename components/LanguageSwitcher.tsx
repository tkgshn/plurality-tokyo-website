import { usePathname, useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher() {
    const router = useRouter()
    const pathname = usePathname()

    const switchLanguage = (locale: string) => {
        const newPath = pathname.replace(/^\/(en|ja|zh|ko)/, `/${locale}`)
        router.push(newPath)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Globe className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => switchLanguage('ja')}>
                    日本語
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLanguage('en')}>
                    English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLanguage('zh')}>
                    中文
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLanguage('ko')}>
                    한국어
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
