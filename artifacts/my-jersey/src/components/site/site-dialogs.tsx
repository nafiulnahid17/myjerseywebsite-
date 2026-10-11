import { Button } from '@workspace/my-jersey-design/components/ui/button';
import { Dialog } from '@workspace/my-jersey-design/components/ui/dialog';
import { Icon } from '@workspace/my-jersey-design/components/ui/icon';
import { CREATIONS, type Person, type Product } from '@/data/catalog';
import { FN, GM, WA, designImg, fmt, pad } from '@/lib/brand';
import { RequestForm } from './request-form';

export type DialogState =
  | { kind: 'cart' }
  | { kind: 'request'; sel: string }
  | { kind: 'view'; index: number }
  | { kind: 'wa'; person: Person }
  | { kind: 'mail'; address: string }
  | null;

type Props = { state: DialogState; onClose: () => void; cart: Product[]; onRemove: (n: number) => void; onRequest: (sel: string) => void };

export function SiteDialogs({ state, onClose, cart, onRemove, onRequest }: Props) {
  const change = (o: boolean) => { if (!o) onClose(); };
  if (!state) return null;
  if (state.kind === 'request') {
    return <Dialog open variant="request" icon="pen" contentKey={'rq' + state.sel} onOpenChange={change} title="Get your design now"
      description="Tell us what you need. We continue on WhatsApp with a designer.">
      <RequestForm key={state.sel} sel={state.sel} onClose={onClose} />
    </Dialog>;
  }
  if (state.kind === 'view') {
    const i = state.index, c = CREATIONS[i];
    return <Dialog open variant="wide" contentKey={'vw' + i} onOpenChange={change} title={`No. ${pad(i)} · ${c[0]}`}>
      <img src={designImg(i, '4k')} width={3840} height={3840} decoding="async" alt={`${c[0]} jersey design preview, full size`} />
      <p>Photorealistic AI design preview, upscaled export. Not a photo of a produced jersey; final artwork confirmed before production.</p>
      <Button size="small" onClick={() => onRequest('d:' + i)}>Customize this design</Button>
      <Button variant="outline" size="small" onClick={onClose}>Close</Button>
    </Dialog>;
  }
  if (state.kind === 'wa') {
    const p = state.person;
    return <Dialog open icon="wa" contentKey={'wa' + p.number} onOpenChange={change} title={p.name} description={p.role}>
      <div className="mj-dialog-number">{p.number}</div>
      <Button href={WA(p.number, 'Hello My Jersey!')} target="_blank" rel="noopener"><Icon name="wa" />Chat on WhatsApp</Button>
      <Button variant="outline" href={`tel:${p.number}`}><Icon name="phone" />Call</Button><br />
      <Button variant="outline" size="small" style={{ marginTop: 12 }} onClick={onClose}>Close</Button>
    </Dialog>;
  }
  if (state.kind === 'mail') {
    return <Dialog open icon="mail" contentKey={'ml' + state.address} onOpenChange={change} title="Send an email">
      <div className="mj-dialog-number" style={{ fontSize: 17, wordBreak: 'break-all' }}>{state.address}</div>
      <Button href={GM(state.address)} target="_blank" rel="noopener"><Icon name="mail" />Open in Gmail</Button><br />
      <Button variant="outline" size="small" style={{ marginTop: 12 }} onClick={onClose}>Close</Button>
    </Dialog>;
  }
  const tot = cart.reduce((s, i) => s + i.price, 0);
  if (!cart.length) {
    return <Dialog open icon="cart" contentKey="cart-empty" onOpenChange={change} title="Your cart is empty" description="Add a jersey from the collections.">
      <Button variant="outline" style={{ marginTop: 14 }} onClick={onClose}>Close</Button>
    </Dialog>;
  }
  const msg = 'Hello My Jersey! I want to order:\n' + cart.map((i) => i.name + ' – ' + fmt(i.price)).join('\n') + '\nTotal: ' + fmt(tot);
  return <Dialog open icon="cart" contentKey={'cart' + cart.length} onOpenChange={change} title="Your cart">
    {cart.map((i, n) => (
      <div className="ci" key={n}><span>{i.name}</span><span>{fmt(i.price)} <button type="button" aria-label={`Remove ${i.name}`} onClick={() => onRemove(n)}><Icon name="x" /></button></span></div>
    ))}
    <p style={{ margin: '14px 0' }}><b style={{ color: 'var(--gold2)' }}>Total {fmt(tot)}</b></p>
    <Button href={WA(FN, msg)} target="_blank" rel="noopener"><Icon name="wa" />Checkout on WhatsApp</Button>
    <Button variant="outline" onClick={onClose}>Close</Button>
  </Dialog>;
}
