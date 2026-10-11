import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export type DisplayTitleProps = HTMLAttributes<HTMLHeadingElement> & { as?: 'h1' | 'h2' | 'h3'; gold?: boolean };

export function DisplayTitle({ as: Tag = 'h2', gold = false, className, ...props }: DisplayTitleProps) {
  return <Tag {...props} className={cn('font-serif text-[clamp(2.2rem,5.4vw,4.8rem)] leading-[1.02]', gold && 'jersey-metal font-bold italic', className)} />;
}
