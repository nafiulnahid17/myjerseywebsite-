import { Button } from '@workspace/my-jersey-design/components/ui/button';
import { Dialog } from '@workspace/my-jersey-design/components/ui/dialog';
import { Icon } from '@workspace/my-jersey-design/components/ui/icon';
import { CREATIONS, type Person } from '@/data/catalog';
import { GM, WA, designImg, pad } from '@/lib/brand';

export type InfoDialogState =
  | { kind: 'view'; index: number }
  | { kind: 'wa'; person: Person }
  | { kind: 'mail'; address: string }
  | null;

type Props = { state: InfoDialogState; onClose: () => void; onRequest: (sel: string) => void };

/** View and contact dialogs. Cart, profile, team order and tracking live in their own components. */
export function SiteDialogs({ state, onClose, onRequest }: Props) {
  const change = (o: boolean) => { if (!o) onClose(); };
  if (!state) return null;
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
      <Button variant="outline" href={`tel:${p.number}`}><Icon name="phone" />Call</Button>
      <div className="mo-row is-center"><Button variant="outline" size="small" onClick={onClose}>Close</Button></div>
    </Dialog>;
  }
  if (state.kind === 'mail') {
    return <Dialog open icon="mail" contentKey={'ml' + state.address} onOpenChange={change} title="Send an email">
      <div className="mj-dialog-number mo-mail">{state.address}</div>
      <Button href={GM(state.address)} target="_blank" rel="noopener"><Icon name="mail" />Open in Gmail</Button>
      <Button variant="outline" href={`mailto:${state.address}`}>Email app</Button>
      <div className="mo-row is-center"><Button variant="outline" size="small" onClick={onClose}>Close</Button></div>
    </Dialog>;
  }
  return null;
}
