import { useState, type FormEvent } from 'react';
import { Button } from '@workspace/my-jersey-design/components/ui/button';
import { Dialog } from '@workspace/my-jersey-design/components/ui/dialog';
import { Icon } from '@workspace/my-jersey-design/components/ui/icon';
import type { Commerce } from '@/hooks/use-commerce';
import type { OrderDraft } from '@/lib/commerce';
import { DesignPicker, referenceLabel } from './design-picker';
import { Notice, PreparedPanel, StorageNotice } from './order-ui';

export type TeamStep = 'design' | 'details' | 'review';
export type TeamForm = { sel: string; team: string; contactName: string; phone: string; email: string; quantity: string; sizes: string; details: string; remember: boolean; prepared: OrderDraft | null };
export const EMPTY_TEAM_FORM: TeamForm = { sel: 'c', team: '', contactName: '', phone: '', email: '', quantity: '', sizes: '', details: '', remember: false, prepared: null };

const STEPS: [TeamStep, string][] = [['design', 'Design'], ['details', 'Details'], ['review', 'Place order']];

type Props = {
  step: TeamStep; onStep: (s: TeamStep) => void; onClose: () => void; onTrack: () => void;
  form: TeamForm; setForm: (f: TeamForm) => void; file: File | null; onFile: (f: File | null) => void;
  commerce: Pick<Commerce, 'profile' | 'saveProfile' | 'prepareTeamOrder' | 'storageError'>;
};

