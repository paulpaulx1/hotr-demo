// app/api/gallery/route.js
import { NextResponse } from 'next/server'

export const revalidate = 3600

export async function GET() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const query = encodeURIComponent(`*[_type=="galleryImage"]{_id,title,description,"url":image.asset->url}`)
  const res = await fetch(`https://${projectId}.api.sanity.io/v2023-10-10/data/query/${dataset}?query=${query}`)
  const { result } = await res.json()
  return NextResponse.json({ result })
}