import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin, Clock, ExternalLink, ChevronRight } from "lucide-react"
import PageHeader from "@/components/page-header"

export const metadata: Metadata = {
    title: "Plurality Tokyo Week 2024",
    description: "特別なイベントウィークで複数の場所でプルーラリティについて探求する一週間",
}

const events = [
    {
        id: "sushitech",
        date: "2024-05-08",
        endDate: "2024-05-09",
        title: "SusHi Tech Tokyo 2025",
        location: "東京都内",
        description: "SusHi Tech Tokyoでの特別コンテンツ「Focus on Plurality」セッション",
        url: "https://sushitech-startup.metro.tokyo.lg.jp/en/focus-on/",
        image: "/images/plurality-week/sushitech.jpg", // この画像は後で追加
    },
    {
        id: "ai-japan",
        date: "2024-05-06",
        title: "東大AI研究会特別講演会 AU*ochyai",
        location: "東京大学",
        description: "AIと民主主義の未来についての特別講演会",
        url: "https://peatix.com/event/4337235",
        secondaryUrl: "https://www.ai-japan.org/news20250413",
        image: "/images/plurality-week/ai-japan.jpg", // この画像は後で追加
    },
    {
        id: "keio",
        date: "2024-05-10",
        title: "慶應三田キャンパス特別セッション",
        location: "慶應義塾大学三田キャンパス",
        description: "プルーラリティと日本社会の可能性について議論するセッション",
        url: "https://lu.ma/ienn4p0k",
        image: "/images/plurality-week/keio.jpg", // この画像は後で追加
    },
    {
        id: "tokyo-college",
        date: "2024-05-12",
        title: "Tokyo College Conference on \"The Future of Technology and Democracy\"",
        time: "15:00-17:45",
        location: "伊藤国際謝恩ホール",
        description: "テクノロジーと民主主義の未来についての国際カンファレンス（英語・日英同時通訳あり）",
        additionalInfo: [
            "会場開催のみ（ハイブリッドではありません）",
            "一般客200名想定",
            "14:30 開場",
            "言語は英語（日英同時通訳あり）",
            "東京カレッジ主催"
        ],
        schedule: [
            {
                time: "15:00",
                title: "Opening Remark",
                speakers: ["Takeo Hoshi or Marie Oshima"]
            },
            {
                time: "15:15",
                title: "Session 1: \"Plurality and Taiwan's Digital Democracy\"",
                moderator: "Naoko Shimazu or Takeo Hoshi",
                speakers: ["Audrey Tang", "E. Glen Weyl", "Michael Facius", "Keita Nishiyama"]
            },
            {
                time: "15:55",
                title: "Coffee Break"
            },
            {
                time: "16:10",
                title: "Session 2: \"Digital Democracy in Japan?\"",
                moderator: "Arisa Ema or Yuko Itatsu",
                speakers: ["Takahiro Anno", "Shinjiro Koizumi", "Masaaki Taira or Chizuru Suga"]
            },
            {
                time: "16:55",
                title: "Coffee Break"
            },
            {
                time: "17:10",
                title: "Session 3: \"Technology and Political Economy of Inclusion\"",
                moderator: "Fuhito Kojima or Trent Brown",
                speakers: ["E. Glen Weyl", "Ayumi Igarashi or Yu Yokoi", "Trent Brown or Shunya Noda"]
            },
            {
                time: "17:50",
                title: "Closing Remark",
                speakers: ["Marie Oshima or Naoko Shimazu"]
            },
            {
                time: "18:00",
                title: "Adjourn"
            }
        ],
        image: "/images/plurality-week/tokyo-college.jpg", // この画像は後で追加
    }
];

