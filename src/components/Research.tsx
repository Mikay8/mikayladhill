import type { BarChart, ConceptTest as CT, Research, Results as R } from '../data/caseStudies';
import { Window } from './ImageSlot';
import './Research.css';

function Bars({ chart }: { chart: BarChart }) {
  return (
    <Window title={`survey/${chart.title.toLowerCase().replace(/[^a-z]+/g, '-').replace(/-$/, '')}.csv`}>
      <div className="rs-chart">
        <b>{chart.title}</b>
        <small>{chart.note}</small>
        <ul className="rs-bars">
          {chart.items.map((it, i) => (
            <li key={it.label} className={i === 0 ? 'top' : ''}>
              <span>{it.label}</span>
              <i><em style={{ width: `${it.pct}%` }} /></i>
              <span className="v">{it.display}</span>
            </li>
          ))}
        </ul>
      </div>
    </Window>
  );
}

/** Research section body: methods, competitor heuristics, interview + survey findings. */
export function ResearchFindings({ r }: { r: Research }) {
  return (
    <>
      <p className="rs-intro" data-reveal>{r.intro}</p>
      <div className="rs-methods" data-reveal>
        {r.methods.map((m) => (
          <div key={m.label}>
            <strong>{m.value}</strong>
            <b>{m.label}</b>
            <span>{m.note}</span>
          </div>
        ))}
      </div>

      {r.heuristics && (
        <div className="rs-block" data-reveal>
          <div className="csp-label">Heuristic evaluation</div>
          <div className="rs-heur">
            {r.heuristics.map((h) => (
              <figure key={h.app}>
                <Window title={h.app.toLowerCase()}>
                  <img src={h.src} alt={`${h.app} profile screens`} loading="lazy" />
                </Window>
                <figcaption>
                  <b>{h.app}</b>
                  <dl>
                    {h.notes.map((n) => (
                      <div key={n.label}><dt>{n.label}</dt><dd>{n.text}</dd></div>
                    ))}
                  </dl>
                  <small>Image: {h.source}</small>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {r.interviews && (
        <div className="rs-block rs-interviews" data-reveal>
          <div className="csp-label">{r.interviews.title}</div>
          <ol>
            {r.interviews.points.map((p) => <li key={p}>{p}</li>)}
          </ol>
        </div>
      )}

      <div className="rs-block" data-reveal>
        <div className="csp-label">Survey findings</div>
        <div className="rs-insights">
          {r.insights.map((x, i) => (
            <div key={x.title}>
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <strong>{x.stat}</strong>
              <b>{x.title}</b>
              <p>{x.body}</p>
            </div>
          ))}
        </div>
      </div>

      {r.distributions && (
        <div className="rs-block" data-reveal>
          <Window title="survey/importance.csv">
            <div className="rs-chart">
              <b>{r.distributions.title}</b>
              <small>{r.distributions.note}</small>
              <div className="rs-dists">
                {r.distributions.series.map((s) => {
                  const max = Math.max(...r.distributions!.series.flatMap((x) => x.counts));
                  return (
                    <div key={s.label} className="rs-dist">
                      <div className="rs-dist-head"><b>{s.label}</b><span>mean {s.mean}</span></div>
                      <div className="rs-hist">
                        {s.counts.map((n, score) => (
                          <div key={score} title={`${n} responded ${score}`}>
                            <i style={{ height: `${(n / max) * 100}%` }}>{n > 0 && <em>{n}</em>}</i>
                            <span>{score}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Window>
        </div>
      )}

      {r.charts && (
        <div className="rs-charts" data-reveal>
          {r.charts.map((c) => <Bars key={c.title} chart={c} />)}
        </div>
      )}
    </>
  );
}

/** Lo-fi concepts side by side with how they tested. */
export function ConceptTest({ t }: { t: CT }) {
  const best = Math.max(...t.concepts.map((c) => c.score));
  return (
    <>
      <p className="rs-intro" data-reveal>{t.intro}</p>
      <div className="rs-concepts" data-reveal>
        {t.concepts.map((c, i) => (
          <figure key={c.name}>
            <div className="rs-concept-img">
              <img src={c.src} alt={`Lo-fi concept: ${c.name}`} loading="lazy" />
            </div>
            <figcaption>
              <span className="num">{String.fromCharCode(65 + i)}</span> <b>{c.name}</b>
              <p>{c.idea}</p>
              <div className="rs-score">
                <i><em style={{ width: `${c.score * 10}%` }} className={c.score === best ? 'best' : ''} /></i>
                <span>{c.score.toFixed(1)}<small>/10</small></span>
              </div>
              <small className="rs-picks">
                {c.picks} of {t.participants} picked it as their favorite
              </small>
              <dl>
                <div><dt>+</dt><dd>{c.liked}</dd></div>
                <div><dt>−</dt><dd>{c.disliked}</dd></div>
              </dl>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="rs-outcome" data-reveal>
        <div>
          <p className="rs-lead">{t.outcome}</p>
          <p className="rs-stats">{t.stats}</p>
        </div>
        <div>
          <div className="csp-label">Carried into the final design</div>
          <ul className="csp-goals">
            {t.carried.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </div>
      </div>
    </>
  );
}

/** Final evaluation: headline score, what worked, what to change. */
export function Results({ r }: { r: R }) {
  return (
    <div className="rs-results" data-reveal>
      <div className="rs-score-big">
        <strong>{r.score}<small>/10</small></strong>
        <span>{r.scoreLabel}</span>
        <p>{r.intro}</p>
      </div>
      <div>
        <div className="rs-findings">
          {r.findings.map((f, i) => (
            <div key={f.title}>
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <b>{f.title}</b>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
        <div className="csp-label">What I’d do next</div>
        <ul className="csp-goals rs-next">
          {r.next.map((x) => <li key={x}>{x}</li>)}
        </ul>
      </div>
    </div>
  );
}
