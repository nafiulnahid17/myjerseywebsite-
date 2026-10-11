import { useEffect, useState } from 'react';
import { Button } from '@workspace/my-jersey-design/components/ui/button';
import { Icon } from '@workspace/my-jersey-design/components/ui/icon';
import { BrandLogo } from '@workspace/my-jersey-design/components/ui/brand-logo';
import { useTheme } from '@/lib/theme';

const LINKS: [string, string][] = [['#works', 'Works'], ['#team-order', 'For Teams'], ['#shop', 'Collections'], ['#places', 'Visit'], ['#team', 'People'], ['#contact', 'Contact']];

type Props = { cartCount: number; profileName: string; onCart: () => void; onProfile: () => void; onTrack: () => void };

export function Header({ cartCount, profileName, onCart, onProfile, onTrack }: Props) {
  const [theme, setTheme] = useTheme();
  const [open, setOpen] = useState(false);
  const light = theme === 'light';

  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  }, []);

  return (
    <header className="site">
      <a className="brand" href="#top" aria-label="My Jersey home" data-testid="link-home"><BrandLogo label="" /></a>
      <nav id="nv" className={open ? 'open' : undefined} aria-label="Main" onClick={() => setOpen(false)}>
        {LINKS.map(([h, l]) => <a key={h} href={h}>{l}</a>)}
        <button type="button" className="nv-track" onClick={onTrack} data-testid="button-nav-track">Track request</button>
      </nav>
      <div className="ha">
        <Button variant="icon" aria-label={light ? 'Switch to dark theme' : 'Switch to light theme'} onClick={() => setTheme(light ? 'dark' : 'light')} data-testid="button-theme">
          <Icon name={light ? 'moon' : 'sun'} />
        </Button>
        <Button variant="icon" aria-label={profileName ? `Profile settings for ${profileName}` : 'Profile settings'} onClick={onProfile} data-testid="button-profile">
          <Icon name="user" />{profileName && <i className="ha-dot" aria-hidden="true" />}
        </Button>
        <Button variant="icon" aria-label={`Open cart, ${cartCount} item${cartCount === 1 ? '' : 's'}`} onClick={onCart} data-testid="button-cart">
          <Icon name="cart" /><b id="cc" data-testid="text-cart-count">{cartCount}</b>
        </Button>
        <Button variant="icon" id="hb" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="nv" onClick={() => setOpen(!open)}>
          <Icon name={open ? 'x' : 'menu'} />
        </Button>
      </div>
    </header>
  );
}
