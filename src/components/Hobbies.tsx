import './Hobbies.css';

export default function Hobbies() {
  return (
    <section id="hobbies">
      <div className="wrap">
        <div className="sec-head">
          <span className="prompt">$</span>
          <span className="cmd">ls ~/hobbies</span>
          <span className="tag">// 06 — off the clock</span>
        </div>
        <div className="hob-grid">
          <div className="hob" data-reveal>
            <span className="tag">01</span>
            <svg className="ico" viewBox="0 0 64 64" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="28" cy="32" r="18" fill="#e8941a"/>
              <path d="M14 30 Q 22 18 36 22 T 46 36" stroke="#1a1a1a"/>
              <path d="M18 38 Q 26 28 38 30 T 48 42" stroke="#1a1a1a"/>
              <path d="M16 24 Q 24 14 38 16" stroke="#1a1a1a"/>
              <path d="M44 40 L 58 56" stroke="#5b3fd9" strokeWidth="3"/>
              <path d="M52 48 L 50 50 M 56 52 L 54 54" stroke="#5b3fd9"/>
            </svg>
            <h4>Crochet.</h4>
            <p>Granny squares, amigurumi, a slowly-growing blanket. Mono-task wind-down after meetings.</p>
          </div>

          <div className="hob" data-reveal>
            <span className="tag">02</span>
            <svg className="ico" viewBox="0 0 64 64" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="10" y="14" width="22" height="38" fill="#5b3fd9"/>
              <rect x="32" y="14" width="22" height="38" fill="#f3ede2"/>
              <path d="M32 14 V 52" />
              <path d="M16 22 H 28 M 16 28 H 28 M 16 34 H 26" stroke="#f3ede2"/>
              <path d="M38 22 H 50 M 38 28 H 50 M 38 34 H 48" />
            </svg>
            <h4>Read.</h4>
            <p>Currently rotating between science fiction and fantasy. </p>
          </div>

          <div className="hob" data-reveal>
            <span className="tag">03</span>
            <svg className="ico" viewBox="0 0 64 64" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M32 8 C 14 8 6 22 8 36 C 10 48 22 50 24 44 C 26 38 36 42 38 36 C 40 30 50 32 52 26 C 54 18 48 8 32 8 Z" fill="#f3ede2"/>
              <circle cx="18" cy="24" r="3" fill="#c1361a"/>
              <circle cx="28" cy="18" r="3" fill="#e8941a"/>
              <circle cx="40" cy="20" r="3" fill="#2a8f4f"/>
              <circle cx="46" cy="30" r="3" fill="#5b3fd9"/>
              <path d="M24 44 L 22 58 L 28 58 Z" fill="#1a1a1a"/>
            </svg>
            <h4>Paint.</h4>
            <p>Mostly acrylics, mostly experimental, occasionally hung on a wall.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
