export interface CurationItem {
    id: number
    title: string
    url: string
    author: string
    description?: string
    date: string
    tags?: string[]
    category: 'article' | 'event'
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

export interface Speaker {
    name: string
    role: string
    description: string
    image?: string
    type?: 'live' | 'recording'
}

export interface Sponsor {
    name: string
    image: string
    url: string
}

export interface EventStats {
    speakers: number
    attendees: string
}

export interface Event {
    id: string
    title: string
    date: string
    time: string
    location: string
    description: string
    content: string
    status: 'upcoming' | 'ended'
    cover_image?: string
    youtube_url?: string
    event_report_url?: string
    stats?: EventStats
    speakers?: {
        keynotes?: Speaker[]
        panel1?: Speaker[]
        panel2?: Speaker[]
    }
    sponsors?: {
        gold?: Sponsor[]
        silver?: Sponsor[]
        bronze?: Sponsor[]
    }
}

// ブログ記事の著者、Eventsの講演者など人物を表す共通インターフェース
export interface Person {
    id?: string;
    name: string;
    slug: string;
    role?: string;
    position?: string;
    company?: string;
    bio?: string;
    avatar_url?: string;
    image?: string;
    social?: {
        twitter?: string;
        linkedin?: string;
        github?: string;
        website?: string;
    };
}
