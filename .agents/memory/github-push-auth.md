---
name: GitHub push authentication
description: Credential behavior when pushing My Jersey branches from Replit.
---

For My Jersey, the Replit GitHub source-control connection reported healthy, but Git pushes from both a staging clone and the workspace were rejected with invalid-credential errors. A fine-grained GitHub token supplied through Replit Secrets allowed a review-branch push.

**Why:** This environment did not pass its healthy OAuth connection through to Git transport.

**How to apply:** If Git push fails again, use Replit's secure Secrets form for a least-privileged token limited to the target repository. Pass it only through an ephemeral Git credential helper. Do not place credentials in a remote URL, Git configuration, logs, chat, or committed files. Prefer a review branch, never force-push, and verify that the intended branch changed while `main` stayed unchanged.
