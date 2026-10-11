# My Jersey – Crafted for Champions

Single-page static website for My Jersey (custom football and cricket jerseys, Bangladesh).
Built by [Atherious Labs](https://www.atheriouslabs.com).

## Structure
- `public/index.html` – the whole site (HTML, CSS, JS and images in one file)
- `public/404.html`, `public/_headers`, `public/robots.txt`
- `wrangler.jsonc` – Cloudflare static-assets config

## Deploy on Cloudflare (Git)
1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Import a repository**
2. Pick `AtheriousLabs/myjerseywebmain`
3. Build command: leave empty. Deploy command: `npx wrangler deploy`
4. Save and deploy. Add your domain under **Settings → Domains & Routes**.

## Deploy from your computer
```
npm install
npx wrangler login
npm run deploy
```

## Local preview
```
npm install
npm run dev
```

## Brand assets and display quality
- Official My Jersey logo, outlet, factory, designer and founder artwork are served locally from `public/assets/`; no image-hosting page URLs are used as image sources.
- Photos have optimized WebP variants at 768px and 2048px wide. The 2048px files are upscaled derivatives of the supplied originals, not native 2K/4K photographs. SVG jersey previews remain resolution-independent.
- The linked My Jersey logo has its baked-in checkerboard removed. Atherious Labs retains its separate agency attribution.
- Images use responsive source sets, explicit dimensions and lazy loading where appropriate.
- Every visit starts in dark mode, regardless of previous theme preferences. The light-mode toggle applies only to the current visit.
- Contact and interface icons are inline SVG; no external icon script is required.
- Product prices and availability remain static, and orders continue through WhatsApp. No database or payment backend has been added.
