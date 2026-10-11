import type { JerseyCreation } from '../components/ui/creation-card';
const CONCEPT = ["Emerald Dynasty","#0b493b","#d9a94a"] as const;
export function sampleCreation(index=0):JerseyCreation {
 const root=import.meta.env.BASE_URL;
 const code=index===0?'01':'06';
 return {index,name:index===0?'Black & Gold Football Kit':CONCEPT[0],base:index===0?'#121212':CONCEPT[1],accent:index===0?'#d9a94a':CONCEPT[2],
 image:root+'source-creations/design-'+code+'-640.webp',srcSet:root+'source-creations/design-'+code+'-640.webp 640w, '+root+'source-creations/design-'+code+'-1280.webp 1280w',
 details:index===0?{fabric:'Dri-Fit Interlock Mesh',gsm:'170 GSM',quality:'Elite Pro'}:undefined};
}
