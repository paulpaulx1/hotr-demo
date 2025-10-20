// src/app/api/hero-carousel/route.js
export const revalidate = 86400; // 1 day — ISR handled by Next/Vercel
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store"; // ✅ disables outer CDN cache



const query = `
  *[_type == "carouselItem" && active == true] | order(order asc) {
    _id,
    title,
    mediaType,
    mediaSource,
    "imageUrl": select(mediaSource == "file" => image.asset->url, mediaSource == "url" => imageUrl),
    "videoUrl": select(mediaSource == "file" => video.asset->url, mediaSource == "url" => videoUrl),
    "posterImageUrl": select(mediaSource == "file" => posterImage.asset->url, mediaSource == "url" => posterImageUrl),
    services,
    description
  }
`;

export async function GET() {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "pionkkje";
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
    const url = `https://${projectId}.apicdn.sanity.io/v2023-10-10/data/query/${dataset}?query=${encodeURIComponent(query)}`;

    // Tag ensures revalidateTag('sanity') clears this cache
    const res = await fetch(url, { next: { revalidate, tags: ["sanity"] } });

    if (!res.ok) {
      return Response.json(
        { result: [], fetchedAt: Date.now() },
        { status: 200 }
      );
    }

    const { result } = await res.json();

    // 🧠 dual-layer caching:
    // - Browsers: no-store (always refetch from edge)
    // - Vercel Edge / ISR: still caches (s-maxage)
    return Response.json(
      { result: result || [], fetchedAt: Date.now() },
      {
        headers: {
          // Browser caching OFF — ensures editors & users always see fresh data
          "Cache-Control": "no-store, no-cache, must-revalidate",

          // Edge (Vercel / CDN) caching ON — keeps site fast
          "CDN-Cache-Control": "s-maxage=86400, stale-while-revalidate=300",
        },
      }
    );
  } catch (err) {
    console.error("[hero-carousel] Fetch error:", err);
    return Response.json(
      { result: [], fetchedAt: Date.now() },
      { status: 200 }
    );
  }
}
