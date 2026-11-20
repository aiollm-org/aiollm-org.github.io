import type { Dictionary } from '@/data/i18n/en';
import type { Logos } from '@/lib/logos';
import { Logo } from './Brand';
import { project } from '@/data/project';

export function Footer({
  copy,
  logos,
}: {
  copy: Dictionary['nav'];
  logos: Logos;
}) {
  return (
    <footer>
      <div className="wrap">
        <a
          className="brand flex shrink-0 items-center gap-2.5"
          href="#top"
          aria-label={copy.back}
        >
          <Logo logos={logos} />
        </a>
        <nav aria-label={copy.footer}>
          <a href={project.docs}>{copy.documentation}</a>
          <a href={`${project.docs}reference/`}>{copy.apiReference}</a>
          <a href={`${project.docs}changelog/`}>{copy.changelog}</a>
          <a href={`${project.docs}contributing/`}>{copy.contributing}</a>
          <a href="https://github.com/aiollm-org/aiollm">GitHub</a>
        </nav>
        <small>
          aiollm {project.version} · {copy.license}
        </small>
      </div>
    </footer>
  );
}
