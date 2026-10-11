import type { AnchorHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: 'navigation' | 'underlined' };

export function TextLink({ className, variant = 'navigation', ...props }: TextLinkProps) {
  return <a {...props} className={cn('inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transition-none',
    variant === 'navigation' ? 'text-foreground/75 hover:text-primary' : 'border-b border-primary pb-1 text-primary hover:text-foreground', className)} />;
}
