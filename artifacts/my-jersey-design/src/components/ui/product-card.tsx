import type { HTMLAttributes } from 'react';
import { Button } from './button';
import { Tag } from './tag';
import { JerseyPreview } from './jersey-preview';
import { cn } from '../../lib/utils';

export type JerseyProduct = {id:string;name:string;category:string;base:string;accent:string;price:number;inStock:boolean};
export type ProductCardProps = HTMLAttributes<HTMLDivElement> & {
  product:JerseyProduct;
  onAdd?:(product:JerseyProduct)=>void;
  onCustomize?:(product:JerseyProduct)=>void;
  onBuy?:(product:JerseyProduct)=>void;
};

export function ProductCard({product:p,onAdd,onCustomize,onBuy,className,...props}:ProductCardProps) {
  return <div {...props} className={cn('mj-product-card',className)}>
    <Tag variant="category">{p.category}</Tag>
    <JerseyPreview base={p.base} accent={p.accent} number="10" name={p.name.split(' ')[0].toUpperCase()}/>
    <h3>{p.name}</h3>
    <div className="mj-spec"><span>Quality</span><b>{p.price>=1450?'Elite Pro':'Premium'}</b><span>Fabric</span><b>Dri-Fit Mesh</b></div>
    <div className="mj-price"><b>৳{p.price.toLocaleString('en-US')}</b><Tag inStock={p.inStock}/></div>
    <div className="mj-actions">
      <Button size="small" data-a="add" data-d={p.id} disabled={!p.inStock} onClick={()=>onAdd?.(p)}>Add To Cart</Button>
      <Button variant="outline" size="small" data-a="czs" data-d={p.id} onClick={()=>onCustomize?.(p)}>Customize</Button>
      <Button variant="outline" size="small" data-a="buy" data-d={p.id} disabled={!p.inStock} onClick={()=>onBuy?.(p)}>Buy Now</Button>
    </div>
  </div>;
}
