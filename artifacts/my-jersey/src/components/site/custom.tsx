import { Button } from '@workspace/my-jersey-design/components/ui/button';
import { Icon } from '@workspace/my-jersey-design/components/ui/icon';
import { LOGO, designImg } from '@/lib/brand';

export function Custom({ onRequest }: { onRequest: () => void }) {
  return (
    <section id="custom"><div className="w"><div className="cj rv">
      <div className="cj-tx">
        <img className="cj-lg" src={LOGO} width={768} height={256} loading="lazy" decoding="async" alt="My Jersey" />
        <span className="eb">Custom team kits</span>
        <h2>Get your custom jerseys <em>now</em></h2>
        <ol className="cj-st">
          <li><span className="cj-ic"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M11 5 5 8.5 2.5 15l4.5 2 2-3v13.5q7 1.6 14 0V14l2 3 4.5-2L27 8.5 21 5q-5 3.6-10 0z" /><path d="M11 5q5 4 10 0" opacity=".6" /><path d="M13 17h6M13 21h6" opacity=".7" /></svg></span><div><small>Step 01</small><b>Choose your style or upload your reference</b><span>Pick from our 25 designs. Attach your reference image in WhatsApp after opening the chat.</span></div></li>
          <li><span className="cj-ic"><svg viewBox="0 0 32 32" aria-hidden="true"><rect x="6" y="4" width="20" height="24" rx="3" /><path d="M11 4.5V7h10V4.5M11 13h10M11 18h10M11 23h6" /></svg></span><div><small>Step 02</small><b>Give your details</b><span>Team name, quantity, sizes and numbers.</span></div></li>
          <li><span className="cj-ic"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3l3 6.6 7 .8-5.2 4.8 1.4 7L16 18.6 9.8 22.2l1.4-7L6 10.4l7-.8z" /><path d="M8 27h16" opacity=".7" /></svg></span><div><small>Step 03</small><b>Get your design now</b><span>Our designers prepare your artwork and confirm it with you before production.</span></div></li>
        </ol>
        <div className="cj-ac">
          <Button onClick={onRequest}>Get your design now <Icon name="arrow" /></Button>
          <Button variant="outline" href="#works">Browse designs</Button>
        </div>
      </div>
      <div className="cj-im">
        <img src={designImg(0, '1280')} width={1280} height={1280} loading="lazy" decoding="async" alt="Black and gold My Jersey design preview" />
        <span className="cj-tag">Design preview No. 01</span>
      </div>
    </div></div></section>
  );
}
