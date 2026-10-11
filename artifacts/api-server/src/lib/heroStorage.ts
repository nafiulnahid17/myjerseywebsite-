import { Storage } from "@google-cloud/storage";

const REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106";

// Replit's App Storage sidecar handles authentication; no credential is exposed.
export const heroStorage = new Storage({
  credentials: {
    audience: "replit",
    subject_token_type: "access_token",
    token_url: `${REPLIT_SIDECAR_ENDPOINT}/token`,
    type: "external_account",
    credential_source: {
      url: `${REPLIT_SIDECAR_ENDPOINT}/credential`,
      format: { type: "json", subject_token_field_name: "access_token" },
    },
    universe_domain: "googleapis.com",
  },
  projectId: "",
});

export function getHeroAsset(name: string) {
  const publicPath = process.env.PUBLIC_OBJECT_SEARCH_PATHS?.split(",")[0]?.trim();
  if (!publicPath) throw new Error("Public App Storage is not configured");
  const [bucket, ...directory] = publicPath.replace(/^\/+/, "").split("/");
  if (!bucket) throw new Error("Public App Storage bucket is not configured");
  return heroStorage.bucket(bucket).file([...directory, "my-jersey", name].join("/"));
}
