import { useEffect, useState } from 'react';
import { Button } from '@workspace/my-jersey-design/components/ui/button';
import { Icon } from '@workspace/my-jersey-design/components/ui/icon';
import { LOGO, LOGO_SET } from '@/lib/brand';

const LINKS: [string, string][] = [['#works', 'Our Works'], ['#custom', 'Custom Jersey'], ['#shop', 'Collections'], ['#places', 'Outlet & Factory'], ['#team', 'Team'], ['#contact', 'Contact']];

export function Header({ cartCount, onCart }: { cartCount: number; onCart: () => void }) {
  const [light, setLight] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const r = document.documentElement;
    r.classList.toggle('dark', !light);
    r.dataset.theme = light ? 'light' : 'dark';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', light ? '#f7f2e6' : '#08090a');
  }, [light]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  }, []);

  return (
    <header className="site">
      <a className="brand" href="#top" aria-label="My Jersey home">
        <img src={LOGO} srcSet={LOGO_SET} sizes="140px" width={2048} height={682} alt="My Jersey – Crafted for champions" fetchPriority="high" />
      </a>
      <nav id="nv" className={open ? 'open' : undefined} aria-label="Main" onClick={() => setOpen(false)}>
        {LINKS.map(([h, l]) => <a key={h} href={h}>{l}</a>)}
      </nav>
      <div className="ha">
        <Button variant="icon" id="th" aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'} onClick={() => setLight(!light)}>
          <Icon name={light ? 'moon' : 'sun'} />
        </Button>
        <Button variant="icon" aria-label="Open cart" onClick={onCart}>
          <Icon name="cart" /><b id="cc">{cartCount}</b>
        </Button>
        <Button variant="icon" id="hb" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="nv" onClick={() => setOpen(!open)}>
          <Icon name={open ? 'x' : 'menu'} />
        </Button>
      </div>
    </header>
  );
}
