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
import myJerseyLogo from "@workspace/my-jersey-design/assets/my-jersey-logo.png";
```

Mount IconSprite once per document. Use the root dark class and data-theme=dark
on fresh visits. Theme controls remove the dark class and set data-theme=light
for light mode. Do not persist a previous choice: the repository defaults to
dark each visit. Both themes come directly from the repository.

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

Import proof: render one Button, typecheck and verify the runtime theme before
broader migration. Use the genuine logo retained in this package rather than
introducing a typography-based replacement. Preserve original agency attribution.

CreationCard accepts source image/srcset/sizes, a logo URL, zero-based design
index, colors, optional fabric metadata and view/customize/order callbacks.
Import the exported logo asset; never depend on the preview server URL in
production. Copy no components or token values into the application.

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
