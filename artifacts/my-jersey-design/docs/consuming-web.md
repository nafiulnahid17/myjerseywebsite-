# Consuming My Jersey in React web apps

Read docs/AGENTS.md first. Obtain approval before migrating existing screens. Add @workspace/my-jersey-design as a workspace dependency using the workspace dependency placement rules, install it, and import the package theme once:

```css
@import "@workspace/my-jersey-design/styles.css";
```

The theme already includes Tailwind, plugins, fonts and component sources. Do not duplicate them. Apply the dark class to the page root to preserve the source campaign. Light is a derived alternative.

```tsx
import { ActionLink } from "@workspace/my-jersey-design/components/ui/action-link";
import { TextLink } from "@workspace/my-jersey-design/components/ui/text-link";
import { BrandWordmark } from "@workspace/my-jersey-design/components/ui/brand-wordmark";
import { DisplayTitle } from "@workspace/my-jersey-design/components/ui/display-title";
import { cn } from "@workspace/my-jersey-design/lib/utils";
```

ActionLink accepts native anchor props plus disabled. TextLink accepts native anchor props and variant navigation or underlined. BrandWordmark accepts span props and compact. DisplayTitle accepts heading props, as h1/h2/h3 and gold. All supplied classes may be extended with className. Keep navigation destinations and event handlers in the app. The source has a typographic mark, not an image logo file.

Render one ActionLink, run the consumer typecheck and confirm the theme in its running preview before broader migration. The package does not ship a retail cart, forms, checkout, toaster, tooltip provider, video player or full page layouts. Keep existing unrelated infrastructure; do not rewrite those imports to nonexistent exports.
