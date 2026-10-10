import type { ReactNode } from 'react';
import type { Shot } from '../data/caseStudies';
import './ImageSlot.css';

function Placeholder({ label }: { label: string }) {
  return (
    <div className="slot-empty">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.6" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <span>{label}</span>
    </div>
  );
}

/** An image, or a dashed placeholder frame until the image is added. */
export function ImageSlot({ shot, className = '', compact = false }: { shot: Shot; className?: string; compact?: boolean }) {
  const src = compact ? shot.compactSrc ?? shot.src : shot.src;
  let content = <Placeholder label={shot.label} />;
  if (src) {
    const img = <img src={src} alt={shot.caption} loading="lazy" />;
    // Narrow screens crop wide images hard, so swap in the compact version there.
    content = !compact && shot.compactSrc ? (
      <picture>
        <source media="(max-width: 720px)" srcSet={shot.compactSrc} />
        {img}
      </picture>
    ) : img;
  }
  return <div className={`slot ${className}`}>{content}</div>;
}

/** Dark mac-style window chrome around any content. */
export function Window({ title, children, className = '' }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`win ${className}`}>
      <div className="win-chrome">
        <i /><i /><i />
        <span>{title}</span>
      </div>
      <div className="win-body">{children}</div>
    </div>
  );
}
