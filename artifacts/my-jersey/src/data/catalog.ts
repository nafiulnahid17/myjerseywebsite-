import type { JerseyProduct } from '@workspace/my-jersey-design/components/ui/product-card';

/** Featured works 01-05: [name, base, accent, number, name text, fabric, gsm, quality] */
export const WORKS: [string, string, string, string, string, string, string, string][] = [
  ['Black & Gold Football Kit', '#121212', '#d9a94a', '10', 'STRIKER', 'Dri-Fit Interlock Mesh', '170 GSM', 'Elite Pro'],
  ['Royal Cricket Jersey', '#1f4fd8', '#f5c518', '07', 'ROYALS', 'Sublimated Polyester', '150 GSM', 'Premium'],
  ['Esports Neon Jersey', '#0e0e14', '#7dff3a', '09', 'VIPER', 'Micro Mesh Stretch', '140 GSM', 'Premium'],
  ['Crimson Training Kit', '#7a0f1f', '#ffffff', '23', 'LEGEND', 'Breathable Pique', '160 GSM', 'Pro'],
  ['Club Away White Kit', '#f2f2f2', '#111111', '11', 'UNITED', 'Dri-Fit Interlock Mesh', '180 GSM', 'Elite Pro'],
];

/** Concept designs 06-25 (AI design previews). [name, base, accent] */
const MJ_CREATIONS: [string, string, string][] = [["Emerald Dynasty","#0b493b","#d9a94a"],["Arctic Pulse","#8fd3e8","#102a6b"],["Sunset United","#df6a25","#102a6b"],["Violet Reign","#582080","#d3d5e0"],["Ocean Drift","#189aab","#102a6b"],["Obsidian Pro","#121212","#b9bec7"],["Ruby Velocity","#c71935","#111111"],["Sahara Gold","#d4b58a","#463121"],["Cobalt Storm","#1f4fd8","#ffffff"],["Rose Quartz","#d39bae","#7a0f1f"],["Silver Falcons","#c9cdd3","#161616"],["Jungle Force","#4b5b37","#d9a94a"],["Coral Rush","#ef645b","#102a6b"],["Indigo Aurora","#292867","#36d5dd"],["Champagne Club","#e7dcc0","#d9a94a"],["Lime Surge","#bddd22","#111111"],["Navy Heritage","#102a6b","#d9a94a"],["Ice Phoenix","#f2f2f2","#1f6fe0"],["Copper Titans","#121212","#b87945"],["Teal Horizon","#08656d","#ffffff"]];

export const CREATIONS: [string, string, string][] = WORKS.map((w) => [w[0], w[1], w[2]] as [string, string, string]).concat(MJ_CREATIONS);

export type Product = JerseyProduct & { more: boolean };
type Row = [string, string, string, string, number, number, number];
const F: Row[] = [["Bangladesh Fan Edition","National","#0b6b3a","#d4143a",1450,1,0],["Argentina Sky Edition","National","#7fc4ee","#ffffff",1550,1,0],["Brazil Canary Edition","National","#ffd400","#0b6b3a",1550,0,0],["Dhaka Strikers","Club","#111111","#d9a94a",1250,1,0],["Metro United Away","Club","#f2f2f2","#111111",1250,1,0],["Portugal Red Edition","National","#b3122b","#0b6b3a",1500,1,1],["Royal Blues FC","Club","#1f4fd8","#ffffff",1250,1,1],["Night Wolves FC","Club","#1b1b2f","#7dff3a",1300,0,1]];
const C: Row[] = [["Bangladesh Tigers ODI","National","#0b6b3a","#d4143a",1350,1,0],["India Blue Edition","National","#1f6fe0","#ff9933",1400,1,0],["Australia Gold Edition","National","#f5c518","#0b6b3a",1400,0,0],["IPL Style Royal Blue","IPL","#1f3fbf","#ffd400",1450,1,0],["IPL Style Super Yellow","IPL","#ffd400","#1f4fd8",1450,1,0],["BPL Style Dhaka Red","BPL","#b3122b","#ffffff",1300,1,0],["BPL Style Sylhet Green","BPL","#0b6b3a","#ffd400",1300,1,0],["Sri Lanka Blue Edition","National","#1f3a8a","#f5c518",1400,1,1],["IPL Style Orange Blaze","IPL","#ff6a00","#111111",1450,1,1],["BPL Style Chattogram Navy","BPL","#102a6b","#ffd400",1300,0,1]];
const map = (k: string, rows: Row[]): Product[] => rows.map((r, n) => ({ id: k + n, name: r[0], category: r[1], base: r[2], accent: r[3], price: r[4], inStock: !!r[5], more: !!r[6] }));

export type CollectionKey = 'fb' | 'cr';
export const COLLECTIONS: Record<CollectionKey, { title: string; tags: string[]; items: Product[] }> = {
  fb: { title: 'Football', tags: ['National', 'Club'], items: map('fb', F) },
  cr: { title: 'Cricket', tags: ['National', 'IPL', 'BPL'], items: map('cr', C) },
};
export const ALL: Record<string, Product> = Object.fromEntries([...COLLECTIONS.fb.items, ...COLLECTIONS.cr.items].map((p) => [p.id, p]));

export type Person = { number: string; name: string; role: string };
export const FOUNDER: Person = { number: '01607051027', name: 'Mohidul Islam Jim', role: 'Founder & CEO' };
export const DESIGNER: Person = { number: '01321554183', name: 'Omor Faruk', role: 'Designer, My Jersey' };
export const DESIGNER_MAIL = 'omor40718@gmail.com';
export const STUDIO_MAIL = 'myjersey8980@gmail.com';
export const FACEBOOK = 'https://www.facebook.com/share/1DnanfckGm/';
