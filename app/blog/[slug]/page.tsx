import { notFound } from 'next/navigation'
import { getBlogPostBySlug } from '@/lib/markdown'
import { BlogPost } from '@/components/BlogPost'

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
      <BlogPost post={post} />
    </main>
  )
}
