/** Original repository assets, served by basename from the API. */
export const media = (name: string) => `${import.meta.env.BASE_URL}api/brand-media/${name}`;
export const srcset2 = (stem: string, large = 2048) => `${media(stem + '-768.webp')} 768w, ${media(stem + '.webp')} ${large}w`;
export const FN = '01607051027';
export const pad = (i: number) => String(i + 1).padStart(2, '0');
export const fmt = (n: number) => '৳' + n.toLocaleString('en-US');
export const WA = (n: string, m = '') => `https://wa.me/88${n}?text=${encodeURIComponent(m)}`;
export const GM = (a: string, s = 'Hello My Jersey') => `https://mail.google.com/mail/?view=cm&fs=1&to=${a}&su=${encodeURIComponent(s)}`;
export const designImg = (i: number, size: '640' | '1280' | '4k') => media(`design-${pad(i)}-${size}.webp`);
