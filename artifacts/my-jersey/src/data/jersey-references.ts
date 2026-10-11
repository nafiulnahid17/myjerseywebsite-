import type { ProductPhoto } from '@workspace/my-jersey-design/components/ui/product-card';
import { media } from '@/lib/brand';

/**
 * Reference images link to their publishers; generated concepts use persistent App Storage.
 * Neither is a verified photograph of My Jersey stock.
 * Dimensions describe the verified published image, not a guarantee about a camera original.
 * Responsive renditions never request a size above the verified published image.
 * Unmapped products retain their original illustration until a matching source is approved.
 */
type Reference = Omit<ProductPhoto, 'src' | 'srcSet' | 'sizes'> & {
  original: string;
  rendition: (width: number) => string;
};

function photo({ original, rendition, ...metadata }: Reference): ProductPhoto {
  const widths = [640, 1280, 2048, 3840].filter((width) => width <= metadata.width);
  if (!widths.includes(metadata.width)) widths.push(metadata.width);
  return {
    ...metadata,
    src: rendition(640),
    srcSet: widths.map((width) => `${rendition(width)} ${width}w`).join(', '),
    sizes: '(max-width: 379px) calc(100vw - 76px), (max-width: 620px) calc((100vw - 104px) / 2), (max-width: 900px) calc((100vw - 116px) / 3), 184px',
    sourceUrl: metadata.sourceUrl || original,
  };
}

function shopify(original: string) {
  return (width: number) => {
    const url = new URL(original);
    url.searchParams.set('width', String(width));
    return url.href;
  };
}

const argentina = 'https://www.prosoccer.com/cdn/shop/files/adidas-2024-25-argentina-mens-authentic-home-jersey-8448897.webp?v=1767647593';
const arsenal = 'https://www.prosoccer.com/cdn/shop/files/adidas-22-23-arsenal-away-jersey-black-2808460.webp?v=1767652755';
const united = 'https://aztecasoccer.com/cdn/shop/products/adidas-mens-manchester-united-2022-23-away-jersey-white-front.jpg?v=1660053866';
const portugal = 'https://soccerwearhouse.com/cdn/shop/files/Portugal2025HomeJerseybyPUMA_b5d78b08-99b0-4c53-8199-3a3f37b53b03.jpg?v=1736287510';
const brazil = 'https://static.nike.com/a/images/396f0d33-4440-478f-a5ab-0eef1823eaaf/CBF+M+NK+DFADV+JSY+SS+MATCH+HM.png';
const chelsea = 'https://static.nike.com/a/images/348035f1-9650-463f-be13-d87a227fcdef/CFC+M+NK+DFADV+JSY+SS+MATCH+HM.png';
const wolfsburg = 'https://fanatics.frgimages.com/vfl-wolfsburg/youth-nike-black-vfl-wolfsburg-2022/23-away-replica-jersey_pi4726000_altimages_ff_4726267-2dc47a1ca6f6cd0bbac1alt1_full.jpg?_hv=2&w=3000';
const india = 'https://assets.adidas.com/images/124b3992b86b4188a07a2a0c9fca1042_9366/INDIA_CRICKET_ODI_JERSEY_MEN_Blue_IW9429_01_laydown.jpg';
const australia = 'https://images.asics.com/is/image/asics/2112A339_750_GF_FT_AOP?wid=3000&hei=3000&qlt=95';
const mumbai = 'https://images.skechers.com/image/TP0293ID_RNVL';
const chennai = 'https://playr.in/cdn/shop/files/Untitled-2_1_a6754888-d5b4-4f79-b491-6fdfcf55b429.jpg?v=1774446124';
const sriLanka = 'https://www.pettahstreet.co.uk/cdn/shop/files/MCR541_FRONT.png?v=1786713364';
const hyderabad = 'https://topcricketstore.com/cdn/shop/files/rn-image_picker_lib_temp_b4a1b0ee-c1db-4a62-bbc3-9d9e2200c7d7.jpg?v=1740244438';
const nike = (original: string) => (width: number) => original.replace('/a/images/', `/a/images/c_limit,w_${width},f_auto,q_auto/`);

/** High-quality 1024px AI originals exported at 4K; never described as native 4K photography. */
function concept(id: string, alt: string): ProductPhoto {
  const image = (width: number) => media(`jersey-concept-${id}-${width}.webp`);
  return {
    kind: 'concept',
    src: image(640),
    srcSet: [640, 1280, 3840].map((width) => `${image(width)} ${width}w`).join(', '),
    sizes: '(max-width: 379px) calc(100vw - 76px), (max-width: 620px) calc((100vw - 104px) / 2), (max-width: 900px) calc((100vw - 116px) / 3), 184px',
    width: 3840,
    height: 3840,
    alt,
    label: 'AI-generated design concept',
    sourceUrl: image(3840),
    sourceName: '4K concept (upscaled)',
  };
}

