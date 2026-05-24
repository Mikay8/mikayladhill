import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div>
          <h2>let's <span className="amber">ship</span> something.</h2>
          <p>
            Open to interesting roles, side projects, and conversations
            about React, design systems, and finance UX.
          </p>
        </div>
        <div className="links">
          <a href="mailto:mikayla.hill8@gmail.com">
            <span className="k">email</span>mikayla.hill8@gmail.com
          </a>
          <a href="https://linkedin.com/in/mikayla-hill" target="_blank" rel="noopener noreferrer">
            <span className="k">linkedin</span>/in/mikayla-hill
          </a>
          <a href="https://mikayladhill.com" target="_blank" rel="noopener noreferrer">
            <span className="k">site</span>mikayladhill.com
          </a>
          <a href="https://github.com/Mikay8" target="_blank" rel="noopener noreferrer">
            <span className="k">github</span>/Mikay8
          </a>
          <a href="tel:+12024001074">
            <span className="k">phone</span>(202) 400-1074
          </a>
        </div>
        <div className="legal">
          <span>© 2026 Mikayla D. Hill · made by hand, with too much coffee.</span>
          <span>last commit · 2026-05-24 · main</span>
        </div>
      </div>
    </footer>
  );
}
