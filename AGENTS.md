# Repository Guidelines

## Project Structure & Module Organization

This is the aiollm landing page, a static Astro site with React islands, TypeScript, Tailwind CSS, Motion, and shadcn/ui. The Python toolkit lives separately in `aiollm-org/aiollm`. The repository is the organization's GitHub Pages site (`aiollm-org.github.io`), so the site is served from the root of its host.

- `src/layouts/Landing.astro` composes one locale's page, head metadata included; `src/pages/index.astro` and `src/pages/ru/index.astro` render it. `src/pages/` also generates `robots.txt`, `sitemap.xml`, and `opengraph-image.png`.
- `src/sections/` holds the sections as React components that render to HTML at build time. Add `client:*` islands only in `.astro` files; a client component nested in a section does not hydrate.
- `src/components/` holds branding, header and footer, and the interactive parts. `Hero` and `ThemeSwitcher` are the islands. `src/components/ui/` has owned shadcn/ui Button, Tabs, and DropdownMenu; `components.json` configures generation.
- `src/data/` stores Python examples, release metadata, source links, and FAQ copy. `src/data/i18n/` holds typed English and Russian dictionaries; keep both complete and pass only needed labels to islands.
- `src/lib/` has locale, theme, SEO, highlighting, and logo helpers. `src/styles.css` defines Tailwind tokens and specialized visuals; `src/assets/images/` holds logos and the SVG lattice; `public/` holds the favicon.
- `tests/*.spec.ts` exercise the production build. `.github/workflows/pages.yml` runs the checks and deploys.

## Build, Test, and Development Commands

Use Node.js 22.12+ and npm; CI uses Node.js 24.

- `npm ci`: install the locked dependencies.
- `npm run dev`: start Astro at localhost:4321.
- `npm run build`: build the static site into `dist/`.
- `npm run preview`: serve `dist/`. Under an agent environment it may start in the background; unset `AI_AGENT` and `CLAUDECODE` when Playwright must own the process.
- `npx playwright install chromium`: install the test browser. `PLAYWRIGHT_CHROMIUM_PATH` points the tests at another Chromium.
- `npm test`: test the existing build on port 4173; build first.
- `npm run check`: Prettier, ESLint, build, `astro check`, and the tests.
- `npm run format`: apply Prettier.

## Coding Style & Naming Conventions

Use two spaces, single quotes, PascalCase component files, camelCase variables, and kebab-case CSS hooks. Enforce strict TypeScript, Prettier, and ESLint.

Use Tailwind utilities and theme tokens. Render everything possible at build time; isolate state, browser APIs, and Motion in small islands. Keep content visible before hydration. Reuse shadcn/ui primitives and `@/` imports. Preserve keyboard navigation, themes, and reduced motion. Avoid CDN scripts and exposed API keys.

The page is static: the saved theme is applied by the inline script in `<head>`, never by a server. Public URLs live in `src/data/project.ts` (`landing` and `docs`); canonical, hreflang, JSON-LD, sitemap, and links all read them. Only advertise real routes and languages. The host is shared with the docs, so `robots.txt` never disallows it as a whole; `SITE_INDEXABLE=false` at build time adds `noindex` to the pages instead (see README).

English uses `/`, Russian `/ru/`. Locale comes from the route. Preserve translated HTML, `html lang`, native language links, technical identifiers, and documentation paths.

## Testing Guidelines

Add behavior-focused `*.spec.ts` tests under `tests/`. Cover responsive layouts, saved and System themes, reduced motion, hydration, keyboard menus and tabs, clipboard failures, images, and layout bounds. Commands and code must wrap rather than scroll horizontally. Tests block third-party requests; fonts are bundled CSS assets. Wait for islands to hydrate (`astro-island[ssr]` gone) before clicking them. Check copy against the upstream sources listed in README. No coverage threshold is configured.

## Commit & Pull Request Guidelines

No commit convention is established. Use imperative subjects such as `Migrate code tabs to shadcn`. Describe behavior, link relevant issues, report checks, and attach screenshots for visual changes. Exclude `dist/`, `.astro/`, generated reports, and `node_modules/`.
