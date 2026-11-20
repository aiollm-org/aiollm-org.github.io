import { project } from '@/data/project';
import { en, type Dictionary } from '@/data/i18n/en';
import { localeUrl, type Locale } from '@/lib/locale';

export const siteTitle = en.seo.title;
export const siteDescription = en.seo.description;
export const languageAlternates = {
  en: localeUrl('en'),
  ru: localeUrl('ru'),
  'x-default': localeUrl('en'),
};
export const socialImageUrl = new URL('/opengraph-image.png', project.landing)
  .href;

// Production builds can opt out before release (SITE_INDEXABLE=false); development stays unindexed.
export const indexable =
  process.env.NODE_ENV === 'production' &&
  process.env.SITE_INDEXABLE !== 'false';

export function getLandingStructuredData(locale: Locale, copy: Dictionary) {
  const url = localeUrl(locale);
  const site = localeUrl('en');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${site}#website`,
        url: site,
        name: 'aiollm',
        inLanguage: ['en', 'ru'],
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: copy.seo.title,
        description: copy.seo.description,
        inLanguage: locale,
        isPartOf: { '@id': `${site}#website` },
        about: { '@id': `${site}#software` },
        hasPart: { '@id': `${url}#faq` },
      },
      {
        '@type': 'SoftwareSourceCode',
        '@id': `${site}#software`,
        name: 'aiollm',
        description: copy.seo.description,
        url: site,
        codeRepository: project.repository,
        version: project.version,
        programmingLanguage: 'Python',
        runtimePlatform: `Python ${project.python}`,
        license: `${project.repository}/blob/master/LICENSE`,
        subjectOf: {
          '@type': 'WebPage',
          url: project.docs,
          name: copy.nav.documentation,
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        isPartOf: { '@id': `${url}#webpage` },
        inLanguage: locale,
        mainEntity: copy.faq.items.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  };
}

/** JSON inside a script must not be able to close the surrounding HTML tag. */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
