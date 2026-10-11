import { lazy, type ComponentType } from 'react';
import { OverviewPage, ColorsPage, FontsPage, LayoutPage, BrandPage, MotionPage } from './foundations';
export type Entry = { id:string; name:string; description:string; Page:ComponentType };
export type NavGroup = { name:string; entries:Entry[] };
export const DESIGN_SYSTEM = { title:'My Jersey Design System', description:'Extracted directly from your GitHub repository: original logo, Playfair Display, DM Sans, Oswald, and the real dark and light themes.' };
export const OVERVIEW_ENTRY:Entry={id:'overview',name:'Overview',description:'Complete eight-family source-backed system. The website remains unchanged.',Page:OverviewPage};
export const NAV_GROUPS:NavGroup[]=[
 {name:'Brand',entries:[{id:'brand',name:'Original logo & source',description:'Your repository assets and source provenance.',Page:BrandPage}]},
 {name:'Colors',entries:[{id:'colors',name:'Dark & light palettes',description:'Both themes come from the original repository.',Page:ColorsPage}]},
 {name:'Fonts',entries:[{id:'fonts',name:'Original typography',description:'Playfair Display, DM Sans and Oswald.',Page:FontsPage}]},
 {name:'Layout',entries:[{id:'layout',name:'Source geometry',description:'Original spacing, radii and page width.',Page:LayoutPage}]},
 {name:'Components',entries:[
  {id:'component-icon',name:'Icon',description:'All 16 original SVG icons and sprite provider.',Page:lazy(()=>import('./demos/icon'))},
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
