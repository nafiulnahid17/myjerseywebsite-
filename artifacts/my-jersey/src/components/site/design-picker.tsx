import { useEffect, useRef, useState } from 'react';
import { Button } from '@workspace/my-jersey-design/components/ui/button';
import { Icon } from '@workspace/my-jersey-design/components/ui/icon';
import { ALL, CREATIONS } from '@/data/catalog';
import { MAX_DESIGN_BYTES, validateDesignFile } from '@/lib/design-file';
import { pad } from '@/lib/brand';
import { Notice } from './order-ui';

/** '' or 'c' custom, 'd:<index>' studio design, 'p:<product id>' ready collection. */
export function referenceLabel(sel: string) {
  if (sel.startsWith('d:')) { const i = Number(sel.slice(2)); const c = CREATIONS[i]; if (c) return `No. ${pad(i)} · ${c[0]} (ref design-${pad(i)})`; }
  if (sel.startsWith('p:')) { const p = ALL[sel.slice(2)]; if (p) return `Ready collection: ${p.name} (ref ${p.id})`; }
  return 'Custom design';
}

const kb = (n: number) => (n > 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);

type Props = { sel: string; onSel: (s: string) => void; file: File | null; onFile: (f: File | null) => void };

export function DesignPicker({ sel, onSel, file, onFile }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const isImage = !!file && file.type.startsWith('image/');

  useEffect(() => {
    if (!file || !file.type.startsWith('image/')) { setPreview(null); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const pick = async (f: File | undefined) => {
    if (!f) return;
    setChecking(true); setError('');
    const problem = await validateDesignFile(f);
    setChecking(false);
    if (input.current) input.current.value = '';
    if (problem) { setError(problem); return; }
    onFile(f);
  };

  const ready = sel.startsWith('p:') ? ALL[sel.slice(2)] : null;

  return (
    <div className="dp">
      <div className="dp-zone" data-has-file={!!file || undefined}
        onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); void pick(e.dataTransfer.files[0]); }}>
        {file ? (
          <div className="dp-file">
            <div className="dp-thumb">{isImage && preview ? <img src={preview} alt={`Local preview of ${file.name}`} /> : <Icon name="file" />}</div>
            <div className="dp-meta">
              <b data-testid="text-design-file">{file.name}</b>
              <span>{kb(file.size)} · Selected on this device, not uploaded</span>
              <div className="mo-row">
                <Button variant="outline" size="small" onClick={() => input.current?.click()} data-testid="button-replace-file">Replace</Button>
                <Button variant="outline" size="small" onClick={() => onFile(null)} data-testid="button-clear-file"><Icon name="x" />Remove</Button>
              </div>
            </div>
          </div>
        ) : (
          <button type="button" className="dp-empty" onClick={() => input.current?.click()} disabled={checking} data-testid="button-select-file">
            <span className="dp-ic"><Icon name="upload" /></span>
            <b>{checking ? 'Checking file…' : 'Select your design file'}</b>
            <span>PNG, JPEG, WebP or PDF, up to {kb(MAX_DESIGN_BYTES)}. Drag and drop works too.</span>
          </button>
        )}
        <input ref={input} type="file" hidden accept="image/png,image/jpeg,image/webp,application/pdf,.png,.jpg,.jpeg,.webp,.pdf" onChange={(e) => void pick(e.target.files?.[0])} data-testid="input-design-file" />
      </div>
      {error && <Notice tone="error">{error}</Notice>}
      <Notice>Your file stays in this browser for preview only. After you open WhatsApp, attach the same file in the chat.</Notice>
      <label className="mjf">Design direction
        <select value={sel || 'c'} onChange={(e) => onSel(e.target.value)} data-testid="select-design-reference">
          {ready && <option value={sel}>Ready: {ready.name}</option>}
          <option value="c">Custom design / designer assistance</option>
          {CREATIONS.map((c, i) => <option key={i} value={'d:' + i}>No. {pad(i)} · {c[0]}</option>)}
        </select>
      </label>
    </div>
  );
}
