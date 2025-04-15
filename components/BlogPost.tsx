import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BlogPost as BlogPostType } from '@/lib/markdown'

interface BlogPostProps {
    post: BlogPostType
}

export function BlogPost({ post }: BlogPostProps) {
    return (
        <article className="prose prose-lg max-w-none">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <div className="flex items-center space-x-4 text-gray-600">
                    <span>{post.author}</span>
                    <span>•</span>
                    <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
                </div>
                {post.tags && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-sm bg-gray-100 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </header>

            {post.image && (
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-auto rounded-lg mb-8"
                />
            )}

            <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {post.content}
                </ReactMarkdown>
            </div>
        </article>
    )
}
