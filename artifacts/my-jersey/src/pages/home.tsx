import { useState } from 'react';
import { IconSprite } from '@workspace/my-jersey-design/components/ui/icon';
import { Toast } from '@workspace/my-jersey-design/components/ui/toast';
import { Header } from '@/components/site/header';
import { Hero } from '@/components/site/hero';
import { Works } from '@/components/site/works';
import { Custom } from '@/components/site/custom';
import { Shop } from '@/components/site/shop';
import { ContactSection, Footer, Places, Team } from '@/components/site/people';
import { SiteDialogs, type DialogState } from '@/components/site/site-dialogs';
import { CREATIONS, WORKS, type Person, type Product } from '@/data/catalog';
import { FN, WA, fmt, pad } from '@/lib/brand';
import { useReveal } from '@/lib/use-reveal';

export default function Home() {
  const [dialog, setDialog] = useState<DialogState>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [toast, setToast] = useState({ open: false, key: 0, message: '' });
  useReveal();

  const request = (sel: string) => setDialog({ kind: 'request', sel });
  const order = (i: number) => {
    const w = WORKS[i];
    window.open(WA(FN, w ? `Hello My Jersey! I want to order the "${w[0]}" (${w[5]}, ${w[6]}). Design ref: No. ${pad(i)}.`
      : `Hello My Jersey! I'd like to order the "${CREATIONS[i][0]}" concept design (ref No. ${pad(i)}). Please share fabric options and pricing.`), '_blank');
  };
  const add = (p: Product) => { setCart((c) => [...c, p]); setToast((t) => ({ open: true, key: t.key + 1, message: 'Added to cart' })); };
  const buy = (p: Product) => window.open(WA(FN, `Hello My Jersey! I want to buy: ${p.name} (${fmt(p.price)}).`), '_blank');
  const wa = { onWa: (person: Person) => setDialog({ kind: 'wa', person }), onMail: (address: string) => setDialog({ kind: 'mail', address }) };

  return (
    <>
      <IconSprite />
      <Header cartCount={cart.length} onCart={() => setDialog({ kind: 'cart' })} />
      <main>
        <Hero />
        <Works onView={(index) => setDialog({ kind: 'view', index })} onCustomize={(i) => request('d:' + i)} onOrder={order} />
        <Custom onRequest={() => request('')} />
        <Shop onAdd={add} onCustomize={(p) => request('p:' + p.id)} onBuy={buy} />
        <Places />
        <Team {...wa} />
        <ContactSection {...wa} />
      </main>
      <Footer />
      <SiteDialogs state={dialog} onClose={() => setDialog(null)} cart={cart} onRemove={(n) => setCart((c) => c.filter((_, k) => k !== n))} onRequest={request} />
      <Toast open={toast.open} eventKey={toast.key} message={toast.message} onOpenChange={(open) => setToast((t) => ({ ...t, open }))} />
    </>
  );
}
