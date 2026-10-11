---
name: Cloudflare monorepo deployment
description: Build and Wrangler deployment requirements for the My Jersey pnpm workspace.
---

Cloudflare builds the repository root with `pnpm run build` and deploys with `npx wrangler deploy`. Artifact Vite builds expect `PORT` and `BASE_PATH`, which Cloudflare may not provide as build variables. The root build script should provide fallbacks only for recursive artifact builds and preserve explicitly supplied values. Wrangler needs a root-level configuration that targets `artifacts/my-jersey/dist/public` and uses SPA not-found handling; automatic workspace detection from the repository root fails.

**Why:** The dependency install passed, but separate Cloudflare build and deploy stages failed: first because Vite configuration lacked build-time variables, then because Wrangler could not infer an app from the monorepo root.

**How to apply:** Before pushing Cloudflare deployment changes, run the root build with `PORT` and `BASE_PATH` unset, then run `npx wrangler deploy --dry-run` from the repository root.
