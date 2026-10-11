import type { AnchorHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export type ActionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { disabled?: boolean };

/** Native-anchor CTA extracted from the campaign's primary link. */
export function ActionLink({ className, disabled, children, onClick, tabIndex, ...props }: ActionLinkProps) {
  return <a {...props} tabIndex={disabled ? -1 : tabIndex} aria-disabled={disabled || undefined}
    onClick={event => { if (disabled) { event.preventDefault(); return; } onClick?.(event); }}
    className={cn('jersey-cta group inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-xs font-extrabold uppercase tracking-[0.2em] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transform-none motion-reduce:transition-none', disabled && 'pointer-events-none opacity-50', className)}>{children}</a>;
}
