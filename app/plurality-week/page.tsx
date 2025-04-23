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

// イベントの型定義
type EventItem = {
    id: string;
    date: string;
    endDate?: string;
    title: string;
    location: string;
    description: string;
    url?: string;
    image: string;
    time?: string;
    additionalInfo?: string[];
    secondaryUrl?: string;
    schedule?: {
        time: string;
        title: string;
        moderator?: string;
        speakers?: string[];
    }[];
};

const events: EventItem[] = [
    {
        id: "sushitech",
        date: "2025-05-08",
        endDate: "2025-05-09",
        title: "SusHi Tech Tokyo 2025",
        location: "Tokyo Big Sight",
        description: "Special content \"Focus on Plurality\" session at SusHi Tech Tokyo",
        url: "https://sushitech-startup.metro.tokyo.lg.jp/en/focus-on/",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.sushitech-startup.metro.tokyo.lg.jp%2Fogp.png%3Ftimestamp%3D20251107&f=1&ipt=c663c9c1e53a79bea7beec8ed2e5a77b3ba2c7068b0131ef5e258c4a8284270d",
    },
    {
        id: "ai-japan",
        date: "2025-05-06",
        title: "UTokyo AI Research Institute Special Lecture",
        location: "Yasuda Auditorium, University of Tokyo",
        description: "A freewheeling discussion about the future of society and the potential of AI technology",
        url: "https://peatix.com/event/4337235",
        image: "https://cdn.peatix.com/event/4337235/cover-hKCBko6u1in7qZY5dYJbgXFHTAIYn64d.png",
    },
    {
        id: "keio",
        date: "2025-05-10",
        title: "Plurality Book Launch Event",
        location: "Mita Campus, Keio University",
        description: "A session discussing plurality and its potential in Japanese society",
        url: "https://lu.ma/ienn4p0k",
        image: "/images/plurality-book.jpg",
    },
    {
        id: "tokyo-college",
        date: "2025-05-12",
        title: "Tokyo College Conference on \"The Future of Technology and Democracy\"",
        location: "Ito International Research Center",
        description: "International conference on the future of technology and democracy (English with Japanese interpretation)",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.redd.it%2Fh7ojeomjzx511.jpg&f=1&ipt=5c9dbe76e5a79bb4f39a0ad70ef68ea089b66f14d4615f59e7d8843ead606b73",
    }
];

