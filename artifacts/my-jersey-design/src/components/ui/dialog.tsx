import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Icon, type IconName } from './icon';
import { cn } from '../../lib/utils';
import { focusDialog, handleDialogKeydown } from '../../lib/dialog-runtime';

export type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  icon?: IconName;
  variant?: 'default' | 'wide' | 'request';
  children?: ReactNode;
  className?: string;
  contentKey?: string | number;
};

/** Controlled boundary for source mod/cls, without substituting a headless library. */
export function Dialog({open,onOpenChange,title,description,icon,variant='default',children,className,contentKey}:DialogProps) {
  const id=useId();
  const panel=useRef<HTMLDivElement>(null);
  const change=useRef(onOpenChange);
  useEffect(()=>{change.current=onOpenChange;},[onOpenChange]);
  useEffect(()=>{
    if(!open || !panel.current)return;
    const node=panel.current;
    const doc=node.ownerDocument;
    const trigger=doc.activeElement instanceof HTMLElement?doc.activeElement:null;
    const keydown=(event:KeyboardEvent)=>handleDialogKeydown(event,node,()=>change.current(false));
    doc.addEventListener('keydown',keydown);
    return ()=>{
      doc.removeEventListener('keydown',keydown);
      if(trigger?.isConnected)trigger.focus();
    };
  },[open]);
  useEffect(()=>{
    if(open && panel.current)focusDialog(panel.current);
  },[open,variant,contentKey]);
  if(!open || typeof document==='undefined')return null;
  return createPortal(
    <div className="mj-dialog-overlay is-open" onClick={event=>{if(event.target===event.currentTarget)change.current(false);}}>
      <div ref={panel} className={cn('mj-dialog-panel',variant==='wide' && 'mj-dialog-wide',variant==='request' && 'mj-dialog-request',className)}
        role="dialog" aria-modal="true" aria-labelledby={id+'-title'} aria-describedby={description?id+'-description':undefined} tabIndex={-1}>
        <button type="button" className="mj-dialog-close" aria-label="Close dialog" onClick={()=>change.current(false)}><Icon name="x"/></button>
        {icon && <div className="mj-dialog-icon"><Icon name={icon}/></div>}
        <h3 id={id+'-title'} style={variant==='wide'?{margin:'4px 40px 12px 4px',textAlign:'left'}:undefined}>{title}</h3>
        {description && <p id={id+'-description'}>{description}</p>}
        {children}
      </div>
    </div>,document.body,
  );
}
