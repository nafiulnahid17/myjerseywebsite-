# Icon

Canonical source: https://github.com/atheriouslabs/myjerseywebmain/blob/1aedcc61e5c19af3e02eab22e32f322bba7eb4e2/public/index.html
Source lines: 18, 110–126, 178. Retained source: ../repository/index.html.
Rights: the user confirmed ownership and authorized reuse; preserve agency attribution in the website.

Export: components/ui/icon. Dependencies: None.
Evidence: Inline SVG icons throughout navigation, CTAs and dialogs. Chunk: 1. Status: implemented.

## Source contract

```html
.i{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;flex:none;display:inline-block;vertical-align:middle}.i.f{fill:currentColor;stroke:none}

<svg style="position:absolute;width:0;height:0" aria-hidden="true">
<symbol id="i-cart" viewBox="0 0 24 24"><path d="M3 4h2.2l2.1 10.4a1.8 1.8 0 0 0 1.8 1.4h8.3a1.8 1.8 0 0 0 1.7-1.3L21 8H6.2"/><circle cx="9.5" cy="19.5" r="1.3"/><circle cx="17" cy="19.5" r="1.3"/></symbol>
<symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/></symbol>
<symbol id="i-moon" viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></symbol>
<symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h10"/></symbol>
<symbol id="i-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></symbol>
<symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/></symbol>
<symbol id="i-phone" viewBox="0 0 24 24"><path d="M5 4h3l1.5 4.5-2 1.2a11 11 0 0 0 6.8 6.8l1.2-2L20 16v3a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z"/></symbol>
<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
<symbol id="i-fabric" viewBox="0 0 24 24"><path d="M12 3 4 7v10l8 4 8-4V7z"/><path d="m4 7 8 4 8-4M12 11v10"/></symbol>
<symbol id="i-bolt" viewBox="0 0 24 24"><path d="M13 3 5 13.5h6L10 21l8-10.5h-6z"/></symbol>
<symbol id="i-pen" viewBox="0 0 24 24"><path d="m14.5 5.5 4 4L8 20H4v-4z"/><path d="m13 7 4 4"/></symbol>
<symbol id="i-truck" viewBox="0 0 24 24"><path d="M2.5 6h11v10h-11zM13.5 9.5h4l3 3.5V16h-7"/><circle cx="6.5" cy="17.5" r="1.7"/><circle cx="17" cy="17.5" r="1.7"/></symbol>
<symbol id="i-store" viewBox="0 0 24 24"><path d="M3.5 9 5 4h14l1.5 5M4 9v11h16V9M3.5 9a2.8 2.8 0 0 0 5.5 0 2.8 2.8 0 0 0 5.5 0 2.8 2.8 0 0 0 5.5 0"/><path d="M10 20v-5h4v5"/></symbol>
<symbol id="i-factory" viewBox="0 0 24 24"><path d="M3 20V10l5 3v-3l5 3v-3l5 3V4h3v16z"/><path d="M7 17h2M12 17h2M17 17h1"/></symbol>
<symbol id="i-wa" viewBox="0 0 24 24"><path class="f" fill="currentColor" stroke="none" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z"/></symbol>
<symbol id="i-fb" viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z"/></symbol>

const I=(n,c='i')=>`<svg class="${c}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
```

## Public boundary

Icon: name (one of ICON_NAMES), SVG props, optional filled/className. IconSprite: mount once per document. All 16 paths match the source sprite.

## Runtime and fidelity

Import the generated token theme. scripts/source-component-styles.css is included by the theme template. Native CSS aliases retain the exact source colors, rgba borders, gradients, shadows, hover geometry and both original themes. Load the exact source Google Fonts URL for DM Sans, Playfair Display and Oswald. Synchronize the root dark class with data-theme. Mount IconSprite once per document. App-global IDs, product arrays, selector-based state, contact destinations and full sections stay in the app.

React DOM props and callbacks are adapters around the native source. CSS selectors and SVG IDs are namespaced to avoid collisions. No headless replacement exists in this port because no headless library exists in the source. Every implemented family has a lazily loaded story including its source variants and important states.
