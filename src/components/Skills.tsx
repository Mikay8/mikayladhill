import { useEffect, useRef } from 'react';
import './Skills.css';

interface Bar {
  label: string;
  w: number;
  cls?: string;
}

const BARS: Bar[] = [
  { label: 'React / RN', w: 92, cls: 'amber' },
  { label: 'TypeScript',  w: 88, cls: 'amber' },
  { label: 'Python',      w: 80, cls: 'purp' },
  { label: 'Node / Express', w: 75, cls: 'purp' },
  { label: 'SQL / Postgres', w: 72 },
  { label: 'Design systems', w: 78, cls: 'amber' },
  { label: 'CI/CD',       w: 70 },
  { label: 'Java',        w: 60 },
];

function SkillBar({ label, w, cls }: Bar) {
  const tkRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = tkRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.setProperty('--w', `${w}%`);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [w]);

  return (
    <div className="b">
      <span className="lab">{label}</span>
      <span ref={tkRef} className={`tk${cls ? ' ' + cls : ''}`} />
      <span className="pct">{w}%</span>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <div className="sec-head">
          <span className="prompt">$</span>
          <span className="cmd">tree ~/skills</span>
          <span className="tag">// 05 — what I reach for</span>
        </div>
        <div className="skills-grid">
          <div className="tree" data-reveal>
            <span className="ln"><span className="pp">.</span></span>
            <span className="ln"><span className="pd">├──</span> <span className="pa">languages/</span></span>
            <span className="ln"><span className="pd">│   ├──</span> <span className="pw">javascript &amp; typescript</span> <span className="pd"># daily driver</span></span>
            <span className="ln"><span className="pd">│   ├──</span> python</span>
            <span className="ln"><span className="pd">│   ├──</span> java</span>
            <span className="ln"><span className="pd">│   ├──</span> sql</span>
            <span className="ln"><span className="pd">│   └──</span> html &amp; css</span>
            <span className="ln"><span className="pd">├──</span> <span className="pa">frameworks/</span></span>
            <span className="ln"><span className="pd">│   ├──</span> <span className="pw">react · react native</span></span>
            <span className="ln"><span className="pd">│   ├──</span> next.js · angular</span>
            <span className="ln"><span className="pd">│   ├──</span> node · express · fastapi</span>
            <span className="ln"><span className="pd">│   └──</span> mongodb · postgres</span>
            <span className="ln"><span className="pd">├──</span> <span className="pa">tooling/</span></span>
            <span className="ln"><span className="pd">│   ├──</span> git · bitbucket · jenkins</span>
            <span className="ln"><span className="pd">│   ├──</span> ci/cd · jira</span>
            <span className="ln"><span className="pd">│   └──</span> github copilot · claude sdk</span>
            <span className="ln"><span className="pd">├──</span> <span className="pa">design-systems/</span></span>
            <span className="ln"><span className="pd">│   └──</span> salt ui <span className="pd"># open source</span></span>
            <span className="ln"><span className="pd">├──</span> <span className="pa">platforms/</span></span>
            <span className="ln"><span className="pd">│   ├──</span> aws <span className="pd"># cloud practitioner, 2024</span></span>
            <span className="ln"><span className="pd">│   └──</span> bloomberg terminal</span>
            <span className="ln"><span className="pd">└──</span> <span className="pa">other/</span></span>
            <span className="ln"><span className="pd">    ├──</span> qlik sense · tableau</span>
            <span className="ln"><span className="pd">    └──</span> wordpress</span>
            <span className="ln">&nbsp;</span>
            <span className="ln pd">7 directories, 19 files indexed.</span>
          </div>

          <div className="skill-bars" data-reveal>
            {BARS.map((b) => <SkillBar key={b.label} {...b} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
