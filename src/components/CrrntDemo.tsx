import { useState } from 'react';
import './CrrntDemo.css';

interface Ticker {
  sym: string;
  name: string;
  price: string;
  change: string;
  up: boolean;
  summary: string;
  sparkline: number[];
}

const TICKERS: Ticker[] = [
  {
    sym: 'AAPL',
    name: 'Apple Inc.',
    price: '189.42',
    change: '+1.23%',
    up: true,
    summary: 'Apple continues strong iPhone 16 cycle momentum, with services revenue growing 14% YoY. Analysts remain bullish ahead of WWDC AI announcements.',
    sparkline: [182, 184, 181, 185, 187, 186, 189],
  },
  {
    sym: 'NVDA',
    name: 'NVIDIA Corp.',
    price: '875.60',
    change: '+3.41%',
    up: true,
    summary: 'Data center demand drives another record quarter. Blackwell GPU shipments accelerating — supply bottlenecks easing through Q3 2026.',
    sparkline: [820, 835, 828, 845, 860, 855, 875],
  },
  {
    sym: 'JPM',
    name: 'JPMorgan Chase',
    price: '198.77',
    change: '-0.54%',
    up: false,
    summary: 'Post-trade infrastructure investment continues. Net interest income holds steady despite rate uncertainty. Consumer banking segment outperforms.',
    sparkline: [202, 200, 201, 199, 200, 199, 198],
  },
  {
    sym: 'MSFT',
    name: 'Microsoft Corp.',
    price: '417.15',
    change: '+0.88%',
    up: true,
    summary: 'Azure cloud growth re-accelerating at 31% YoY. Copilot enterprise seat expansion ahead of consensus estimates heading into earnings.',
    sparkline: [408, 410, 412, 409, 414, 415, 417],
  },
];

function Sparkline({ data, up }: { data: number[]; up: boolean }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 32;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  });
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline
        points={pts.join(' ')}
        fill="none"
        stroke={up ? 'var(--green)' : 'var(--red)'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CrrntDemo() {
  const [selected, setSelected] = useState<Ticker | null>(null);

  return (
    <div className="crrnt-demo">
      <div className="crrnt-chrome">
        <i /><i /><i />
        <span>CRRNT · markets demo</span>
      </div>
      <div className="crrnt-tickers">
        {TICKERS.map((t) => (
          <button
            key={t.sym}
            className={`ticker-row${selected?.sym === t.sym ? ' active' : ''}`}
            onClick={() => setSelected(selected?.sym === t.sym ? null : t)}
          >
            <div className="ticker-left">
              <span className="sym">{t.sym}</span>
              <span className="name">{t.name}</span>
            </div>
            <Sparkline data={t.sparkline} up={t.up} />
            <div className="ticker-right">
              <span className="price">${t.price}</span>
              <span className={`chg ${t.up ? 'up' : 'dn'}`}>{t.change}</span>
            </div>
          </button>
        ))}
      </div>
      {selected && (
        <div className="crrnt-detail">
          <div className="detail-head">
            <span className="sym">{selected.sym}</span>
            <span className="ai-badge">AI summary</span>
          </div>
          <p>{selected.summary}</p>
          <div className="detail-footer">
            <span>↳ powered by Claude SDK · FastAPI backend</span>
          </div>
        </div>
      )}
      {!selected && (
        <div className="crrnt-hint">tap a ticker to see AI market context</div>
      )}
    </div>
  );
}
