import { useEffect } from 'react';
import { Link } from 'wouter';
import { IconSprite, Icon, type IconName } from '@workspace/my-jersey-design/components/ui/icon';
import { Button } from '@workspace/my-jersey-design/components/ui/button';
import { BrandLogo } from '@workspace/my-jersey-design/components/ui/brand-logo';
import { useTheme } from '@/lib/theme';

const AREAS: { icon: IconName; title: string; text: string; items: string[] }[] = [
  { icon: 'pen', title: 'Content', text: 'Homepage copy, banners, outlet and team details.', items: ['Hero and banner text', 'Outlet & factory details', 'People and contacts'] },
  { icon: 'grid', title: 'Products', text: 'Collections, prices, stock and reference images.', items: ['Football and cricket collections', 'Prices and availability', 'Design gallery'] },
  { icon: 'clipboard', title: 'Orders', text: 'Team requests and cart orders received from customers.', items: ['Incoming requests', 'Status updates', 'Customer messages'] },
  { icon: 'palette', title: 'Theme', text: 'Brand presentation across light and dark themes.', items: ['Theme defaults', 'Seasonal banners', 'Brand assets'] },
];

/** Gateway only. No sign-in, no saving, no backend: every area is visibly not configured. */
export default function Admin() {
  useTheme();
  useEffect(() => {
    const prev = document.title;
    document.title = 'Studio admin · not configured · My Jersey';
    const meta = document.createElement('meta');
    meta.name = 'robots'; meta.content = 'noindex,nofollow';
    document.head.appendChild(meta);
    return () => { document.title = prev; meta.remove(); };
  }, []);

  return (
    <div className="adm">
      <IconSprite />
      <header className="adm-top">
        <Link href="/" aria-label="Back to My Jersey website" data-testid="link-admin-home"><BrandLogo size="small" label="" /></Link>
        <span className="mo-badge is-warn" data-testid="status-admin"><Icon name="lock" />Not configured</span>
      </header>
      <main className="adm-main">
        <span className="eb">Studio admin</span>
        <h1 className="adm-h">Management <em>gateway</em></h1>
        <p className="adm-lead">This is the future entry point for managing the My Jersey website. It is not connected to any server yet, so there is no sign-in and nothing here can be edited or saved. The public website keeps working as it does today.</p>
        <div className="adm-state" role="note">
          <Icon name="lock" />
          <div><b>Setup pending</b><p>Secure sign-in and a content service must be set up before any management area can be enabled. Until then, orders continue to arrive through WhatsApp.</p></div>
        </div>
        <ul className="adm-grid">
          {AREAS.map((a) => (
            <li key={a.title} className="adm-card" data-testid={`card-admin-${a.title.toLowerCase()}`}>
              <div className="adm-card-head"><span className="ft-ic"><Icon name={a.icon} /></span><span className="mo-badge is-quiet">Setup pending</span></div>
              <h2>{a.title}</h2>
              <p>{a.text}</p>
              <ul>{a.items.map((i) => <li key={i}>{i}</li>)}</ul>
              <Button variant="outline" size="small" disabled aria-disabled="true">Unavailable until configured</Button>
            </li>
          ))}
        </ul>
        <div className="adm-back"><Button href={import.meta.env.BASE_URL} data-testid="link-admin-back">Back to website <Icon name="arrow" /></Button></div>
      </main>
    </div>
  );
}
