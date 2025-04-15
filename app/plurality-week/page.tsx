'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, MapPin, Clock, ExternalLink, ChevronRight } from "lucide-react"
import { format, isEqual, isSameDay, isSameMonth, parseISO } from "date-fns"
import { ja } from "date-fns/locale"
import { useState } from "react"

const events = [
    {
        id: "sushitech",
        date: "2024-05-08",
        endDate: "2024-05-09",
        title: "SusHi Tech Tokyo 2025",
        location: "東京都内",
        description: "SusHi Tech Tokyoでの特別コンテンツ「Focus on Plurality」セッション",
        url: "https://sushitech-startup.metro.tokyo.lg.jp/en/focus-on/",
        image: "https://images.unsplash.com/photo-1549298222-1c31e8915347?q=80&w=2574&auto=format&fit=crop",
    },
    {
        id: "ai-japan",
        date: "2024-05-06",
        title: "東大AI研究会特別講演会 AU*ochyai",
        location: "東京大学",
        description: "AIと民主主義の未来についての特別講演会",
        url: "https://peatix.com/event/4337235",
        secondaryUrl: "https://www.ai-japan.org/news20250413",
        image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=2536&auto=format&fit=crop",
    },
    {
        id: "keio",
        date: "2024-05-10",
        title: "慶應三田キャンパス特別セッション",
        location: "慶應義塾大学三田キャンパス",
        description: "プルーラリティと日本社会の可能性について議論するセッション",
        url: "https://lu.ma/ienn4p0k",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2688&auto=format&fit=crop",
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
        image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2000&auto=format&fit=crop",
    }
];

