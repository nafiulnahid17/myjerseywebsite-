---
name: Hero video playback
description: A preview-browser codec compatibility constraint discovered with the cinematic hero.
---

Use VP9 WebM for the hero's browser playback and preserve an H.264 MP4 for downloading.

**Why:** The preview capture browser rejected the H.264 MP4 even after complete asset downloads and byte-range responses were verified. The same footage encoded as VP9 WebM rendered and played successfully on desktop and mobile preview captures.

**How to apply:** When replacing the cinematic footage, supply a browser-compatible WebM rather than assuming a valid MP4 guarantees decoding in the preview browser. Keep the downloadable MP4 separate from the website playback source.
