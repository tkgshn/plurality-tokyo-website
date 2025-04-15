import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

export interface Speaker {
    name: string;
    role?: string;
}

export interface Event {
    slug: string;
    title: string;
    description: string;
    date: string;
    end_date?: string;
    location?: string;
    coverImage?: string;
    image?: string;
    speakers?: Speaker[];
    content: string;
}

export function getContentBySlug<T extends { slug: string }>(
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
        ...data,
        slug,
        content,
    } as unknown as T
}

export function getAllContent<T extends { slug: string, date?: string }>(directory: string): T[] {
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
            if (a.date && b.date) {
                return new Date(b.date).getTime() - new Date(a.date).getTime()
            }
            return 0
        })
}

export function getEventBySlug(slug: string): Event {
    return getContentBySlug<Event>('events', slug)
}

export function getAllEvents(): Event[] {
    return getAllContent<Event>('events')
}
