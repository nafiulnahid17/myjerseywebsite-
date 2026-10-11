# Migrating existing My Jersey screens

Read docs/AGENTS.md and docs/consuming-web.md. Ask whether to apply the system before changing existing screens; do not treat artifact creation as migration approval.

1. Verify all four source contracts in docs/references/components/. No required brand family is pending.
2. Add the package dependency, import its styles once, and render a primitive to verify resolution.
3. Replace duplicate local theme definitions with the package theme. Retain product-specific composition CSS and video behavior.
4. Replace the inline brand lockup, CTA anchors, navigation/text links and heading styling with BrandWordmark, ActionLink, TextLink and DisplayTitle respectively.
5. Delete only the wrappers and theme rules actually superseded by these exports. The package deliberately excludes unused starter shadcn UI and bootstrap toast/tooltip providers. Keep any infrastructure still required by the app; do not remove all local UI blindly.
6. Keep app-specific content, paths, business data, navigation state and playback state in the app.
7. Typecheck and inspect mobile and desktop previews, verifying autoplay, final-frame hold, CTA destinations and reduced motion if the hero is updated.

For a canvas mockup, follow the mockup-sandbox skill: re-home under this design-system entry, update every matching frame and remove the previous file only after all references move. Never restyle an unrelated entry in place.
