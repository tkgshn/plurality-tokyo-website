import { Metadata } from 'next'

const descriptions = {
  'en': 'Plurality Tokyo is a community focused on diversity and inclusivity, hosting events and sharing knowledge about plurality concepts.',
  'ja': 'Plurality Tokyoは、多様性と包括性を重視したコミュニティです。プルラリティに関するイベントの開催や知識の共有を行っています。'
};

const keywords = {
  'en': ['Plurality', 'Tokyo', 'Events', 'Community', 'Diversity', 'Inclusivity', 'Technology', 'Democracy'],
  'ja': ['プルラリティ', '東京', 'イベント', 'コミュニティ', '多様性', '包括性', 'テクノロジー', '民主主義']
};

/**
 * Generate metadata based on the current locale
 * @param locale The current locale (en or ja)
 * @returns Metadata object with locale-specific content
 */
export function getMetadata(locale: string = 'ja'): Metadata {
  return {
    title: {
      default: 'Plurality Tokyo',
      template: '%s | Plurality Tokyo'
    },
    description: descriptions[locale as keyof typeof descriptions] || descriptions['ja'],
    keywords: [...keywords['en'], ...keywords['ja']], // Include keywords from both languages for better SEO
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
      languages: {
        'en': '/en',
        'ja': '/'
      }
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'ja_JP',
      url: 'https://plurality.tokyo',
      siteName: 'Plurality Tokyo',
      title: 'Plurality Tokyo',
      description: descriptions[locale as keyof typeof descriptions] || descriptions['ja'],
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
      description: descriptions[locale as keyof typeof descriptions] || descriptions['ja'],
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
      google: 'your-google-site-verification', // Replace with actual verification code
    },
  };
}

export const defaultMetadata = getMetadata('ja');
