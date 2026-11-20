import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { project } from './src/data/project';

// The site is served from the root of its host, so there is no `base`.
export default defineConfig({
  site: project.landing,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
  devToolbar: { enabled: false },
});
