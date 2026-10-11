# DisplayTitle

Source: artifacts/my-jersey/src/pages/home.tsx, lines 142–147, 213–215, 225–226, 246–248. Shared CSS: artifacts/my-jersey/src/index.css (fonts, gold-text, reduced-motion rules). Local workspace ownership; no external code license required.

Dependencies: Native heading and inline emphasis. Public package export: components/ui/display-title.

Evidence: Hero plus three supporting section headings.

```tsx
          <h1 className="font-display leading-[0.92]" data-testid="text-hero-title">
            <span className="reveal-line"><span className="text-[clamp(2.4rem,6.5vw,5.8rem)] font-medium text-[#f4ead2]">Welcome to</span></span>
            <span className="reveal-line pb-3"><span className="gold-text text-[clamp(3.6rem,12vw,10.5rem)] font-bold italic">My Jersey</span></span>
          </h1>
          <p className="fade-up mt-4 flex items-center gap-4 text-[clamp(1rem,2vw,1.35rem)] font-extrabold uppercase tracking-[0.42em] text-[#f4ead2]" data-testid="text-hero-tagline">
            Crafted for Champions <span className="hidden h-[3px] w-16 bg-[#a3e635] sm:block" aria-hidden />

              <h2 className="font-display text-[clamp(2.2rem,5.4vw,4.8rem)] leading-[1.02]">
                The street was always the <em className="gold-text">first stadium.</em>
              </h2>

            <div className="flex items-end justify-between gap-6">
              <h2 className="font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-none">The <em className="gold-text">craft</em></h2>

            <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,5vw,4.4rem)] leading-[1.02]">
              Same street. Same light. <em className="gold-text">Your colours next.</em>
            </h2>
```

Port contract: extract the existing native element and its source styling into a reusable wrapper. Keep standard DOM props, href/click handling, keyboard behavior and children; do not move product routing or playback state into this package. Hardcoded source colors map to generated theme roles; the original decorative gold gradient is retained as an effect token. Added focus-visible and disabled states are explicitly accessibility adaptations, not states documented by the source. Light mode is derived.

Variants: h1/h2/h3 semantic heading; plain or gold italic emphasis.
