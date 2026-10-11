---
name: Preview captures
description: Capturing lower sections of the SPA without confusing lazy rendering or browser highlighting with app defects.
---

An initial URL hash anchor can miss the target because the SPA mounts its section after the browser's first anchor lookup. A Chromium text-fragment URL can instead target the rendered heading or card text in an app-preview capture.

**Why:** Ordinary section hashes captured the hero, and a full-page capture showed unloaded lazy images and unrevealed scroll content. Text fragments successfully captured lower desktop and mobile card sections.

**How to apply:** Use a URL fragment such as /#:~:text=Behind%20My%20Jersey when checking a static lower section. The purple target-text highlight is browser annotation, not application styling. Offscreen lazy images and scroll-reveal elements missing from full-page captures do not by themselves prove the live page is broken.
