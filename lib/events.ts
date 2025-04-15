import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const eventsDirectory = path.join(process.cwd(), 'content/events')

export interface Event {
    slug: string
    title: string
    description: string
    date: string
    coverImage?: string
    content: string
}

export function getAllEvents(): Event[] {
    if (!fs.existsSync(eventsDirectory)) {
        return []
    }

    const fileNames = fs.readdirSync(eventsDirectory)
    return fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        return getEventBySlug(slug)
    })
}

export function getEventBySlug(slug: string): Event {
    const fullPath = path.join(eventsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        coverImage: data.coverImage,
        content,
    }
}
