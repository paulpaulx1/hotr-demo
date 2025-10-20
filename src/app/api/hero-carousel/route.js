// src/app/api/hero-carousel/route.js
export const revalidate = 300; // cache for 5 minutes on the server (ISR)

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
    const encoded = encodeURIComponent(query);

    // Hit the Sanity *CDN* (fast + globally cached)
    const res = await fetch(
      `https://${projectId}.apicdn.sanity.io/v2023-10-10/data/query/${dataset}?query=${encoded}`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) {
      // fall back to empty result; you could also bubble the error
      return Response.json({ result: [] }, { status: 200 });
    }

    const { result } = await res.json();

    // Optional: add edge cache headers (works great on Vercel)
    return Response.json(
      { result: result || [] },
      { headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=60" } }
    );
  } catch (err) {
    // Avoid leaking details; return empty array so UI can render gracefully
    return Response.json({ result: [] }, { status: 200 });
  }
}