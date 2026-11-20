import { highlightPython } from '@/lib/highlight';

export function CodeBlock({ code, id }: { code: string; id?: string }) {
  return <HighlightedCode html={highlightPython(code)} id={id} />;
}

/** Already highlighted HTML, from `highlightPython`. */
export function HighlightedCode({ html, id }: { html: string; id?: string }) {
  return (
    <code
      id={id}
      lang="en"
      className="language-python"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
