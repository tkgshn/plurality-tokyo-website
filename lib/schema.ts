/**
 * Schema.org structured data for better SEO
 * These functions generate JSON-LD data for different page types
 */

/**
 * Generate organization schema for Plurality Tokyo
 * @param locale Current locale (en or ja)
 */
export function getOrganizationSchema(locale: string = 'ja') {
  const description = locale === 'en'
    ? 'Plurality Tokyo is a community focused on diversity and inclusivity.'
    : 'Plurality Tokyoは、多様性と包括性を重視したコミュニティです。';

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Plurality Tokyo',
    url: 'https://plurality.tokyo',
    logo: 'https://plurality.tokyo/og-image.jpg',
    description,
    sameAs: [
      'https://twitter.com/plurality_tokyo',
    ]
  };
}

/**
 * Generate event schema for an event page
 * @param event Event data
 * @param locale Current locale (en or ja)
 */
export function getEventSchema(event: any, locale: string = 'ja') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: event.date,
    endDate: event.end_date || event.date,
    location: {
      '@type': 'Place',
      name: event.location,
      address: event.address || {
        '@type': 'PostalAddress',
        addressLocality: 'Tokyo',
        addressCountry: 'JP'
      }
    },
    organizer: {
      '@type': 'Organization',
      name: 'Plurality Tokyo',
      url: 'https://plurality.tokyo'
    },
    image: event.coverImage || 'https://plurality.tokyo/og-image.jpg',
    inLanguage: locale === 'en' ? 'en-US' : 'ja-JP'
  };
}

/**
 * Generate article schema for an article page
 * @param article Article data
 * @param locale Current locale (en or ja)
 */
export function getArticleSchema(article: any, locale: string = 'ja') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt || article.description,
    image: article.coverImage || 'https://plurality.tokyo/og-image.jpg',
    datePublished: article.date,
    dateModified: article.updated || article.date,
    author: {
      '@type': 'Person',
      name: article.author || 'Plurality Tokyo Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Plurality Tokyo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://plurality.tokyo/og-image.jpg'
      }
    },
    inLanguage: locale === 'en' ? 'en-US' : 'ja-JP'
  };
}

/**
 * Generate breadcrumb schema for navigation
 * @param items Array of breadcrumb items with name and url
 * @param locale Current locale (en or ja)
 */
export function getBreadcrumbSchema(items: Array<{name: string, url: string}>, locale: string = 'ja') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
