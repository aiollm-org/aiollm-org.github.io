import { project } from '@/data/project';

export const locales = ['en', 'ru'] as const;
export type Locale = (typeof locales)[number];
export function isLocale(value: string): value is Locale {
  return value === 'en' || value === 'ru';
}
/** Site-relative path; the Russian page is a directory, so it ends in a slash. */
export function localePath(locale: Locale) {
  return locale === 'en' ? '/' : '/ru/';
}
export function localeUrl(locale: Locale) {
  return new URL(localePath(locale), project.landing).href;
}
