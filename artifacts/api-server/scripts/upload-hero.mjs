import { Storage } from "@google-cloud/storage";
import path from "node:path";

const storage = new Storage({
  credentials: {
    audience: "replit",
    subject_token_type: "access_token",
    token_url: "http://127.0.0.1:1106/token",
    type: "external_account",
    credential_source: {
      url: "http://127.0.0.1:1106/credential",
      format: { type: "json", subject_token_field_name: "access_token" },
    },
    universe_domain: "googleapis.com",
  },
  projectId: "",
});
const publicPath = process.env.PUBLIC_OBJECT_SEARCH_PATHS?.split(",")[0]?.trim();
if (!publicPath) throw new Error("Public App Storage is not configured");
const [bucket, ...directory] = publicPath.replace(/^\/+/, "").split("/");
const filenames = process.argv.slice(2);
if (!filenames.length) throw new Error("Provide campaign filenames to upload");
const allowed = new Set(["background-4k.jpg", "poster.jpg", "cinematic.mp4", "cinematic.webm"]);
for (const name of filenames) {
  if (!allowed.has(name)) throw new Error("Unsupported campaign asset");
  await storage.bucket(bucket).upload(path.resolve("generated-artifacts/my-jersey", name), {
    destination: [...directory, "my-jersey", name].join("/"),
    resumable: false,
    metadata: {
      contentType: name.endsWith(".webm") ? "video/webm" : name.endsWith(".mp4") ? "video/mp4" : "image/jpeg",
      cacheControl: "public, max-age=86400",
    },
  });
  console.info(`Uploaded campaign asset: ${name}`);
}