export default function PluralityWeekPage() {
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
                {/* ヒーローセクション */}
                <div className="relative overflow-hidden rounded-2xl mb-16">
                    <div className="absolute inset-0 bg-gradient-to-r from-lime-500 to-lime-700 opacity-90"></div>
                    <div className="relative z-10 py-20 px-8 md:px-16">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                            Plurality Tokyo Week 2024
                        </h1>
                        <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl">
                            2024年5月6日〜12日、東京の様々な場所でプルーラリティについて考える特別な一週間
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild className="bg-black text-white hover:bg-gray-800">
                                <Link href="#events">
                                    イベントを見る
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                                <Link href="https://discord.com/invite/y4QXe6KtHh" target="_blank" rel="noopener noreferrer">
                                    Discord に参加する
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* イントロダクション */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-6">Plurality Tokyo Week について</h2>
                    <p className="text-lg text-gray-300 mb-8 max-w-4xl">
                        Plurality Tokyo Weekは、プルーラリティの概念と実践について探求する特別な一週間です。
                        Audrey Tangと E. Glen Weylを迎え、日本の各地でプルーラリティに関する対話と議論を行います。
                        テクノロジーと民主主義の未来、デジタル民主主義の可能性、そして日本社会における実装について考えます。
                    </p>
                </section>

                {/* イベント一覧 */}
                <section id="events" className="mb-20">
                    <h2 className="text-3xl font-bold mb-12">イベントスケジュール</h2>

                    <div className="space-y-16">
                        {events.map((event) => (
                            <div key={event.id} className="bg-gray-900 rounded-xl overflow-hidden">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* イベント画像 */}
                                    <div className="md:col-span-1 h-64 md:h-full relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-lime-500/30 to-lime-700/30"></div>
                                        <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold">
                                            {event.title}
                                        </div>
                                    </div>

                                    {/* イベント詳細 */}
                                    <div className="md:col-span-2 p-8">
                                        <h3 className="text-2xl font-bold mb-4 text-lime-400">{event.title}</h3>

                                        <div className="flex flex-col gap-3 mb-6">
                                            <div className="flex items-center text-gray-300">
                                                <CalendarDays className="w-5 h-5 mr-3" />
                                                <span>
                                                    {formatDate(event.date)}
                                                    {event.endDate && ` 〜 ${formatDate(event.endDate)}`}
                                                </span>
                                            </div>

                                            {event.time && (
                                                <div className="flex items-center text-gray-300">
                                                    <Clock className="w-5 h-5 mr-3" />
                                                    <span>{event.time}</span>
                                                </div>
                                            )}

                                            <div className="flex items-center text-gray-300">
                                                <MapPin className="w-5 h-5 mr-3" />
                                                <span>{event.location}</span>
                                            </div>
                                        </div>

                                        <p className="text-gray-300 mb-6">{event.description}</p>

                                        {event.additionalInfo && (
                                            <div className="bg-gray-800 p-4 rounded-lg mb-6">
                                                <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                                                    {event.additionalInfo.map((info, index) => (
                                                        <li key={index}>{info}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        <div className="flex flex-wrap gap-3">
                                            <Button asChild className="bg-lime-500 hover:bg-lime-600 text-black">
                                                <Link href={event.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                                    詳細を見る <ExternalLink className="ml-2 h-4 w-4" />
                                                </Link>
                                            </Button>

                                            {event.secondaryUrl && (
                                                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                                                    <Link href={event.secondaryUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                                        関連リンク <ExternalLink className="ml-2 h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            )}
                                        </div>

                                        {/* Tokyo College イベントの詳細スケジュール */}
                                        {event.id === "tokyo-college" && event.schedule && (
                                            <div className="mt-8">
                                                <h4 className="text-lg font-bold mb-4 text-lime-400">詳細スケジュール</h4>
                                                <div className="space-y-4">
                                                    {event.schedule.map((item, index) => (
                                                        <div key={index} className="border-l-2 border-lime-500 pl-4 py-2">
                                                            <div className="flex items-start">
                                                                <span className="text-lime-400 font-mono mr-3">{item.time}</span>
                                                                <div>
                                                                    <h5 className="font-bold">{item.title}</h5>
                                                                    {item.moderator && (
                                                                        <p className="text-sm text-gray-400 mt-1">
                                                                            モデレーター: {item.moderator}
                                                                        </p>
                                                                    )}
                                                                    {item.speakers && (
                                                                        <div className="text-sm text-gray-300 mt-1">
                                                                            <span className="text-gray-400">登壇者: </span>
                                                                            {item.speakers.join(", ")}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 参加のお誘い */}
                <section className="bg-lime-400 text-black rounded-xl p-8 sm:p-12">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6">Plurality Tokyoコミュニティに参加しよう</h2>
                        <p className="text-lg mb-8">
                            イベント情報をいち早く受け取り、プルーラリティについての議論に参加するために、Discordコミュニティにご参加ください。
                        </p>
                        <Button asChild className="bg-black text-white hover:bg-gray-800">
                            <Link href="https://discord.com/invite/y4QXe6KtHh" target="_blank" rel="noopener noreferrer" className="flex items-center">
                                Discordに参加する <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
}
