import './Projects.css';
import projects from '../data/projects.json';
import WeatherBotWidget from './WeatherBotWidget';

export default function Projects() {
  return (
    <section id="projects">
      <div className="wrap">
        <div className="sec-head">
          <span className="prompt">$</span>
          <span className="cmd">ls -la ~/projects</span>
          <span className="tag">// 04 — projects</span>
        </div>

        <div className="proj-grid-full" data-reveal>
          {projects.map((p) => {
            const isWeatherbot = p.id === 'weatherbot';
            const demoUrl = p.demo ?? '';

            return (
              <article key={p.id} className="proj-card-full">
                <div className="top">
                  <div className="proj-title-row">
                    <h3>{p.title}</h3>
                    {'status' in p && p.status === 'building' && (
                      <span className="pill pill-green">currently building</span>
                    )}
                  </div>
                  <div className="sub">{p.sub}</div>
                </div>
                <div className="body">
                  <p>{p.description}</p>
                  <div className="stack">
                    {p.stack.map((s) => <span key={s}>{s}</span>)}
                  </div>
                  <div className="links">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer">github →</a>
                    )}
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noopener noreferrer">live site →</a>
                    )}
                  </div>
                </div>

                <div className="demo-frame-wrap">
                  {isWeatherbot && (
                    <div className="demo-embed">
                      <WeatherBotWidget />
                    </div>
                  )}
                  {!isWeatherbot && !demoUrl && (
                    <div className="demo-empty">
                      <span className="pd">// project not deployed publicly yet</span>
                    </div>
                  )}
                  {!isWeatherbot && demoUrl && (
                    <iframe
                      src={demoUrl}
                      title={`${p.title} demo`}
                      className="demo-iframe"
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
