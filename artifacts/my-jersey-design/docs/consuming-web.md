# Consuming My Jersey on the web

Read AGENTS.md and references/component-inventory.md first. All eight required source families are implemented. Screen migration
still requires the user to approve applying this completed system. Do not infer application approval
from ownership permission or pilot approval.

Add @workspace/my-jersey-design as a workspace dependency using the pnpm
workspace rules. Import @workspace/my-jersey-design/styles.css once. Do not
duplicate Tailwind, fonts, source component CSS or token definitions.

```tsx
import "@workspace/my-jersey-design/styles.css";
import { Icon, IconSprite } from "@workspace/my-jersey-design/components/ui/icon";
import { Button } from "@workspace/my-jersey-design/components/ui/button";
import { JerseyPreview } from "@workspace/my-jersey-design/components/ui/jersey-preview";
import { Tag } from "@workspace/my-jersey-design/components/ui/tag";
import { ProductCard } from "@workspace/my-jersey-design/components/ui/product-card";
import { CreationCard } from "@workspace/my-jersey-design/components/ui/creation-card";
import { Dialog } from "@workspace/my-jersey-design/components/ui/dialog";
import { Toast } from "@workspace/my-jersey-design/components/ui/toast";
import { BrandLogo, BrandMark } from "@workspace/my-jersey-design/components/ui/brand-logo";
```

Mount IconSprite once per document. Persist the theme choice in localStorage
(`mj-theme`), apply it before first paint, and fall back to the OS preference.
Light is white + blue + gold; dark is midnight navy + gold. Paint page
backgrounds with `var(--page)` and premium feature bands with `var(--band)`
and `--band-tx`/`--band-mu`/`--band-bd`; never hardcode new colours in the app.

BrandLogo: variant full/mark/word, size small/default/large, tagline, label.
Use it for header, footer, banners and any brand surface. Do not render the
archived raster logo.

Button supports primary/outline/icon/filter variants, default/small sizes,
native button attributes, href/target/rel for CTA anchors, disabled guards and
active filter state. Icon supports the 16 names documented in its preview.
JerseyPreview takes base/accent colors and name/number, matching the original
SVG; give aria-label only when it needs an independent accessible name.
Tag supports stock/category; category tags need a positioned parent.
ProductCard takes product data and onAdd/onCustomize/onBuy callbacks. It
disables buying and cart actions when sold out, but keeps Customize enabled.

Read each corresponding source contract for pinned provenance and port notes.
Keep product arrays, cart mutations, request form validation, contact details,
WhatsApp links, navigation and full section compositions in the application.
The source is native HTML/CSS/JS, with no headless UI implementation to replace.

Preserve original agency attribution.

CreationCard accepts source image/srcset/sizes, an optional logo URL (omit it to
use the BrandMark crest), zero-based design
index, colors, optional fabric metadata and view/customize/order callbacks.
Copy no components or token values into the application.

Dialog is a controlled native body portal with default/wide/request variants.
It owns backdrop/Escape closing, focus trapping and return focus. App-owned
form, cart and contact content goes in children. Change contentKey when
replacing same-variant content while open to refocus new controls.

Toast is controlled, with source duration 1800ms. Increment eventKey for each
new notice, including repeated identical messages, to restart the hide timer.
Keep message/open/eventKey in application state; the component cancels stale
timers on replacement/close/unmount.

Use React callbacks OR legacy data-a delegation for an action, not both.
Preserved source data attributes support either boundary, but combining the
two would duplicate cart/order actions.
