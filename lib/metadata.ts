import { Metadata } from 'next'

export const defaultMetadata: Metadata = {
    title: {
        default: 'Plurality Tokyo',
        template: '%s | Plurality Tokyo'
    },
    description: 'Plurality Tokyoは、多様性と包括性を重視したコミュニティイベントです。',
    keywords: ['Plurality', 'Tokyo', 'イベント', '多様性', '包括性', 'コミュニティ'],
    authors: [{ name: 'Plurality Tokyo Team' }],
    creator: 'Plurality Tokyo Team',
    publisher: 'Plurality Tokyo',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://plurality.tokyo'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'ja_JP',
        url: 'https://plurality.tokyo',
        siteName: 'Plurality Tokyo',
        title: 'Plurality Tokyo',
        description: 'Plurality Tokyoは、多様性と包括性を重視したコミュニティイベントです。',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Plurality Tokyo',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Plurality Tokyo',
        description: 'Plurality Tokyoは、多様性と包括性を重視したコミュニティイベントです。',
        images: ['/og-image.jpg'],
        creator: '@plurality_tokyo',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-site-verification',
    },
}
