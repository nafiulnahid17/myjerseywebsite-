# ActionLink

Source: artifacts/my-jersey/src/pages/home.tsx, lines 149–152. Shared CSS: artifacts/my-jersey/src/index.css (fonts, gold-text, reduced-motion rules). Local workspace ownership; no external code license required.

Dependencies: Native anchor; no headless behavior dependency. Public package export: components/ui/action-link.

Evidence: Primary CTA in the hero.

```tsx
          <div className="fade-up mt-10 flex flex-wrap gap-3">
            <a href="#story" className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#c9a65a] to-[#e9c77b] px-7 py-4 text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#0d0c09] transition-transform hover:-translate-y-0.5" data-testid="link-brand-info">
              Meet the brand <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
            </a>
```

Port contract: extract the existing native element and its source styling into a reusable wrapper. Keep standard DOM props, href/click handling, keyboard behavior and children; do not move product routing or playback state into this package. Hardcoded source colors map to generated theme roles; the original decorative gold gradient is retained as an effect token. Added focus-visible and disabled states are explicitly accessibility adaptations, not states documented by the source. Light mode is derived.

Variants: primary filled pill CTA; native anchor. Disabled is an accessibility adaptation.
