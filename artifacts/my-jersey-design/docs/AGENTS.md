# My Jersey Design System

This package defines the visual language for the project. Use it whenever you
build or restyle UI so every surface looks like the same product. It is a real
workspace package (`@workspace/my-jersey-design`): other artifacts depend
on it and import its theme and components directly.

## What's here

- `tokens.json` — the single source of truth (DTCG format): colors (full light
  and dark sets), typography, spacing, and radius.
- `scripts/build-tokens.mjs` — generates the outputs below from `tokens.json`.
- `src/index.css` — GENERATED token theme (web), exported as `./styles.css`.
- `src/generated/tokens.tsx` — GENERATED hex token object, the package's `.` and
  `./tokens` entry. Mobile (Expo) and other platforms import this.
- `public/favicon.svg` — GENERATED app icon from `tokens.json` + the title.
- `src/components/ui/` — nine families: BrandLogo (BrandLogo lockup + BrandMark
  crest), Icon (including IconSprite; 16 repository icons plus 16 studio icons:
  user, upload, clipboard, send, pin, track, file, plus, minus, trash, check,
  lock, palette, grid), Button, JerseyPreview, Tag, ProductCard, CreationCard,
  Dialog and Toast. ProductCard adds an optional `photo` reference-image variant.
  CreationCard `logo` is optional and defaults to the BrandMark crest.
- Premium revision (user-directed, supersedes the repository-identical look):
  light theme is white + royal blue + gold, dark theme is midnight navy + gold.
  The green raster logo is retired from rendered branding; use BrandLogo.
  Fonts stay DM Sans, Playfair Display and Oswald.
- Studio tokens (`source.*` in tokens.json, emitted as CSS vars): `--blue`,
  `--blue2`, `--danger`, `--navy`, `--navy2`, `--wa`, `--fb`, `--glass`,
  `--page` (site background gradient), `--band`/`--band-tx`/`--band-mu`/
  `--band-bd` (premium navy feature surface, same in both themes), `--glow`,
  `--scrim`, plus `--gold-highlight`, `--gold-gradient`, `--gold-fill`.
- `scripts/studio-styles.css` — BrandLogo and studio component rules.
- `scripts/source-component-styles.css` and `scripts/source-feedback-styles.css`
  — namespaced source CSS rules. The
  theme template imports these so consuming components retain exact source
  geometry, borders, gradients, shadows and interactions.
- Mount IconSprite once per document. Theme preference persists per device
  (localStorage key `mj-theme`); with no stored choice follow the OS setting.
  App-owned theme controls synchronize the root dark class and data-theme.
- `docs/references/component-inventory.md` and
  `docs/references/components/*.md` — complete catalog and exact source evidence.
  Read the linked contract before changing any cataloged family.
- `SKILL.md` — source-derived composition notes and product direction.
- `tokens.json` also defines the decorative gold effects. The token generator
  emits them through the theme template; never edit generated CSS.
- `src/assets/` — archived original PNG logo (retired; do not render it as
  branding). `public/favicon.svg` is generated from the BrandMark geometry.
- `src/lib/` (`cn`, source jersey/icons, native dialog focus helpers) and `src/hooks/` — exported as `./lib/*` and `./hooks/*`.
- `src/App.tsx` — the entry point for the living style guide.
- `src/preview/DesignSystemBrowser.tsx` — the persistent grouped navigation,
  branded header, search, deep links, and active page shell.
- `src/preview/registry.tsx` — preview metadata (`DESIGN_SYSTEM` title,
  description) and ordered navigation. Overview comes first;
  Brand/Colors/Fonts/Layout precede Components; Content/Charts/Motion/Applied
  examples follow when applicable. Each group is a nav section whose entries
  are its nested pages. Empty optional groups stay hidden. Keep component pages
  loaded with `lazy(() => import(...))` so opening the preview does not download
  every story.
- `src/preview/foundations.tsx` — token-driven Overview, Colors, Fonts, and Layout
  pages.
- `src/preview/parts.tsx` — shared page helpers, including `Guidelines` for design
  and composition do's/don'ts (colour/component usage, hierarchy, voice and tone,
  not technical implementation notes). Populate it only with guidance derived
  from the source; omit it when the source documents no usage rules.
- `src/preview/demos/<component>.tsx` — component stories. Keep these stories and
  the registry aligned with the final web component inventory.
- `docs/consuming-web.md`, `docs/consuming-expo.md`, and
  `docs/consuming-slides.md` — platform-specific usage.
- `docs/migrating-web.md` and `docs/migrating-expo.md` — replacing scaffolded or
  existing local design-system implementations.

