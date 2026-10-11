import { useEffect, useRef, useState } from 'react';
import { Button } from '@workspace/my-jersey-design/components/ui/button';
import { Icon } from '@workspace/my-jersey-design/components/ui/icon';
import { HERO_POSTER, HERO_VIDEO, HERO_REVEAL_SECONDS } from '@/lib/hero-media';

/** Source hero; the realistic footage plays once beneath it and holds its final frame. */
export function Hero() {
  const video = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [welcomed, setWelcomed] = useState(false);
  const [reducedMotion] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (reducedMotion) return; // source disables motion: keep poster
    v.muted = true;
    v.currentTime = 0;
    v.play().catch(() => { /* autoplay blocked: poster frame remains */ });
  }, []);

  return (
    <section className="hero" id="top">
      {!failed && (
        <video ref={video} className="hero-film" src={HERO_VIDEO} poster={HERO_POSTER} muted playsInline autoPlay={!reducedMotion} preload="auto"
          aria-hidden="true" tabIndex={-1} onError={() => setFailed(true)}
          onTimeUpdate={event => { if (event.currentTarget.currentTime >= HERO_REVEAL_SECONDS) setWelcomed(true); }}
          onEnded={() => setWelcomed(true)} />
      )}
      {failed && <img className="hero-film" src={HERO_POSTER} alt="" aria-hidden="true" />}
      <div className="hero-scrim" aria-hidden="true" />
      <div>
        <span className="eb">Custom sportswear studio</span>
        <h1>Crafted for <em>Champions.</em></h1>
        <p>Design professional-quality jerseys with your colors, logo, name and number. Built for teams, athletes and communities.</p>
        <div className="bs">
          <Button href="#custom">Start Designing <Icon name="arrow" /></Button>
          <Button variant="outline" href="#shop">Shop Ready Jerseys</Button>
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
