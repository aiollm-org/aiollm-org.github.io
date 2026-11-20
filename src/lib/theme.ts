export const themeCookieName = 'aiollm-theme';
export const themeModes = ['system', 'dark', 'light'] as const;
export type ThemeMode = (typeof themeModes)[number];

export function isThemeMode(value: string | undefined): value is ThemeMode {
  return themeModes.some((theme) => theme === value);
}

export function parseTheme(value: string | undefined): ThemeMode {
  return isThemeMode(value) ? value : 'system';
}

/** Runs in the head before first paint: the page is static, so the saved theme is applied in the browser. */
export const themeBootScript = `(function(){try{var m=document.cookie.match(/(?:^|; )${themeCookieName}=(system|dark|light)(?:;|$)/);if(m)document.documentElement.dataset.theme=m[1]}catch(e){}})();`;
