'use client';

interface JsonLdProps {
  data: Record<string, any>;
}

/**
 * Component to add structured data (JSON-LD) to pages
 * This helps search engines better understand the content of the page
 * @param data The structured data object to be rendered as JSON-LD
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
