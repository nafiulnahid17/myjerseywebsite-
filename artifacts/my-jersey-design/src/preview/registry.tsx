import { lazy, type ComponentType } from 'react';
import { OverviewPage, ColorsPage, FontsPage, LayoutPage, BrandPage, MotionPage } from './foundations';
export type Entry = { id: string; name: string; description: string; Page: ComponentType };
export type NavGroup = { name: string; entries: Entry[] };
export const DESIGN_SYSTEM = { title: 'My Jersey Design System', description: 'Extracted from the cinematic My Jersey website: warm black, gold, street-football green, editorial type and four reusable brand primitives.' };
export const OVERVIEW_ENTRY: Entry = { id: 'overview', name: 'Overview', description: 'The complete extracted brand system. Existing website screens are unchanged.', Page: OverviewPage };
export const NAV_GROUPS: NavGroup[] = [
 { name: 'Brand', entries: [{id:'brand-wordmark',name:'Wordmark & imagery',description:'The original typographic mark and realistic campaign imagery.',Page:BrandPage}] },
 { name: 'Colors', entries: [{id:'colors',name:'Palette & themes',description:'Source-matched dark roles and a derived light alternative.',Page:ColorsPage}] },
 { name: 'Fonts', entries: [{id:'fonts',name:'Families & hierarchy',description:'Bodoni Moda, Archivo and JetBrains Mono.',Page:FontsPage}] },
 { name: 'Layout', entries: [{id:'layout',name:'Spacing & geometry',description:'Spacing, pill CTAs, content width and surfaces.',Page:LayoutPage}] },
 { name: 'Components', entries: [
  {id:'component-wordmark',name:'BrandWordmark',description:'Full lockup and compact MJ mark.',Page:lazy(()=>import('./demos/brand-wordmark'))},
  {id:'component-action-link',name:'ActionLink',description:'The primary campaign CTA, native link and disabled adaptation.',Page:lazy(()=>import('./demos/action-link'))},
  {id:'component-text-link',name:'TextLink',description:'Navigation and underlined links.',Page:lazy(()=>import('./demos/text-link'))},
  {id:'component-display-title',name:'DisplayTitle',description:'Semantic headings and gold italic emphasis.',Page:lazy(()=>import('./demos/display-title'))}
 ] },
 { name:'Motion', entries:[{id:'motion',name:'Campaign behavior',description:'Real footage, delayed brand reveal and reduced motion.',Page:MotionPage}] }
];
export const ALL_ENTRIES = [OVERVIEW_ENTRY, ...NAV_GROUPS.flatMap(group=>group.entries)];
if (new Set(ALL_ENTRIES.map(entry=>entry.id)).size !== ALL_ENTRIES.length) throw new Error('Duplicate design system page IDs');
