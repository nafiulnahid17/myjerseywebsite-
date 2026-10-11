import { lazy, type ComponentType } from 'react';
import { OverviewPage, ColorsPage, FontsPage, LayoutPage, BrandPage, MotionPage } from './foundations';
export type Entry = { id:string; name:string; description:string; Page:ComponentType };
export type NavGroup = { name:string; entries:Entry[] };
export const DESIGN_SYSTEM = { title:'My Jersey Design System', description:'Premium studio system: original BrandLogo crest, Playfair Display, DM Sans, Oswald, a white/blue/gold light theme and a midnight navy/gold dark theme.' };
export const OVERVIEW_ENTRY:Entry={id:'overview',name:'Overview',description:'Nine component families, including the new BrandLogo, on the premium studio palette.',Page:OverviewPage};
export const NAV_GROUPS:NavGroup[]=[
 {name:'Brand',entries:[{id:'brand',name:'Brand mark & source',description:'The BrandLogo crest, wordmark and source provenance.',Page:BrandPage}]},
 {name:'Colors',entries:[{id:'colors',name:'Light & dark palettes',description:'White, blue and gold light theme; midnight navy and gold dark theme.',Page:ColorsPage}]},
 {name:'Fonts',entries:[{id:'fonts',name:'Original typography',description:'Playfair Display, DM Sans and Oswald.',Page:FontsPage}]},
 {name:'Layout',entries:[{id:'layout',name:'Source geometry',description:'Original spacing, radii and page width.',Page:LayoutPage}]},
 {name:'Components',entries:[
  {id:'component-brand-logo',name:'BrandLogo',description:'Scalable crest and wordmark lockups in three sizes.',Page:lazy(()=>import('./demos/brand-logo'))},
  {id:'component-icon',name:'Icon',description:'All 32 SVG icons and sprite provider.',Page:lazy(()=>import('./demos/icon'))},
  {id:'component-button',name:'Button',description:'Gold, outline, icon, small and filter variants.',Page:lazy(()=>import('./demos/button'))},
  {id:'component-jersey',name:'JerseyPreview',description:'Original vector jersey renderer.',Page:lazy(()=>import('./demos/jersey-preview'))},
  {id:'component-tag',name:'Tag',description:'Source category and inventory tags.',Page:lazy(()=>import('./demos/tag'))},
  {id:'component-product',name:'ProductCard',description:'Original collection card, including stock and action states.',Page:lazy(()=>import('./demos/product-card'))},
  {id:'component-creation',name:'CreationCard',description:'Original recent-work imagery, metadata, overlays and actions.',Page:lazy(()=>import('./demos/creation-card'))},
  {id:'component-dialog',name:'Dialog',description:'Default, wide and request shells; native close and focus behavior.',Page:lazy(()=>import('./demos/dialog'))},
  {id:'component-toast',name:'Toast',description:'Original timed confirmation and repeated-event handling.',Page:lazy(()=>import('./demos/toast'))}
 ]},
 {name:'Motion',entries:[{id:'motion',name:'Motion & hero constraint',description:'Preserve source motion; add only the requested hero footage.',Page:MotionPage}]}
];
export const ALL_ENTRIES=[OVERVIEW_ENTRY,...NAV_GROUPS.flatMap(group=>group.entries)];
if(new Set(ALL_ENTRIES.map(entry=>entry.id)).size!==ALL_ENTRIES.length)throw new Error('Duplicate design system page IDs');
