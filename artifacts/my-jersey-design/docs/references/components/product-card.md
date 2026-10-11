# ProductCard

Canonical source: https://github.com/atheriouslabs/myjerseywebmain/blob/1aedcc61e5c19af3e02eab22e32f322bba7eb4e2/public/index.html
Source lines: 46–53, 202. Retained source: ../repository/index.html.
Rights: the user confirmed ownership and authorized reuse; preserve agency attribution in the website.

Export: components/ui/product-card. Dependencies: Button, Tag, JerseyPreview (same chunk).
Evidence: Football and cricket collection renderer. Chunk: 1. Status: implemented.

## Source contract

```html
.cd{background:radial-gradient(ellipse at 50% 0,color-mix(in srgb,var(--gold) 9%,transparent),transparent 60%),linear-gradient(180deg,var(--card2),var(--card));border:1px solid var(--bd);border-radius:22px;padding:18px;position:relative;box-shadow:var(--sh);transition:transform .35s,border-color .35s;display:flex;flex-direction:column;gap:9px}
.cd:hover{transform:translateY(-6px);border-color:var(--bd2)}.cd .js{width:74%;margin:10px auto;transition:transform .5s cubic-bezier(.2,.8,.2,1)}.cd:hover .js{transform:scale(1.07) rotate(-2deg)}
.cd h3{font-size:18.5px}.stamp{position:absolute;top:10px;right:10px;width:62px;height:62px;transform:rotate(12deg);border-radius:50%;background:radial-gradient(circle,#15120a 58%,#0a0906);border:1.5px solid var(--gold2);box-shadow:0 0 0 3px rgba(10,9,6,.7),0 0 0 4px rgba(217,169,74,.5),0 6px 14px rgba(0,0,0,.5);display:grid;place-items:center;overflow:hidden}
.stamp img{width:86%;height:auto;margin-top:-6px}.stamp span{position:absolute;bottom:9px;font:600 5.5px Oswald,sans-serif;letter-spacing:.2em;color:var(--gold2)}
.ty{position:absolute;top:14px;left:14px;font:600 10.5px Oswald,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--ink);background:linear-gradient(180deg,var(--gold2),var(--gold));padding:3px 11px;border-radius:99px}
.sp{font-size:12.5px;color:var(--mu);display:grid;grid-template-columns:auto 1fr;gap:2px 12px}.sp b{color:var(--tx);font-weight:500}
.pr{display:flex;justify-content:space-between;align-items:center}.pr b{font:600 21px Oswald,sans-serif;color:var(--gold2)}:root[data-theme=light] .pr b{color:var(--gold3)}.tg{font-size:11px;padding:3px 10px;border-radius:99px;font-weight:600;display:inline-flex;align-items:center;gap:5px}.tg:before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor}.ok{background:rgba(98,212,46,.13);color:var(--grn)}.no{background:rgba(236,89,89,.14);color:#e65b5b}
.bt{display:flex;gap:6px;flex-wrap:wrap;margin-top:auto}.bt .b{flex:1;padding:9px 6px;white-space:nowrap}

const card=i=>{const ok=i[5],d=ok?'':'disabled';return `<div class="cd"><span class="ty">${i[1]}</span>${J(i[2],i[3],'10',i[0].split(' ')[0].toUpperCase())}<h3>${i[0]}</h3><div class="sp"><span>Quality</span><b>${i[4]>=1450?'Elite Pro':'Premium'}</b><span>Fabric</span><b>Dri-Fit Mesh</b></div><div class="pr"><b>${fmt(i[4])}</b><span class="tg ${ok?'ok':'no'}">${ok?'In stock':'Stock out'}</span></div><div class="bt"><button class="b g sm" data-a="add" data-d="${i.id}" ${d}>Add To Cart</button><button class="b o sm" data-a="czs" data-d="${i.id}">Customize</button><button class="b o sm" data-a="buy" data-d="${i.id}" ${d}>Buy Now</button></div></div>`};
```

## Public boundary

ProductCard: product {id,name,category,base,accent,price,inStock}, div DOM props, onAdd/onCustomize/onBuy callbacks receiving that product. Includes the source quality threshold (price >=1450), Dri-Fit Mesh, local BDT price formatting and three source actions. Sold-out products disable add/buy but not customize. App owns actual cart/order mutations.

## Optional photo variant (additive, not in source)

`photo?: ProductPhoto` = {src,srcSet?,sizes?,alt,width,height,label,sourceUrl,sourceName,kind?}. `kind` defaults to `reference`; use `concept` only for an explicitly labelled AI-generated design. Replaces the SVG with a contained (unstretched) image in a fixed square premium frame using verified published image dimensions. A publisher's enlarged rendition does not establish the resolution of the camera original. Load failure renders an explicit "Image unavailable" state; no SVG fallback. Badge distinguishes references from AI concepts. Caption identifies the reference/design and links to its source/full-size asset; the consuming collection must disclose that references and concepts are not verified stock photos or proof of affiliation. Actions are unchanged. Styles: `.mj-product-photo*` in scripts/source-component-styles.css.

## Runtime and fidelity

Import the generated token theme. scripts/source-component-styles.css is included by the theme template. Native CSS aliases retain the exact source colors, rgba borders, gradients, shadows, hover geometry and both original themes. Load the exact source Google Fonts URL for DM Sans, Playfair Display and Oswald. Synchronize the root dark class with data-theme. Mount IconSprite once per document. App-global IDs, product arrays, selector-based state, contact destinations and full sections stay in the app.

React DOM props and callbacks are adapters around the native source. CSS selectors and SVG IDs are namespaced to avoid collisions. No headless replacement exists in this port because no headless library exists in the source. Every implemented family has a lazily loaded story including its source variants and important states.
