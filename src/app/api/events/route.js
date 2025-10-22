// src/app/api/events/route.js
export const revalidate = 86400; // 1 day ISR
export const dynamic = 'force-static';
export const fetchCache = 'force-cache';

// Include first gallery image as a fallback if heroImage is missing
const FIELDS = `
  _id,
  title,
  "slug": slug.current,
  start,
  end,
  allDay,
  location,
  description,
  "heroUrl": coalesce(heroImage.asset->url, gallery[0].asset->url)
`;

function groq(range) {
  const now = 'now()';
  if (range === 'upcoming')
    return `*[_type=="event" && defined(start) && start >= ${now}] | order(start asc){${FIELDS}}`;
  if (range === 'past')
    return `*[_type=="event" && defined(start) && start < ${now}] | order(start desc){${FIELDS}}`;
  return `*[_type=="event"] | order(start asc){${FIELDS}}`;
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const range = searchParams.get('range') || 'all';

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'pionkkje';
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
    const query = groq(range);
    const url = `https://${projectId}.api.sanity.io/v2023-10-10/data/query/${dataset}?query=${encodeURIComponent(
      query
    )}`;

    // tag ties this to your Sanity webhook
    const res = await fetch(url, { next: { revalidate, tags: ['sanity'] } });
    if (!res.ok) throw new Error(`Sanity ${res.status}`);
    const { result = [] } = await res.json();

    // Normalize for react-big-calendar
    const normalized = result.map((ev) => ({
      id: ev._id,
      title: ev.title,
      start: ev.start ? new Date(ev.start) : null,
      end: ev.end ? new Date(ev.end) : ev.start ? new Date(ev.start) : null,
      allDay: !!ev.allDay,
      location: ev.location || '',
      description: ev.description || '',
      heroUrl: ev.heroUrl || null,
      slug: ev.slug || null,
      href: ev.slug ? `/events/${ev.slug}` : null,
    }));

    return Response.json(
      { events: normalized, fetchedAt: Date.now() },
      {
        headers: {
          // Client: no reuse — always fresh after webhook
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          // Edge: ISR cache (fast, revalidated daily or on webhook)
          'CDN-Cache-Control': 's-maxage=86400, stale-while-revalidate=300',
        },
      }
    );
  } catch (e) {
    console.error('[events] error:', e);
    return Response.json(
      { events: [], fetchedAt: Date.now() },
      { status: 200 }
    );
  }
}
