import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Tokyo Plurality Week 2025",
    description: "A special events week exploring plurality across multiple venues in Tokyo",
    openGraph: {
        title: "Tokyo Plurality Week",
        description: "A special events week exploring plurality across multiple venues in Tokyo",
        images: [
            {
                url: "https://cdn.discordapp.com/attachments/1318825495093051442/1367314942465802394/photo-1503899036084-c55cdd92da26.webp?ex=68157445&is=681422c5&hm=80d5c8c4c60a4f400e22ce39857fbee4089f2d8dea1c2964b29cd3b6c69cf1f5&",
                width: 1200,
                height: 630,
                alt: "Tokyo Plurality Week",
            }
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Tokyo Plurality Week",
        description: "A special events week exploring plurality across multiple venues in Tokyo",
        images: ["https://cdn.discordapp.com/attachments/1318825495093051442/1367314942465802394/photo-1503899036084-c55cdd92da26.webp?ex=68157445&is=681422c5&hm=80d5c8c4c60a4f400e22ce39857fbee4089f2d8dea1c2964b29cd3b6c69cf1f5&"],
    }
}

export default function PluralityWeekLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