export default function PluralityWeekPage() {
    // イベントのdateをDate型に変換
    const eventDates = events.map(event => ({
        ...event,
        dateObj: parseISO(event.date),
        endDateObj: event.endDate ? parseISO(event.endDate) : undefined
    }));

    // 選択された日付の状態を管理
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date("2024-05-06"));

    // カレンダーの日付にイベントがあるかどうかをチェック
    const hasEventOnDate = (date: Date) => {
        return eventDates.some(event => {
            // 単日イベントの場合
            if (!event.endDateObj) {
                return isSameDay(date, event.dateObj);
            }
            // 複数日イベントの場合（期間内のチェック）
            return date >= event.dateObj && date <= event.endDateObj;
        });
    };

    // 選択された日付のイベントを取得
    const selectedDateEvents = eventDates.filter(event => {
        if (!selectedDate) return false;
        if (!event.endDateObj) {
            return isSameDay(selectedDate, event.dateObj);
        }
        return selectedDate >= event.dateObj && selectedDate <= event.endDateObj;
    });

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return format(date, "yyyy年MM月dd日", { locale: ja });
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
                {/* ヒーローセクション */}
                <div className="relative overflow-hidden rounded-3xl mb-16 h-[500px]">
                    <Image
                        src="https://images.unsplash.com/photo-1601823984263-b87b59798b00?q=80&w=2670&auto=format&fit=crop"
                        alt="Tokyo Cityscape"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-80"></div>
                    <div className="relative z-10 h-full flex flex-col justify-center py-20 px-8 md:px-16">
                        <div className="max-w-2xl">
                            <div className="bg-white text-black px-4 py-1 rounded-full inline-block mb-4 text-sm font-bold">
                                特別イベント
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                                Plurality Tokyo Week 2024
                            </h1>
                            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl">
                                2024年5月6日〜12日、東京の様々な場所でプルーラリティについて考える特別な一週間
                            </p>
                            <div className="flex flex-wrap gap-4">

                            </div>
                        </div>
                    </div>
                </div>

                {/* イントロダクション
                <section className="mb-16 px-6 md:px-10 py-12 bg-gray-900 rounded-3xl">
                    <h2 className="text-3xl font-bold mb-6 text-white">Plurality Tokyo Week について</h2>
                    <p className="text-lg text-gray-300 mb-8 max-w-4xl leading-relaxed">
                        Plurality Tokyo Weekは、プルーラリティの概念と実践について探求する特別な一週間です。
                        Audrey Tangと E. Glen Weylを迎え、日本の各地でプルーラリティに関する対話と議論を行います。
                        テクノロジーと民主主義の未来、デジタル民主主義の可能性、そして日本社会における実装について考えます。
                    </p>
                    <div className="flex flex-wrap gap-6 justify-between mt-10">
                        <div className="bg-gray-800 p-6 rounded-xl flex-1 min-w-[250px]">
                            <h3 className="text-xl font-medium mb-3 text-white">デジタル民主主義</h3>
                            <p className="text-gray-400">テクノロジーを活用した新しい民主主義の形を探求します</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-xl flex-1 min-w-[250px]">
                            <h3 className="text-xl font-medium mb-3 text-white">多様性と協働</h3>
                            <p className="text-gray-400">多様な視点を大切にしながら、共に社会課題解決を目指します</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-xl flex-1 min-w-[250px]">
                            <h3 className="text-xl font-medium mb-3 text-white">社会実装</h3>
                            <p className="text-gray-400">日本社会におけるプルーラリティの実装と可能性を検討します</p>
                        </div>
                    </div>
                </section> */}
                {/* Plurality Book Section */}
                <section className="bg-white text-black py-12 rounded-xl overflow-hidden my-12">
                    <div className="mx-auto max-w-4xl px-4 lg:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            <div>
                                <h2 className="text-xl font-bold mb-3">Plurality Book is NOW available!</h2>
                                <p className="text-gray-600 mb-3 text-sm">
                                    Audrey Tang's "PLURALITY: Collaborative Technology and the Future of Democracy" presents a new vision for democracy in the digital age. <span className="font-bold text-black">The Japanese translation is now available.</span>
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button asChild className="bg-black text-white hover:bg-gray-800 text-sm">
                                        <Link
                                            href="https://www.amazon.co.jp/dp/4909044574"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center"
                                        >
                                            Buy on Amazon JP
                                            <ExternalLink className="ml-2 h-3 w-3" />
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline" className="bg-white border-black text-black hover:bg-black hover:text-white text-sm">
                                        <Link
                                            href="https://www.plurality.net/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center"
                                        >
                                            Official Website
                                            <ExternalLink className="ml-2 h-3 w-3" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="relative w-full max-w-[200px] mx-auto">
                                <Image
                                    src="/images/plurality-book.jpg"
                                    alt="PLURALITY: Collaborative Technology and the Future of Democracy by Audrey Tang"
                                    width={200}
                                    height={267}
                                    className="rounded-lg shadow-lg"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* カレンダーセクション */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 px-4">イベントカレンダー</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-1 bg-gray-900 p-6 rounded-3xl">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                className="bg-gray-900 border-none text-white"
                                modifiers={{
                                    hasEvent: (date) => hasEventOnDate(date),
                                }}
                                modifiersClassNames={{
                                    hasEvent: "bg-white/10 font-bold text-white relative before:absolute before:top-0 before:right-0 before:w-2 before:h-2 before:bg-white before:rounded-full",
                                }}
                                defaultMonth={new Date("2024-05-01")}
                                locale={ja}
                            />
                            <div className="mt-4 flex items-center text-sm text-gray-400">
                                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                                <span>イベント開催日</span>
                            </div>
                        </div>

                        <div className="md:col-span-2 bg-gray-900 p-6 rounded-3xl">
                            <h3 className="text-xl font-bold mb-4">
                                {selectedDate ? format(selectedDate, "yyyy年MM月dd日", { locale: ja }) : "日付を選択してください"}
                            </h3>

                            {selectedDateEvents.length > 0 ? (
                                <div className="space-y-4">
                                    {selectedDateEvents.map((event) => (
                                        <Card key={event.id} className="bg-gray-800 border-gray-700">
                                            <CardContent className="p-4 flex items-start gap-4">
                                                <div className="hidden sm:block w-16 h-16 rounded-lg overflow-hidden relative flex-shrink-0">
                                                    <Image
                                                        src={event.image}
                                                        alt={event.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-white">{event.title}</h4>
                                                    <div className="flex flex-col gap-1 mt-2 text-sm text-gray-300">
                                                        <div className="flex items-center">
                                                            <Clock className="w-4 h-4 mr-2" />
                                                            <span>{event.time || "終日"}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <MapPin className="w-4 h-4 mr-2" />
                                                            <span>{event.location}</span>
                                                        </div>
                                                    </div>
                                                    <Button asChild variant="link" className="text-white p-0 h-auto mt-2">
                                                        <Link href={`#${event.id}`}>
                                                            詳細を見る
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-400">
                                    この日に予定されているイベントはありません
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* イベント一覧 */}
                <section id="events" className="mb-20">
                    <h2 className="text-3xl font-bold mb-12 px-4">イベントスケジュール</h2>

                    <div className="space-y-16">
                        {events.map((event) => (
                            <div id={event.id} key={event.id} className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
                                <div className="grid grid-cols-1 md:grid-cols-7 gap-0">
                                    {/* イベント画像 */}
                                    <div className="md:col-span-3 h-80 md:h-full relative">
                                        <Image
                                            src={event.image}
                                            alt={event.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 p-6">
                                            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium inline-block mb-2">
                                                {formatDate(event.date)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* イベント詳細 */}
                                    <div className="md:col-span-4 p-8">
                                        <h3 className="text-2xl font-bold mb-4 text-white">{event.title}</h3>

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

                                        <p className="text-gray-300 mb-6 leading-relaxed">{event.description}</p>

                                        {event.additionalInfo && (
                                            <div className="bg-gray-800/50 p-5 rounded-xl mb-6 border border-gray-700">
                                                <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                                                    {event.additionalInfo.map((info, index) => (
                                                        <li key={index}>{info}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        <div className="flex flex-wrap gap-3">
                                            <Button asChild className="bg-white hover:bg-gray-200 text-black">
                                                <Link href={event.url || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center">
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
                                                <h4 className="text-lg font-bold mb-4 text-white">詳細スケジュール</h4>
                                                <div className="space-y-4">
                                                    {event.schedule.map((item, index) => (
                                                        <div key={index} className="border-l-2 border-white pl-4 py-2">
                                                            <div className="flex items-start">
                                                                <span className="text-white font-mono mr-3 bg-gray-800 px-2 py-1 rounded">{item.time}</span>
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
                <section className="bg-white text-black rounded-3xl overflow-hidden relative">
                    <div className="absolute inset-0 opacity-10">
                        <Image
                            src="https://images.unsplash.com/photo-1532452362842-8a1a32643aae?q=80&w=2670&auto=format&fit=crop"
                            alt="Tokyo Cityscape at Night"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="relative z-10 p-10 sm:p-16">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl font-bold mb-6">Plurality Tokyoコミュニティに参加しよう</h2>
                            <p className="text-lg mb-8 text-gray-700">
                                イベント情報をいち早く受け取り、プルーラリティについての議論に参加するために、Discordコミュニティにご参加ください。
                            </p>
                            <Button asChild className="bg-black text-white hover:bg-gray-800 px-8 py-6 text-lg">
                                <Link href="https://discord.com/invite/y4QXe6KtHh" target="_blank" rel="noopener noreferrer" className="flex items-center">
                                    Discordに参加する <ChevronRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
