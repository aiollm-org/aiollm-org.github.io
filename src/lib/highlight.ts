import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';

hljs.registerLanguage('python', python);

/** highlight.js escapes source text before generating its own token spans. */
export function highlightPython(code: string): string {
  return hljs.highlight(code, { language: 'python' }).value;
}
