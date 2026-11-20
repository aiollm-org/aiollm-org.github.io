import { MotionConfig } from 'motion/react';
import { Button } from '@/components/ui/button';
import { HeroEntrance } from '@/components/HeroEntrance';
import { Logo, GitHubIcon } from './Brand';
import { InstallCommand } from './InstallCommand';
import { CodeExamples } from './CodeExamples';
import { project } from '@/data/project';
import { HeroBackdrop } from '@/components/HeroBackdrop';
import { HighlightedCode } from '@/components/CodeBlock';
import { examples } from '@/data/examples';
import type { Dictionary } from '@/data/i18n/en';
import type { Logos } from '@/lib/logos';
import { InlineCode } from '@/components/InlineCode';

/** An island: the page renders it to HTML and Motion, tabs and copy hydrate it. */
export function Hero({
  copy,
  copyLabels,
  logos,
  highlighted,
}: {
  copy: Dictionary['hero'];
  copyLabels: Dictionary['copy'];
  logos: Logos;
  /** Highlighted HTML of each example, in the order of `examples`. */
  highlighted: readonly string[];
}) {
  return (
    <MotionConfig reducedMotion="user">
      <section className="hero">
        <HeroBackdrop />
        <div className="wrap">
          <HeroEntrance>
            <div className="hero-logo">
              <Logo logos={logos} />
            </div>
            <h1>
              {copy.before}
              <em>{copy.emphasis}</em>
              {copy.after}
            </h1>
            <p className="lede">
              <InlineCode text={copy.description} />
            </p>
            <div className="cta flex flex-wrap gap-3">
              <Button
                asChild
                className="btn btn-primary h-[46px] rounded-[10px] px-5 py-0 text-[15px] leading-none font-semibold"
              >
                <a href={project.docs}>{copy.docs}</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="btn btn-ghost h-[46px] rounded-[10px] px-5 py-0 text-[15px] leading-none font-semibold has-[>svg]:px-5 hover:bg-surface hover:text-ink"
              >
                <a href={project.repository}>
                  <GitHubIcon />
                  GitHub
                </a>
              </Button>
            </div>
            <InstallCommand labels={copyLabels} />
            <p className="install-note">{copy.note}</p>
            <div
              className="badges flex flex-wrap gap-2"
              aria-label={copy.facts}
            >
              <span className="badge warn">
                <b>pre-alpha</b> {project.version}
              </span>
              <span className="badge">
                <b>Python</b> 3.13 · 3.14 · 3.15
              </span>
              <span className="badge">
                <b>mypy</b> &amp; <b>pyright</b> {copy.strict}
              </span>
              <span className="badge">
                <b>MIT</b> {copy.license}
              </span>
            </div>
          </HeroEntrance>

          <CodeExamples
            labels={{ code: copy.code, python: copy.python }}
            samples={examples.map(({ code: _code, ...example }, index) => ({
              ...example,
              caption: copy.captions[index]!,
              content: <HighlightedCode id="code" html={highlighted[index]!} />,
            }))}
          />
        </div>
      </section>
    </MotionConfig>
  );
}
