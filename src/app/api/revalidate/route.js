// src/app/api/revalidate/route.js
import { revalidateTag } from "next/cache";

export async function POST(req) {
  // --- logging to verify it's being hit ---
  const url = new URL(req.url);
  const hdrSecret = req.headers.get("x-sanity-secret");
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const ua = req.headers.get("user-agent") || "unknown";

  console.log("[revalidate] hit", {
    path: url.pathname,
    ip,
    ua,
    hasSecretHeader: Boolean(hdrSecret),
  });

  // --- auth check ---
  if (hdrSecret !== process.env.SANITY_WEBHOOK_SECRET) {
    console.warn("[revalidate] unauthorized");
    return new Response("Unauthorized", { status: 401 });
  }

  // (optional) inspect payload if you want
  let body = {};
  try {
    body = await req.json();
    console.log("[revalidate] payload type:", body?._type || body?.type || "unknown");
  } catch {
    // ignore parse errors; Sanity may send empty body on some tests
  }

  // invalidate EVERYTHING tagged "sanity"
  revalidateTag("sanity");

  console.log("[revalidate] revalidated tag: sanity");
  return Response.json({ ok: true, revalidated: true });
}
