const base = import.meta.env.BASE_URL;
export const HERO_POSTER = `${base}api/hero-media/poster.jpg`;
export const HERO_VIDEO = `${base}api/hero-media/cinematic.webm`;
export const HERO_BACKGROUND_4K = `${base}api/hero-media/background-4k.jpg`;
// The generated film fractures the window around 4s; shards clear around 5s.
export const HERO_REVEAL_SECONDS = 5.5;
