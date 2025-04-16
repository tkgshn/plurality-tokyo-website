import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Content, EventContent, ArticleContent } from '@/types/content'
import { Person } from '@/lib/types'

const contentDirectory = path.join(process.cwd(), 'content')

export function getContentBySlug<T extends Content>(
    directory: string,
    slug: string
): T {
    // .mdxファイルを優先的に確認し、なければ.mdファイルを確認
    const mdxPath = path.join(contentDirectory, directory, `${slug}.mdx`)
    const mdPath = path.join(contentDirectory, directory, `${slug}.md`)

    let fullPath = ''
    if (fs.existsSync(mdxPath)) {
        fullPath = mdxPath
    } else if (fs.existsSync(mdPath)) {
        fullPath = mdPath
    } else {
        throw new Error(`File not found for slug: ${slug}`)
    }

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
    if (!fs.existsSync(directoryPath)) {
        return []
    }

    const files = fs.readdirSync(directoryPath)

    return files
        .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
        .map((file) => {
            const slug = file.replace(/\.(mdx|md)$/, '')
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

export function getPersonBySlug(slug: string, directory = 'authors'): Content & { metadata: { [key: string]: any } } {
    return getContentBySlug<Content>(directory, slug)
}

export function getAllPeople(directory = 'authors'): Array<Content & { metadata: { [key: string]: any } }> {
    return getAllContent<Content>(directory)
}

export function getSpeakerBySlug(slug: string): Content & { metadata: { [key: string]: any } } {
    return getPersonBySlug(slug)
}

export function getAllSpeakers(): Array<Content & { metadata: { [key: string]: any } }> {
    return getAllPeople()
}

export function getAuthorBySlug(slug: string): Content & { metadata: { [key: string]: any } } {
    return getPersonBySlug(slug)
}

export function getAllAuthors(): Array<Content & { metadata: { [key: string]: any } }> {
    return getAllPeople()
}
