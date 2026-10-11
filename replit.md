# My Jersey

A Bangladesh custom-jersey storefront with a cinematic hero, design references,
team-order requests and WhatsApp-assisted ordering.

## Run & Operate

- Use the existing artifact-managed workflows; do not add duplicate servers.
- `pnpm --filter @workspace/my-jersey run typecheck` — check storefront types.
- `pnpm --filter @workspace/my-jersey-design run typecheck` — regenerate theme outputs and check the shared design system.
- `PORT=23805 BASE_PATH=/ pnpm --filter @workspace/my-jersey run build` — production frontend build using the current preview configuration.
- `node --experimental-strip-types --test artifacts/my-jersey/tests/commerce.test.mjs` — cart, request, persistence and file-validation regression checks.
- API services bind to their managed `PORT`, not a hardcoded port.

## Stack

- pnpm workspace, React + Vite + TypeScript, Wouter.
- Shared visual primitives and theme: `@workspace/my-jersey-design`.
- Express API serves allowlisted brand assets and hero media from App Storage.
- Cart, profile preferences and prepared request history currently use browser storage, not a server-side order database.

## Where things live

- `artifacts/my-jersey/` — storefront, preview `/`.
- `artifacts/my-jersey-design/` — living design system and canonical tokens; read its `docs/AGENTS.md` before UI changes.
- `artifacts/api-server/` — media API; paths under `/api`.
- `generated-artifacts/` — ignored source/export outputs, not deployed app dependencies.

## Architecture decisions

- The owner explicitly requested an admin gateway only. Authentication, management APIs and publishing controls are not connected.
- Existing WhatsApp-assisted ordering remains the operational handoff. Opening WhatsApp does not prove that a message was sent or an order accepted.
- File selection previews a customer's design locally. It is not a server upload; the customer attaches the original in WhatsApp.
- New user-upload storage requires an explicitly integrated protected storage flow; do not add unauthenticated public upload endpoints.
- App assets required after publishing belong in App Storage, not ignored generation directories.

## Product

- Preserve the realistic hero: autoplay once on fresh visit/refresh, no player controls or looping, hold the last frame.
- Collection images are attributed team-kit references or explicitly labelled AI design concepts, not verified stock photographs.
- Custom/team starting offers do not override individual catalog prices. Quotes, stock, delivery and payment are confirmed with the team.

## User preferences

- New premium branding and gradients supersede the old repository-exact appearance.
- Light theme: white, blue and gold.
- Collection cards stay compact; custom/team campaign banners should be expansive.

## Gotchas

- Edit design-system tokens and source styles, never generated theme outputs directly.
- Keep catalog prices authoritative within the client; browser storage stores product IDs and options, not trusted price values.
- Never show invented fulfillment/payment statuses or treat a local profile as authenticated.
- Cold GCS reads may log stream-listener warnings despite valid media responses; verify response integrity before diagnosing an outage.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
