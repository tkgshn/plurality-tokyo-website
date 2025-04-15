import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

export interface BlogPost {
    slug: string
    title: string
    date: string
    author: string
    description: string
    image: string
    tags: string[]
    content: string
}

export interface Article {
    id: string
    title: string
    date: string
    author: string
    description: string
    content: string
    tags: string[]
    url: string
}

export interface Event {
    id: string
    title: string
    date: string
    end_date?: string
    location: string
    description: string
    content: string
    status: 'upcoming' | 'ended'
    speakers?: {
        name: string
        avatar_url?: string
    }[]
}

export function getAllBlogPosts(): BlogPost[] {
    const blogDirectory = path.join(contentDirectory, 'blog')
    const fileNames = fs.readdirSync(blogDirectory)

    const allPosts = fileNames.map(fileName => {
        const slug = fileName.replace(/\.mdx$/, '')
        const fullPath = path.join(blogDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
            slug,
            title: data.title,
            date: data.date,
            author: data.author,
            description: data.description,
            image: data.image,
            tags: data.tags,
            content
        }
    })

    return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
    try {
        const fullPath = path.join(contentDirectory, 'blog', `${slug}.mdx`)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
            slug,
            title: data.title,
            date: data.date,
            author: data.author,
            description: data.description,
            image: data.image,
            tags: data.tags,
            content
        }
    } catch (error) {
        return null
    }
}

// 記事を取得する関数
export function getAllArticles(): Article[] {
    const articlesDirectory = path.join(process.cwd(), 'content/articles')
    const fileNames = fs.readdirSync(articlesDirectory)

    const articles = fileNames
        .filter(fileName => fileName.endsWith('.mdx'))
        .map(fileName => {
            const id = fileName.replace(/\.mdx$/, '')
            const fullPath = path.join(articlesDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const { data, content } = matter(fileContents)

            return {
                id,
                ...data,
                content
            } as Article
        })

    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// イベントを取得する関数
export function getAllEvents(): Event[] {
    const eventsDirectory = path.join(process.cwd(), 'content/events')
    const fileNames = fs.readdirSync(eventsDirectory)

    const events = fileNames
        .filter(fileName => fileName.endsWith('.mdx'))
        .map(fileName => {
            const id = fileName.replace(/\.mdx$/, '')
            const fullPath = path.join(eventsDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const { data, content } = matter(fileContents)

            return {
                id,
                ...data,
                content
            } as Event
        })

    return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// 記事をIDで取得する関数
export function getArticleById(id: string): Article | null {
    try {
        const fullPath = path.join(process.cwd(), 'content/articles', `${id}.mdx`)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
            id,
            ...data,
            content
        } as Article
    } catch (error) {
        return null
    }
}

// イベントをIDで取得する関数
export function getEventById(id: string): Event | null {
    try {
        const fullPath = path.join(process.cwd(), 'content/events', `${id}.mdx`)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
            id,
            ...data,
            content
        } as Event
    } catch (error) {
        return null
    }
}
