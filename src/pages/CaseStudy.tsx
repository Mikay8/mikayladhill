import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { caseStudies, findCaseStudy, caseSections, type CaseStudy as CS, type Exploration } from '../data/caseStudies';
import { ImageSlot, Window } from '../components/ImageSlot';
import CrrntPrototype from '../components/CrrntPrototype';
import CrrntBrand from '../components/CrrntBrand';
import WireframeSets from '../components/WireframeSets';
import { ConceptTest, ResearchFindings, Results } from '../components/Research';
import { useReveal } from '../hooks/useReveal';
import './CaseStudy.css';

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('');
  const key = ids.join();
  useEffect(() => {
    const onScroll = () => {
      for (const id of [...key.split(',')].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(id);
          return;
        }
      }
      setActive('');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [key]);
  return active;
}

function Highlight({ text, mark }: { text: string; mark: string }) {
  const i = text.indexOf(mark);
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark>{mark}</mark>
      {text.slice(i + mark.length)}
    </>
  );
}

function SecHead({ n, cmd, tag }: { n: number; cmd: string; tag: string }) {
  return (
    <div className="csp-sec-head">
      <span className="num">{String(n).padStart(2, '0')}</span>
      <span className="cmd">{cmd}</span>
      <span className="tag">// {tag}</span>
    </div>
  );
}

