# My Jersey source-backed visual system

Read docs/AGENTS.md and the platform consumption guide first. The user-owned
atheriouslabs/myjerseywebmain repository is authoritative. Match it exactly;
only the requested hero video is a visual change to the existing website.

## Source typography and themes

DM Sans: body/CTA, 400–700. Playfair Display: headings 600/800, italic 800.
Oswald: labels, jersey names, jersey numbers and prices, 500/600. The source
has no monospace brand face. Both dark and light palettes are real source
themes. Every fresh visit defaults to dark; the theme toggle is per visit.

Preserve the source gold gradient, subtle translucent borders, near-black
surfaces, green inventory/brand accents, 99px CTA pills and 22px product cards.
Use the actual image logo rather than drawing another monogram. Do not add
a generic component kit or invent a third theme. Keep the agency attribution.

## Source catalog

See docs/references/component-inventory.md. All eight source families are ready:
Icon (mount IconSprite once), Button, JerseyPreview, Tag, ProductCard,
CreationCard, Dialog and Toast. The source catalog is complete; obtain explicit
application approval before changing website screens.

## Hero constraint

After application approval, add the existing realistic football footage to
the repository hero. Autoplay muted and inline once per fresh load/refresh,
no looping, then hold the final frame. No visible media controls, timer, replay
or Watch the strike again UI. Do not redesign other sections or content.

## Runtime

Import the exported styles once. Native source CSS is included and resolves
its exact theme values through generated source aliases. Preserve native
button semantics, disabled stock actions, source hover transforms, keyboard
focus and reduced motion. Keep product data, cart state, request validation
and WhatsApp destinations in the consuming app.
