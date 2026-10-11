# Extracted My Jersey component inventory

Source: existing workspace app artifacts/my-jersey. This is a normalization of its authored inline brand primitives, not an import of the unused starter shadcn catalog. Native element APIs and event handlers are preserved; video and navigation state stay in the app. Source code is user-owned workspace material, with no third-party component implementation copied.

The complete brand catalog fits one four-family pilot. No later chunks or pending families remain.

| Family | Build reference | Dependencies | Importance evidence | Chunk | Status |
|---|---|---|---|---|---|
| BrandWordmark | components/brand-wordmark.md | Native span typography | Brand mark in the persistent navigation and footer. | 1 | implemented |
| ActionLink | components/action-link.md | Native anchor; no headless behavior dependency | Primary CTA in the hero. | 1 | implemented |
| TextLink | components/text-link.md | Native anchor | Three navigation links and the lower-section text link. | 1 | implemented |
| DisplayTitle | components/display-title.md | Native heading and inline emphasis | Hero plus three supporting section headings. | 1 | implemented |

Excluded: unused starter UI modules, bootstrap toast/tooltip providers, film controls (the user now wants no player UI), and app-specific Nav/Hero/Home compositions. Migration must retain unrelated infrastructure, not delete it.
