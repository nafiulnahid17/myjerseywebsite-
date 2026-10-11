import { useState } from 'react';
import { Button } from '@workspace/my-jersey-design/components/ui/button';
import { Dialog } from '@workspace/my-jersey-design/components/ui/dialog';
import { Icon } from '@workspace/my-jersey-design/components/ui/icon';
import type { Commerce } from '@/hooks/use-commerce';
import { orderStatusMessage } from '@/lib/commerce';
import { FN, WA, fmt } from '@/lib/brand';
import { Notice, StorageNotice, fmtDate } from './order-ui';

type Props = { commerce: Pick<Commerce, 'drafts' | 'removeDraft' | 'storageError'>; onClose: () => void; onNewOrder: () => void };

const statusLink = (ref: string) => WA(FN, orderStatusMessage(ref));

export function TrackDialog({ commerce: c, onClose, onNewOrder }: Props) {
  const [ref, setRef] = useState('');
  const [error, setError] = useState('');

  const ask = () => {
    try { window.open(statusLink(ref), '_blank', 'noopener'); setError(''); }
    catch (e) { setError(e instanceof Error ? e.message : 'Enter your reference.'); }
  };

  return (
    <Dialog open variant="wide" icon="track" contentKey="track" onOpenChange={(o) => { if (!o) onClose(); }} title="Track your request" className="mo">
      <p className="mo-sub">Requests listed here were prepared in this browser. We can't see whether a message was sent, so production and delivery updates come from our team on WhatsApp.</p>
      <div className="tk-ask">
        <label className="mjf">Request or order reference<input value={ref} onChange={(e) => { setRef(e.target.value); setError(''); }} placeholder="MJ-2026-..." data-testid="input-track-reference" /></label>
        <Button onClick={ask} data-testid="button-track-ask"><Icon name="wa" />Ask for status</Button>
      </div>
      {error && <Notice tone="error">{error}</Notice>}
      <StorageNotice error={c.storageError} />
      {c.drafts.length ? (
        <ul className="tk" data-testid="list-drafts">
          {c.drafts.map((d) => (
            <li key={d.id} className="tk-row" data-testid={`row-draft-${d.id}`}>
              <div className="tk-main">
                <span className="mo-badge is-quiet">{d.kind === 'team' ? 'Team request' : 'Cart order'} · prepared, not confirmed</span>
                <b>{d.summary}</b>
                <code>{d.id}</code>
                <span>{fmtDate(d.createdAt)} · {d.quantity} jersey{d.quantity === 1 ? '' : 's'}{d.subtotal !== null ? ` · items ${fmt(d.subtotal)}` : ' · quote pending'}{d.designName ? ` · file: ${d.designName}` : ''}</span>
              </div>
              <div className="tk-ac">
                <Button size="small" href={statusLink(d.id)} target="_blank" rel="noopener noreferrer" data-testid={`link-status-${d.id}`}><Icon name="wa" />Ask status</Button>
                <Button variant="outline" size="small" href={WA(FN, d.message)} target="_blank" rel="noopener noreferrer"><Icon name="send" />Reopen message</Button>
                <Button variant="outline" size="small" aria-label={`Delete request ${d.id} from this device`} onClick={() => c.removeDraft(d.id)} data-testid={`button-delete-${d.id}`}><Icon name="trash" />Delete</Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mo-empty" data-testid="state-no-drafts">
          <span className="dp-ic"><Icon name="clipboard" /></span>
          <b>No requests on this device yet</b>
          <p>When you prepare a team request or cart checkout, its reference appears here so you can ask us about it later.</p>
          <Button onClick={onNewOrder}>Order for your Team <Icon name="arrow" /></Button>
        </div>
      )}
    </Dialog>
  );
}
