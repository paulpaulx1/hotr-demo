// app/api/films/route.js
import { NextResponse } from 'next/server';

export const revalidate = 3600;

export async function GET() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  const query = encodeURIComponent(`
    *[_type == "film"] | order(year desc) {
      _id,
      title,
      year,
      type,
      description,
      filmingLocation,
      notableDetails,
      "images": images[].asset->url
    }
  `);

  const res = await fetch(
    `https://${projectId}.api.sanity.io/v2023-10-10/data/query/${dataset}?query=${query}`
  );
  const { result } = await res.json();
  return NextResponse.json({ result });
}
