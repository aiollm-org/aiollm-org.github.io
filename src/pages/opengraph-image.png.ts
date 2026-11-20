import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import type { APIRoute } from 'astro';
import { createElement, type CSSProperties, type ReactElement } from 'react';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const require = createRequire(import.meta.url);
const font = (weight: 400 | 700) =>
  readFile(
    require.resolve(
      `@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-${weight}-normal.woff`,
    ),
  );

type Child = ReactElement | string;
const h = (
  type: string,
  style: CSSProperties,
  children: Child | Child[],
): ReactElement =>
  createElement(type, { style: { display: 'flex', ...style } }, children);

const card = h(
  'div',
  {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    padding: 72,
    color: '#edf5ff',
    background: 'linear-gradient(125deg, #071521 10%, #133a66 60%, #3c286c)',
  },
  [
    h('div', { fontSize: 42, color: '#7fbeff' }, 'aiollm'),
    h('div', { flexDirection: 'column', gap: 22 }, [
      h('div', { fontSize: 88, fontWeight: 700 }, 'aiollm'),
      h(
        'div',
        { fontSize: 46, maxWidth: 980 },
        'Typed, async Python clients for AI APIs.',
      ),
    ]),
    h(
      'div',
      { fontSize: 25, color: '#bdd3ef' },
      'Pydantic · aiohttp · OpenAI · Anthropic',
    ),
  ],
);

/** The brand card for link previews, drawn once at build. */
export const GET: APIRoute = async () => {
  const svg = await satori(card, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'IBM Plex Sans', data: await font(400), weight: 400 },
      { name: 'IBM Plex Sans', data: await font(700), weight: 700 },
    ],
  });
  const png = new Resvg(svg).render().asPng();
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
