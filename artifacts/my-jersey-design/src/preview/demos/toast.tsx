import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Toast } from '../../components/ui/toast';

export default function ToastDemo() {
  const [notice,setNotice]=useState({open:false,key:0});
  return <div className="space-y-6">
    <div className="mj-toast is-visible" style={{position:'relative',left:'auto',bottom:'auto',transform:'none',display:'inline-block'}} aria-hidden="true">Added to cart</div>
    <p className="text-sm text-muted-foreground">Static source appearance above. The live toast below is fixed at the bottom, politely announced and automatically hides after 1800ms. Repeated clicks reset its timer.</p>
    <Button onClick={()=>setNotice(n=>({open:true,key:n.key+1}))}>Show source toast</Button>
    <Toast open={notice.open} eventKey={notice.key} message="Added to cart" onOpenChange={open=>setNotice(n=>({...n,open}))}/>
    <p className="text-sm text-muted-foreground">Feedback demonstration only; no cart is changed.</p>
  </div>;
}
