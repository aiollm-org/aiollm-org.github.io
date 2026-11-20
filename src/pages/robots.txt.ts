import type { APIRoute } from 'astro';
import { indexable } from '@/lib/seo';
import { project } from '@/data/project';

// robots.txt of github.io covers every project site on the host, the docs
// among them, so it never blocks the whole host; the pages carry `noindex`.
export const GET: APIRoute = () => {
  const lines = ['User-agent: *', 'Allow: /'];
  if (indexable) {
    lines.push('', `Sitemap: ${new URL('sitemap.xml', project.landing).href}`);
  }
  return new Response(`${lines.join('\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
