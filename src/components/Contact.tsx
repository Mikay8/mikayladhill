import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import './Contact.css';

interface Line {
  type: 'input' | 'output' | 'blank';
  text?: string;
  html?: string;
}

const COMMANDS: Record<string, () => Line[]> = {
  help: () => [
    { type: 'output', html: '<span class="pa">Available commands:</span>' },
    { type: 'output', html: '  <span class="pa">whoami</span>       — about Mikayla' },
    { type: 'output', html: '  <span class="pa">socials</span>      — links & contact info' },
    { type: 'output', html: '  <span class="pa">resume</span>       — open resume PDF' },
    { type: 'output', html: '  <span class="pa">ask &lt;q&gt;</span>      — ask me anything' },
    { type: 'output', html: '  <span class="pa">sudo hire me</span> — try it 😄' },
    { type: 'output', html: '  <span class="pa">clear</span>        — clear terminal' },
    { type: 'blank' },
  ],
  whoami: () => [
    { type: 'output', html: '<span class="pw">Mikayla D. Hill</span>' },
    { type: 'output', text: 'Software Engineer II @ J.P. Morgan Chase' },
    { type: 'output', text: 'MS Computer Science candidate @ Georgia Tech (OMSCS)' },
    { type: 'output', text: 'Building: CRRNT · Sorority Event Tracker' },
    { type: 'output', text: 'Stack: React · TypeScript · Python · FastAPI · Supabase' },
    { type: 'output', html: 'Location: <span class="pa">Jersey City, NJ</span>' },
    { type: 'blank' },
  ],
  socials: () => [
    { type: 'output', html: '<span class="pa">email</span>     mikayla.hill8@gmail.com' },
    { type: 'output', html: '<span class="pa">linkedin</span>  linkedin.com/in/mikayla-hill' },
    { type: 'output', html: '<span class="pa">github</span>    github.com/Mikay8' },
    { type: 'output', html: '<span class="pa">site</span>      mikayladhill.com' },
    { type: 'blank' },
  ],
  resume: () => {
    window.open('/assets/resume.pdf', '_blank');
    return [
      { type: 'output', html: '<span class="pp">Opening resume.pdf...</span>' },
      { type: 'blank' },
    ];
  },
  'sudo hire me': () => [
    { type: 'output', html: '<span class="pp">[sudo] password for hiring-manager:</span> ••••••••' },
    { type: 'output', html: '<span class="pr">✓ Access granted.</span> Great choice.' },
    { type: 'output', html: 'Drop a line: <span class="pa">mikayla.hill8@gmail.com</span>' },
    { type: 'blank' },
  ],
  sudo: () => [
    { type: 'output', html: '<span class="pd">Try: <span class="pa">sudo hire me</span></span>' },
    { type: 'blank' },
  ],
  clear: () => [],
};

function renderAsk(question: string): Line[] {
  if (!question.trim()) {
    return [
      { type: 'output', html: '<span class="pd">Usage: ask &lt;your question&gt;</span>' },
      { type: 'blank' },
    ];
  }
  const q = question.toLowerCase();
  if (q.includes('hire') || q.includes('why') || q.includes('should')) {
    return [
      { type: 'output', html: '<span class="pp">→</span> Because I ship. I own features end-to-end, care about UX as much as correctness,' },
      { type: 'output', text: '  and bring both the frontend craft and the systems thinking.' },
      { type: 'blank' },
    ];
  }
  if (q.includes('stack') || q.includes('tech')) {
    return [
      { type: 'output', html: '<span class="pp">→</span> React, TypeScript, Python, FastAPI, Supabase, PostgreSQL.' },
      { type: 'output', text: '  At work: Salt UI, Jenkins, Bitbucket. Personally: Claude SDK, React Native.' },
      { type: 'blank' },
    ];
  }
  if (q.includes('available') || q.includes('open') || q.includes('role')) {
    return [
      { type: 'output', html: '<span class="pp">→</span> Open to interesting chats! Email mikayla.hill8@gmail.com.' },
      { type: 'blank' },
    ];
  }
  return [
    { type: 'output', html: `<span class="pp">→</span> "${question}" — good question. Email me: <span class="pa">mikayla.hill8@gmail.com</span>` },
    { type: 'blank' },
  ];
}

const INITIAL: Line[] = [
  { type: 'output', html: '<span class="pd">Welcome to mikayla.sh — try </span><span class="pa">help</span>, <span class="pa">whoami</span>, <span class="pa">socials</span>, <span class="pa">ask &lt;question&gt;</span>.' },
];

export default function Contact() {
  const [lines, setLines] = useState<Line[]>(INITIAL);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [raw.trim(), ...history].slice(0, 20);
    setHistory(newHistory);
    setHistIdx(-1);

    const inputLine: Line = {
      type: 'input',
      html: `<span class="pr">mikayla@portfolio</span><span class="pd">:</span><span class="pp">~</span><span class="pd">$</span> ${raw.trim()}`,
    };

    if (cmd === 'clear') {
      setLines([]);
      return;
    }

    let output: Line[];
    if (cmd.startsWith('ask ')) {
      output = renderAsk(raw.trim().slice(4));
    } else if (COMMANDS[cmd]) {
      output = COMMANDS[cmd]();
    } else {
      output = [
        { type: 'output', html: `<span class="pd">command not found: ${raw.trim()} — try <span class="pa">help</span></span>` },
        { type: 'blank' },
      ];
    }

    setLines((prev) => [...prev, inputLine, ...output]);
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : history[next]);
    }
  }

  return (
    <section id="contact">
      <div className="wrap">
        <div className="sec-head">
          <span className="prompt">$</span>
          <span className="cmd">./contact.sh --interactive</span>
          <span className="tag">// 07 — say hi (type <b style={{ color: 'var(--purple)' }}>help</b>)</span>
        </div>
        <div className="play" data-reveal>
          <div className="chrome"><i /><i /><i /><span>— bash · mikayla@portfolio —</span></div>
          <div className="body" ref={bodyRef}>
            {lines.map((l, i) => {
              if (l.type === 'blank') return <span key={i} className="ln">&nbsp;</span>;
              if (l.html) return <span key={i} className="ln" dangerouslySetInnerHTML={{ __html: l.html }} />;
              return <span key={i} className="ln">{l.text}</span>;
            })}
          </div>
          <div className="input-row" onClick={() => inputRef.current?.focus()}>
            <span className="pr">mikayla@portfolio</span>
            <span className="pd">:</span>
            <span className="pp">~</span>
            <span className="pd">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              autoComplete="off"
              spellCheck={false}
              placeholder="type a command…"
            />
          </div>
          <div className="hint">
            try: <b>help</b> · <b>whoami</b> · <b>socials</b> · <b>ask why hire you</b> · <b>resume</b> · <b>sudo hire me</b> · <b>clear</b>
          </div>
        </div>
      </div>
    </section>
  );
}