Every source file in this package is a `.tsx` file, including token, utility,
and hook modules with no JSX, so every export below is a single `*.tsx` glob. Do
not add `.ts` files here.

## What this package exports

```jsonc
".":              "./src/generated/tokens.tsx",
"./tokens":       "./src/generated/tokens.tsx",
"./styles.css":   "./src/index.css",
"./assets/*":     "./src/assets/*",
"./components/*": "./src/components/*.tsx",
"./lib/*":        "./src/lib/*.tsx",
"./hooks/*":      "./src/hooks/*.tsx"
```

Components import each other with relative paths internally, so they resolve
correctly when another package imports them through
`@workspace/my-jersey-design/components/...`. Never use a `@/` alias inside
this package. Components added through shadcn may use this package's
`#components/*`, `#lib/*`, and `#hooks/*` imports from `package.json`; those are
consumer-safe because they resolve against this package.

## Editing and maintaining the design system

Edit `tokens.json` only, then run `pnpm tokens`; the dev server also regenerates
on change. Never hand-edit `src/index.css` or `src/generated/tokens.tsx`.

Every user-facing web component under `src/components/ui/` must have a family
story in `src/preview/demos/` covering its variants, sizes, and important states.
Register each family once in `src/preview/registry.tsx`. If a component changes,
update its story and registry entry in the same change and note meaningful
additions or customizations in "What's here" above. Register new component pages
with dynamic imports; do not eagerly import stories into the registry.

Native components live under `src/components/native/`. Match an existing web
component family's public API wherever React Native supports it, and document
platform-required differences in "What's here". Native components are not
imported into the web-only Vite preview.

Keep `DESIGN_SYSTEM.title` and `DESIGN_SYSTEM.description` accurate. Update
`NAV_GROUPS` whenever the system gains or loses a foundation, content guideline,
chart, motion rule, or applied example.

## Keep it template-ready

This design system is a prime candidate to be saved to the workspace as a
reusable template, and a template is packaged as this one directory alone. Keep
it self-contained as you maintain it so that save works: use concrete dependency
versions (never `catalog:`), keep `tsconfig.json` standalone (never `extends` a
workspace-relative base), and never import from a sibling artifact or a shared
`@workspace/*` lib. A saved template is consumed as a read-only style donor
(re-authored from, not rebuilt), so keep the generated `src/index.css` and
`src/generated/tokens.tsx` committed so the template carries a readable theme
snapshot. If maintenance ever introduces a cross-artifact or workspace-lib
dependency, load the `prepare-artifact-template` skill and follow it to pull the
dependency back in before the user saves the template.

## Prototyping on the canvas

Use the mockup-sandbox skill's "Design systems" flow. It creates a sandbox entry
for `@workspace/my-jersey-design` and renders mockups using this package's
theme and components.

## Consuming this package

Never copy token values, component source, hooks, or these docs into a consuming
artifact. Add `@workspace/my-jersey-design` as a `workspace:*` dependency,
run `pnpm install`, and import directly from this package. Slide decks are the
one exception: SDM documents cannot import packages or CSS, so follow
`docs/consuming-slides.md` to translate tokens into each slide document's
`theme` instead.

Read only the guides required by the current task:

- Building or styling web UI: `artifacts/my-jersey-design/docs/consuming-web.md`
- Building or styling Expo UI: `artifacts/my-jersey-design/docs/consuming-expo.md`
- Building or styling a slide deck: `artifacts/my-jersey-design/docs/consuming-slides.md`
- Replacing an existing or scaffolded web theme/component library:
  `artifacts/my-jersey-design/docs/migrating-web.md`
- Replacing existing or scaffolded Expo theme/hooks/components:
  `artifacts/my-jersey-design/docs/migrating-expo.md`

A freshly scaffolded app counts as a migration when it still contains local
theme, hook, or component copies that this package supersedes. Read the platform
consumption guide first, then its migration guide before authoring UI.

For web/static consumers, follow the workspace dependency placement rules from
the pnpm-workspace skill. Expo is a runtime consumer, so the package belongs in
`dependencies`.

The user approved applying the premium studio revision to the website. Then render one platform-appropriate primitive from
the package and run the consumer's typecheck and dev server. Proceed only after
the import resolves and the primitive uses this design system's theme.

## Universal rules

- Match exact token values. Do not invent colors, fonts, spacing, or radii in a
  consuming app.
- Keep product data, navigation, application state, and product-specific
  compositions in the app. Product-agnostic visual primitives belong here.
- Read these docs in place. Do not copy them into another artifact.
