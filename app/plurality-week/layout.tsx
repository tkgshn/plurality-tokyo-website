import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Plurality Tokyo Week 2024",
    description: "特別なイベントウィークで複数の場所でプルーラリティについて探求する一週間",
}

export default function PluralityWeekLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
