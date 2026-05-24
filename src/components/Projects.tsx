import { useState } from 'react';
import './Projects.css';
import projects from '../data/projects.json';

type Project = (typeof projects)[number];

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(
    () => projects.find((p) => 'default' in p && p.default) ?? null
  );

  function handleSelect(p: Project) {
    // Toggle off if already selected
    setSelected((prev) => (prev?.id === p.id ? null : p));
  }

  const demoUrl = selected?.demo ?? '';
  const demoLabel = selected ? `./${selected.id} --demo` : 'select a project ←';

  return (
    <section id="projects">
      <div className="wrap">
        <div className="sec-head">
          <span className="prompt">$</span>
          <span className="cmd">ls -la ~/projects</span>
          <span className="tag">// 04 — projects · click a card to preview</span>
        </div>

        <div className="proj-grid">
          {/* ── Left: project cards ── */}
          <div className="proj-list" data-reveal>
            {projects.map((p) => (
              <article
                key={p.id}
                className={`proj-card${selected?.id === p.id ? ' active' : ''}`}
                onClick={() => handleSelect(p)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleSelect(p)}
              >
                <div className="top">
                  <div>
                    <h3>{p.title}</h3>
                    <div className="sub">{p.sub}</div>
                  </div>
                  {selected?.id === p.id && <span className="active-badge">● previewing</span>}
                </div>
                <div className="body">
                  <p>{p.description}</p>
                  <div className="stack">
                    {p.stack.map((s) => <span key={s}>{s}</span>)}
                  </div>
                  <div className="links" onClick={(e) => e.stopPropagation()}>
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer">github →</a>
                    )}
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noopener noreferrer">live site →</a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* ── Right: demo panel ── */}
          <div className="demo-panel" data-reveal>
            <div className="sec-head" style={{ marginBottom: '14px' }}>
              <span className="prompt">›</span>
              <span className="cmd">{demoLabel}</span>
              {selected && (
                <button className="demo-close" onClick={() => setSelected(null)} title="close">✕</button>
              )}
            </div>

            <div className="demo-frame-wrap">
              {!selected && (
                <div className="demo-empty">
                  <span className="pd">// click a project card to load its demo</span>
                </div>
              )}
              {selected && !demoUrl && (
                <div className="demo-empty">
                  <span className="pd">// project not deployed publicly yet</span>
                  {selected.github && (
                    <a
                      href={selected.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginTop: '10px', fontSize: '13px', color: 'var(--amber)', borderBottom: '1px solid var(--amber)', paddingBottom: '2px' }}
                    >
                      view source on github →
                    </a>
                  )}
                </div>
              )}
              {selected && demoUrl && (
                <iframe
                  key={demoUrl}
                  src={demoUrl}
                  title={`${selected.title} demo`}
                  className="demo-iframe"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
