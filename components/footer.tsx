import Link from "next/link"
import { Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://x.com/pluralitytokyo" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://discord.com/invite/y4QXe6KtHh" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">Discord</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <circle cx="9" cy="12" r="1" />
                <circle cx="15" cy="12" r="1" />
                <path d="M7.5 7.2c3.5-1 5.5-1 9 0" />
                <path d="M7 16.2c3.5 1 6.5 1 10 0" />
                <path d="M15.5 17c0 1 1.5 3 2 3 1.5 0 2.833-1.667 3.5-3 .667-1.667.5-5.833-1.5-11.5-1.457-1.015-3-1.34-4.5-1.5l-1 2.5" />
                <path d="M8.5 17c0 1-1.356 3-1.832 3-1.429 0-2.698-1.667-3.333-3-.635-1.667-.48-5.833 1.428-11.5C6.151 4.485 7.545 4.16 9 4l1 2.5" />
              </svg>
            </Link>
          </Button>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} Plurality Tokyo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
