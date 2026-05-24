import type { ReactNode } from 'react';
import './Experience.css';

interface Job {
  hash: string;
  ref: string;
  when: string;
  title: string;
  where: string;
  bullets: (string | ReactNode)[];
  stack: string[];
}

const JOBS: Job[] = [
  {
    hash: 'a7f4b2c',
    ref: 'HEAD → main, current',
    when: 'Aug 2023 — Present · Jersey City, NJ',
    title: 'Software Engineer II · J.P. Morgan Chase & Co.',
    where: 'Post-trade platform · global engineering org',
    bullets: [
      <>Strengthened trade-settlement and client-money controls across a platform serving <b>1,000+ users</b> by modernizing a legacy post-trade system with a new React UI.</>,
      <>Accelerated UI component delivery and improved reliability across <b>thousands of daily trades</b> by building reusable, well-tested JavaScript components and automating repetitive coding tasks with GitHub Copilot.</>,
      'Owned UI features end-to-end across a globally distributed org, maintaining Agile workflows via CI/CD, Bitbucket, Jenkins, and Jira.',
    ],
    stack: ['React', 'TypeScript', 'Salt UI', 'Jenkins', 'Bitbucket', 'Jira', 'GitHub Copilot'],
  },
  {
    hash: '39e0c1d',
    ref: 'branch: bbg-intern',
    when: 'Jun 2022 — Aug 2022 · Princeton, NJ',
    title: 'Global Data Analyst Intern · Bloomberg L.P.',
    where: 'Derivatives data & news automation',
    bullets: [
      <>Cut manual review time by <b>10+ hours/week</b> by designing and deploying an automation pipeline for bank-loan submission analysis, improving data consistency across teams.</>,
      <>Delivered analytics across <b>200+ derivative exchange categories</b> by building a Python microservice integrated into Qlik Sense dashboards for real-time decisions.</>,
      'Automated Bloomberg News housing-market story generation with a Python workflow over National Housing Price Index data at state and regional levels.',
    ],
    stack: ['Python', 'Qlik Sense', 'Bloomberg Terminal', 'Pandas'],
  },
  {
    hash: '1b27aa4',
    ref: 'branch: teaching',
    when: 'Jan 2022 — Apr 2022 · Gainesville, FL',
    title: 'Teaching Assistant · Intro to Software Engineering, UF',
    where: 'Agile coaching · 300+ students · 5 project teams',
    bullets: [
      <>Improved Agile proficiency and project delivery for <b>24 students</b> across 5 teams by leading weekly discussion sessions on Agile, product planning, and execution.</>,
      'Accelerated learning outcomes for 5 dev teams with hands-on coaching and structured feedback throughout the development cycle.',
      <>Strengthened foundational SWE skills across <b>300+ students</b> by partnering with the professor to co-develop and deliver core curriculum lessons.</>,
    ],
    stack: ['Agile', 'Coaching', 'Curriculum'],
  },
];

export default function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <div className="sec-head">
          <span className="prompt">$</span>
          <span className="cmd">git log --oneline ~/experience</span>
          <span className="tag">// 03 — experience</span>
        </div>
        <div className="exp">
          {JOBS.map((job) => (
            <article className="commit" key={job.hash} data-reveal>
              <div className="head-line">
                <span>
                  <span className="hash">commit {job.hash}</span>
                  &nbsp;&nbsp;(<span className="ref">{job.ref}</span>)
                </span>
                <span className="when">{job.when}</span>
              </div>
              <h3>{job.title}</h3>
              <div className="where">{job.where}</div>
              <ul>
                {job.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <div className="stack">
                {job.stack.map((s) => <span key={s}>{s}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
