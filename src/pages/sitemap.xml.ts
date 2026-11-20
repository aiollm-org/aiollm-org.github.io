import type { APIRoute } from 'astro';
import { locales, localeUrl } from '@/lib/locale';
import { languageAlternates } from '@/lib/seo';

const escape = (value: string) => value.replace(/&/g, '&amp;');

export const GET: APIRoute = () => {
  const links = Object.entries(languageAlternates)
    .map(
      ([hreflang, href]) =>
        `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${escape(href)}"/>`,
    )
    .join('\n');
  const urls = locales
    .map(
      (locale) =>
        `  <url>\n    <loc>${escape(localeUrl(locale))}</loc>\n${links}\n  </url>`,
    )
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
