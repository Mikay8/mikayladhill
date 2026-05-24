import './Projects.css';
import CrrntDemo from './CrrntDemo';

export default function Projects() {
  return (
    <section id="projects">
      <div className="wrap">
        <div className="sec-head">
          <span className="prompt">$</span>
          <span className="cmd">ls -la ~/projects</span>
          <span className="tag">// 04 — projects · live demo below ↓</span>
        </div>

        <div className="proj-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <article className="proj-card" data-reveal>
              <div className="top">
                <h3>CRRNT</h3>
                <div className="sub">News + markets + AI insights, in your pocket · Apr 2026 → now</div>
              </div>
              <div className="body">
                <p>A mobile app that pairs trending news with stock tickers, AI-generated market context, price charts, and audio playback. Built solo — design, frontend, and a FastAPI backend that talks to the Claude SDK.</p>
                <div className="stack">
                  <span>React Native</span><span>TypeScript</span><span>FastAPI</span>
                  <span>Python</span><span>Claude SDK</span><span>Supabase</span>
                </div>
                <div className="links">
                  <a href="https://github.com/Mikay8/CRRNT" target="_blank" rel="noopener noreferrer">github →</a>
                  <a href="#crrnt-demo">try the demo ↓</a>
                </div>
              </div>
            </article>

            <article className="proj-card" data-reveal>
              <div className="top">
                <h3>Sorority Event Tracking Platform</h3>
                <div className="sub">Event planning, RSVPs, attendance · Jan 2025 → now</div>
              </div>
              <div className="body">
                <p>A full-stack web app that turns a tangle of group chats, sign-up sheets, and spreadsheets into a single chapter-wide event tracker. Built end-to-end — schema, API, UI.</p>
                <div className="stack">
                  <span>React</span><span>TypeScript</span><span>Express</span>
                  <span>Node.js</span><span>PostgreSQL</span>
                </div>
                <div className="links">
                  <a href="https://sorority-tracker-mikayla.replit.app/" target="_blank" rel="noopener noreferrer">live site →</a>
                </div>
              </div>
            </article>
          </div>

          {/* live demo */}
          <div data-reveal id="crrnt-demo">
            <div className="sec-head" style={{ marginBottom: '14px' }}>
              <span className="prompt">›</span>
              <span className="cmd">./crrnt --demo</span>
              <span className="tag">tap a ticker to see it work</span>
            </div>
            <CrrntDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
