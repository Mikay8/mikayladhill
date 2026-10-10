import type { ColorToken } from '../data/caseStudies';
import { CrrntLockup, TideMark } from './CrrntLogo';
import { Window } from './ImageSlot';
import './CrrntBrand.css';

const ICONS = [
  { name: 'Deep / gradient', bg: 'radial-gradient(circle at 25% 15%, #13263a, #090d12 70%)' },
  { name: 'Paper / accent', bg: '#EEF8FF', color: '#06B6D4' },
  { name: 'Tide gradient', bg: 'linear-gradient(135deg, #38BDF8, #06B6D4 50%, #2DD4BF)', color: '#EEF8FF' },
  { name: 'Mono ink', bg: '#EEF8FF', color: '#061828' },
];

export default function CrrntBrand({ colors }: { colors: ColorToken[] }) {
  return (
    <Window title="brand/tide-stack.svg" className="brand-win">
      <div className="brand-body">
        <div className="brand-hero">
          <CrrntLockup size={120} />
        </div>

        <div className="brand-row">
          <div>
            <div className="brand-label">Scale check</div>
            <div className="brand-scale">
              {[16, 24, 32, 48, 72].map((s) => (
                <figure key={s}>
                  <TideMark size={s} />
                  <figcaption>{s}</figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div>
            <div className="brand-label">App icon</div>
            <div className="brand-icons">
              {ICONS.map((i) => (
                <figure key={i.name}>
                  <div className="brand-icon" style={{ background: i.bg }}>
                    <TideMark size={52} color={i.color} />
                  </div>
                  <figcaption>{i.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>

        <div className="brand-label">Brand palette</div>
        <div className="brand-palette">
          {colors.map((c) => (
            <div key={c.name}>
              <i style={{ background: c.hex }} />
              <b>{c.name}</b>
              <span>{c.hex}</span>
            </div>
          ))}
        </div>
      </div>
    </Window>
  );
}
