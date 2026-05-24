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
              Day job: shipping React for J.P.&nbsp;Morgan's post-trade platform.
              Off-hours: building <span className="hl">CRRNT</span>, a news + markets +
              audio app, and a presnt a extracurricular management tool. Currently
              working through an MS in CS at <span className="ul">Georgia Tech</span>.
            </p>
            <p data-reveal>
              Outside the IDE you'll find me at a bookshop or a tea shop.
            </p>
          </div>
          <aside className="now" data-reveal>
            <h4>~/.now.txt — last updated this week</h4>
            <ul>
              <li><b>day-job</b><span>shipping a React refactor of a trade-settlement screen used across the firm.</span></li>
              <li><b>studying</b><span>Artificial Intelligence · Georgia Tech OMSCS.</span></li>
              <li><b>building</b><span>CRRNT — news app for everyday people.</span></li>
              <li><b>making</b><span>a quilt that i keep promising to finish.</span></li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
