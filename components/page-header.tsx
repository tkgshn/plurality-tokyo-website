import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  backLink?: {
    href: string
    label: string
  }
  className?: string
}

export default function PageHeader({ title, backLink, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-12", className)}>
      {backLink && (
        <Link href={backLink.href} className="text-gray-400 hover:text-white inline-flex items-center mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          {backLink.label}
        </Link>
      )}
      <h1 className="text-4xl font-bold">{title}</h1>
    </div>
  )
}
