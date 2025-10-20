// src/app/api/hero-carousel/route.js
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

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
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "pionkkje";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const url = `https://${projectId}.apicdn.sanity.io/v2023-10-10/data/query/${dataset}?query=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url); // no cache options here
    const { result } = await res.json();
    return Response.json({ result, fetchedAt: Date.now() });
  } catch (err) {
    console.error("Failed to fetch from Sanity:", err);
    return Response.json({ result: [], fetchedAt: Date.now() });
  }
}
