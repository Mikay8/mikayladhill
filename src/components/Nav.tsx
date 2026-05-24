import { useEffect, useState } from 'react';

const SECTIONS = ['about', 'experience', 'projects', 'skills', 'hobbies', 'contact'] as const;

export default function Nav() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      for (const id of [...SECTIONS].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 80) {
          setActive(id);
          return;
        }
      }
      setActive('');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="bar">
      <div className="row">
        <span className="dots"><i /><i /><i /></span>
        <a href="#hero" className="title home-btn">
          — <b>mikayla@portfolio</b>:~ — 142×38
        </a>
        <span className="links">
          {SECTIONS.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className={active === s ? 'is-active' : ''}
            >
              ~/{s}
            </a>
          ))}
        </span>
      </div>
    </nav>
  );
}
