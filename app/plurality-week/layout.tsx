import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Tokyo Plurality Week 2025",
    description: "A special events week exploring plurality across multiple venues in Tokyo",
}

export default function PluralityWeekLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
