# Tag

Canonical source: https://github.com/atheriouslabs/myjerseywebmain/blob/1aedcc61e5c19af3e02eab22e32f322bba7eb4e2/public/index.html
Source lines: 50–52. Retained source: ../repository/index.html.
Rights: the user confirmed ownership and authorized reuse; preserve agency attribution in the website.

Export: components/ui/tag. Dependencies: None.
Evidence: Category and inventory state in every collection card. Chunk: 1. Status: implemented.

## Source contract

```html
.ty{position:absolute;top:14px;left:14px;font:600 10.5px Oswald,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--ink);background:linear-gradient(180deg,var(--gold2),var(--gold));padding:3px 11px;border-radius:99px}
.sp{font-size:12.5px;color:var(--mu);display:grid;grid-template-columns:auto 1fr;gap:2px 12px}.sp b{color:var(--tx);font-weight:500}
.pr{display:flex;justify-content:space-between;align-items:center}.pr b{font:600 21px Oswald,sans-serif;color:var(--gold2)}:root[data-theme=light] .pr b{color:var(--gold3)}.tg{font-size:11px;padding:3px 10px;border-radius:99px;font-weight:600;display:inline-flex;align-items:center;gap:5px}.tg:before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor}.ok{background:rgba(98,212,46,.13);color:var(--grn)}.no{background:rgba(236,89,89,.14);color:#e65b5b}
```

## Public boundary

Tag: stock/category variant, inStock boolean, optional children and span DOM props. Category positioning requires a positioned parent. Stock labels and dots use exact source CSS.

## Runtime and fidelity

Import the generated token theme. scripts/source-component-styles.css is included by the theme template. Native CSS aliases retain the exact source colors, rgba borders, gradients, shadows, hover geometry and both original themes. Load the exact source Google Fonts URL for DM Sans, Playfair Display and Oswald. Synchronize the root dark class with data-theme. Mount IconSprite once per document. App-global IDs, product arrays, selector-based state, contact destinations and full sections stay in the app.

React DOM props and callbacks are adapters around the native source. CSS selectors and SVG IDs are namespaced to avoid collisions. No headless replacement exists in this port because no headless library exists in the source. Every implemented family has a lazily loaded story including its source variants and important states.
