// ✅ Hybrid: ISR + Webhook invalidation + fresh Sanity origin
export const revalidate = 86400; // 1 day (or however long you want)
export const fetchCache = "force-cache"; // let ISR cache at edge
export const dynamic = "force-static";   // make route cacheable

const query = `
  *[_type == "carouselItem" && active == true] | order(order asc) {
    _id,
    title,
    mediaType,
    mediaSource,
    "imageUrl": select(
      mediaSource == "file" => image.asset->url,
      mediaSource == "url" => imageUrl
    ),
    "videoUrl": select(
      mediaSource == "file" => video.asset->url,
      mediaSource == "url" => videoUrl
    ),
    "posterImageUrl": select(
      mediaSource == "file" => posterImage.asset->url,
      mediaSource == "url" => posterImageUrl
    ),
    services,
    description
  }
`;

export async function GET() {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "pionkkje";
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
    const url = `https://${projectId}.api.sanity.io/v2023-10-10/data/query/${dataset}?query=${encodeURIComponent(query)}`;

    // ✅ ISR caching + tag invalidation
    const res = await fetch(url, {
      next: { revalidate, tags: ["sanity"] },
    });

    if (!res.ok) throw new Error(`Sanity fetch failed: ${res.status}`);

    const { result } = await res.json();
    return Response.json(
      { result, fetchedAt: Date.now() },
      { headers: { "Cache-Control": "s-maxage=86400, stale-while-revalidate=300" } }
    );
  } catch (err) {
    console.error("[hero-carousel] error:", err);
    return Response.json({ result: [], fetchedAt: Date.now() }, { status: 200 });
  }
}
