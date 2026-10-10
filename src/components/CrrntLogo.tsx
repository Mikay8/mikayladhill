import { useId } from 'react';

// CRRNT "Tide Stack" mark: three wave crests, sky → cyan → teal.

const CRESTS = [
  'M232 360C320 260 432 260 512 360C592 460 704 460 792 360',
  'M168 540C280 420 408 420 512 540C616 660 744 660 856 540',
  'M232 720C320 620 432 620 512 720C592 820 704 820 792 720',
];

export function TideMark({ size = 32, color }: { size?: number; color?: string }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 1024 1024" aria-hidden="true">
      {!color && (
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#2DD4BF" />
          </linearGradient>
        </defs>
      )}
      {CRESTS.map((d) => (
        <path key={d} d={d} fill="none" stroke={color ?? `url(#${id})`} strokeWidth="92" strokeLinecap="round" />
      ))}
    </svg>
  );
}

export function CrrntLockup({ size = 32, ink = false }: { size?: number; ink?: boolean }) {
  return (
    <span className="crrnt-lockup" style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.3 }}>
      <TideMark size={size} />
      <span
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 700,
          fontSize: size * 0.56,
          letterSpacing: '.04em',
          color: ink ? '#061828' : '#EEF8FF',
          lineHeight: 1,
        }}
      >
        CRRNT
      </span>
    </span>
  );
}
