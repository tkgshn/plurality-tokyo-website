import fs from 'fs';
import path from 'path';
import { getAllEvents } from '../lib/content';
import { getAllArticles } from '../lib/content';

/**
 * Generate a dynamic sitemap.xml file based on the current content
 * This improves SEO by helping search engines discover all pages
 */
async function generateSitemap() {
  const baseUrl = 'https://plurality.tokyo';
  
  const staticPages = [
    { path: '', priority: 1.0, changefreq: 'weekly' },
    { path: 'about', priority: 0.8, changefreq: 'monthly' },
    { path: 'events', priority: 0.9, changefreq: 'weekly' },
    { path: 'articles', priority: 0.9, changefreq: 'weekly' },
    { path: 'join', priority: 0.7, changefreq: 'monthly' },
    { path: 'plurality-week', priority: 0.8, changefreq: 'monthly' },
  ];

  const events = getAllEvents();
  const articles = getAllArticles();

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  staticPages.forEach(page => {
    sitemap += `  <url>
    <loc>${baseUrl}/${page.path}</loc>
    <xhtml:link rel="alternate" hreflang="ja" href="${baseUrl}/${page.path}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/${page.path}"/>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  events.forEach(event => {
    sitemap += `  <url>
    <loc>${baseUrl}/events/${event.metadata.slug}</loc>
    <xhtml:link rel="alternate" hreflang="ja" href="${baseUrl}/events/${event.metadata.slug}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/events/${event.metadata.slug}"/>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  });

  articles.forEach(article => {
    sitemap += `  <url>
    <loc>${baseUrl}/articles/${article.metadata.slug}</loc>
    <xhtml:link rel="alternate" hreflang="ja" href="${baseUrl}/articles/${article.metadata.slug}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/articles/${article.metadata.slug}"/>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  });

  sitemap += `</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
}

generateSitemap().catch(console.error);

export default generateSitemap;
