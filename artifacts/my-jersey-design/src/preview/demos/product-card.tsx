import { useState } from 'react';
import { ProductCard } from '../../components/ui/product-card';
import { SAMPLE_PRODUCT, SOLD_OUT_PRODUCT } from '../foundations';

export default function ProductCardDemo() {
  const [status,setStatus]=useState('Demo only — no order or cart is created.');
  return <div className="space-y-6">
    <div className="grid max-w-3xl gap-[22px] sm:grid-cols-2">
      {[SAMPLE_PRODUCT,SOLD_OUT_PRODUCT].map(product=><ProductCard key={product.id} product={product}
        onAdd={p=>setStatus('Add: '+p.name)}
        onCustomize={p=>setStatus('Customize: '+p.name)}
        onBuy={p=>setStatus('Buy: '+p.name)}/>)}
    </div>
    <p role="status" className="text-sm text-muted-foreground">{status}</p>
    <p className="text-sm text-muted-foreground">The out-of-stock card disables Add To Cart and Buy Now but keeps Customize available, matching the repository.</p>
  </div>;
}
