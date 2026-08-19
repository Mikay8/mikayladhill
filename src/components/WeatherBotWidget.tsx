import { useEffect, useState } from 'react';
import './WeatherBotWidget.css';

const API_URL = 'https://api-production-83d1f.up.railway.app';

type Trade = {
  id: number;
  timestamp: string;
  pnl?: number | null;
  status?: string | null;
};

type Wallet = {
  balance: number;
  starting_balance: number;
  realized_pnl: number;
  open_trades: Trade[];
  settled_trades: Trade[];
};

type HourlyPoint = {
  timestamp: string;
  temperature: number;
  condition: string | null;
};

type HourlyWeather = {
  current: HourlyPoint | null;
};

function fmtUsd(v: number): string {
  return v.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
}

// Dev-only fallback so the widget is visible locally before CORS is set up for this origin.
const MOCK_WALLET: Wallet = {
  balance: 965.0,
  starting_balance: 1000.0,
  realized_pnl: -35,
  open_trades: [],
  settled_trades: [
    { id: 1, timestamp: '2026-08-10T00:00:00Z', pnl: 12, status: 'settled_win' },
    { id: 2, timestamp: '2026-08-12T00:00:00Z', pnl: -8, status: 'settled_loss' },
    { id: 3, timestamp: '2026-08-14T00:00:00Z', pnl: 20, status: 'settled_win' },
    { id: 4, timestamp: '2026-08-16T00:00:00Z', pnl: -15, status: 'settled_loss' },
    { id: 5, timestamp: '2026-08-18T00:00:00Z', pnl: -10.7, status: 'settled_loss' },
  ],
};

const MOCK_WEATHER: HourlyWeather = {
  current: { timestamp: '', temperature: 79, condition: 'Clear' },
};

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="30" height="30" aria-hidden>
      <circle cx="12" cy="12" r="4.5" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 2.5v2.5M12 19v2.5M21.5 12H19M5 12H2.5M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4 5.6 5.6" />
      </g>
    </svg>
  );
}

function SnowflakeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="30" height="30" aria-hidden>
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.5v19M4.5 7l15 10M19.5 7l-15 10" />
        <path d="M12 2.5 9.8 4.6M12 2.5l2.2 2.1M12 21.5l-2.2-2.1M12 21.5l2.2-2.1" />
        <path d="M4.5 7 6.9 6.6M4.5 7l.6 2.4M19.5 7l-2.4-.4M19.5 7l-.6 2.4M19.5 17l-2.4.4M19.5 17l-.6-2.4M4.5 17l2.4.4M4.5 17l.6-2.4" />
      </g>
    </svg>
  );
}

function Sparkline({ points, positive }: { points: number[]; positive: boolean }) {
  if (points.length < 2) return null;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const w = 100;
  const h = 34;
  const coords = points.map((v, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  });
  const areaPoints = `0,${h} ${coords.join(' ')} ${w},${h}`;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="wb-sparkline">
      <polygon
        points={areaPoints}
        fill={positive ? 'rgba(140, 230, 180, .15)' : 'rgba(230, 140, 130, .15)'}
        stroke="none"
      />
      <polyline
        points={coords.join(' ')}
        fill="none"
        stroke={positive ? '#8de3b0' : '#e2938c'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WeatherBotWidget() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [weather, setWeather] = useState<HourlyWeather | null>(null);
  const [error, setError] = useState(false);
  const [isMock, setIsMock] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [w, h] = await Promise.all([
          fetch(`${API_URL}/api/wallet`).then((r) => {
            if (!r.ok) throw new Error();
            return r.json();
          }),
          fetch(`${API_URL}/api/weather/hourly`).then((r) => {
            if (!r.ok) throw new Error();
            return r.json();
          }),
        ]);
        if (!cancelled) {
          setWallet(w);
          setWeather(h);
          setError(false);
          setIsMock(false);
        }
      } catch {
        if (!cancelled) {
          if (import.meta.env.DEV) {
            // Local dev: API origin usually isn't in the CORS allowlist yet — show mock data instead of an error.
            setWallet(MOCK_WALLET);
            setWeather(MOCK_WEATHER);
            setError(false);
            setIsMock(true);
          } else {
            setError(true);
          }
        }
      }
    }

    load();
    const interval = setInterval(load, 60_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (error) {
    return (
      <div className="wb-widget wb-widget--empty">
        <span className="pd">// weather bot API unreachable</span>
      </div>
    );
  }

  if (!wallet || !weather) {
    return (
      <div className="wb-widget wb-widget--empty">
        <span className="pd">// loading live data…</span>
      </div>
    );
  }

  const temp = weather.current?.temperature ?? null;
  const pnl = wallet.balance - wallet.starting_balance;
  const pnlPositive = pnl >= 0;

  const settled = [...wallet.settled_trades].sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  let running = wallet.starting_balance;
  const history = [running, ...settled.map((t) => (running += t.pnl ?? 0))];

  return (
    <div className="wb-widget">
      <div className="wb-head">
        <span className="wb-loc">New York, NY</span>
        <span className={`wb-live${isMock ? ' wb-live--mock' : ''}`}>
          <span className="wb-live-dot" /> {isMock ? 'mock data' : 'live'}
        </span>
      </div>

      <div className="wb-cols">
        <div className="wb-weather">
          {temp !== null ? (temp >= 50 ? <SunIcon /> : <SnowflakeIcon />) : null}
          <div className="wb-temp">
            {temp !== null ? `${Math.round(temp)}°` : '—'}
            <span className="wb-temp-cond">{weather.current?.condition || 'now'}</span>
          </div>
        </div>

        <div className="wb-col-divider" />

        <div className="wb-wallet">
          <div className="wb-wallet-label">Paper wallet balance</div>
          <div className="wb-wallet-balance">{fmtUsd(wallet.balance)}</div>
          <div className={`wb-wallet-pnl ${pnlPositive ? 'up' : 'dn'}`}>
            {pnlPositive ? '+' : ''}
            {fmtUsd(pnl)} since start
          </div>
        </div>

        {history.length > 2 && (
          <>
            <div className="wb-col-divider" />
            <div className="wb-history">
              <div className="wb-wallet-label">Wallet history</div>
              <Sparkline points={history} positive={pnlPositive} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
