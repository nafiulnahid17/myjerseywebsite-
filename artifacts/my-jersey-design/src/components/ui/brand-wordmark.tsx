import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

/** The source's typographic MJ mark; not a reconstructed image logo. */
export function BrandWordmark({ compact = false, className, ...props }: HTMLAttributes<HTMLSpanElement> & { compact?: boolean }) {
  return <span {...props} className={cn('inline-flex items-center gap-3', className)}>
    <span className="jersey-metal font-serif text-3xl font-bold italic leading-none">MJ</span>
    {!compact && <span className="leading-tight">
      <span className="block text-[13px] font-extrabold tracking-[0.22em]">MY JERSEY</span>
      <span className="block font-mono text-[9px] tracking-[0.3em] text-primary/80">WEAR YOUR IDENTITY</span>
    </span>}
  </span>;
}
