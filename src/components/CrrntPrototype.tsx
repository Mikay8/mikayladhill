import { useEffect, useMemo, useState } from 'react';
import { CrrntLockup } from './CrrntLogo';
import './CrrntPrototype.css';

// A recreation of the CRRNT feed + story screens using the app's dark theme.
// Stories and prices are sample data, not pulled from the live API.

type Category = 'Tech' | 'Business' | 'Entertainment' | 'Sports' | 'World';
type Range = '1D' | '1W' | '1M' | '1Y';

const CATEGORY_COLOR: Record<Category, string> = {
  Tech: '#38BDF8',
  Business: '#F97316',
  Entertainment: '#C084FC',
  Sports: '#A78BFA',
  World: '#94A3B8',
};

const SENTIMENT = {
  positive: { label: 'Mostly Positive', color: '#10B981' },
  frustrated: { label: 'Mostly Frustrated', color: '#F87171' },
  split: { label: 'Split', color: '#F59E0B' },
  calm: { label: 'Surprisingly Calm', color: '#38BDF8' },
};

interface Story {
  id: string;
  category: Category;
  title: string;
  oneLiner: string;
  source: string;
  ago: string;
  daysLeft: number;
  summary: string;
  affectMe: string;
  wallet: string;
  stock?: { ticker: string; company: string; price: number; seed: number; drift: number };
  sentiment: { key: keyof typeof SENTIMENT; text: string };
  audioSec: number;
}

const STORIES: Story[] = [
  {
    id: 'chips',
    category: 'Tech',
    title: 'Nvidia unveils next-gen AI chips as cloud giants race to buy',
    oneLiner: 'The AI arms race just got a new price tag.',
    source: 'example-tech.com',
    ago: '2h ago',
    daysLeft: 7,
    summary: 'Nvidia announced its next generation of data-center chips, and the biggest cloud providers are already lining up orders.',
    affectMe: 'If you work in tech, expect AI tooling at your job to get faster and more common. If you use AI apps, prices are likely to hold steady or drop as capacity grows.',
    wallet: 'Index funds are heavily weighted toward big tech, so if you hold an S&P 500 fund, this story moves your balance more than you might think.',
    stock: { ticker: 'NVDA', company: 'NVIDIA Corp.', price: 142.73, seed: 3, drift: 1 },
    sentiment: { key: 'positive', text: 'People are hyped about the specs, with some side-eye at the price of a GPU.' },
    audioSec: 134,
  },
  {
    id: 'coffee',
    category: 'Business',
    title: 'Starbucks raises prices on cold drinks heading into summer',
    oneLiner: 'Your iced latte is about to cost you more.',
    source: 'example-business.com',
    ago: '5h ago',
    daysLeft: 6,
    summary: 'Starbucks is raising prices on most cold drinks by 3–5%, citing higher dairy and labor costs.',
    affectMe: 'If you grab coffee a few times a week, this adds up to roughly $40–60 a year. Rewards members get the same increase.',
    wallet: 'Small daily purchases are where inflation is most visible. A home cold-brew setup pays for itself in about two months at these prices.',
    stock: { ticker: 'SBUX', company: 'Starbucks Corp.', price: 96.12, seed: 11, drift: -1 },
    sentiment: { key: 'frustrated', text: 'Mostly "I\'m switching to the place down the street," with a lot of cold-brew recipes.' },
    audioSec: 96,
  },
  {
    id: 'boxoffice',
    category: 'Entertainment',
    title: "Disney's live-action remake tops the box office for a third weekend",
    oneLiner: 'Nostalgia keeps printing money.',
    source: 'example-film.com',
    ago: 'Yesterday',
    daysLeft: 5,
    summary: 'The remake crossed $600M worldwide, making it the biggest family release of the year so far.',
    affectMe: 'Expect more remakes on your streaming queue. Studios greenlight what works, and this worked.',
    wallet: 'Theater tickets keep climbing; matinee and discount-day pricing can cut a family outing nearly in half.',
    stock: { ticker: 'DIS', company: 'The Walt Disney Co.', price: 112.4, seed: 7, drift: 1 },
    sentiment: { key: 'split', text: 'Half love the nostalgia, half want original stories again.' },
    audioSec: 102,
  },
  {
    id: 'heat',
    category: 'World',
    title: 'Record heat wave grips southern Europe as cities open cooling centers',
    oneLiner: 'Summer travel plans may need a backup.',
    source: 'example-world.com',
    ago: '3d ago',
    daysLeft: 2,
    summary: 'Temperatures topped 44°C in parts of Spain and Italy, with officials urging tourists to avoid midday sightseeing.',
    affectMe: "If you're traveling to southern Europe this summer, plan indoor activities for afternoons and check if your hotel has AC.",
    wallet: 'Travel insurance that covers heat-related cancellations is worth a look before booking peak-season trips.',
    sentiment: { key: 'calm', text: 'Locals are sharing survival tips more than complaining.' },
    audioSec: 88,
  },
];

