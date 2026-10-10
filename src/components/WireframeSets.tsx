import { useState } from 'react';
import type { WireframeSet } from '../data/caseStudies';
import './WireframeSets.css';

/** The full wireframe set, one role at a time: phones in a scrolling row, desktop screens in a grid. */
export default function WireframeSets({ sets }: { sets: WireframeSet[] }) {
  const [activeId, setActiveId] = useState(sets[0]?.id);
  const set = sets.find((s) => s.id === activeId) ?? sets[0];
  if (!set) return null;

  return (
    <div className="wfs" data-reveal>
      <div className="wfs-head">
        <span className="csp-label">Full wireframe set</span>
        <span className="wfs-count">
          {sets.reduce((n, s) => n + s.mobile.length + s.desktop.length, 0)} screens · {sets.length} roles
        </span>
      </div>

      <div className="wfs-tabs" role="tablist" aria-label="Wireframes by role">
        {sets.map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={s.id === set.id}
            className={s.id === set.id ? 'on' : ''}
            onClick={() => setActiveId(s.id)}
          >
            {s.title}
            <small>{s.mobile.length + s.desktop.length}</small>
          </button>
        ))}
      </div>

      <div className="wfs-panel" role="tabpanel" key={set.id}>
        {set.mobile.length > 0 && (
          <>
            <div className="wfs-sub">
              <b>Mobile</b>
              <span>{set.mobileNote}</span>
            </div>
            <div className="wfs-phones">
              {set.mobile.map((s) => (
                <figure key={s.src}>
                  <a href={s.src} target="_blank" rel="noopener noreferrer">
                    <img src={s.src} alt={`${set.title} mobile: ${s.label}`} loading="lazy" />
                  </a>
                  <figcaption>{s.label}</figcaption>
                </figure>
              ))}
            </div>
          </>
        )}

        {set.desktop.length > 0 && (
          <>
            <div className="wfs-sub">
              <b>Desktop</b>
              <span>{set.desktopNote}</span>
            </div>
            <div className="wfs-desktops">
              {set.desktop.map((s) => (
                <figure key={s.src}>
                  <a href={s.src} target="_blank" rel="noopener noreferrer">
                    <img src={s.src} alt={`${set.title} desktop: ${s.label}`} loading="lazy" />
                  </a>
                  <figcaption>{s.label}</figcaption>
                </figure>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
