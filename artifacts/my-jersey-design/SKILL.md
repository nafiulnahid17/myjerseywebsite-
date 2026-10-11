# My Jersey visual language

Source: the authored campaign in the existing My Jersey workspace app. This is
an extraction of its branded inline primitives, not a new retail design or a
generic starter UI library.

## What's here

- Complete dark and derived light tokens; gold decorative effects also live in
  tokens.json.
- BrandWordmark, ActionLink, TextLink and DisplayTitle. The complete catalog
  fits one four-family pilot; no later families are pending.
- Source evidence: docs/references/component-inventory.md and the linked
  per-family contracts.
- A living browser with palette, type, layout, component stories and motion.

## Extracted composition rules

These rules are observable in the source, rather than a separately documented
brand manual: warm near-black surfaces; restrained gold emphasis; Bodoni Moda
editorial headings, often italic; Archivo readable body text; widely tracked
mono eyebrows; pill CTAs; generous section spacing. Deep green and lime echo
the storefront and street-football campaign.

The source website has no true light mode. The cream light theme is deliberately
derived and must not be described as extracted from an existing light screen.

## Product direction

The user requires realistic street-football footage, not cartoon action. The
welcome text follows the broken glass. The latest requested behavior is
autoplay once per fresh page load or refresh, hold the ending, and no player
controls or timer. Website changes require the user's design-system decision;
the preview documents these requirements but does not implement them in the
existing app.

## Consumers

Read docs/AGENTS.md, then the platform consumption guide. Import the package;
do not copy the theme or components. Keep video state, navigation destinations,
business content and product-specific layouts in the consuming app.
