import { Router, type IRouter } from "express";
import manifest from "../lib/brand-media-manifest.json" with { type: "json" };
import { getHeroAsset } from "../lib/heroStorage";

const router: IRouter = Router();
const entries = manifest as Record<string, { bytes: number; sha256: string }>;
// Finite, trusted public brand assets only; no arbitrary object path is accepted.
const cache = new Map<string, Promise<Buffer>>();

router.get("/brand-media/:name", async (req, res) => {
  const name = String(req.params.name);
  if (!Object.hasOwn(entries, name)) {
    res.status(404).json({ error: "Brand image not found" });
    return;
  }
  const entry = entries[name]!;
  const etag = `"${entry.sha256}"`;
  res.set({
    "Content-Type": "image/webp",
    "Cache-Control": "public, max-age=86400",
    "X-Content-Type-Options": "nosniff",
    ETag: etag,
  });
  if (req.headers["if-none-match"] === etag) {
    res.status(304).end();
    return;
  }
  if (req.method === "HEAD") {
    res.set("Content-Length", String(entry.bytes)).end();
    return;
  }
  try {
    let pending = cache.get(name);
    if (!pending) {
      pending = getHeroAsset(`repository/${name}`).download().then(([bytes]) => {
        if (bytes.length !== entry.bytes) throw new Error("Invalid stored image size");
        return bytes;
      });
      cache.set(name, pending);
      pending.catch(() => cache.delete(name));
    }
    const bytes = await pending;
    res.set("Content-Length", String(bytes.length)).end(bytes);
  } catch {
    req.log.error({ asset: name }, "Brand image unavailable");
    res.set("Cache-Control", "no-store").status(503).json({ error: "Brand image is unavailable" });
  }
});

export default router;
