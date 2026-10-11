# JerseyPreview

Canonical source: https://github.com/atheriouslabs/myjerseywebmain/blob/1aedcc61e5c19af3e02eab22e32f322bba7eb4e2/public/index.html
Source lines: 44, 179–180. Retained source: ../repository/index.html.
Rights: the user confirmed ownership and authorized reuse; preserve agency attribution in the website.

Export: components/ui/jersey-preview. Dependencies: None.
Evidence: Hero jersey previews and both ready-made collections. Chunk: 1. Status: implemented.

## Source contract

```html
.js{display:block;width:100%;filter:drop-shadow(0 28px 26px rgba(0,0,0,.55))}

const J=(a,b,n,t,at='class="js"')=>{u++;t=esc(t);n=esc(n);const fs=t.length>8?10:13,P='M62 18L24 38 4 88l32 14 14-20v136q50 12 100 0V82l14 20 32-14-20-50-38-20q-38 28-76 0z';
return `<svg viewBox="0 0 200 230" ${at} aria-hidden="true"><defs><linearGradient id="g${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".42"/></linearGradient><radialGradient id="h${u}" cx=".38" cy=".3" r=".55"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><pattern id="m${u}" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".6" fill="#000" opacity=".12"/></pattern></defs><path d="${P}" fill="${a}"/><path d="${P}" fill="url(#m${u})"/><path d="M4 88l32 14 6-9-30-14zM196 88l-32 14-6-9 30-14z" fill="${b}"/><path d="M50 82v136q10 3 18 4V70zM150 82v136q-10 3-18 4V70z" fill="${b}" opacity=".9"/><path d="M62 18q38 28 76 0l-6 10q-32 20-64 0z" fill="${b}"/><path d="M78 120q8 50 2 96M124 118q-6 52 0 98" stroke="#000" stroke-opacity=".12" stroke-width="5" fill="none" stroke-linecap="round"/><path d="${P}" fill="url(#g${u})"/><path d="${P}" fill="url(#h${u})"/><path d="${P}" fill="none" stroke="#000" stroke-opacity=".25" stroke-width="1"/><text x="100" y="108" text-anchor="middle" font-size="${fs}" font-weight="600" fill="${b}" letter-spacing="1" font-family="Oswald,Impact,sans-serif">${t}</text><text x="100" y="172" text-anchor="middle" font-size="62" font-weight="600" fill="${b}" stroke="rgba(0,0,0,.28)" font-family="Oswald,Impact,sans-serif">${n}</text></svg>`};
```

## Public boundary

JerseyPreview: base/accent colors, name/number strings, span DOM props and optional aria-label. SVG uses the exact source paths, gradients, mesh pattern and Oswald typography. Text is escaped. Stable useId namespaces replace the source global counter.

## Runtime and fidelity

Import the generated token theme. scripts/source-component-styles.css is included by the theme template. Native CSS aliases retain the exact source colors, rgba borders, gradients, shadows, hover geometry and both original themes. Load the exact source Google Fonts URL for DM Sans, Playfair Display and Oswald. Synchronize the root dark class with data-theme. Mount IconSprite once per document. App-global IDs, product arrays, selector-based state, contact destinations and full sections stay in the app.

React DOM props and callbacks are adapters around the native source. CSS selectors and SVG IDs are namespaced to avoid collisions. No headless replacement exists in this port because no headless library exists in the source. Every implemented family has a lazily loaded story including its source variants and important states.
