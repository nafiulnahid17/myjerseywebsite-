# BrandWordmark

Source: artifacts/my-jersey/src/pages/home.tsx, lines 23–29, 257. Shared CSS: artifacts/my-jersey/src/index.css (fonts, gold-text, reduced-motion rules). Local workspace ownership; no external code license required.

Dependencies: Native span typography. Public package export: components/ui/brand-wordmark.

Evidence: Brand mark in the persistent navigation and footer.

```tsx
        <a href="#top" className="flex items-center gap-3" data-testid="link-home">
          <span className="font-display text-3xl italic font-bold gold-text leading-none">MJ</span>
          <span className="leading-tight">
            <span className="block text-[13px] font-extrabold tracking-[0.22em]">MY JERSEY</span>
            <span className="block font-mono text-[9px] tracking-[0.3em] text-[#c9a65a]/80">WEAR YOUR IDENTITY</span>
          </span>
        </a>

          <span className="font-display text-xl italic gold-text">My Jersey</span>
```

Port contract: extract the existing native element and its source styling into a reusable wrapper. Keep standard DOM props, href/click handling, keyboard behavior and children; do not move product routing or playback state into this package. Hardcoded source colors map to generated theme roles; the original decorative gold gradient is retained as an effect token. Added focus-visible and disabled states are explicitly accessibility adaptations, not states documented by the source. Light mode is derived.

Variants: navigation lockup and compact MJ mark; genuine source typographic mark, not an invented image logo.
