import assert from "node:assert/strict";
import test from "node:test";
import worker from "../worker.mjs";

const files = new Map([
  ["hero/cinematic.mp4", Buffer.from("abcdef")],
  ["hero/poster.jpg", Buffer.from("poster")],
  ["brand/design-01-640.webp", Buffer.from("jersey")],
]);

function parseRange(value, size) {
  if (!value) return null;
  const match = /^bytes=(\d*)-(\d*)$/i.exec(value.trim());
  if (!match || (!match[1] && !match[2])) return null;
  let start;
  let end;
  if (!match[1]) {
    const suffix = Number(match[2]);
    if (!suffix) return null;
    start = Math.max(0, size - suffix);
    end = size - 1;
  } else {
    start = Number(match[1]);
    end = match[2] ? Number(match[2]) : size - 1;
    if (start >= size || end < start) return null;
    end = Math.min(end, size - 1);
  }
  return { start, end };
}

function makeObject(key, bytes, range) {
  const selected = range ? bytes.subarray(range.start, range.end + 1) : bytes;
  return {
    key,
    size: bytes.length,
    etag: "test-etag",
    httpEtag: '"test-etag"',
    uploaded: new Date("2026-10-11T00:00:00Z"),
    httpMetadata: { contentType: key.endsWith(".webp") ? "image/webp" : "video/mp4" },
    range: range ? { offset: range.start, length: selected.length } : undefined,
    body: new Response(selected).body,
    writeHttpMetadata(headers) {
      headers.set("Content-Type", this.httpMetadata.contentType);
    },
  };
}

function makeEnv() {
  const calls = [];
  const MEDIA = {
    async head(key) {
      calls.push({ method: "head", key });
      const bytes = files.get(key);
      return bytes ? makeObject(key, bytes) : null;
    },
    async get(key, options) {
      calls.push({ method: "get", key, range: Boolean(options?.range) });
      const bytes = files.get(key);
      if (!bytes) return null;
      const header = options?.range?.get?.("range");
      if (!header) return makeObject(key, bytes);
      const range = parseRange(header, bytes.length);
      return range ? makeObject(key, bytes, range) : null;
    },
  };
  const ASSETS = {
    async fetch(request) {
      return new Response(`static:${new URL(request.url).pathname}`);
    },
  };
  return { env: { MEDIA, ASSETS }, calls };
}

test("serves allowlisted brand images with their stored MIME type", async () => {
  const { env } = makeEnv();
  const response = await worker.fetch(
    new Request("https://example.test/api/brand-media/design-01-640.webp"),
    env,
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "image/webp");
  assert.equal(await response.text(), "jersey");
});

test("supports byte ranges and suffix ranges for the hero video", async () => {
  const { env } = makeEnv();
  const partial = await worker.fetch(
    new Request("https://example.test/api/hero-media/cinematic.mp4", {
      headers: { Range: "bytes=1-3" },
    }),
    env,
  );
  assert.equal(partial.status, 206);
  assert.equal(partial.headers.get("content-range"), "bytes 1-3/6");
  assert.equal(partial.headers.get("content-length"), "3");
  assert.equal(await partial.text(), "bcd");

  const suffix = await worker.fetch(
    new Request("https://example.test/api/hero-media/cinematic.mp4", {
      headers: { Range: "bytes=-2" },
    }),
    env,
  );
  assert.equal(suffix.status, 206);
  assert.equal(suffix.headers.get("content-range"), "bytes 4-5/6");
  assert.equal(await suffix.text(), "ef");
});

test("returns a standards-compliant 416 for unsatisfiable ranges", async () => {
  const { env } = makeEnv();
  const response = await worker.fetch(
    new Request("https://example.test/api/hero-media/cinematic.mp4", {
      headers: { Range: "bytes=20-30" },
    }),
    env,
  );

  assert.equal(response.status, 416);
  assert.equal(response.headers.get("content-range"), "bytes */6");
});

test("ignores an unsatisfiable range when If-Range is stale", async () => {
  const { env } = makeEnv();
  const response = await worker.fetch(
    new Request("https://example.test/api/hero-media/cinematic.mp4", {
      headers: { Range: "bytes=20-30", "If-Range": '"old-etag"' },
    }),
    env,
  );

  assert.equal(response.status, 200);
  assert.equal(await response.text(), "abcdef");
});

test("ignores a range when If-Range does not match", async () => {
  const { env } = makeEnv();
  const response = await worker.fetch(
    new Request("https://example.test/api/hero-media/cinematic.mp4", {
      headers: { Range: "bytes=1-2", "If-Range": '"old-etag"' },
    }),
    env,
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-range"), null);
  assert.equal(await response.text(), "abcdef");
});

test("supports HEAD, conditional requests, safe 404s, and static fallback", async () => {
  const { env } = makeEnv();
  const head = await worker.fetch(
    new Request("https://example.test/api/hero-media/poster.jpg", { method: "HEAD" }),
    env,
  );
  assert.equal(head.status, 200);
  assert.equal(head.headers.get("content-length"), "6");
  assert.equal(head.body, null);

  const notModified = await worker.fetch(
    new Request("https://example.test/api/hero-media/poster.jpg", {
      headers: { "If-None-Match": '"test-etag"' },
    }),
    env,
  );
  assert.equal(notModified.status, 304);

  const unknown = await worker.fetch(
    new Request("https://example.test/api/brand-media/not-in-manifest.webp"),
    env,
  );
  assert.equal(unknown.status, 404);

  const staticAsset = await worker.fetch(new Request("https://example.test/"), env);
  assert.equal(await staticAsset.text(), "static:/");
});
