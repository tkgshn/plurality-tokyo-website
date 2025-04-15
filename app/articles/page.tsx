import { Metadata } from 'next'
import Link from 'next/link'
import { format } from 'date-fns'
import { getAllArticles } from '@/lib/articles'
import PageHeader from '@/components/page-header'
import { ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Articles - Plurality Tokyo',
    description: 'News and articles from the Plurality ecosystem',
}

export default function ArticlesPage() {
    const articles = getAllArticles()

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
                <PageHeader title="News from the Ecosystem" backLink={{ href: "/", label: "Home" }} />

                <div className="grid grid-cols-1 gap-8 sm:gap-16">
                    {articles.map((article) => (
                        <article key={article.id} className="border-b border-gray-700 pb-8 last:border-0">
                            <div className="flex flex-col space-y-3">
                                <Link
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xl font-semibold text-lime-400 hover:text-lime-300 transition-colors group flex items-center"
                                >
                                    {article.title}{' '}
                                    <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>

                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <span>{article.author}</span>
                                    <span>•</span>
                                    <time dateTime={article.date}>{format(new Date(article.date), 'MMMM d, yyyy')}</time>
                                </div>

                                <p className="text-gray-300">
                                    {article.description}
                                </p>

                                {article.tags && article.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {article.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}
