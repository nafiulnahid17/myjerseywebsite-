import { useState } from 'react';
import { CreationCard } from '../components/ui/creation-card';
import { Dialog } from '../components/ui/dialog';
import { Toast } from '../components/ui/toast';
import { Button } from '../components/ui/button';
import { sampleCreation } from './source-samples';

/** Composed overview example, not an eagerly imported story module. */
export function CompleteSourceGallery() {
  const [open,setOpen]=useState(false);
  const [view,setView]=useState(false);
  const [notice,setNotice]=useState({open:false,key:0});
  const [status,setStatus]=useState('Component preview only — no request or order is sent.');
  const creation=sampleCreation();
  return <div className="grid items-start gap-8 lg:grid-cols-2">
    <div><p className="mb-3 text-xs text-muted-foreground">CreationCard · original repository image</p>
      <CreationCard creation={creation} onView={()=>{setView(true);setOpen(true);}}
        onCustomize={()=>setStatus('Customize callback: '+creation.name)}
        onOrder={()=>setStatus('Order callback: '+creation.name)}/>
    </div>
    <div className="space-y-6">
      <div><p className="mb-3 text-xs text-muted-foreground">Dialog · original native shell</p>
        <Button variant="outline" onClick={()=>{setView(false);setOpen(true);}}>Open source dialog</Button>
      </div>
      <div><p className="mb-3 text-xs text-muted-foreground">Toast · source presentation</p>
        <div className="mj-toast is-visible" style={{position:'relative',left:'auto',bottom:'auto',transform:'none',display:'inline-block'}} aria-hidden="true">Added to cart</div>
        <div className="mt-4"><Button size="small" onClick={()=>setNotice(n=>({open:true,key:n.key+1}))}>Show live toast</Button></div>
      </div>
      <p role="status" className="text-xs text-muted-foreground">{status}</p>
    </div>
    <Dialog open={open} onOpenChange={setOpen} variant={view?'wide':'default'} icon={view?undefined:'cart'}
      title={view?'No. 01 · '+creation.name:'Your cart is empty'}
      description={view?undefined:'Add a jersey from the collections.'}>
      {view && <><img src={import.meta.env.BASE_URL+'source-creations/design-01-1280.webp'} width={1280} height={1280} alt={creation.name+' AI concept mockup'}/><p>AI design preview. Final artwork is confirmed before production.</p></>}
      <Button variant="outline" onClick={()=>setOpen(false)}>Close</Button>
    </Dialog>
    <Toast open={notice.open} eventKey={notice.key} message="Added to cart" onOpenChange={open=>setNotice(n=>({...n,open}))}/>
  </div>;
}