export function TeamOrderDialog({ step, onStep, onClose, onTrack, form, setForm, file, onFile, commerce }: Props) {
  const [error, setError] = useState('');
  const [profileNote, setProfileNote] = useState('');
  const set = (patch: Partial<TeamForm>) => { setForm({ ...form, ...patch, prepared: null }); setError(''); };
  const idx = STEPS.findIndex(([s]) => s === step);

  const prepare = (e: FormEvent) => {
    e.preventDefault();
    setError(''); setProfileNote('');
    const quantity = Number(form.quantity.trim());
    try {
      const draft = commerce.prepareTeamOrder({
        team: form.team, contactName: form.contactName, phone: form.phone, email: form.email,
        quantity: Number.isFinite(quantity) ? quantity : 0, sizes: form.sizes, details: form.details,
        designName: file?.name ?? '', designReference: referenceLabel(form.sel),
      });
      if (form.remember) {
        try { commerce.saveProfile({ ...commerce.profile, name: form.contactName, phone: form.phone, email: form.email, team: form.team }); setProfileNote('Contact details remembered on this device.'); }
        catch (err) { setProfileNote(err instanceof Error ? err.message : 'Contact details could not be remembered.'); }
      }
      setForm({ ...form, prepared: draft });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Please check your request.');
    }
  };

  return (
    <Dialog open variant="wide" contentKey={'team-' + step + (form.prepared ? '-done' : '')} onOpenChange={(o) => { if (!o) onClose(); }}
      title="Order for your Team" className="mo">
      <p className="mo-sub">Starting from 299TK. Final quote depends on design, quantity and fabric.</p>
      <ol className="mo-steps" aria-label="Order steps">
        {STEPS.map(([s, label], i) => (
          <li key={s}><button type="button" aria-current={s === step ? 'step' : undefined} data-done={i < idx || undefined} onClick={() => onStep(s)} data-testid={`button-step-${s}`}>
            <span>{i < idx ? <Icon name="check" /> : i + 1}</span>{label}</button></li>
        ))}
        <li><button type="button" onClick={onTrack} data-testid="button-step-track"><span>4</span>Track</button></li>
      </ol>

      {step === 'design' && <>
        <DesignPicker sel={form.sel} onSel={(sel) => set({ sel })} file={file} onFile={(f) => { onFile(f); setForm({ ...form, prepared: null }); }} />
        <div className="mo-nav"><span /><Button onClick={() => onStep('details')} data-testid="button-next-details">Continue to details <Icon name="arrow" /></Button></div>
      </>}

      {step === 'details' && <form className="mo-form" noValidate onSubmit={(e) => { e.preventDefault(); onStep('review'); }}>
        <div className="mo-grid">
          <label className="mjf">Team name<input value={form.team} onChange={(e) => set({ team: e.target.value })} maxLength={80} placeholder="e.g. Rajshahi Riders FC" data-testid="input-team" /></label>
          <label className="mjf">Quantity<input value={form.quantity} onChange={(e) => set({ quantity: e.target.value })} type="number" inputMode="numeric" min={1} max={500} step={1} placeholder="15" data-testid="input-quantity" /></label>
          <label className="mjf">Contact name<input value={form.contactName} onChange={(e) => set({ contactName: e.target.value })} autoComplete="name" data-testid="input-contact-name" /></label>
          <label className="mjf">Phone<input value={form.phone} onChange={(e) => set({ phone: e.target.value })} type="tel" autoComplete="tel" placeholder="01XXXXXXXXX" data-testid="input-phone" /></label>
          <label className="mjf">Email (optional)<input value={form.email} onChange={(e) => set({ email: e.target.value })} type="email" autoComplete="email" data-testid="input-email" /></label>
          <label className="mjf">Sizes (optional)<input value={form.sizes} onChange={(e) => set({ sizes: e.target.value })} maxLength={240} placeholder="5 M, 8 L, 2 XL" data-testid="input-sizes" /></label>
        </div>
        <label className="mjf">Names, numbers and notes (optional)<textarea value={form.details} onChange={(e) => set({ details: e.target.value })} maxLength={1000} placeholder="Player names and numbers, colours, sponsor or logo notes" data-testid="input-details" /></label>
        <label className="mjf-check"><input type="checkbox" checked={form.remember} onChange={(e) => set({ remember: e.target.checked })} data-testid="checkbox-remember" />Remember my contact details on this device</label>
        <div className="mo-nav">
          <Button variant="outline" onClick={() => onStep('design')}>Back</Button>
          <Button type="submit" data-testid="button-next-review">Review request <Icon name="arrow" /></Button>
        </div>
      </form>}

      {step === 'review' && <form className="mo-form" noValidate onSubmit={prepare}>
        <dl className="mo-summary" data-testid="list-team-summary">
          <dt>Team</dt><dd>{form.team || <i>Not added</i>}</dd>
          <dt>Quantity</dt><dd>{form.quantity || <i>Not added</i>}</dd>
          <dt>Contact</dt><dd>{[form.contactName, form.phone, form.email].filter(Boolean).join(' · ') || <i>Not added</i>}</dd>
          <dt>Sizes</dt><dd>{form.sizes || 'To be confirmed'}</dd>
          <dt>Design</dt><dd>{referenceLabel(form.sel)}</dd>
          <dt>Reference file</dt><dd>{file ? `${file.name} (attach in WhatsApp)` : 'None selected'}</dd>
          {form.details && <><dt>Notes</dt><dd>{form.details}</dd></>}
        </dl>
        {error && <Notice tone="error" testId="text-team-error">{error}</Notice>}
        {profileNote && <Notice>{profileNote}</Notice>}
        <StorageNotice error={commerce.storageError} />
        {form.prepared ? <PreparedPanel draft={form.prepared} attachName={file?.name} onTrack={onTrack} /> : (
          <div className="mo-nav">
            <Button variant="outline" onClick={() => onStep('details')}>Edit details</Button>
            <Button type="submit" data-testid="button-prepare-team"><Icon name="send" />Prepare WhatsApp request</Button>
          </div>
        )}
        {form.prepared && <div className="mo-nav"><Button variant="outline" size="small" onClick={() => { onFile(null); setForm({ ...EMPTY_TEAM_FORM }); onStep('design'); }} data-testid="button-new-request">Start a new request</Button><Button variant="outline" size="small" onClick={onClose}>Close</Button></div>}
      </form>}
    </Dialog>
  );
}