function Gallery({ items }: { items: Exploration[] }) {
  return (
    <div className="csp-gallery">
      {items.map((x) => (
        <figure key={x.src} data-reveal>
          <Window title={x.file}>
            <a href={x.src} target="_blank" rel="noopener noreferrer" aria-label={`Open ${x.title} full size`}>
              <img src={x.src} alt={x.title} loading="lazy" />
            </a>
          </Window>
          <figcaption>
            <b>{x.title}</b>
            <span>{x.caption}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function Prototype({ c }: { c: CS }) {
  if (c.prototype.demo === 'crrnt') return <CrrntPrototype />;
  if (c.prototype.demo === 'video' && c.prototype.video) {
    return (
      <Window title={`youtube.com/watch?v=${c.prototype.video}`} className="csp-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${c.prototype.video}`}
          title={`${c.title} prototype walkthrough`}
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </Window>
    );
  }
  if (!c.live) return null;
  return (
    <Window title={c.live.replace(/^https?:\/\//, '')} className="csp-browser">
      <iframe
        src={c.live}
        title={`${c.title} live site`}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </Window>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const { hash } = useLocation();
  const c = findCaseStudy(slug);
  const sections = c ? caseSections(c) : [];
  const active = useActiveSection(sections.map((s) => s.id));
  useReveal();

  useEffect(() => {
    if (!c) return;
    document.title = `${c.title} — Mikayla Hill`;
    const el = hash ? document.getElementById(hash.slice(1)) : null;
    if (el) el.scrollIntoView();
    else window.scrollTo(0, 0);
    return () => { document.title = 'Mikayla Hill — Software Engineer'; };
  }, [c, hash]);

  if (!c) return <Navigate to="/#projects" replace />;

  const index = caseStudies.indexOf(c);
  const next = caseStudies[(index + 1) % caseStudies.length];
  const hasTokens = Boolean(c.colors?.length || c.type?.length);
  const wideDemo = c.prototype.demo !== 'crrnt';
  // Section numbers follow whichever optional sections this project has.
  const num = (id: string) => sections.findIndex((s) => s.id === id) + 1;

  return (
    <div className="csp">
      <nav className="csp-bar">
        <div className="csp-bar-row">
          <span className="csp-dots"><i /><i /><i /></span>
          <Link to="/#projects" className="csp-crumb">
            ← <b>mikayla@portfolio</b>:~/projects/{c.slug}
          </Link>
          <span className="csp-links">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'is-active' : ''}>
                {s.label}
              </a>
            ))}
          </span>
        </div>
      </nav>

      <header className="wrap csp-hero">
        <div className="csp-open">
          <span className="prompt">$</span> open <b>~/projects/{String(index + 1).padStart(2, '0')}-{c.slug}</b>
        </div>
        {c.school && (
          <div className="csp-school"><span className="pill pill-school">School project</span> {c.school}</div>
        )}
        <h1>
          {c.title.split(' ').slice(0, -1).join(' ')}{' '}
          {/* keep the dot on the same line as the last word */}
          <span className="csp-nowrap">{c.title.split(' ').pop()}<span className="csp-dot" /></span>
        </h1>
        <p className="csp-lede">{c.blurb}</p>

        <dl className="csp-meta">
          <div><dt>Role</dt><dd>{c.role}</dd></div>
          <div><dt>Timeline</dt><dd>{c.timeline}</dd></div>
          <div><dt>Platform</dt><dd>{c.platform}</dd></div>
          <div><dt>{c.stackLabel ?? 'Stack'}</dt><dd>{c.stack.join(' · ')}</dd></div>
        </dl>

        <div className="csp-ctas">
          <a href="#prototype" className="csp-btn csp-btn-dark">
            {{ iframe: 'see it live ↓', video: 'watch the walkthrough ↓', crrnt: 'try the prototype ↓' }[c.prototype.demo]}
          </a>
          {c.github && (
            <a href={c.github} target="_blank" rel="noopener noreferrer" className="csp-btn">github →</a>
          )}
          {c.live && (
            <a href={c.live} target="_blank" rel="noopener noreferrer" className="csp-btn">live site →</a>
          )}
        </div>

        <Window title={c.cover.caption} className="csp-cover">
          <ImageSlot shot={c.cover} />
        </Window>
      </header>

      <section id="problem" className="csp-sec">
        <div className="wrap">
          <SecHead n={num('problem')} cmd="cat problem.md" tag="problem / context" />
          <div className="csp-problem" data-reveal>
            <h2><Highlight text={c.problem.headline} mark={c.problem.highlight} /></h2>
            <div>
              {c.problem.body.map((p) => <p key={p}>{p}</p>)}
              <div className="csp-label">Design goals</div>
              <ul className="csp-goals">
                {c.problem.goals.map((g) => <li key={g}>{g}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {c.research && (
        <section id="research" className="csp-sec">
          <div className="wrap">
            <SecHead n={num('research')} cmd="cat research/*.csv" tag="needfinding" />
            <ResearchFindings r={c.research} />
          </div>
        </section>
      )}

      <section id="wireframes" className="csp-sec">
        <div className="wrap">
          <SecHead n={num('wireframes')} cmd="ls ./wireframes" tag={c.wireframesTag ?? 'sketches → low-fi'} />
          {c.wireframes.length > 0 && <div className="csp-shots" data-reveal>
            {c.wireframes.map((s, i) => (
              <figure key={s.label}>
                <ImageSlot shot={s} className="csp-frame" />
                <figcaption><span className="num">{String(i + 1).padStart(2, '0')}</span> {s.caption}</figcaption>
              </figure>
            ))}
          </div>}
          {c.wireframeDemo && (
            <div className="csp-lofi" data-reveal>
              <Window title="lofi-prototype.html">
                <iframe src={c.wireframeDemo} title={`${c.title} lo-fi prototype`} loading="lazy" />
              </Window>
              <a href={c.wireframeDemo} target="_blank" rel="noopener noreferrer" className="csp-lofi-link">
                open the lo-fi prototype full screen ↗
              </a>
            </div>
          )}
          {c.wireframeSets && <WireframeSets sets={c.wireframeSets} />}
          {c.explorations && <Gallery items={c.explorations} />}
          {c.conceptTest && <ConceptTest t={c.conceptTest} />}
        </div>
      </section>

      <section id="visual-design" className="csp-sec">
        <div className="wrap">
          <SecHead n={num('visual-design')} cmd="open ./ui" tag="visual design" />
          {c.brand?.mark === 'crrnt' && (
            <div data-reveal><CrrntBrand colors={c.brand.colors} /></div>
          )}
          {c.brandGallery && <Gallery items={c.brandGallery} />}
          {c.screens.length > 0 && <div className="csp-phones" data-reveal>
            {c.screens.map((s, i) => (
              <figure key={s.label}>
                <ImageSlot shot={s} className="csp-phone" />
                <figcaption><span className="num">{String.fromCharCode(65 + i)}</span> {s.caption}</figcaption>
              </figure>
            ))}
          </div>}
          {c.desktopScreens && <Gallery items={c.desktopScreens} />}

          {hasTokens && (
            <div className="csp-tokens" data-reveal>
              {c.colors && (
                <Window title="tokens/color.json">
                  <div className="csp-swatches">
                    {c.colors.map((t) => (
                      <div key={t.name} className="csp-swatch">
                        <div style={{ background: t.hex }} />
                        <b>{t.name}</b>
                        <span>{t.hex}</span>
                      </div>
                    ))}
                  </div>
                </Window>
              )}
              {c.type && (
                <Window title="tokens/type.json">
                  <div className="csp-type">
                    {c.type.map((t) => (
                      <div key={t.spec} className="csp-type-row">
                        <span
                          style={{
                            fontSize: t.size,
                            fontWeight: t.weight,
                            fontFamily: t.font,
                            letterSpacing: t.tracking ?? (t.caps ? '.08em' : undefined),
                          }}
                          className={t.caps ? 'caps' : ''}
                        >
                          {t.sample}
                        </span>
                        <small>{t.spec}</small>
                      </div>
                    ))}
                  </div>
                </Window>
              )}
            </div>
          )}
        </div>
      </section>

      <section id="prototype" className="csp-sec">
        <div className="wrap">
          <SecHead
            n={num('prototype')}
            cmd={`./${c.slug} --demo`}
            tag={{ iframe: 'live build', video: 'prototype walkthrough', crrnt: 'interactive prototype' }[c.prototype.demo]}
          />
          <div className={`csp-proto ${wideDemo ? 'csp-proto-wide' : ''}`}>
            <div className="csp-proto-copy">
              <h2>{c.prototype.headline}</h2>
              <p>{c.prototype.body}</p>
              {c.prototype.note && <small>{c.prototype.note}</small>}
            </div>
            <div className="csp-proto-demo"><Prototype c={c} /></div>
          </div>
        </div>
      </section>

      {c.results && (
        <section id="results" className="csp-sec">
          <div className="wrap">
            <SecHead n={num('results')} cmd="cat evaluation.md" tag="final evaluation" />
            <Results r={c.results} />
          </div>
        </section>
      )}

      <section className="csp-sec csp-next">
        <div className="wrap">
          <Link to="/#projects" className="csp-btn">← all work</Link>
          {next !== c && (
            <Link to={`/projects/${next.slug}`} className="csp-next-link">
              <span className="csp-label">Next project</span>
              <span className="csp-next-title">{next.title} →</span>
            </Link>
          )}
        </div>
      </section>

      <footer className="csp-foot">
        <div className="wrap">
          <span>© 2026 Mikayla D. Hill</span>
          <a href="mailto:mikayla.hill8@gmail.com">mikayla.hill8@gmail.com</a>
        </div>
      </footer>
    </div>
  );
}
