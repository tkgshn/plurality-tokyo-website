import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Content, EventContent, ArticleContent, SpeakerContent } from '@/types/content'

const contentDirectory = path.join(process.cwd(), 'content')

export function getContentBySlug<T extends Content>(
    directory: string,
    slug: string
): T {
    const fullPath = path.join(contentDirectory, directory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
        metadata: {
            ...data,
            slug,
        },
        content,
    } as T
}

export function getAllContent<T extends Content>(directory: string): T[] {
    const directoryPath = path.join(contentDirectory, directory)
    const files = fs.readdirSync(directoryPath)

    return files
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => {
            const slug = file.replace(/\.mdx$/, '')
            return getContentBySlug<T>(directory, slug)
        })
        .sort((a, b) => {
            if (a.metadata.date && b.metadata.date) {
                return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
            }
            return 0
        })
}

export function getEventBySlug(slug: string): EventContent {
    return getContentBySlug<EventContent>('events', slug)
}

export function getAllEvents(): EventContent[] {
    return getAllContent<EventContent>('events')
}

export function getArticleBySlug(slug: string): ArticleContent {
    return getContentBySlug<ArticleContent>('articles', slug)
}

export function getAllArticles(): ArticleContent[] {
    return getAllContent<ArticleContent>('articles')
}

export function getSpeakerBySlug(slug: string): SpeakerContent {
    return getContentBySlug<SpeakerContent>('authors', slug)
}

export function getAllSpeakers(): SpeakerContent[] {
    return getAllContent<SpeakerContent>('authors')
}
