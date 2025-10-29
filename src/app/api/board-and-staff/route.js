import { NextResponse } from "next/server";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export async function GET() {
  const query = `
    *[_type == "boardAndStaffPage"][0]{
      "trustees": trustees[]->{
        name, role,
        "photoUrl": photo.asset->url
      },
      "trusteesEmeritus": trusteesEmeritus[]->{
        name, role,
        "photoUrl": photo.asset->url
      },
      "staff": staff[]->{
        name, role,
        "photoUrl": photo.asset->url
      }
    }
  `;
  const url = `https://${projectId}.api.sanity.io/v2023-10-10/data/query/${dataset}?query=${encodeURIComponent(
    query
  )}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Sanity error: ${res.status}`);
    const json = await res.json();
    return NextResponse.json(json.result || {});
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}