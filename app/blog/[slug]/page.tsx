import { notFound } from 'next/navigation'
import { getBlogPostBySlug } from '@/lib/markdown'
// import { BlogPost } from '@/components/BlogPost'

interface BlogPageProps {
  params: {
    slug: string
  }
}

export default function BlogPage({ params }: BlogPageProps) {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* <BlogPost post={post} /> */}
      <article className="prose prose-lg max-w-3xl mx-auto">
        <h1>{post.title}</h1>
        {post.date && (
          <p className="text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
        )}
        <div className="mt-8">
          {post.content.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </article>
    </main>
  )
}
