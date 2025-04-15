import Link from 'next/link'
import { CurationItem as CurationItemType } from '@/lib/types'

interface CurationItemProps {
    item: CurationItemType
}

export function CurationItem({ item }: CurationItemProps) {
    return (
        <article className="border-b border-gray-200 py-4 sm:py-6">
            <div className="flex flex-col space-y-2 sm:space-y-3">
                <Link
                    href={item.url}
                    target={item.url.startsWith('http') ? '_blank' : undefined}
                    rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-lg sm:text-xl font-semibold text-blue-600 hover:text-blue-800"
                >
                    {item.title}
                </Link>

                <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600">
                    <span>{item.author}</span>
                    <span>•</span>
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                    {item.category === 'event' && (
                        <>
                            <span>•</span>
                            <span className="bg-gray-100 px-2 py-1 rounded-full">イベント</span>
                        </>
                    )}
                </div>

                {item.description && (
                    <p className="text-sm sm:text-base text-gray-700">
                        {item.description}
                    </p>
                )}

                {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 text-xs bg-gray-100 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </article>
    )
}
