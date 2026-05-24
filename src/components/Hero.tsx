import './Hero.css';

export default function Hero() {
  return (
    <header className="hero wrap" id="hero">
      {/* Row 1: photo + terminal */}
      <div className="hero-top">
        <div className="viewer" data-reveal>
          <div className="chrome"><i /><i /><i />&nbsp;&nbsp;mikayla.jpeg</div>
          <div className="pic">
            <img src="/assets/mikayla.jpeg" alt="Mikayla Hill" />
          </div>
          <div className="foot">
            <span>↳ exif: ready to ship</span>
            <span>100%</span>
          </div>
        </div>

        <div className="term hero-term" data-reveal>
          <div className="chrome"><i /><i /><i /><span>~/whoami</span></div>
          <div className="body">
            <span className="ln"><span className="pr">mikayla@portfolio</span>:<span className="pp">~</span>$ <span className="pw">whoami</span></span>
            <span className="ln pd">→ Mikayla Hill · Software Engineer II</span>
            <span className="ln pd">→ J.P. Morgan Chase &amp; Co.</span>
            <span className="ln pd">&nbsp;</span>
            <span className="ln"><span className="pr">mikayla@portfolio</span>:<span className="pp">~</span>$ <span className="pw">cat .focus</span></span>
            <span className="ln pd">→ React · TypeScript · design systems</span>
            <span className="ln pd">→ the messy seams between finance &amp; UX</span>
            <span className="ln pd">&nbsp;</span>
            <span className="ln"><span className="pr">mikayla@portfolio</span>:<span className="pp">~</span>$ <span className="pw">uptime</span></span>
            <span className="ln pd">→ shipping since 2022 · caffeinated · curious</span>
            <span className="ln pd">&nbsp;</span>
            <span className="ln"><span className="pr">mikayla@portfolio</span>:<span className="pp">~</span>$ <span className="car" /></span>
          </div>
        </div>
      </div>

      {/* Row 2: chips */}
      <div className="hero-meta" data-reveal>
        <span className="lbl">// portfolio · v2026</span>
        <span className="chip"><i className="dot" /> Open to chats</span>
        <span className="chip amber"><i className="dot" /> New York City</span>
        <span className="chip purple"><i className="dot" /> MS CS @ Georgia Tech</span>
      </div>


      {/* Row 3: name */}
      <h1 data-reveal>
        Mikayla <span className="stripe">Hill.</span>
      </h1>

      {/* Row 4: tagline */}
      <p className="tagline" data-reveal>
        Software Engineer building React frontends for trade-settlement
        infrastructure at J.P.&nbsp;Morgan&nbsp;— and side projects on the weekend.
        Currently working through an MS in CS at Georgia&nbsp;Tech.
      </p>

      {/* Row 5: stat strip */}
      <div className="stat-strip" data-reveal>
        <div><b>5+</b><span>years coding</span></div>
        <div><b>100%</b><span>committed to learning</span></div>
        <div><b>2</b><span>side projects </span></div>
      </div>
    </header>
  );
}
