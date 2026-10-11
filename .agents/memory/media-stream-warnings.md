---
name: Public media stream warnings
description: Distinguish GCS stream listener warnings from actual public image/video failures.
---

The GCS client can emit `MaxListenersExceededWarning` on individual `PassThrough` streams during cold or concurrent media downloads, even when the images and video are delivered correctly.

**Why:** These warnings appeared while public image bodies matched their authorized source checksums and the film returned valid ranged responses. The warning alone did not indicate a broken asset or establish a persistent memory leak.

**How to apply:** Verify HTTP status, body integrity and playback before treating this as a media outage. Investigate SDK stream cleanup and memory behavior if it persists; do not hide the problem by raising global listener limits.
