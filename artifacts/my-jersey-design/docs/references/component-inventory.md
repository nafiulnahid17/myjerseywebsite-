# Repository component inventory

Canonical source: https://github.com/atheriouslabs/myjerseywebmain
Pinned revision: 1aedcc61e5c19af3e02eab22e32f322bba7eb4e2
Source root: public/index.html (native HTML/CSS/JavaScript). No separate design-system package or external canonical source exists.
Rights: no LICENSE file is present, but the user explicitly confirmed the repository and assets are theirs and authorized reuse. Keep the Atherious Labs agency attribution when reproducing the complete website.

Catalog normalizes the source CSS primitives and reusable render/helper functions. Full page sections, checkout/request content, product data, routing and cart state are app compositions rather than shared primitives.

| Family | Reference | Dependencies | Usage evidence | Chunk | Status |
|---|---|---|---|---|---|
| Icon | components/icon.md | None | Inline SVG icons throughout navigation, CTAs and dialogs | 1 | implemented |
| Button | components/button.md | Icon (same chunk) | Buttons, CTA anchors, icon buttons and filter chips throughout the page | 1 | implemented |
| JerseyPreview | components/jersey-preview.md | None | Hero jersey previews and both ready-made collections | 1 | implemented |
| Tag | components/tag.md | None | Category and inventory state in every collection card | 1 | implemented |
| ProductCard | components/product-card.md | Button, Tag, JerseyPreview (same chunk) | Football and cricket collection renderer | 1 | implemented |
| CreationCard | components/creation-card.md | Button (earlier chunk) | Recent-work image grid and customize/order actions | 2 | pending |
| Dialog | components/dialog.md | Icon, Button (earlier chunk) | Lightbox, request form, cart and contact dialog shell | 2 | pending |
| Toast | components/toast.md | None | Add-to-cart confirmation | 2 | pending |

Pilot: Icon, Button, JerseyPreview, Tag, ProductCard. Continue only after the user reviews the pilot. Final chunk: CreationCard, Dialog, Toast. Do not migrate screens while these required families are pending.
