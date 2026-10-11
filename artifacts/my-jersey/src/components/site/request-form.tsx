import { useRef, useState, type FormEvent } from 'react';
import { Button } from '@workspace/my-jersey-design/components/ui/button';
import { Icon } from '@workspace/my-jersey-design/components/ui/icon';
import { ALL, CREATIONS } from '@/data/catalog';
import { FN, WA, pad } from '@/lib/brand';

/** Source rqOpen/rqMsg form; sel is '', 'c', 'd:<index>' or 'p:<product id>'. */
export function RequestForm({ sel, onClose }: { sel: string; onClose: () => void }) {
  const ready = sel.startsWith('p:') ? ALL[sel.slice(2)] : null;
  const [style, setStyle] = useState(sel || 'c');
  const [team, setTeam] = useState('');
  const [qty, setQty] = useState('');
  const [sizes, setSizes] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [next, setNext] = useState<string | null>(null);
  const qRef = useRef<HTMLInputElement>(null);

  const dirty = <T,>(set: (v: T) => void) => (v: T) => { set(v); setNext(null); setError(''); setInvalid(false); };

  const message = () => {
    let st: string;
    if (style.startsWith('d:')) { const i = +style.slice(2); st = `No. ${pad(i)} - ${CREATIONS[i][0]} (ref design-${pad(i)})`; }
    else if (style.startsWith('p:')) { const r = ALL[style.slice(2)]; st = `Ready collection: ${r.name} (base ${r.base}, accent ${r.accent}, ref ${r.id})`; }
    else st = 'Custom reference (I will attach my reference image here)';
    const t = team.trim(), z = sizes.trim(), d = details.trim();
    return `Hello My Jersey! I'd like a custom jersey design.\nStyle: ${st}\n${t ? 'Team/name: ' + t + '\n' : ''}Quantity: ${qty.trim()}\n${z ? 'Sizes: ' + z + '\n' : ''}${d ? 'Details: ' + d : ''}`.trim();
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const n = Number(qty.trim());
    if (!qty.trim() || !Number.isInteger(n) || n < 1 || n > 500) {
      setInvalid(true); setError('Enter a quantity between 1 and 500.'); qRef.current?.focus(); return;
    }
    setInvalid(false);
    const url = WA(FN, message());
    setNext(url);
    setError('If WhatsApp did not open, use the link below. Attach your reference image in the chat.');
    window.open(url, '_blank', 'noopener');
  };

  return (
    <form className="rq" noValidate onSubmit={submit}>
      <label>Style<select value={style} onChange={(e) => dirty(setStyle)(e.target.value)}>
        {ready && <option value={sel}>Ready: {ready.name}</option>}
        <option value="c">Custom reference (my own idea)</option>
        {CREATIONS.map((c, i) => <option key={i} value={'d:' + i}>No. {pad(i)} · {c[0]}</option>)}
      </select></label>
      <p className="nt">Attach your reference image in WhatsApp after opening the chat.</p>
      <label>Team or name<input value={team} onChange={(e) => dirty(setTeam)(e.target.value)} maxLength={40} autoComplete="off" placeholder="e.g. Rajshahi Riders FC" /></label>
      <div className="r2">
        <label>Quantity<input ref={qRef} value={qty} onChange={(e) => dirty(setQty)(e.target.value)} type="number" inputMode="numeric" min={1} max={500} step={1} required placeholder="15" aria-invalid={invalid || undefined} /></label>
        <label>Sizes (optional)<input value={sizes} onChange={(e) => dirty(setSizes)(e.target.value)} maxLength={40} autoComplete="off" placeholder="5 M, 8 L, 2 XL" /></label>
      </div>
      <label>Numbers and details (optional)<textarea value={details} onChange={(e) => dirty(setDetails)(e.target.value)} maxLength={300} placeholder="Names, numbers, colors, logo notes" /></label>
      <p className="er" role="alert">{error}</p>
      <Button type="submit"><Icon name="wa" />Get your design now</Button>
      {next && <Button variant="outline" size="small" href={next} target="_blank" rel="noopener">Open WhatsApp</Button>}
      <Button variant="outline" size="small" onClick={onClose}>Close</Button>
    </form>
  );
}
