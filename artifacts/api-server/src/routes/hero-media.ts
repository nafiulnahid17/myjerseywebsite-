import { Router, type IRouter } from "express";
import { getHeroAsset } from "../lib/heroStorage";

const router: IRouter = Router();
const assets = new Set(["background-4k.jpg", "poster.jpg", "cinematic.mp4", "cinematic.webm"]);
const cache = new Map<string, Promise<Buffer>>();

function loadAsset(name: string): Promise<Buffer> {
  const existing = cache.get(name);
  if (existing) return existing;
  const download = getHeroAsset(name).download().then(([bytes]) => bytes);
  cache.set(name, download);
  download.catch(() => cache.delete(name));
  return download;
}

// Public campaign assets only. Byte ranges allow instant replay and seeking.
router.get("/hero-media/:name", async (req, res) => {
  const name = String(req.params.name);
  if (!assets.has(name)) {
    res.status(404).json({ error: "Campaign asset not found" });
    return;
  }
  try {
    // Cache the small, fixed campaign assets so simultaneous
    // visitors and replay don't create repeated storage streams.
    const bytes = await loadAsset(name);
    const size = bytes.length;
    if (!Number.isSafeInteger(size) || size <= 0) throw new Error("Invalid asset size");
    res.set({
      "Content-Type": name.endsWith(".webm") ? "video/webm" : name.endsWith(".mp4") ? "video/mp4" : "image/jpeg",
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=86400",
      "X-Content-Type-Options": "nosniff",
    });
    let start = 0;
    let end = size - 1;
    if (req.headers.range) {
      const ranges = req.range(size);
      if (!Array.isArray(ranges) || ranges.type !== "bytes" || ranges.length !== 1) {
        res.set("Content-Range", `bytes */${size}`).status(416).end();
        return;
      }
      start = ranges[0]!.start;
      end = ranges[0]!.end;
      res.status(206).set("Content-Range", `bytes ${start}-${end}/${size}`);
    }
    res.set("Content-Length", String(end - start + 1));
    if (req.method === "HEAD") {
      res.end();
      return;
    }
    res.end(bytes.subarray(start, end + 1));
  } catch (error) {
    req.log.error({ err: error, asset: name }, "Campaign asset unavailable");
    res.status(503).json({ error: "Campaign media is unavailable" });
  }
});

export default router;
