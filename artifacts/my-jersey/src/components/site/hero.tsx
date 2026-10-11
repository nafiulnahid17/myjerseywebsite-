import { useRef, useState } from 'react';
import { Button } from '@workspace/my-jersey-design/components/ui/button';
import { Icon } from '@workspace/my-jersey-design/components/ui/icon';
import { HERO_POSTER, HERO_VIDEO, HERO_REVEAL_SECONDS } from '@/lib/hero-media';

/** Source hero; the realistic footage plays once beneath it and holds its final frame. */
export function Hero({ onTeamOrder }: { onTeamOrder: () => void }) {
  const revealedWelcome = useRef(false);
  const [failed, setFailed] = useState(false);
  const [welcomed, setWelcomed] = useState(false);
  const [reducedMotion] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  const revealWelcome = () => {
    if (revealedWelcome.current) return;
    revealedWelcome.current = true;
    setWelcomed(true);
  };

  return (
    <section className="hero" id="top">
      {!failed && (
        <video className="hero-film" src={HERO_VIDEO} poster={HERO_POSTER} muted playsInline autoPlay={!reducedMotion} preload={reducedMotion ? 'none' : 'metadata'}
          aria-hidden="true" tabIndex={-1} onError={() => setFailed(true)}
          onTimeUpdate={event => { if (event.currentTarget.currentTime >= HERO_REVEAL_SECONDS) revealWelcome(); }}
          onEnded={revealWelcome} />
      )}
      {failed && <img className="hero-film" src={HERO_POSTER} alt="" aria-hidden="true" />}
      <div className="hero-scrim" aria-hidden="true" />
      <div>
        <span className="eb">Custom sportswear studio</span>
        <h1>Crafted for <em>Champions.</em></h1>
        <p>Design professional-quality jerseys with your colors, logo, name and number. Built for teams, athletes and communities.</p>
        <div className="bs">
          <Button onClick={onTeamOrder} data-testid="button-hero-team-order">Order for your Team <Icon name="arrow" /></Button>
          <Button variant="outline" href="#contact" data-testid="link-hero-contact"><Icon name="wa" />Contact</Button>
        </div>
        <ul className="tr">
          <li><Icon name="fabric" />Premium fabric</li>
          <li><Icon name="bolt" />Fast turnaround</li>
          <li><Icon name="pen" />Free design support</li>
          <li><Icon name="truck" />Delivery across Bangladesh</li>
        </ul>
      </div>
      <div className={`hero-film-brand${welcomed ? ' is-visible' : ''}`} aria-live="polite" aria-hidden={!welcomed}>
        {welcomed && <>
          <strong>Welcome to <em>My Jersey</em></strong>
          <span>Crafted for Champions</span>
        </>}
      </div>
    </section>
  );
}