export default function PluralityWeekPage() {
    const eventDates = events.map(event => ({
        ...event,
        dateObj: parseISO(event.date),
        endDateObj: event.endDate ? parseISO(event.endDate) : undefined
    }));

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date("2025-05-06"));

    const hasEventOnDate = (date: Date) => {
        return eventDates.some(event => {
            if (!event.endDateObj) {
                return isSameDay(date, event.dateObj);
            }
            return date >= event.dateObj && date <= event.endDateObj;
        });
    };

    const selectedDateEvents = eventDates.filter(event => {
        if (!selectedDate) return false;
        if (!event.endDateObj) {
            return isSameDay(selectedDate, event.dateObj);
        }
        return selectedDate >= event.dateObj && selectedDate <= event.endDateObj;
    });

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return format(date, "MMMM d, yyyy", { locale: ja });
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
                {/* Hero Section */}
                <div className="relative overflow-hidden rounded-3xl mb-16 sm:mb-24 h-[400px] sm:h-[500px]">
                    <Image
                        src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=2574&auto=format&fit=crop"
                        alt="Tokyo Cityscape"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-80"></div>
                    <div className="relative z-10 h-full flex flex-col justify-center py-12 px-6 sm:px-16">
                        <div className="max-w-2xl">
                            <div className="bg-white text-black px-4 py-1 rounded-full inline-block mb-4 text-sm font-bold">
                                Special Events
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 text-white">
                                Tokyo Plurality Week 2025
                            </h1>
                            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 max-w-3xl">
                                A special week of exploring plurality across Tokyo from May 6-12, 2025
                            </p>
                        </div>
                    </div>
                </div>

                {/* Overview Section */}
                <section className="mb-20 sm:mb-28 bg-gray-900 rounded-3xl p-8 sm:p-12">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6">Pluralityとは</h2>
                    <div className="prose prose-invert max-w-none">
                        <p className="text-lg leading-relaxed text-gray-300">
                            Pluralityは「社会的差異を超えたコラボレーションのための技術」を意味し、オードリー・タンやグレン・ワイルによって提唱されています。
                            彼らは、この運動をテクノリバタリアンやテクノクラシーに並ぶ第三の技術社会思想として発展させることを目指しており、
                            <Link href="https://www.plurality.institute/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Plurality Institute</Link>を設立したり
                            <Link href="https://www.plurality.net/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Plurality Book</Link>という本を2024年に出版しました。
                        </p>
                        <p className="text-lg leading-relaxed text-gray-300 mt-4">
                            2025年5月2日には、Pluraity Bookの日本語版の出版が予定されており、
                            <Link href="https://drive.google.com/file/d/1uiKYvQY5oUsboudgNMyVRwSglhm-3y2G/view" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">最終ゲラ原稿のPDF</Link>をこちらで読むことができます。また、
                            <Link href="https://nameteki.kensuzuki.org/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">「なめらかな社会とその敵」</Link>の著者でもある
                            東京大学特任研究員の鈴木健が<Link href="https://docs.google.com/document/d/125ac1o7s6X5etSHy_56eevnzFeSLYa1genKpba4lC1I/edit?tab=t.0#heading=h.fq6vj8qwy89i" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">日本語版の解説</Link>を寄稿しているので、読解の参考として最初に読まれることをおすすめします。
                        </p>
                        <div className="mt-6 flex items-center">
                            <Button asChild variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                                <Link
                                    href="https://docs.google.com/document/d/1wsASR3ufPug_t0gyeN3LE1AYWHgxiTLnCRp7gi5qjgo/edit?tab=t.0"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center"
                                >
                                    <span>続きを読む</span>
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Calendar Section */}
                <section className="mb-20 sm:mb-28">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10">Events Calender</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        <div className="md:col-span-1 bg-gray-900 p-5 sm:p-6 rounded-3xl">
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
                                defaultMonth={new Date("2025-05-01")}
                                locale={ja}
                            />
                            <div className="mt-4 flex items-center text-sm text-gray-400">
                                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                                <span>Events Date</span>
                            </div>
                        </div>

                        <div className="md:col-span-2 bg-gray-900 p-5 sm:p-6 rounded-3xl">
                            <h3 className="text-xl font-bold mb-5">
                                {selectedDate ? format(selectedDate, "yyyy年MM月dd日", { locale: ja }) : "日付を選択してください"}
                            </h3>

                            {selectedDateEvents.length > 0 ? (
                                <div className="space-y-4">
                                    {selectedDateEvents.map((event) => (
                                        <Card key={event.id} className="bg-gray-800 border-gray-700">
                                            <CardContent className="p-4 sm:p-5 flex items-start gap-4">
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
                                                    <div className="flex flex-col gap-2 mt-3 text-sm text-gray-300">
                                                        <div className="flex items-center">
                                                            <Clock className="w-4 h-4 mr-2" />
                                                            <span>{event.time || "終日"}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <MapPin className="w-4 h-4 mr-2" />
                                                            <span>{event.location}</span>
                                                        </div>
                                                    </div>
                                                    <Button asChild variant="link" className="text-white p-0 h-auto mt-3">
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
                                <div className="text-center py-16 text-gray-400">
                                    この日に予定されているEventsはありません
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Events一覧 */}
                <section id="events" className="mb-20 sm:mb-32">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-10 sm:mb-14">Eventsスケジュール</h2>

                    <div className="space-y-14 sm:space-y-20">
                        {events.map((event) => (
                            <div id={event.id} key={event.id} className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
                                <div className="grid grid-cols-1 md:grid-cols-7 gap-0">
                                    {/* Events画像 */}
                                    <div className="md:col-span-3 h-72 sm:h-80 md:h-full relative">
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

                                    {/* Events詳細 */}
                                    <div className="md:col-span-4 p-6 sm:p-8">
                                        <h3 className="text-xl sm:text-2xl font-bold mb-5 text-white">{event.title}</h3>

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
                                                <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                                                    {event.additionalInfo.map((info, index) => (
                                                        <li key={index}>{info}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        <div className="flex flex-wrap gap-4 mt-6">
                                            {event.url ? (
                                                <Button asChild className="bg-white hover:bg-gray-200 text-black">
                                                    <Link href={event.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                                        詳細を見る <ExternalLink className="ml-2 h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            ) : event.id === "tokyo-college" ? (
                                                <Button disabled className="bg-gray-500 text-white cursor-not-allowed">
                                                    非公開イベント
                                                </Button>
                                            ) : null}

                                            {event.secondaryUrl && (
                                                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                                                    <Link href={event.secondaryUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                                        関連リンク <ExternalLink className="ml-2 h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            )}
                                        </div>

                                        {/* Tokyo College Eventsの詳細スケジュール */}
                                        {event.id === "tokyo-college" && event.schedule && (
                                            <div className="mt-10">
                                                <h4 className="text-lg font-bold mb-5 text-white">詳細スケジュール</h4>
                                                <div className="space-y-5">
                                                    {event.schedule.map((item, index) => (
                                                        <div key={index} className="border-l-2 border-white pl-5 py-2">
                                                            <div className="flex items-start">
                                                                <span className="text-white font-mono mr-3 bg-gray-800 px-3 py-1 rounded">{item.time}</span>
                                                                <div>
                                                                    <h5 className="font-bold">{item.title}</h5>
                                                                    {item.moderator && (
                                                                        <p className="text-sm text-gray-400 mt-2">
                                                                            モデレーター: {item.moderator}
                                                                        </p>
                                                                    )}
                                                                    {item.speakers && (
                                                                        <div className="text-sm text-gray-300 mt-2">
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
                {/* Book Section */}
                <section className="bg-white text-black py-10 rounded-xl overflow-hidden mb-16 sm:mb-24">
                    <div className="mx-auto max-w-4xl px-5 sm:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h2 className="text-xl font-bold mb-4">Plurality Book is NOW available!</h2>
                                <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                                    Audrey Tang's "PLURALITY: Collaborative Technology and the Future of Democracy" presents a new vision for democracy in the digital age. <span className="font-bold text-black">The Japanese translation is now available.</span>
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
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
                                            href="https://cybozushiki.cybozu.co.jp/books/plurality/"
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
                            <div className="relative w-full max-w-[240px] mx-auto">
                                <Image
                                    src="/images/plurality-book.jpg"
                                    alt="PLURALITY: Collaborative Technology and the Future of Democracy by Audrey Tang"
                                    width={240}
                                    height={320}
                                    className="rounded-lg shadow-lg"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
