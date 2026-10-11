import { useState } from 'react';
import { CreationCard } from '../../components/ui/creation-card';
import { Dialog } from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { sampleCreation } from '../source-samples';

export default function CreationCardDemo() {
  const [selected,setSelected]=useState<number|null>(null);
  const [status,setStatus]=useState('Demonstration only — no request or order is sent.');
  return <div className="space-y-6">
    <div className="grid max-w-4xl gap-5 sm:grid-cols-2">
      {[0,5].map(index=><CreationCard key={index} creation={sampleCreation(index)}
        onView={()=>setSelected(index)}
        onCustomize={c=>setStatus('Customize callback: '+c.name)}
        onOrder={c=>setStatus('Order callback: '+c.name)}/>)}
    </div>
    <p role="status" className="text-sm text-muted-foreground">{status}</p>
    <p className="text-sm text-muted-foreground">Original responsive images, numbered overlay, source logo, color dots and actions. The first card shows fabric details; the sixth shows the source concept fallback and reveal animation.</p>
    <Dialog open={selected!==null} onOpenChange={open=>{if(!open)setSelected(null);}} variant="wide" title={selected===null?'Design preview':sampleCreation(selected).name}>
      {selected!==null && <img src={import.meta.env.BASE_URL+'source-creations/design-'+(selected===0?'01':'06')+'-1280.webp'} width={1280} height={1280} alt={sampleCreation(selected).name+' AI concept mockup'}/>}
      <p>AI concept mockup, not a production photo. This preview uses the source 1280px image.</p>
      <Button variant="outline" onClick={()=>setSelected(null)}>Close</Button>
    </Dialog>
  </div>;
}
