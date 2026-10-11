import { useState } from 'react';
import { Button } from '@workspace/my-jersey-design/components/ui/button';
import { CreationCard } from '@workspace/my-jersey-design/components/ui/creation-card';
import { CREATIONS, WORKS } from '@/data/catalog';
import { LOGO, designImg, pad } from '@/lib/brand';

type Props = { onView: (i: number) => void; onCustomize: (i: number) => void; onOrder: (i: number) => void };

export function Works({ onView, onCustomize, onOrder }: Props) {
  const [all, setAll] = useState(false);
  const n = all ? CREATIONS.length : 5;
  const toggle = () => { const next = !all; setAll(next); if (!next) document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' }); };
  return (
    <section id="works"><div className="w">
      <span className="eb">Recent works</span><h2>Our Latest Creations</h2>
      <div className="lc-top">
        <div>
          <p className="sub">An editorial collection of premium kit concepts from the My Jersey studio. Pick one, make it yours with your name, number and colors.</p>
          <p className="lc-note"><img src={LOGO} width={768} height={256} loading="lazy" decoding="async" alt="My Jersey" />Design previews: photorealistic AI concept mockups, not photos of produced jerseys. Final artwork confirmed before production.</p>
        </div>
        <p className="lc-count" aria-live="polite"><b>{pad(n - 1)}</b>of 25 designs</p>
      </div>
      <div className="lc" id="wg">
        {CREATIONS.slice(0, n).map((c, i) => {
          const w = WORKS[i];
          return <CreationCard key={i} className="lk" onView={() => onView(i)} onCustomize={() => onCustomize(i)} onOrder={() => onOrder(i)}
            creation={{ index: i, name: c[0], base: c[1], accent: c[2], logo: LOGO, image: designImg(i, '640'),
              srcSet: `${designImg(i, '640')} 640w, ${designImg(i, '1280')} 1280w`,
              details: w ? { fabric: w[5], gsm: w[6], quality: w[7] } : undefined }} />;
        })}
      </div>
      <div className="lc-more">
        <Button variant="outline" id="wga" aria-expanded={all} aria-controls="wg" onClick={toggle}>{all ? 'Show less' : 'Show all 25 designs'}</Button>
      </div>
    </div></section>
  );
}
