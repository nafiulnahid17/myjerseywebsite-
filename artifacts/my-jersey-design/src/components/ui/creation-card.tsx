import type { CSSProperties, HTMLAttributes } from 'react';
import { Button } from './button';
import { cn } from '../../lib/utils';

export type JerseyCreation = {
  index: number;
  name: string;
  base: string;
  accent: string;
  image: string;
  srcSet?: string;
  sizes?: string;
  logo: string;
  details?: { fabric: string; gsm: string; quality: string };
};
export type CreationCardProps = HTMLAttributes<HTMLElement> & {
  creation: JerseyCreation;
  onView?: (creation: JerseyCreation) => void;
  onCustomize?: (creation: JerseyCreation) => void;
  onOrder?: (creation: JerseyCreation) => void;
};

/** Repository lk renderer; gallery layout and ordering remain app-owned. */
export function CreationCard({creation:c,onView,onCustomize,onOrder,className,style,...props}:CreationCardProps) {
  const number=String(c.index+1).padStart(2,'0');
  const featured=c.index<2;
  return <article {...props} className={cn('mj-creation-card',c.index>4 && 'mj-reveal',className)}
    style={{'--k':c.index-5,...style} as CSSProperties}>
    <button type="button" className="mj-creation-image" data-a="vw" data-d={c.index}
      aria-label={'View design '+c.name+' larger'} onClick={()=>onView?.(c)}>
      <img src={c.image} srcSet={c.srcSet} sizes={c.sizes ?? (featured?'(max-width:560px) 92vw, (max-width:900px) 92vw, 590px':'(max-width:560px) 92vw, (max-width:900px) 46vw, 390px')}
        width={640} height={640} loading={featured?'eager':'lazy'} decoding="async"
        alt={c.name+' jersey design preview, AI concept mockup'}/>
      <span className="mj-creation-number">No. {number}</span>
      <img className="mj-creation-logo" src={c.logo} width={768} height={256} loading="lazy" decoding="async" alt=""/>
      <span className="mj-creation-view"><i aria-hidden="true"><u style={{background:c.base}}/><u style={{background:c.accent}}/></i>View design</span>
    </button>
    <div className="mj-creation-body">
      <h3>{c.name}</h3>
      {c.details?<div className="mj-spec"><span>Fabric</span><b>{c.details.fabric}</b><span>GSM</span><b>{c.details.gsm}</b><span>Quality</span><b>{c.details.quality}</b></div>
        :<p className="mj-creation-concept">Concept design. Fabric and details confirmed with our team.</p>}
      <div className="mj-actions">
        <Button size="small" data-a="cz" data-d={c.index} onClick={()=>onCustomize?.(c)}>Customize Now</Button>
        <Button variant="outline" size="small" data-a="wo" data-d={c.index} onClick={()=>onOrder?.(c)}>Order Now</Button>
      </div>
    </div>
  </article>;
}
