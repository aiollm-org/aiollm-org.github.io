import { getImage } from 'astro:assets';
import lightSource from '@/assets/images/aiollm.png';
import darkSource from '@/assets/images/aiollm_dark.png';

export type Logo = { src: string; width: number; height: number };
export type Logos = { light: Logo; dark: Logo };

/** Resized once at build: the logos show at 300 px or less, so 600 px covers 2x screens. */
export async function getLogos(): Promise<Logos> {
  const [light, dark] = await Promise.all(
    [lightSource, darkSource].map(async (src) => {
      const image = await getImage({ src, width: 600, format: 'webp' });
      return { src: image.src, width: src.width, height: src.height };
    }),
  );
  return { light: light!, dark: dark! };
}
