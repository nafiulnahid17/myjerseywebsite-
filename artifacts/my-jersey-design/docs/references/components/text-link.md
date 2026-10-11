# TextLink

Source: artifacts/my-jersey/src/pages/home.tsx, lines 30–35, 249–251. Shared CSS: artifacts/my-jersey/src/index.css (fonts, gold-text, reduced-motion rules). Local workspace ownership; no external code license required.

Dependencies: Native anchor. Public package export: components/ui/text-link.

Evidence: Three navigation links and the lower-section text link.

```tsx
        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#efe4cc]/75 transition-colors hover:text-[#e9c77b]" data-testid={`link-nav-${l.href.slice(1)}`}>
              {l.label}
            </a>
          ))}

            <a href="#top" className="mt-8 inline-flex items-center gap-2 border-b border-[#e9c77b] pb-1 text-[12px] font-bold uppercase tracking-[0.2em] text-[#e9c77b]" data-testid="link-back-top">
              Back to the strike
            </a>
```

Port contract: extract the existing native element and its source styling into a reusable wrapper. Keep standard DOM props, href/click handling, keyboard behavior and children; do not move product routing or playback state into this package. Hardcoded source colors map to generated theme roles; the original decorative gold gradient is retained as an effect token. Added focus-visible and disabled states are explicitly accessibility adaptations, not states documented by the source. Light mode is derived.

Variants: navigation and underlined link.
