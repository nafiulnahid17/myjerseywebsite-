import brandMediaManifest from "../api-server/src/lib/brand-media-manifest.json" with {
  type: "json",
};

const heroMedia = new Set([
  "background-4k.jpg",
  "cinematic.mp4",
  "cinematic.webm",
  "poster.jpg",
]);
const brandMedia = new Set(Object.keys(brandMediaManifest));

function resolveMediaKey(pathname) {
  const segments = pathname.split("/");
  if (segments.length !== 4 || segments[1] !== "api") return null;

  let name;
  try {
    name = decodeURIComponent(segments[3] ?? "");
  } catch {
    return null;
  }

  if (segments[2] === "hero-media" && heroMedia.has(name)) return `hero/${name}`;
  if (segments[2] === "brand-media" && brandMedia.has(name)) return `brand/${name}`;
  return null;
}

function parseByteRange(value, size) {
  const match = /^bytes=(\d*)-(\d*)$/i.exec(value.trim());
  if (!match || (!match[1] && !match[2]) || size <= 0) return null;

  let start;
  let end;
  if (!match[1]) {
    const suffixLength = Number(match[2]);
    if (!Number.isSafeInteger(suffixLength) || suffixLength <= 0) return null;
    start = Math.max(0, size - suffixLength);
    end = size - 1;
  } else {
    start = Number(match[1]);
    end = match[2] ? Number(match[2]) : size - 1;
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end)) return null;
    if (start >= size || end < start) return null;
    end = Math.min(end, size - 1);
  }

  return { start, end };
}

function ifRangeMatches(value, etag, uploaded) {
  if (!value) return true;
  if (value.startsWith('"')) return value === etag;

  const requestedDate = Date.parse(value);
  const uploadedDate = uploaded instanceof Date ? uploaded.getTime() : Date.parse(uploaded);
  return (
    Number.isFinite(requestedDate) &&
    Number.isFinite(uploadedDate) &&
    Math.floor(uploadedDate / 1000) * 1000 <= requestedDate
  );
}

function matchesIfNoneMatch(value, etag) {
  if (!value) return false;
  return value.split(",").some((candidate) => {
    const normalized = candidate.trim().replace(/^W\//, "");
    return normalized === "*" || normalized === etag;
  });
}

function rangeNotSatisfiable(size) {
  return new Response(null, {
    status: 416,
    headers: {
      "Content-Range": `bytes */${size}`,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function mediaResponseHeaders(object, key) {
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set(
    "Content-Type",
    key.startsWith("brand/")
      ? "image/webp"
      : key.endsWith(".webm")
        ? "video/webm"
        : key.endsWith(".mp4")
          ? "video/mp4"
          : "image/jpeg",
  );
  headers.set("ETag", object.httpEtag);
  headers.set("Last-Modified", new Date(object.uploaded).toUTCString());
  headers.set("Accept-Ranges", "bytes");
  headers.set("Cache-Control", "public, max-age=86400");
  headers.set("X-Content-Type-Options", "nosniff");
  return headers;
}

async function serveMedia(request, env, key) {
  const isHead = request.method === "HEAD";
  const rangeHeader = request.headers.get("range");
  let object = isHead
    ? await env.MEDIA.head(key)
    : await env.MEDIA.get(key, rangeHeader ? { range: request.headers } : undefined);
  let ignoreRange = false;

  if (!object) {
    if (rangeHeader) {
      const metadata = await env.MEDIA.head(key);
      if (!metadata) return new Response("Not found", { status: 404 });
      if (ifRangeMatches(request.headers.get("if-range"), metadata.httpEtag, metadata.uploaded)) {
        return rangeNotSatisfiable(metadata.size);
      }
      ignoreRange = true;
      object = isHead ? metadata : await env.MEDIA.get(key);
      if (!object) return new Response("Not found", { status: 404 });
    } else {
      return new Response("Not found", { status: 404 });
    }
  }

  const headers = mediaResponseHeaders(object, key);
  if (matchesIfNoneMatch(request.headers.get("if-none-match"), object.httpEtag)) {
    return new Response(null, { status: 304, headers });
  }

  const ifModifiedSince = Date.parse(request.headers.get("if-modified-since") ?? "");
  const uploadedTime =
    object.uploaded instanceof Date ? object.uploaded.getTime() : Date.parse(object.uploaded);
  if (
    !request.headers.has("if-none-match") &&
    Number.isFinite(ifModifiedSince) &&
    Number.isFinite(uploadedTime) &&
    Math.floor(uploadedTime / 1000) * 1000 <= ifModifiedSince
  ) {
    return new Response(null, { status: 304, headers });
  }

  let range = rangeHeader && !ignoreRange ? parseByteRange(rangeHeader, object.size) : null;
  if (rangeHeader && !ignoreRange && !range) return rangeNotSatisfiable(object.size);

  if (
    rangeHeader &&
    !ignoreRange &&
    !ifRangeMatches(request.headers.get("if-range"), object.httpEtag, object.uploaded)
  ) {
    range = null;
    if (!isHead) {
      object = await env.MEDIA.get(key);
      if (!object) return new Response("Not found", { status: 404 });
    }
  }

  const responseHeaders = mediaResponseHeaders(object, key);
  if (range) {
    const expectedLength = range.end - range.start + 1;
    const fullObjectRange = range.start === 0 && expectedLength === object.size;
    const actualOffset = object.range?.offset ?? (fullObjectRange ? 0 : null);
    const actualLength = object.range?.length ?? (fullObjectRange ? object.size : null);
    if (actualOffset !== range.start || actualLength !== expectedLength) {
      return new Response("Range read failed", {
        status: 502,
        headers: { "Cache-Control": "no-store" },
      });
    }
    responseHeaders.set("Content-Range", `bytes ${range.start}-${range.end}/${object.size}`);
    responseHeaders.set("Content-Length", String(expectedLength));
    return new Response(isHead ? null : object.body, { status: 206, headers: responseHeaders });
  }

  responseHeaders.set("Content-Length", String(object.size));
  return new Response(isHead ? null : object.body, { status: 200, headers: responseHeaders });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = resolveMediaKey(url.pathname);

    if (!key) {
      if (url.pathname.startsWith("/api/")) return new Response("Not found", { status: 404 });
      return env.ASSETS.fetch(request);
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD", "X-Content-Type-Options": "nosniff" },
      });
    }

    try {
      return await serveMedia(request, env, key);
    } catch (error) {
      console.error("Public media read failed", error);
      return new Response("Media unavailable", {
        status: 503,
        headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
      });
    }
  },
};
