# CreationCard

Canonical source: https://github.com/atheriouslabs/myjerseywebmain/blob/1aedcc61e5c19af3e02eab22e32f322bba7eb4e2/public/index.html
Source lines: 99–105, 196. Retained source: ../repository/index.html.
Rights: the user confirmed ownership and authorized reuse; preserve agency attribution in the website.

Export: components/ui/creation-card. Dependencies: Button (earlier chunk).
Evidence: Recent-work image grid and customize/order actions. Chunk: 2. Status: pending.

## Source contract

```html
.lk{position:relative;border-radius:22px;overflow:hidden;border:1px solid var(--bd);background:#0c0c0b;box-shadow:var(--sh);transition:border-color .35s,transform .35s;display:flex;flex-direction:column}.lk:hover{border-color:var(--bd2);transform:translateY(-4px)}
.lk .im{position:relative;display:block;width:100%;aspect-ratio:1;padding:0;border:0;background:none;cursor:zoom-in;overflow:hidden}.lk .im img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 1.1s cubic-bezier(.2,.8,.2,1)}.lk:hover .im img{transform:scale(1.045)}
.lk .im:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,rgba(6,6,5,.75));pointer-events:none}
.lk .no2{position:absolute;top:14px;left:16px;z-index:1;font:600 12px Oswald,sans-serif;letter-spacing:.2em;color:var(--gold2)}.lk .im img.sl{position:absolute;top:12px;right:12px;z-index:1;width:54px;height:auto;object-fit:contain;opacity:.85;filter:drop-shadow(0 2px 6px rgba(0,0,0,.6))}
.lk .vw{position:absolute;left:16px;bottom:14px;z-index:1;font:600 10.5px Oswald,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:var(--tx);display:flex;gap:8px;align-items:center}.lk .vw i{display:inline-flex;gap:3px}.lk .vw i u{width:10px;height:10px;border-radius:50%;border:1px solid rgba(255,255,255,.4)}
.lk .bd{padding:14px 16px 16px;display:flex;flex-direction:column;gap:8px;background:linear-gradient(180deg,var(--card2),var(--card));flex:1}.lk h3{font-size:19px}.lk .sp{margin-bottom:4px}.lk .cn{font-size:12px;color:var(--mu)}
.lc-more{display:flex;justify-content:center;margin-top:30px}

const lk=(c,i)=>{const w=W[i],im=IMG(i);return `<article class="lk${i>4?' x':''}" style="--k:${i-5}"><button class="im" data-a="vw" data-d="${i}" aria-label="View design ${esc(c[0])} larger"><img src="${im}-640.webp" srcset="${im}-640.webp 640w, ${im}-1280.webp 1280w" sizes="${i<2?'(max-width:560px) 92vw, (max-width:900px) 92vw, 590px':'(max-width:560px) 92vw, (max-width:900px) 46vw, 390px'}" width="640" height="640" loading="${i<2?'eager':'lazy'}" decoding="async" alt="${esc(c[0])} jersey design preview, AI concept mockup"><span class="no2">No. ${pad(i)}</span><img class="sl" src="assets/my-jersey-logo-768.webp" width="768" height="256" loading="lazy" decoding="async" alt=""><span class="vw"><i><u style="background:${c[1]}"></u><u style="background:${c[2]}"></u></i>View design</span></button><div class="bd"><h3>${esc(c[0])}</h3>${w?`<div class="sp"><span>Fabric</span><b>${w[5]}</b><span>GSM</span><b>${w[6]}</b><span>Quality</span><b>${w[7]}</b></div>`:'<p class="cn">Concept design. Fabric and details confirmed with our team.</p>'}<div class="bt"><button class="b g sm" data-a="cz" data-d="${i}">Customize Now</button><button class="b o sm" data-a="wo" data-d="${i}">Order Now</button></div></div></article>`};
```

## Public boundary

Pending pilot approval. Preserve source image button, responsive srcset, design index, logo overlay, color dots, source details and customize/order callbacks.

## Runtime and fidelity

Import the generated token theme. scripts/source-component-styles.css is included by the theme template. Native CSS aliases retain the exact source colors, rgba borders, gradients, shadows, hover geometry and both original themes. Load the exact source Google Fonts URL for DM Sans, Playfair Display and Oswald. Synchronize the root dark class with data-theme. Mount IconSprite once per document. App-global IDs, product arrays, selector-based state, contact destinations and full sections stay in the app.

React DOM props and callbacks are adapters around the native source. CSS selectors and SVG IDs are namespaced to avoid collisions. No headless replacement exists in this port because no headless library exists in the source. Every implemented family has a lazily loaded story including its source variants and important states.
