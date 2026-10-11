# Dialog

Canonical source: https://github.com/atheriouslabs/myjerseywebmain/blob/1aedcc61e5c19af3e02eab22e32f322bba7eb4e2/public/index.html
Source lines: 87–89, 184, 235. Retained source: ../repository/index.html.
Rights: the user confirmed ownership and authorized reuse; preserve agency attribution in the website.

Export: components/ui/dialog. Dependencies: Icon, Button (earlier chunk).
Evidence: Lightbox, request form, cart and contact dialog shell. Chunk: 2. Status: pending.

## Source contract

```html
.md{position:fixed;inset:0;background:rgba(4,4,3,.7);backdrop-filter:blur(8px);display:none;place-items:center;z-index:99;padding:20px}.md.o{display:grid}
.mb{background:linear-gradient(180deg,var(--card2),var(--card));border:1px solid var(--bd2);border-radius:28px;padding:30px;max-width:400px;width:100%;max-height:88vh;overflow:auto;text-align:center;box-shadow:0 30px 80px -20px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.03) inset;animation:pop .3s cubic-bezier(.2,.9,.3,1.2);position:relative}@keyframes pop{from{transform:scale(.9) translateY(10px);opacity:0}}
.mb .big{width:62px;height:62px;margin:0 auto 6px;border-radius:50%;display:grid;place-items:center;border:1px solid var(--bd2);color:var(--gold2);background:radial-gradient(circle at 30% 25%,rgba(246,217,135,.2),transparent 65%)}.mb .big .i{width:28px;height:28px}.mb h3{font-size:25px;margin:6px 0}.mb p{color:var(--mu)}.mb .num{color:var(--gold2);font:600 24px Oswald,sans-serif;letter-spacing:.06em;margin:8px 0 18px}.mb .b{margin:4px}

const mod=h=>{const open=$('#md').classList.contains('o');if(!open)lastF=document.activeElement;$('#mb').classList.remove('wide','rqm');$('#mb').innerHTML=X+h;$('#md').classList.add('o');const f=$('#mb').querySelector('select,input,a,button:not(.mx)')||$('#mb');f.focus()},cls=()=>{if(!$('#md').classList.contains('o'))return;$('#md').classList.remove('o');$('#mb').classList.remove('wide','rqm');if(lastF&&lastF.focus)lastF.focus()};

document.addEventListener('keydown',e=>{if(e.key=='Escape'){cls();hbS(false)}if(e.key=='Tab'&&$('#md').classList.contains('o')){const f=[...$('#mb').querySelectorAll('a,button,input,select,textarea')];if(!f.length)return;const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement==a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement==z){e.preventDefault();a.focus()}}});
```

## Public boundary

Pending pilot approval. Preserve source backdrop blur, close button, Escape/backdrop closing, focus management, focus trap, content sizing and return focus. Dialog content/request/cart state is app-owned.

## Runtime and fidelity

Import the generated token theme. scripts/source-component-styles.css is included by the theme template. Native CSS aliases retain the exact source colors, rgba borders, gradients, shadows, hover geometry and both original themes. Load the exact source Google Fonts URL for DM Sans, Playfair Display and Oswald. Synchronize the root dark class with data-theme. Mount IconSprite once per document. App-global IDs, product arrays, selector-based state, contact destinations and full sections stay in the app.

React DOM props and callbacks are adapters around the native source. CSS selectors and SVG IDs are namespaced to avoid collisions. No headless replacement exists in this port because no headless library exists in the source. Every implemented family has a lazily loaded story including its source variants and important states.
