/**
 * @file YouTubeSection.tsx
 * @description Plurality TokyoのYouTube動画を表示するコンポーネント
 */

'use client'

import { FC } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface YouTubeSectionProps {
    className?: string
}

export const YouTubeSection: FC<YouTubeSectionProps> = ({ className }) => {
    // 人気の動画3つのIDを定義
    const popularVideos = [
        {
            id: 'k6bZ2qayBQA',
            title: 'Plurality Tokyo - Plurality Salon #1'
        },
        {
            id: 'zP7s_xFVGY8',
            title: 'Plurality Tokyo - Plurality Salon #2'
        },
        {
            id: 'Sqyxvyh69cU',
            title: 'Plurality Tokyo - Plurality Salon #3'
        }
    ]

    return (
        <section className={`py-12 ${className}`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold">Curated Videos</h2>
                    <Link
                        href="https://www.youtube.com/@PluralityTokyo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lime-400 hover:text-lime-300 flex items-center"
                    >
                        See all <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {popularVideos.map((video) => (
                        <div key={video.id} className="aspect-video">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${video.id}`}
                                title={video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
