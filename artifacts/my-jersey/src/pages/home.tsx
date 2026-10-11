import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { IconSprite } from '@workspace/my-jersey-design/components/ui/icon';
import { Toast } from '@workspace/my-jersey-design/components/ui/toast';
import { Header } from '@/components/site/header';
import { Hero } from '@/components/site/hero';
import { Works } from '@/components/site/works';
import { Custom } from '@/components/site/custom';
import { ForTeam } from '@/components/site/for-team';
import { Shop } from '@/components/site/shop';
import { ContactSection, Footer, Places, Team } from '@/components/site/people';
import { SiteDialogs, type InfoDialogState } from '@/components/site/site-dialogs';
import { CartDialog } from '@/components/site/cart-dialog';
import { ProfileDialog } from '@/components/site/profile-dialog';
import { TrackDialog } from '@/components/site/track-dialog';
import { EMPTY_TEAM_FORM, TeamOrderDialog, type TeamForm, type TeamStep } from '@/components/site/team-order-dialog';
import { useCommerce } from '@/hooks/use-commerce';
import type { Person, Product } from '@/data/catalog';
import { useReveal } from '@/lib/use-reveal';

type Active = { kind: 'cart' } | { kind: 'profile' } | { kind: 'track' } | { kind: 'team'; step: TeamStep } | { kind: 'info'; info: NonNullable<InfoDialogState> } | null;

const fromPath = (path: string): Active => {
  if (path === '/order') return { kind: 'team', step: 'design' };
  if (path === '/track') return { kind: 'track' };
  if (path === '/cart') return { kind: 'cart' };
  if (path === '/profile') return { kind: 'profile' };
  return null;
};

export default function Home() {
  const [location, setLocation] = useLocation();
  const commerce = useCommerce();
  const [active, setActive] = useState<Active>(() => fromPath(location));
  const [teamForm, setTeamForm] = useState<TeamForm>({ ...EMPTY_TEAM_FORM });
  const [designFile, setDesignFile] = useState<File | null>(null);
  const [toast, setToast] = useState({ open: false, key: 0, message: '' });
  useReveal();

  useEffect(() => { setActive(fromPath(location)); }, [location]);

  const close = () => { setActive(null); if (location !== '/') setLocation('/', { replace: true }); };
  const notify = (message: string) => setToast((t) => ({ open: true, key: t.key + 1, message }));

  /** Opens the team flow, keeping unsent inputs; prefills empty contact fields from the device profile. */
  const openTeam = (step: TeamStep = 'design', sel?: string) => {
    const p = commerce.profile;
    setTeamForm((f) => ({
      ...f,
      sel: sel ?? f.sel,
      prepared: sel && sel !== f.sel ? null : f.prepared,
      team: f.team || p.team, contactName: f.contactName || p.name, phone: f.phone || p.phone, email: f.email || p.email,
    }));
    setActive({ kind: 'team', step });
  };

  const add = (p: Product, thenOpen = false) => {
    if (!commerce.addItem(p.id, commerce.profile.preferredSize)) { notify(p.inStock ? 'Could not add this jersey' : 'This jersey is sold out'); return; }
    if (thenOpen) setActive({ kind: 'cart' }); else notify(`Added to cart · size ${commerce.profile.preferredSize}`);
  };
  const info = (i: NonNullable<InfoDialogState>) => setActive({ kind: 'info', info: i });
  const wa = { onWa: (person: Person) => info({ kind: 'wa', person }), onMail: (address: string) => info({ kind: 'mail', address }) };
  const openTrack = () => setActive({ kind: 'track' });

  return (
    <>
      <IconSprite />
      <Header cartCount={commerce.cartCount} profileName={commerce.profile.name} onCart={() => setActive({ kind: 'cart' })} onProfile={() => setActive({ kind: 'profile' })} onTrack={openTrack} />
      <main>
        <Hero onTeamOrder={() => openTeam('design')} />
        <Works onView={(index) => info({ kind: 'view', index })} onCustomize={(i) => openTeam('design', 'd:' + i)} onOrder={(i) => openTeam('details', 'd:' + i)} />
        <Custom onRequest={() => openTeam('design')} />
        <ForTeam onStep={(s) => openTeam(s)} onTrack={openTrack} />
        <Shop onAdd={(p) => add(p)} onCustomize={(p) => openTeam('design', 'p:' + p.id)} onBuy={(p) => add(p, true)} />
        <Places onWa={wa.onWa} />
        <Team {...wa} />
        <ContactSection {...wa} onTeamOrder={() => openTeam('design')} />
      </main>
      <Footer />

      {active?.kind === 'info' && <SiteDialogs state={active.info} onClose={close} onRequest={(sel) => openTeam('design', sel)} />}
      {active?.kind === 'cart' && <CartDialog commerce={commerce} onClose={close} onProfile={() => setActive({ kind: 'profile' })} onTrack={openTrack} />}
      {active?.kind === 'profile' && <ProfileDialog commerce={commerce} onClose={close} />}
      {active?.kind === 'track' && <TrackDialog commerce={commerce} onClose={close} onNewOrder={() => openTeam('design')} />}
      {active?.kind === 'team' && <TeamOrderDialog step={active.step} onStep={(step) => setActive({ kind: 'team', step })} onClose={close} onTrack={openTrack}
        form={teamForm} setForm={setTeamForm} file={designFile} onFile={setDesignFile} commerce={commerce} />}
      <Toast open={toast.open} eventKey={toast.key} message={toast.message} onOpenChange={(open) => setToast((t) => ({ ...t, open }))} />
    </>
  );
}
