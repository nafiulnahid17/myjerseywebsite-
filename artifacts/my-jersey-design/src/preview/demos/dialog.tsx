import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Dialog } from '../../components/ui/dialog';

type Mode='default'|'wide'|'request';
export default function DialogDemo() {
  const [mode,setMode]=useState<Mode>('default');
  const [open,setOpen]=useState(()=>{
    if(typeof window==='undefined')return false;
    return new URLSearchParams(window.location.search).get('dialog')==='default';
  });
  const [status,setStatus]=useState('No request or order is sent from this preview.');
  const show=(variant:Mode)=>{setMode(variant);setOpen(true);};
  return <div className="space-y-6">
    <div className="flex flex-wrap gap-3">
      <Button onClick={()=>show('default')}>Open default dialog</Button>
      <Button variant="outline" onClick={()=>show('wide')}>Open wide preview</Button>
      <Button variant="outline" onClick={()=>show('request')}>Open request shell</Button>
    </div>
    <p className="text-sm text-muted-foreground">Default 400px, request 460px and wide 880px source shells. Escape, backdrop click and Close dismiss the dialog. Tab stays inside; closing restores focus to the trigger.</p>
    <p role="status" className="text-sm text-muted-foreground">{status}</p>
    <Dialog open={open} onOpenChange={setOpen} variant={mode}
      title={mode==='wide'?'No. 01 · Black & Gold Football Kit':mode==='request'?'Get your design now':'Your cart is empty'}
      description={mode==='default'?'Add a jersey from the collections.':undefined}
      icon={mode==='default'?'cart':mode==='request'?'pen':undefined}>
      {mode==='wide' && <>
        <img src={import.meta.env.BASE_URL+'source-creations/design-01-1280.webp'} width={1280} height={1280} alt="Black and gold jersey AI design preview"/>
        <p>Source AI concept mockup, not a photo of a produced jersey. Final artwork is confirmed before production.</p>
      </>}
      {mode==='request' && <form onSubmit={event=>{event.preventDefault();setStatus('Preview quantity validated. No request sent.');setOpen(false);}} className="mt-4 space-y-4 text-left">
        <label className="block text-xs uppercase tracking-wider text-muted-foreground">Quantity
          <input autoComplete="off" type="number" required min={1} max={500} aria-label="Quantity" placeholder="15"
            style={{display:'block',width:'100%',marginTop:5,background:'var(--bg2)',border:'1px solid var(--bd)',color:'var(--tx)',borderRadius:12,padding:11,font:'14px DM Sans, sans-serif'}}/>
        </label>
        <Button type="submit">Check preview quantity</Button>
      </form>}
      <Button variant="outline" onClick={()=>setOpen(false)}>Close</Button>
    </Dialog>
  </div>;
}