const CATEGORIES: ('All' | Category)[] = ['All', 'Tech', 'Business', 'Entertainment', 'World'];
const RANGES: Range[] = ['1D', '1W', '1M', '1Y'];
const RANGE_POINTS: Record<Range, number> = { '1D': 40, '1W': 35, '1M': 30, '1Y': 52 };

const W = 300;
const H = 90;

function series(seed: number, range: Range, drift: number) {
  let s = seed * 31 + RANGE_POINTS[range];
  const rand = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const out: number[] = [];
  let v = 100;
  for (let i = 0; i < RANGE_POINTS[range]; i++) {
    v *= 1 + (rand() - 0.5) * 0.03 + drift * 0.003;
    out.push(v);
  }
  return out;
}

function StockCard({ stock }: { stock: NonNullable<Story['stock']> }) {
  const [range, setRange] = useState<Range>('1D');
  const data = useMemo(() => series(stock.seed, range, stock.drift), [stock.seed, stock.drift, range]);
  const pct = ((data[data.length - 1] - data[0]) / data[0]) * 100;
  const up = pct >= 0;
  const color = up ? '#10B981' : '#F87171';
  const min = Math.min(...data);
  const max = Math.max(...data);
  const line = data
    .map((v, i) => `${((i / (data.length - 1)) * W).toFixed(1)},${(6 + (1 - (v - min) / (max - min || 1)) * (H - 12)).toFixed(1)}`)
    .join(' ');

  return (
    <div className="cp-card cp-stock">
      <div className="cp-stock-head">
        <div>
          <div className="cp-ticker">${stock.ticker}</div>
          <div className="cp-company">{stock.company}</div>
        </div>
        <div className="cp-price-col">
          <div className="cp-price">${stock.price.toFixed(2)}</div>
          <div className="cp-delta" style={{ color }}>
            {range} {up ? '▲' : '▼'} {Math.abs(pct).toFixed(2)}%
          </div>
        </div>
      </div>
      <div className="cp-ranges">
        {RANGES.map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={r === range ? 'on' : ''}
            style={r === range ? { color, borderColor: color, background: `${color}22` } : undefined}
          >
            {r}
          </button>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="cp-chart" aria-label={`${stock.ticker} ${range} chart`}>
        <polygon points={`0,${H} ${line} ${W},${H}`} fill={color} opacity=".12" />
        <polyline points={line} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function fmt(sec: number) {
  return `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}`;
}

function Badge({ category }: { category: Category }) {
  const c = CATEGORY_COLOR[category];
  return <span className="cp-badge" style={{ color: c, background: `${c}1f` }}>{category}</span>;
}

function StoryDetail({ story, onBack }: { story: Story; onBack: () => void }) {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setElapsed((e) => {
        if (e + 1 >= story.audioSec) {
          setPlaying(false);
          return story.audioSec;
        }
        return e + 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [playing, story.audioSec]);

  const s = SENTIMENT[story.sentiment.key];
  const color = CATEGORY_COLOR[story.category];

  return (
    <div className="cp-scroll">
      <div className="cp-topbar">
        <button className="cp-back" onClick={onBack} aria-label="Back to feed">←</button>
      </div>
      <div className="cp-hero" style={{ background: `linear-gradient(135deg, ${color}55, #101820 70%)` }} />
      <div className="cp-detail">
        <div className="cp-row">
          <Badge category={story.category} />
          <span className={`cp-expiry ${story.daysLeft <= 2 ? 'urgent' : ''}`}>◷ {story.daysLeft}d left</span>
        </div>
        <h3 className="cp-title">{story.title}</h3>
        <div className="cp-audio">
          <button
            className="cp-play"
            onClick={() => {
              if (!playing && elapsed >= story.audioSec) setElapsed(0);
              setPlaying((p) => !p);
            }}
            aria-label={playing ? 'Pause audio' : 'Play audio'}
          >
            {playing ? '❚❚' : '▶'}
          </button>
          <div className="cp-seek"><i style={{ width: `${(elapsed / story.audioSec) * 100}%` }} /></div>
          <span className="cp-time">{fmt(elapsed)} / {fmt(story.audioSec)}</span>
        </div>
        <div className="cp-source">{story.source} · {story.ago}</div>

        <div className="cp-card cp-insight">{story.summary}</div>

        <div className="cp-card cp-affect">
          <div className="cp-label" style={{ color: '#7B68EE' }}>👥 How does it affect me?</div>
          <p>{story.affectMe}</p>
        </div>

        <div className="cp-card">
          <div className="cp-label" style={{ color: '#06B6D4' }}>✦ Wallet impact</div>
          <p>{story.wallet}</p>
        </div>

        {story.stock ? (
          <StockCard stock={story.stock} />
        ) : (
          <div className="cp-card cp-nostock">ⓘ No public stock is closely tied to this story.</div>
        )}

        <div className="cp-card">
          <div className="cp-label cp-x">𝕏 What are people saying?</div>
          <div className="cp-sentiment" style={{ color: s.color, background: `${s.color}1f` }}>{s.label}</div>
          <p>{story.sentiment.text}</p>
        </div>
      </div>
    </div>
  );
}

export default function CrrntPrototype() {
  const [filter, setFilter] = useState<'All' | Category>('All');
  const [openId, setOpenId] = useState<string | null>(null);
  const open = STORIES.find((s) => s.id === openId);
  const visible = filter === 'All' ? STORIES : STORIES.filter((s) => s.category === filter);

  return (
    <div className="cp-phone">
      <div className="cp-screen">
        <div className="cp-status"><span>9:41</span><span>●●●● ▮</span></div>

        {open ? (
          <StoryDetail key={open.id} story={open} onBack={() => setOpenId(null)} />
        ) : (
          <div className="cp-scroll">
            <div className="cp-header">
              <CrrntLockup size={26} />
              <span className="cp-icons">☾ ⌕</span>
            </div>
            <div className="cp-pills">
              {CATEGORIES.map((c) => (
                <button key={c} className={c === filter ? 'on' : ''} onClick={() => setFilter(c)}>{c}</button>
              ))}
            </div>
            <div className="cp-feed">
              {visible.map((s) => (
                <button key={s.id} className="cp-story" onClick={() => setOpenId(s.id)}>
                  <div className="cp-thumb" style={{ background: `linear-gradient(135deg, ${CATEGORY_COLOR[s.category]}55, #101820 75%)` }} />
                  <div className="cp-story-body">
                    <div className="cp-row">
                      <span className="cp-dot">▶</span>
                      <Badge category={s.category} />
                    </div>
                    <div className="cp-story-title">{s.title}</div>
                    <div className="cp-oneliner">{s.oneLiner}</div>
                    <div className="cp-meta"><span>{s.source}</span><span>{s.ago}</span></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="cp-tabs">
          <span className="on">↗ Feed</span>
          <span>⌑ Saved</span>
          <span>◯ Settings</span>
        </div>
      </div>
    </div>
  );
}
