import { Button } from '@workspace/my-jersey-design/components/ui/button';
import { Icon } from '@workspace/my-jersey-design/components/ui/icon';
import { BrandLogo } from '@workspace/my-jersey-design/components/ui/brand-logo';
import { designImg } from '@/lib/brand';

const STEPS: [string, string, string][] = [
  ['Choose your style or upload your reference', 'Choose from 25 designs or add a reference before ordering.', 'upload'],
  ['Give your details', 'Team name, quantity, sizes and numbers.', 'clipboard'],
  ['Get your design now', 'Approve your artwork with our designer before production.', 'pen'],
];

/** Compact, full-width custom kit campaign banner. */
export function Custom({ onRequest }: { onRequest: () => void }) {
  return (
    <section id="custom" className="mjb-sec">
      <div className="mjb rv">
        <picture className="mjb-im">
          <img src={designImg(0, '1280')} srcSet={`${designImg(0, '1280')} 1280w, ${designImg(0, '4k')} 3840w`} sizes="(max-width:900px) 100vw, 62vw" width={1280} height={1280} loading="lazy" decoding="async" fetchPriority="low" alt="Black and gold My Jersey design preview with lightning sleeves" />
        </picture>
        <div className="mjb-tx">
          <BrandLogo size="small" className="mjb-logo" label="" />
          <span className="eb">Custom team kits</span>
          <h2>Get your custom jerseys <em>now</em></h2>
          <p className="mjb-price" data-testid="text-banner-price"><span>Starting from</span> <b>399TK</b> <span>only</span></p>
          <ol className="mjb-st">
            {STEPS.map(([t, d, i], n) => (
              <li key={t}><span className="mjb-ic"><Icon name={i as 'pen'} /></span><div><small>Step {String(n + 1).padStart(2, '0')}</small><b>{t}</b><span>{d}</span></div></li>
            ))}
          </ol>
          <div className="mjb-ac">
            <Button onClick={onRequest} data-testid="button-banner-design">Get your design now <Icon name="arrow" /></Button>
            <Button variant="outline" href="#works">Browse designs</Button>
          </div>
        </div>
        <span className="mjb-tag">Design preview No. 01</span>
      </div>
    </section>
  );
}
