import type { SVGProps } from 'react';
import { sourceIcons } from '../../lib/source-icons';
import { studioIcons } from '../../lib/studio-icons';
import { cn } from '../../lib/utils';

export const ICON_NAMES = ['cart','sun','moon','menu','x','mail','phone','arrow','fabric','bolt','pen','truck','store','factory','wa','fb','user','upload','clipboard','send','pin','track','file','plus','minus','trash','check','lock','palette','grid'] as const;
export type IconName = typeof ICON_NAMES[number];

/** Mount once in the document; uses the repository's actual SVG symbol paths. */
export function IconSprite() {
  return <div aria-hidden="true" style={{position:'absolute',width:0,height:0,overflow:'hidden',pointerEvents:'none'}} dangerouslySetInnerHTML={{__html:sourceIcons+studioIcons}} />;
}
export function Icon({ name, className, filled, ...props }: SVGProps<SVGSVGElement> & { name: IconName; filled?: boolean }) {
  return <svg {...props} aria-hidden="true" className={cn('mj-icon',filled && 'mj-icon-filled',className)}><use href={'#mj-repo-i-'+name}/></svg>;
}
