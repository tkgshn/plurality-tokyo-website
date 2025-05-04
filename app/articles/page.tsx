import { Metadata } from 'next'
import Link from 'next/link'
import { format } from 'date-fns'
import { getAllArticles } from '@/lib/articles'
import PageHeader from '@/components/page-header'
import { ExternalLink } from 'lucide-react'
import { cookies } from 'next/headers'
import { Locale, defaultLocale, translate } from "@/lib/i18n"
import Image from "next/image";
import React from "react";
import { SpeakerAvatar } from "@/components/SpeakerAvatar";

export const metadata: Metadata = {
    title: 'Articles',
    description: 'Articles related to Plurality',
}

export default function ArticlesPage() {
    // サーバーサイドでロケールを取得
    const cookieStore = cookies();
    const localeCookie = cookieStore.get('NEXT_LOCALE');
    const locale = (localeCookie?.value || defaultLocale) as Locale;

    const t = (key: string) => translate(locale, key);
    const articles = getAllArticles()

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
                <h1 className="text-4xl sm:text-6xl font-bold mb-12">
                    {t('navigation.articles')}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {articles.map((item) => (
                        <div key={item.id} className="bg-gray-900 p-6 rounded-lg">
                            <div className="relative w-full h-40 mb-4 overflow-hidden rounded">
                                {item.coverImage ? (
                                    <Image
                                        src={item.coverImage}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <Image
                                        src="/images/default-cover.png"
                                        alt="No image"
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>
                            <Link
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <h3 className="text-xl font-bold mb-3 hover:text-lime-400">{item.title}</h3>
                            </Link>
                            <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center text-gray-400 text-sm">
                                    {/* Author display */}
                                    {item.author && (() => { // Use an IIFE (Immediately Invoked Function Expression)
                                        // Calculate slug based on the author string
                                        const authorSlug = item.author.toLowerCase()
                                            .replace(/\s+/g, '-') // Replace spaces with hyphens
                                            .replace(/^e\.\s+/, '') // Remove "e. " prefix
                                            .replace(/^dr\.\s+/, '') // Remove "dr. " prefix
                                            .replace(/^prof\.\s+/, '') // Remove "prof. " prefix
                                            .replace(/['"]/g, ''); // Remove quotes
                                        const imageSource = item.author.avatar_url ||
                                          (item.author.authorInfo?.metadata?.avatar_url) || null;

//                                      const imageSource = `/images/speakers/${authorSlug}.png`;

                                        return (
                                            <div className="flex -space-x-2 overflow-hidden">
                                                <SpeakerAvatar
                                                    key={item.id}
//                                                  src={imageSource}
                                                    src={imageSource || "/images/no-image.png"}
                                                    alt={item.author} // Use the author's name string for alt text
                                                />
                                            </div>
                                        );
                                    })()}
                                    <span>{item.author}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-wrap gap-2">
                                        {item.tags && item.tags.map((tag) => (
                                            <span key={tag} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-400">{item.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
