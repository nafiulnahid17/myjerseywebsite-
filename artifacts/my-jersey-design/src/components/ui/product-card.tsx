import { useEffect, useState, type HTMLAttributes } from 'react';
import { Button } from './button';
import { Tag } from './tag';
import { JerseyPreview } from './jersey-preview';
import { cn } from '../../lib/utils';

export type JerseyProduct = {id:string;name:string;category:string;base:string;accent:string;price:number;inStock:boolean};
/** Reference photography or explicitly labelled AI concepts, with verified image dimensions. */
export type ProductPhoto = {src:string;srcSet?:string;sizes?:string;alt:string;width:number;height:number;label:string;sourceUrl:string;sourceName:string;kind?:'reference'|'concept'};
export type ProductCardProps = HTMLAttributes<HTMLDivElement> & {
  product:JerseyProduct;
  /** When provided, replaces the drawn SVG jersey. A failed load shows an explicit unavailable state (never the SVG). */
  photo?:ProductPhoto;
  onAdd?:(product:JerseyProduct)=>void;
  onCustomize?:(product:JerseyProduct)=>void;
  onBuy?:(product:JerseyProduct)=>void;
};

function ProductPhotoFigure({photo}:{photo:ProductPhoto}) {
  const [state,setState]=useState<'loading'|'loaded'|'error'>('loading');
  useEffect(()=>setState('loading'),[photo.src]);
  return <figure className="mj-product-photo">
    <div className="mj-product-photo-frame" data-state={state}>
      {state==='error'
        ? <div className="mj-product-photo-missing" role="img" aria-label={'Image unavailable: '+photo.alt}><b>Image unavailable</b><span>Image could not be loaded</span></div>
        : <img src={photo.src} srcSet={photo.srcSet} sizes={photo.sizes} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async"
            data-loaded={state==='loaded'} onLoad={()=>setState('loaded')} onError={()=>setState('error')}/>}
      <span className="mj-product-photo-badge" aria-hidden="true">{photo.kind==='concept'?'AI concept':'Reference'}</span>
    </div>
    <figcaption>{photo.label}<br/><a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`View jersey reference source: ${photo.sourceName}`}>{photo.sourceName} ↗</a></figcaption>
  </figure>;
}

export function ProductCard({product:p,photo,onAdd,onCustomize,onBuy,className,...props}:ProductCardProps) {
  return <div {...props} className={cn('mj-product-card',className)} data-media={photo?'photo':'svg'}>
    <Tag variant="category">{p.category}</Tag>
    {photo ? <ProductPhotoFigure photo={photo}/> : <JerseyPreview base={p.base} accent={p.accent} number="10" name={p.name.split(' ')[0].toUpperCase()}/>}
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