export const JERSEY_REFERENCES: Partial<Record<string, ProductPhoto>> = {
  fb0: concept('fb0', 'AI-generated Bangladesh Fan Edition football jersey: emerald green, crimson neck and sleeve cuffs, premium woven fabric'),
  fb1: photo({ original: argentina, rendition: shopify(argentina), width: 2048, height: 2048, label: 'Argentina home reference', alt: 'Adidas Argentina sky-blue and white home jersey, official-kit reference photograph', sourceName: 'ProSoccer', sourceUrl: argentina }),
  fb2: photo({ original: brazil, rendition: nike(brazil), width: 2880, height: 3600, label: 'Brazil home reference', alt: 'Yellow Brazil home football jersey with green trim, photographed on a model by Nike', sourceName: 'Nike', sourceUrl: brazil }),
  fb3: photo({ original: arsenal, rendition: shopify(arsenal), width: 2000, height: 2000, label: 'Arsenal away · style reference', alt: 'Black and gold Arsenal away jersey, colour reference for the custom Dhaka Strikers design', sourceName: 'ProSoccer', sourceUrl: arsenal }),
  fb4: photo({ original: united, rendition: shopify(united), width: 2000, height: 2000, label: 'Man United away · style reference', alt: 'White Manchester United away jersey with black trim, style reference for Metro United Away', sourceName: 'Azteca Soccer', sourceUrl: united }),
  fb5: photo({ original: portugal, rendition: shopify(portugal), width: 2000, height: 2000, label: 'Portugal home reference', alt: 'Red Puma Portugal home football jersey with green neck trim', sourceName: 'Soccer Wearhouse', sourceUrl: portugal }),
  fb6: photo({ original: chelsea, rendition: nike(chelsea), width: 2880, height: 3600, label: 'Chelsea home · style reference', alt: 'Royal-blue Chelsea home football jersey, photographed by Nike; style reference for Royal Blues FC', sourceName: 'Nike', sourceUrl: chelsea }),
  fb7: photo({ original: wolfsburg, rendition: (width) => wolfsburg.replace('w=3000', `w=${width}`), width: 3000, height: 3000, label: 'Wolfsburg away · style reference', alt: 'Dark Wolfsburg away jersey with bright green details, style reference for Night Wolves FC', sourceName: 'Fanatics', sourceUrl: wolfsburg }),
  cr0: concept('cr0', 'AI-generated Bangladesh Tigers ODI cricket jersey: emerald green polo collar, crimson side panels and subtle tiger-pattern fabric'),
  cr1: photo({ original: india, rendition: (width) => india.replace('/images/', `/images/w_${width},f_auto,q_auto/`), width: 2400, height: 2400, label: 'India ODI reference', alt: 'Official Adidas photograph of the blue India ODI cricket jersey', sourceName: 'adidas', sourceUrl: 'https://www.adidas.co.in/india-cricket-odi-jersey-men/IW9429.html' }),
  cr2: photo({ original: australia, rendition: (width) => australia.replace('wid=3000&hei=3000', `wid=${width}&hei=${width}`), width: 3000, height: 3000, label: 'Australia ODI reference', alt: 'Yellow Asics Australia ODI cricket shirt with green collar details', sourceName: 'ASICS', sourceUrl: australia }),
  cr3: photo({ original: mumbai, rendition: (width) => mumbai.replace('/image/', `/image;width=${width},format=auto/`), width: 4150, height: 3675, label: 'Mumbai Indians · IPL reference', alt: 'Royal-blue Skechers Mumbai Indians IPL jersey with gold detailing', sourceName: 'Skechers', sourceUrl: mumbai }),
  cr4: photo({ original: chennai, rendition: shopify(chennai), width: 2000, height: 2000, label: 'Chennai Super Kings · IPL reference', alt: 'Yellow Chennai Super Kings authentic match jersey from licensed merchandise partner playR', sourceName: 'playR', sourceUrl: chennai }),
  cr5: concept('cr5', 'AI-generated Dhaka cricket jersey: rich crimson red, black polo collar, white detailing and subtle architectural fabric pattern'),
  cr6: concept('cr6', 'AI-generated Sylhet cricket jersey: deep forest green, gold collar trim, golden lettering and subtle tea-leaf fabric texture'),
  cr7: photo({ original: sriLanka, rendition: shopify(sriLanka), width: 2133, height: 3200, label: 'Sri Lanka ODI reference', alt: 'Navy-blue Moose Sri Lanka ODI cricket jersey with yellow collar', sourceName: 'Pettah Street', sourceUrl: sriLanka }),
  cr8: photo({ original: hyderabad, rendition: shopify(hyderabad), width: 3072, height: 4080, label: 'Sunrisers Hyderabad · IPL reference', alt: 'Orange and black Sunrisers Hyderabad player jersey, reference for the Orange Blaze custom style', sourceName: 'TopCricketStore', sourceUrl: hyderabad }),
  cr9: concept('cr9', 'AI-generated Chattogram cricket jersey: midnight navy blue, refined gold polo collar edging and tonal wave-inspired fabric'),
};

export const getJerseyReference = (id: string): ProductPhoto | undefined => JERSEY_REFERENCES[id];
