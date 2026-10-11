import { useState } from 'react';
import { ProductCard, type ProductPhoto } from '../../components/ui/product-card';
import { SAMPLE_PRODUCT, SOLD_OUT_PRODUCT } from '../foundations';

// Published image dimensions are verified separately from responsive display renditions.
const INDIA_IMAGE='https://assets.adidas.com/images/124b3992b86b4188a07a2a0c9fca1042_9366/INDIA_CRICKET_ODI_JERSEY_MEN_Blue_IW9429_01_laydown.jpg';
const REFERENCE_PHOTO:ProductPhoto={src:INDIA_IMAGE.replace('/images/','/images/w_640,f_auto,q_auto/'),alt:'Blue India ODI jersey in official adidas reference photography',width:2400,height:2400,label:'India ODI reference',sourceUrl:'https://www.adidas.co.in/india-cricket-odi-jersey-men/IW9429.html',sourceName:'adidas'};
// Demo-only broken URL: shows the explicit unavailable state.
const MISSING_PHOTO:ProductPhoto={src:'/does-not-exist.jpg',alt:'Reference kit photo',width:1600,height:2000,label:'Example reference',sourceUrl:'https://example.com',sourceName:'Example source'};

export default function ProductCardDemo() {
  const [status,setStatus]=useState('Demo only — no order or cart is created.');
  return <div className="space-y-6">
    <div className="grid max-w-3xl gap-[22px] sm:grid-cols-2">
      {[SAMPLE_PRODUCT,SOLD_OUT_PRODUCT].map(product=><ProductCard key={product.id} product={product}
        onAdd={p=>setStatus('Add: '+p.name)}
        onCustomize={p=>setStatus('Customize: '+p.name)}
        onBuy={p=>setStatus('Buy: '+p.name)}/>)}
    </div>
    <h3 className="text-sm font-semibold">Reference photo and unavailable state</h3>
    <div className="grid max-w-3xl gap-[22px] sm:grid-cols-2">
      <ProductCard product={{...SAMPLE_PRODUCT,id:'reference-india',name:'India Blue Edition'}} photo={REFERENCE_PHOTO} onAdd={p=>setStatus('Add: '+p.name)} onCustomize={p=>setStatus('Customize: '+p.name)} onBuy={p=>setStatus('Buy: '+p.name)}/>
      <ProductCard product={SAMPLE_PRODUCT} photo={MISSING_PHOTO} onAdd={p=>setStatus('Add: '+p.name)} onCustomize={p=>setStatus('Customize: '+p.name)} onBuy={p=>setStatus('Buy: '+p.name)}/>
    </div>
    <p className="text-sm text-muted-foreground">Pass an optional photo prop to replace the drawn jersey with a reference photograph in a compact square frame. Use kind="concept" for AI-generated designs; its badge distinguishes them from reference photos. Failed loads show "Image unavailable", never the SVG. Captions identify the reference and link to its source.</p>
    <p role="status" className="text-sm text-muted-foreground">{status}</p>
    <p className="text-sm text-muted-foreground">The out-of-stock card disables Add To Cart and Buy Now but keeps Customize available, matching the repository.</p>
  </div>;
}
