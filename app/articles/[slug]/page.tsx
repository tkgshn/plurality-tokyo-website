import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticleBySlug } from '@/lib/content'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Button } from '@/components/ui/button'
import { CopyIcon } from 'lucide-react'
import { toast } from 'sonner'

interface ArticlePageProps {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
    try {
        const article = getArticleBySlug(params.slug)
        return {
            title: article.metadata.title,
            description: article.metadata.description,
            openGraph: {
                title: article.metadata.title,
                description: article.metadata.description,
                images: article.metadata.image ? [article.metadata.image] : [],
            },
        }
    } catch {
        return {}
    }
}

export default function ArticlePage({ params }: ArticlePageProps) {
    let article
    try {
        article = getArticleBySlug(params.slug)
    } catch {
        notFound()
    }

    const handleCopyContent = async () => {
        try {
            await navigator.clipboard.writeText(article.content)
            toast.success('コンテンツをコピーしました')
        } catch (error) {
            toast.error('コピーに失敗しました')
        }
    }

    return (
        <article className="prose prose-lg mx-auto max-w-4xl px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1>{article.metadata.title}</h1>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyContent}
                    className="ml-4"
                >
                    <CopyIcon className="h-4 w-4" />
                </Button>
            </div>

            <div className="mb-8">
                <p className="text-gray-600">{article.metadata.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {article.metadata.tags?.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="prose prose-lg">
                <MDXRemote source={article.content} />
            </div>
        </article>
    )
}
