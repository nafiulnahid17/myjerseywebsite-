import { useId, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export type BrandLogoProps = HTMLAttributes<HTMLSpanElement> & {
  /** full = crest + wordmark, mark = crest only, word = wordmark only. */
  variant?: 'full' | 'mark' | 'word';
  size?: 'small' | 'default' | 'large';
  /** Show the "Crafted for Champions" line under the wordmark. */
  tagline?: boolean;
  /** Accessible name. Pass an empty string when an adjacent label already names it. */
  label?: string;
};

/** Original scalable crest: navy shield, gold interlocked MJ monogram and jersey collar. Colours come from theme tokens. */
export function BrandMark({ className, title }: { className?: string; title?: string }) {
  const id = useId().replace(/:/g, '');
  const field = `mjf${id}`, gold = `mjg${id}`;
  return <svg viewBox="0 0 64 64" fill="none" className={cn('mj-brand-mark', className)} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title || undefined} focusable="false">
    <defs>
      <linearGradient id={field} x1="0" y1="0" x2="1" y2="1"><stop offset="0" style={{ stopColor: 'var(--navy2)' }} /><stop offset="1" style={{ stopColor: 'var(--navy)' }} /></linearGradient>
      <linearGradient id={gold} x1="0" y1="0" x2="0" y2="1"><stop offset="0" style={{ stopColor: 'var(--gold-highlight)' }} /><stop offset=".55" style={{ stopColor: 'var(--gold2)' }} /><stop offset="1" style={{ stopColor: 'var(--gold)' }} /></linearGradient>
    </defs>
    <path d="M32 4 52 10.5V29c0 14.2-8.6 24.6-20 30.5C20.6 53.6 12 43.2 12 29V10.5Z" fill={`url(#${field})`} stroke={`url(#${gold})`} strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M32 8.6 48 13.7V29c0 11.6-6.7 20.4-16 25.6C22.7 49.4 16 40.6 16 29V13.7Z" stroke={`url(#${gold})`} strokeWidth=".9" opacity=".5" />
    <path d="M25.5 13.5 32 18l6.5-4.5" stroke={`url(#${gold})`} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 43V24.5l7 10.5 7-10.5V43M44 24.5v13a5.5 5.5 0 0 1-5.5 5.5H34" stroke={`url(#${gold})`} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="m32 48.6 1.7 1.7-1.7 1.7-1.7-1.7Z" fill={`url(#${gold})`} />
  </svg>;
}

/** My Jersey brand lockup. Replaces the retired green raster logo everywhere it is rendered. */
export function BrandLogo({ variant = 'full', size = 'default', tagline = true, label = 'My Jersey', className, ...props }: BrandLogoProps) {
  return <span {...props} className={cn('mj-brand', `mj-brand-${size}`, className)} role={label ? 'img' : undefined} aria-label={label || undefined} aria-hidden={label ? undefined : true}>
    {variant !== 'word' && <BrandMark />}
    {variant !== 'mark' && <span className="mj-brand-word" aria-hidden="true">
      <b>My<i>Jersey</i></b>
      {tagline && <small>Crafted for Champions</small>}
    </span>}
  </span>;
}
