# aiollm landing page

The landing page for [aiollm](https://github.com/aiollm-org/aiollm), built with Astro, React islands, TypeScript, Tailwind CSS, Motion, and shadcn/ui. It is a static site, published with GitHub Pages at <https://aiollm-org.github.io/>.

## Development

Requires Node.js 22.12+ and npm. CI uses Node.js 24.

```sh
npm ci
npm run dev
```

Open [localhost:4321](http://localhost:4321). The page is composed in `src/layouts/Landing.astro` and rendered twice, by `src/pages/index.astro` (English) and `src/pages/ru/index.astro` (Russian).

- `src/sections/`: the landing-page sections. They are plain React components that Astro renders to HTML at build time and ships no JavaScript for.
- `src/components/`: branding, the header and footer, code display, and the interactive parts. Two are islands that hydrate in the browser: `Hero` (Motion entrance, pointer-driven backdrop, code tabs, copy button) and `ThemeSwitcher`.
- `src/components/ui/`: shadcn/ui Button, Tabs, and DropdownMenu, styled for this page. Radix primitives supply keyboard and ARIA behavior.
- `src/data/examples.ts`: displayed Python snippets and the install command.
- `src/data/project.ts`: release metadata, source links, provider field mappings, FAQ copy, and the two public URLs.
- `src/data/i18n/`: typed English and Russian dictionaries. Russian must satisfy the English shape.
- `src/lib/`: locale and theme helpers, SEO data, build-time syntax highlighting and logo optimization.
- `src/pages/`: `robots.txt`, `sitemap.xml`, and the social card `opengraph-image.png`, all generated at build.
- `src/scripts/web-vitals.ts`: Core Web Vitals summaries.
- `src/styles.css`: Tailwind theme tokens and specialized component visuals.

Fonts are bundled from Fontsource packages as CSS assets, with no Google Fonts requests. Commands and Python examples wrap instead of scrolling horizontally; the provider mapping becomes labeled cards on narrow screens. The Python snippets are displayed text and do not call provider APIs.

## Themes

The header menu offers System, Dark, and Light. System follows the operating system through CSS media queries. An explicit choice is stored for a year in the `aiollm-theme` cookie.

The page is static, so no server can read that cookie. A small inline script in `<head>` (`themeBootScript` in `src/lib/theme.ts`) reads it before first paint and sets `data-theme` on `<html>`; the HTML itself always says `data-theme="system"`. A missing or invalid cookie means System. The theme menu is disabled until it hydrates.

## Languages

English lives at `/`, Russian at `/ru/` (GitHub Pages redirects `/ru` to it). The header's EN/RU links work without JavaScript, and switching keeps the theme cookie. English remains the default; the browser language does not redirect visitors. Unsupported locales are plain 404s, and there is no `/en` alias.

Translation strings can wrap inline API names in backticks; `InlineCode` renders them as escaped React text and `<code>`. Keep code identifiers, install commands, and documentation paths intact.

## Validation

```sh
npx playwright install chromium
npm run check
```

`npm run check` runs Prettier, ESLint, the production build, `astro check` (strict TypeScript), and the Playwright tests against `astro preview` on port 4173. The tests cover desktop and mobile layouts, themes, reduced motion, hydration, server HTML without JavaScript, syntax highlighting, keyboard menus and tabs, the FAQ, images, clipboard failures, SEO metadata, and web vitals. Third-party requests are blocked during the main tests.

Run `PLAYWRIGHT_CHROMIUM_PATH=/path/to/chrome npm test` to use an installed Chromium, or `PLAYWRIGHT_CHANNEL=msedge` for Edge. Where an agent environment makes `astro preview` start in the background, unset `AI_AGENT` and `CLAUDECODE` for the run.

```sh
npm run format
npm run lint
npm run typecheck
npm run build
npm run preview
```

## Deployment

`.github/workflows/pages.yml` runs the checks on every push and pull request. A push to `master` also builds the site and publishes `dist/` with GitHub Pages. One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The repository is named `aiollm-org.github.io`, the organization's Pages site, so the landing page is served from the root of `https://aiollm-org.github.io/` and needs no `base` path. The docs are another project site of the organization at `/aiollm/`.

## Domains and SEO

`src/data/project.ts` owns the public URLs: `landing` (this site) and `docs` (the aiollm MkDocs site). Canonical, hreflang, JSON-LD, the sitemap, and every link read them.

**Moving to aiollm.dev.** Set `landing` to `https://aiollm.dev` in `project.ts`, add `public/CNAME` with `aiollm.dev`, and set the custom domain in Settings → Pages. When the docs get `docs.aiollm.dev`, change `docs` as well. Once the organization's Pages site has a custom domain, project sites without their own domain are served below it (`aiollm.dev/aiollm/`), so give the docs their domain first or at the same time.

**Indexing.** The host also serves the docs, so `robots.txt` never disallows the whole host. Instead, while the landing lives on github.io the deployed pages carry `<meta name="robots" content="noindex, follow">` and `robots.txt` omits the sitemap: the workflow builds with `SITE_INDEXABLE=false` unless the repository variable `SITE_INDEXABLE` is `true`. Set that variable at launch and rebuild. A local `npm run build` is indexable unless you set `SITE_INDEXABLE=false`.

`src/lib/seo.ts` supplies localized titles, descriptions, Open Graph and Twitter metadata, and escaped JSON-LD for the website, page, source code, and visible FAQ. The shared brand card is drawn at build into `/opengraph-image.png` with satori. Each language has its own canonical URL and reciprocal English, Russian, and `x-default` hreflang links. Themes and tracking parameters share the language's canonical URL.

All headings, prose, links, FAQ answers, and the initial Python example are in the HTML. Native FAQ controls work without JavaScript. Python highlighting runs at build time. Motion starts after hydration, and the markup has no hidden entrance state.

## Core Web Vitals

`src/scripts/web-vitals.ts` uses the `web-vitals` package to report **LCP**, **INP**, and **CLS**. Open the browser console in development and filter for `[aiollm:web-vital]`. Metrics finalize on interaction or when the page becomes hidden, so click a control and switch tabs to see all three. Every environment emits an `aiollm:web-vital` window event with `name`, `value`, `rating`, `delta`, `id`, and `navigationType`. The page sends no analytics requests and stores no metrics.

Aim for LCP ≤ 2.5 s, INP ≤ 200 ms, and CLS ≤ 0.1 at the 75th percentile of real visits ([Web Vitals guidance](https://web.dev/articles/vitals)). Local Playwright measurements validate reporting; they do not establish field scores.

## shadcn/ui

`components.json` configures TypeScript, the `@/` import alias, and the shared CSS file. Add components with `npx shadcn@latest add <component>`. Components are owned source code, so review generated changes, keep their theme tokens consistent with the page, and add only what the page uses.

## Content sources

Reviewed on 2026-11-07 against aiollm **0.10.0**. Content is a maintained snapshot, not fetched from upstream at runtime.

- [README](https://github.com/aiollm-org/aiollm#readme), [package metadata](https://github.com/aiollm-org/aiollm/blob/master/src/aiollm/__meta__.py), and [release notes](https://aiollm-org.github.io/aiollm/changelog/) establish the version, Python requirement, source installation, and pre-alpha status.
- [Shared generation](https://aiollm-org.github.io/aiollm/guide/generation/) and [field mapping](https://aiollm-org.github.io/aiollm/unification/) establish conversations, effort, structured output, reasoning summaries, and provider-specific limits. Structured output is JSON text, not a locally parsed Pydantic response.
- [Tools](https://aiollm-org.github.io/aiollm/guide/tools/) establishes function tools, tool loops, and streamed tool calls; the 0.10.0 release notes establish the generated provider types.
- [Streaming](https://aiollm-org.github.io/aiollm/guide/streaming/), [errors](https://aiollm-org.github.io/aiollm/guide/errors/), and [uploads](https://aiollm-org.github.io/aiollm/guide/uploads/) establish terminal checks, bounded retries, and one-shot source behavior.
- [Provider clients](https://aiollm-org.github.io/aiollm/guide/providers/), [extending](https://aiollm-org.github.io/aiollm/guide/extending/), and [design](https://aiollm-org.github.io/aiollm/guide/design/) establish scope, session ownership, extension points, and limitations.

Refresh the README, package version, release notes, and relevant implementation together: older guide examples can predate a release. Update `project.ts` and the behavior tests together. Python examples are display snippets checked for syntax; browser tests do not execute provider calls or verify live models.
