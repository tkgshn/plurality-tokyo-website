import Image from 'next/image';
import Link from 'next/link';

interface Author {
    id: string;
    name: string;
    avatar_url?: string;
}

interface Post {
    id: string;
    title: string;
    slug: string;
    short_description?: string;
    cover_image_url?: string;
    published_at?: string;
    authors?: Author[];
}

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {post.cover_image_url && (
                <div className="relative h-48 w-full">
                    <Image
                        src={post.cover_image_url}
                        alt={post.title}
                        fill
                        className="object-cover"
                    />
                </div>
            )}
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                    </Link>
                </h3>
                {post.short_description && (
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {post.short_description}
                    </p>
                )}
                <div className="flex items-center justify-between">
                    {post.authors && post.authors.length > 0 && (
                        <div className="flex items-center">
                            {post.authors[0].avatar_url && (
                                <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                                    <Image
                                        src={post.authors[0].avatar_url}
                                        alt={post.authors[0].name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {post.authors[0].name}
                            </span>
                        </div>
                    )}
                    {post.published_at && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(post.published_at).toLocaleDateString()}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
