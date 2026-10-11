import { useId, type HTMLAttributes } from 'react';
import { renderJersey } from '../../lib/source-jersey';
import { cn } from '../../lib/utils';

export type JerseyPreviewProps = HTMLAttributes<HTMLSpanElement> & { base: string; accent: string; number?: string; name?: string };

export function JerseyPreview({base,accent,number='10',name='MY JERSEY',className,...props}:JerseyPreviewProps) {
  const id=useId().replace(/[^a-zA-Z0-9_-]/g,'_');
  return <span {...props} role={props['aria-label']?'img':undefined} className={cn('mj-jersey',className)} dangerouslySetInnerHTML={{__html:renderJersey(base,accent,number,name,id)}} />;
}
