import './About.css';

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="sec-head">
          <span className="prompt">$</span>
          <span className="cmd">cat ~/about.md</span>
          <span className="tag">// 02 — about</span>
        </div>
        <div className="about-grid about">
          <div>
            <p data-reveal>
              I'm a software engineer who likes <span className="hl">the boring, important stuff</span> —
              settlements, controls, the parts of finance that need to be exactly right —
              dressed up in interfaces that feel <span className="ul">actually nice to use</span>.
            </p>
            <p data-reveal>
              Day job: shipping React for J.P.&nbsp;Morgan's post-trade platform.
              Off-hours: building <span className="hl">CRRNT</span>, a news + markets +
              audio app, and a planning tool for sorority chapters. Currently
              working through an MS in CS at <span className="ul">Georgia Tech</span>.
            </p>
            <p data-reveal>
              Outside the IDE you'll find me with yarn in my lap or a book on
              my chest — usually both.
            </p>
          </div>
          <aside className="now" data-reveal>
            <h4>~/.now.txt — last updated this week</h4>
            <ul>
              <li><b>day-job</b><span>shipping a React refactor of a trade-settlement screen used across the firm.</span></li>
              <li><b>studying</b><span>Distributed Computing · Georgia Tech OMSCS.</span></li>
              <li><b>building</b><span>CRRNT — news, charts &amp; audio for retail investors.</span></li>
              <li><b>reading</b><span>a stack taller than my monitor. (Currently: speculative fiction.)</span></li>
              <li><b>making</b><span>a granny-square blanket I've been promising my couch since fall.</span></li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
