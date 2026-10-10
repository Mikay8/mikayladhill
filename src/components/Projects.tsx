import { Link } from 'react-router-dom';
import './Projects.css';
import projects from '../data/projects.json';
import { caseStudies, CASE_SECTIONS } from '../data/caseStudies';
import { ImageSlot, Window } from './ImageSlot';
import WeatherBotWidget from './WeatherBotWidget';

// Projects that don't have a case study yet still get a card.
const otherProjects = projects.filter((p) => !caseStudies.some((c) => c.slug === p.id));

export default function Projects() {
  return (
    <section id="projects">
      <div className="wrap">
        <div className="sec-head">
          <span className="prompt">$</span>
          <span className="cmd">ls -la ~/case-studies</span>
          <span className="tag">// 04 — projects</span>
        </div>

        <div className="cs-grid" data-reveal>
          {caseStudies.map((c, i) => (
            <Window key={c.slug} title={`~/case-studies/${c.slug}`} className="cs-card">
              <Link to={`/case-studies/${c.slug}`} className="cs-cover" aria-label={`${c.title} case study`}>
                <ImageSlot shot={c.cover} compact />
              </Link>
              <div className="cs-info">
                <div className="cs-meta">
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <span>{c.kind}</span>
                  <span>{c.years}</span>
                  <span>Design + build</span>
                </div>
                <h3>{c.title}</h3>
                <p>{c.blurb}</p>
                <div className="cs-tags">
                  {CASE_SECTIONS.map((s) => (
                    <Link key={s.id} to={`/case-studies/${c.slug}#${s.id}`}>
                      {s.id === 'prototype' ? `live ${s.label}` : s.label}
                    </Link>
                  ))}
                </div>
                <div className="cs-actions">
                  {c.live ? (
                    <a href={c.live} target="_blank" rel="noopener noreferrer" className="cs-ext">live site</a>
                  ) : c.github ? (
                    <a href={c.github} target="_blank" rel="noopener noreferrer" className="cs-ext">github</a>
                  ) : <span />}
                  <Link to={`/case-studies/${c.slug}`} className="cs-btn">read case study →</Link>
                </div>
              </div>
            </Window>
          ))}

          {otherProjects.map((p, i) => (
            <Window key={p.id} title={`~/projects/${p.id}`} className="cs-card">
              <div className="cs-cover cs-cover-dark">
                {p.id === 'weatherbot' ? (
                  <div className="cs-embed"><WeatherBotWidget /></div>
                ) : (
                  <span className="pd">// screenshots coming soon</span>
                )}
              </div>
              <div className="cs-info">
                <div className="cs-meta">
                  <span className="num">{String(caseStudies.length + i + 1).padStart(2, '0')}</span>
                  <span>{p.sub.split('·').pop()?.trim()}</span>
                  {'status' in p && p.status === 'building' && (
                    <span className="pill pill-green">currently building</span>
                  )}
                </div>
                <h3>{p.title}</h3>
                <p>{p.sub.split('·')[0].trim()}.</p>
                <div className="cs-tags cs-tags-static">
                  {p.stack.slice(0, 4).map((s) => <span key={s}>{s}</span>)}
                </div>
                <div className="cs-actions">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="cs-ext">github</a>
                  )}
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="cs-btn">live demo →</a>
                  )}
                </div>
              </div>
            </Window>
          ))}
        </div>
      </div>
    </section>
  );
}
