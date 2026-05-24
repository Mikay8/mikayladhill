import { useEffect, useState } from 'react';

const SECTIONS = ['about', 'experience', 'projects', 'skills', 'hobbies', 'contact'] as const;

export default function Nav() {
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

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

  // close drawer on scroll — delay attaching so the tap that opened it
  // can't immediately fire the listener on the same event loop tick
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    const t = setTimeout(() => {
      window.addEventListener('scroll', close, { passive: true, once: true });
    }, 150);
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', close);
    };
  }, [menuOpen]);

  function handleNavClick(_e: React.MouseEvent<HTMLAnchorElement>) {
    // slight delay so the scroll starts before drawer closes
    setTimeout(() => setMenuOpen(false), 80);
  }

  return (
    <nav className="bar">
      <div className="row">
        <span className="dots"><i /><i /><i /></span>
        <a href="#hero" className="title home-btn">
          — <b>mikayla@portfolio</b>:~
        </a>

        {/* desktop links */}
        <span className="links desktop-links">
          {SECTIONS.map((s) => (
            <a key={s} href={`#${s}`} className={active === s ? 'is-active' : ''}>
              ~/{s}
            </a>
          ))}
        </span>

        {/* mobile hamburger */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* mobile drawer */}
      <div className={`mobile-drawer${menuOpen ? ' open' : ''}`}>
        {SECTIONS.map((s) => (
          <a
            key={s}
            href={`#${s}`}
            className={active === s ? 'is-active' : ''}
            onClick={handleNavClick}
          >
            <span className="drawer-prompt">~/{s}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
