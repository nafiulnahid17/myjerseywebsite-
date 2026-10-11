# Toast

Canonical source: https://github.com/atheriouslabs/myjerseywebmain/blob/1aedcc61e5c19af3e02eab22e32f322bba7eb4e2/public/index.html
Source lines: 92, 182. Retained source: ../repository/index.html.
Rights: the user confirmed ownership and authorized reuse; preserve agency attribution in the website.

Export: components/ui/toast. Dependencies: None.
Evidence: Add-to-cart confirmation. Chunk: 2. Status: implemented.

## Source contract

```html
.ts{position:fixed;bottom:calc(22px + env(safe-area-inset-bottom,0px));left:50%;transform:translate(-50%,30px);background:linear-gradient(180deg,var(--gold2),var(--gold));color:var(--ink);padding:10px 20px;border-radius:99px;font-weight:600;font-size:14px;opacity:0;transition:.3s;z-index:120;pointer-events:none;box-shadow:0 12px 30px -10px rgba(0,0,0,.6)}.ts.s{opacity:1;transform:translate(-50%,0)}

const toast=m=>{const t=$('#ts');t.textContent=m;t.classList.add('s');clearTimeout(t._);t._=setTimeout(()=>t.classList.remove('s'),1800)};
```

## Public boundary

Toast: controlled open/onOpenChange, message, optional duration (source default 1800ms), optional eventKey and div DOM props. Supply a changing eventKey to retrigger an identical message while already open, preserving source clearTimeout/restart behavior. Callback identity changes do not reset the timer. Closing, replacement and unmount cancel stale timers. Source fixed placement, gold gradient and fade transition are preserved; status uses polite live announcements.

## Runtime and fidelity

Import the generated token theme. scripts/source-component-styles.css and scripts/source-feedback-styles.css are included by the theme template. Native CSS aliases retain the exact source colors, rgba borders, gradients, shadows, hover geometry and both original themes. Load the exact source Google Fonts URL for DM Sans, Playfair Display and Oswald. Synchronize the root dark class with data-theme. Mount IconSprite once per document. App-global IDs, product arrays, selector-based state, contact destinations and full sections stay in the app.

React DOM props and callbacks are adapters around the native source. CSS selectors and SVG IDs are namespaced to avoid collisions. No headless replacement exists in this port because no headless library exists in the source. Every implemented family has a lazily loaded story including its source variants and important states.
