import { Storage } from "@google-cloud/storage";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const storage = new Storage({
  credentials: {
    audience: "replit", subject_token_type: "access_token",
    token_url: "http://127.0.0.1:1106/token", type: "external_account",
    credential_source: { url: "http://127.0.0.1:1106/credential", format: { type: "json", subject_token_field_name: "access_token" } },
    universe_domain: "googleapis.com",
  }, projectId: "",
});
const publicPath = process.env.PUBLIC_OBJECT_SEARCH_PATHS?.split(",")[0]?.trim();
if (!publicPath) throw new Error("Public App Storage is not configured");
const [bucket, ...directory] = publicPath.replace(/^\/+/, "").split("/");
const source = process.argv[2];
if (!source) throw new Error("Provide the authorized repository assets directory");
const files = (await readdir(source, { recursive: true })).filter(name => name.endsWith(".webp")).sort();
const manifest = {};
for (const file of files) {
  const name = path.basename(file);
  if (manifest[name]) throw new Error("Duplicate source asset basename");
  const bytes = await readFile(path.join(source, file));
  manifest[name] = { bytes: bytes.length, sha256: createHash("sha256").update(bytes).digest("hex") };
}
let cursor = 0;
await Promise.all(Array.from({ length: 4 }, async () => {
  while (cursor < files.length) {
    const file = files[cursor++];
    const name = path.basename(file);
    try {
      await storage.bucket(bucket).upload(path.join(source, file), {
        destination: [...directory, "my-jersey", "repository", name].join("/"),
        resumable: false,
        metadata: { contentType: "image/webp", cacheControl: "public, max-age=86400" },
      });
    } catch {
      throw new Error(`Source image upload failed: ${name}`);
    }
  }
}));
await writeFile(new URL("../src/lib/brand-media-manifest.json", import.meta.url), JSON.stringify(manifest, null, 2) + "\n");
console.info(`Uploaded ${files.length} original repository images to App Storage; saved public filename/hash manifest.`);
