import type { ReactNode } from 'react';
import { Button } from '@workspace/my-jersey-design/components/ui/button';
import { Icon } from '@workspace/my-jersey-design/components/ui/icon';
import type { OrderDraft } from '@/lib/commerce';
import { FN, WA } from '@/lib/brand';

export function Notice({ tone = 'info', children, testId }: { tone?: 'info' | 'error' | 'ok'; children: ReactNode; testId?: string }) {
  return <p className={`mo-note is-${tone}`} role={tone === 'error' ? 'alert' : 'status'} data-testid={testId}>{children}</p>;
}

export function StorageNotice({ error }: { error: string | null }) {
  return error ? <Notice tone="error" testId="text-storage-error">{error}</Notice> : null;
}

export const fmtDate = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

/** Prepared request: a local message ready for WhatsApp. It is never described as sent or confirmed. */
export function PreparedPanel({ draft, attachName, onTrack }: { draft: OrderDraft; attachName?: string; onTrack?: () => void }) {
  const url = WA(FN, draft.message);
  return (
    <div className="mo-prepared" data-testid="panel-prepared">
      <div className="mo-prepared-head"><span className="mo-badge"><Icon name="check" />Prepared on this device</span><code data-testid="text-draft-reference">{draft.id}</code></div>
      <p>Your request message is ready. It is <b>not sent yet</b>: open WhatsApp and press send to reach our team. Opening WhatsApp does not confirm the order; our team confirms price, artwork, delivery and payment in the chat.</p>
      {attachName && <p className="mo-attach"><Icon name="file" />Attach <b>{attachName}</b> manually in WhatsApp. The file has not left your device.</p>}
      <div className="mo-row">
        <Button href={url} target="_blank" rel="noopener noreferrer" data-testid="link-open-whatsapp"><Icon name="wa" />Open WhatsApp to send</Button>
        {onTrack && <Button variant="outline" onClick={onTrack}><Icon name="track" />View in tracker</Button>}
      </div>
    </div>
  );
}
