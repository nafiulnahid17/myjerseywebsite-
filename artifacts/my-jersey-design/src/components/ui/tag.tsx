import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export function Tag({variant='stock',inStock=true,className,children,...props}:HTMLAttributes<HTMLSpanElement> & {variant?:'stock'|'category';inStock?:boolean}) {
  return <span {...props} className={cn(variant==='category'?'mj-type':cn('mj-tag',inStock?'mj-in-stock':'mj-out-of-stock'),className)}>
    {children ?? (inStock?'In stock':'Stock out')}
  </span>;
}
