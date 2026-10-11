import { useState, type FormEvent } from 'react';
import { Button } from '@workspace/my-jersey-design/components/ui/button';
import { Dialog } from '@workspace/my-jersey-design/components/ui/dialog';
import type { Commerce } from '@/hooks/use-commerce';
import { SIZES, type CustomerProfile, type JerseySize } from '@/lib/commerce';
import { Notice, StorageNotice } from './order-ui';

type Props = { commerce: Pick<Commerce, 'profile' | 'saveProfile' | 'clearProfile' | 'storageError'>; onClose: () => void };

export function ProfileDialog({ commerce: c, onClose }: Props) {
  const [form, setForm] = useState<CustomerProfile>({ ...c.profile });
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const set = (patch: Partial<CustomerProfile>) => { setForm({ ...form, ...patch }); setSaved(false); setError(''); };

  const save = (e: FormEvent) => {
    e.preventDefault();
    try { c.saveProfile(form); setSaved(true); setError(''); }
    catch (err) { setError(err instanceof Error ? err.message : 'Check your details.'); setSaved(false); }
  };

  return (
    <Dialog open variant="request" icon="user" contentKey="profile" onOpenChange={(o) => { if (!o) onClose(); }} title="Profile settings"
      description="Stored only in this browser to fill in your orders. This is not an account and nothing is sent to our server.">
      <form className="mo-form" noValidate onSubmit={save}>
        <label className="mjf">Full name<input value={form.name} onChange={(e) => set({ name: e.target.value })} autoComplete="name" data-testid="input-profile-name" /></label>
        <div className="mo-grid">
          <label className="mjf">Phone<input value={form.phone} onChange={(e) => set({ phone: e.target.value })} type="tel" autoComplete="tel" placeholder="01XXXXXXXXX" data-testid="input-profile-phone" /></label>
          <label className="mjf">Email (optional)<input value={form.email} onChange={(e) => set({ email: e.target.value })} type="email" autoComplete="email" data-testid="input-profile-email" /></label>
          <label className="mjf">Team (optional)<input value={form.team} onChange={(e) => set({ team: e.target.value })} data-testid="input-profile-team" /></label>
          <label className="mjf">Preferred size<select value={form.preferredSize} onChange={(e) => set({ preferredSize: e.target.value as JerseySize })} data-testid="select-profile-size">{SIZES.map((s) => <option key={s} value={s}>{s}</option>)}</select></label>
        </div>
        <label className="mjf">Delivery address (optional)<textarea value={form.address} onChange={(e) => set({ address: e.target.value })} autoComplete="street-address" data-testid="input-profile-address" /></label>
        {error && <Notice tone="error" testId="text-profile-error">{error}</Notice>}
        {saved && (c.storageError ? <StorageNotice error={c.storageError} /> : <Notice tone="ok" testId="text-profile-saved">Saved on this device.</Notice>)}
        {!saved && <StorageNotice error={c.storageError} />}
        <Button type="submit" data-testid="button-save-profile">Save on this device</Button>
        {confirmClear
          ? <div className="mo-row is-center"><Button variant="outline" size="small" onClick={() => { c.clearProfile(); setForm({ ...form, name: '', phone: '', email: '', address: '', team: '' }); setConfirmClear(false); setSaved(false); }} data-testid="button-confirm-clear-profile">Yes, clear profile</Button><Button variant="outline" size="small" onClick={() => setConfirmClear(false)}>Cancel</Button></div>
          : <Button variant="outline" size="small" onClick={() => setConfirmClear(true)} data-testid="button-clear-profile">Clear profile</Button>}
        <Button variant="outline" size="small" onClick={onClose}>Close</Button>
      </form>
    </Dialog>
  );
}
