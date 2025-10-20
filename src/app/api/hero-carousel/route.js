// src/app/api/hero-carousel/route.js
// You can make this longer now that you have webhook invalidation
export const revalidate = 86400; // 1 day

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

    // IMPORTANT: add tags so revalidateTag('sanity') clears this cache
    const res = await fetch(url, { next: { revalidate, tags: ["sanity"] } });

    if (!res.ok) {
      return Response.json({ result: [], fetchedAt: Date.now() }, { status: 200 });
    }

    const { result } = await res.json();

    // Cache-Control header is optional; ISR already handles it. Safe to keep.
    return Response.json(
      { result: result || [], fetchedAt: Date.now() }, // fetchedAt helps you verify revalidation
      { headers: { "Cache-Control": "s-maxage=86400, stale-while-revalidate=300" } }
    );
  } catch {
    return Response.json({ result: [], fetchedAt: Date.now() }, { status: 200 });
  }
}
