import { useEffect, useRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export type ToastProps = Omit<HTMLAttributes<HTMLDivElement>,'children'> & {
  open: boolean;
  message: string;
  onOpenChange: (open: boolean) => void;
  duration?: number;
  eventKey?: string | number;
};

/** Source 1800ms confirmation, controlled by the consuming application. */
export function Toast({open,message,onOpenChange,duration=1800,eventKey,className,...props}:ToastProps) {
  const change=useRef(onOpenChange);
  useEffect(()=>{change.current=onOpenChange;},[onOpenChange]);
  useEffect(()=>{
    if(!open)return;
    const timer=setTimeout(()=>change.current(false),duration);
    return ()=>clearTimeout(timer);
  },[open,message,duration,eventKey]);
  return <div {...props} className={cn('mj-toast',open && 'is-visible',className)}
    role="status" aria-live="polite" aria-hidden={!open}>{message}</div>;
}
