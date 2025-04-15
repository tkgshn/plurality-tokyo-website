export interface ContentMetadata {
    title: string
    description: string
    date?: string
    author?: string
    tags?: string[]
    image?: string
    slug: string
}

export interface Content {
    metadata: ContentMetadata
    content: string
}

export interface EventContent extends Content {
    metadata: ContentMetadata & {
        date: string
        end_date?: string
        location: string
        cover_image_url?: string
        report_url?: string
        event_page_url?: string
        video_url?: string
        speakers_count?: number
        attendees_count?: number
        speakers?: {
            name: string
            role?: string
            avatar_url?: string
        }[]
        tags?: string[]
    }
}

export interface ArticleContent extends Content {
    metadata: ContentMetadata & {
        category: string
        readTime?: number
    }
}

export interface SpeakerContent extends Content {
    metadata: ContentMetadata & {
        position: string
        company?: string
        social?: {
            twitter?: string
            linkedin?: string
            github?: string
        }
    }
}
