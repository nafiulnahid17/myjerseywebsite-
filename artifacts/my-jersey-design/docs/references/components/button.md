# Button

Canonical source: https://github.com/atheriouslabs/myjerseywebmain/blob/1aedcc61e5c19af3e02eab22e32f322bba7eb4e2/public/index.html
Source lines: 27–31, 73, 96. Retained source: ../repository/index.html.
Rights: the user confirmed ownership and authorized reuse; preserve agency attribution in the website.

Export: components/ui/button. Dependencies: Icon (same chunk).
Evidence: Buttons, CTA anchors, icon buttons and filter chips throughout the page. Chunk: 1. Status: implemented.

## Source contract

```html
.ha{display:flex;gap:8px}.ib{width:42px;height:42px;border-radius:50%;border:1px solid var(--bd);background:linear-gradient(160deg,var(--card2),var(--card));color:var(--tx);cursor:pointer;position:relative;display:grid;place-items:center;transition:border-color .2s,transform .2s}.ib:hover{border-color:var(--gold);color:var(--gold2);transform:translateY(-1px)}
.ib b{position:absolute;top:-4px;right:-4px;background:linear-gradient(135deg,var(--gold2),var(--gold));color:var(--ink);font:700 10px/17px 'DM Sans';min-width:17px;padding:0 4px;border-radius:99px;box-shadow:0 0 0 2px var(--bg)}#hb{display:none}
.b{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:13px 24px;border-radius:99px;font:600 14px 'DM Sans',sans-serif;text-decoration:none;border:1px solid var(--gold);cursor:pointer;transition:transform .2s,box-shadow .2s,background .2s;text-align:center}
.g{background:linear-gradient(180deg,var(--gold2),var(--gold) 55%,var(--gold3));color:var(--ink);border-color:rgba(255,230,160,.6);box-shadow:0 1px 0 rgba(255,255,255,.45) inset,0 -2px 0 rgba(0,0,0,.18) inset}.o{background:transparent;color:var(--gold2)}:root[data-theme=light] .o{color:var(--gold3)}.o:hover{background:color-mix(in srgb,var(--gold) 10%,transparent)}
.b:hover{transform:translateY(-2px);box-shadow:0 12px 28px -10px rgba(217,169,74,.55)}.b[disabled]{opacity:.32;pointer-events:none}.sm{padding:9px 13px;font-size:12px}.b .i{width:17px;height:17px}

.ch{display:flex;gap:8px;flex-wrap:wrap}.c{padding:7px 16px;border-radius:99px;border:1px solid var(--bd);background:none;color:var(--mu);cursor:pointer;font:500 13px 'DM Sans';transition:.2s}.c:hover{color:var(--tx);border-color:var(--bd2)}.c.a{background:linear-gradient(180deg,var(--gold2),var(--gold));color:var(--ink);border-color:var(--gold)}

:focus-visible{outline:2px solid var(--gold);outline-offset:2px}
```

## Public boundary

Button: native button attributes, primary/outline/icon/filter variant, default/small size, active filter state, optional href/target/rel. Button disabled is native; anchor disabled uses aria-disabled, removes keyboard activation, and guards callbacks. Custom props are boundary adapters; source classes and behavior are preserved. Native events bubble to app-owned data-a delegation if needed. Source count badge can be passed as a b child to icon buttons.

## Runtime and fidelity

Import the generated token theme. scripts/source-component-styles.css is included by the theme template. Native CSS aliases retain the exact source colors, rgba borders, gradients, shadows, hover geometry and both original themes. Load the exact source Google Fonts URL for DM Sans, Playfair Display and Oswald. Synchronize the root dark class with data-theme. Mount IconSprite once per document. App-global IDs, product arrays, selector-based state, contact destinations and full sections stay in the app.

React DOM props and callbacks are adapters around the native source. CSS selectors and SVG IDs are namespaced to avoid collisions. No headless replacement exists in this port because no headless library exists in the source. Every implemented family has a lazily loaded story including its source variants and important states.
