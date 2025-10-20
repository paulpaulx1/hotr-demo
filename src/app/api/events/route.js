// src/app/api/events/route.js
export const revalidate = 86400;         // ISR at the edge (1 day)
export const dynamic = 'force-static';
export const fetchCache = 'force-cache';

const FIELDS = `
  _id, title, "slug": slug.current, start, end, allDay, location, description,
  "imageUrl": heroImage.asset->url
`;

function groq(range) {
  const now = 'now()';
  if (range === 'upcoming') return `*[_type=="event" && defined(start) && start >= ${now}] | order(start asc){${FIELDS}}`;
  if (range === 'past')     return `*[_type=="event" && defined(start) && start <  ${now}] | order(start desc){${FIELDS}}`;
  return `*[_type=="event"] | order(start asc){${FIELDS}}`;
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const range = searchParams.get('range') || 'all';

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'pionkkje';
    const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
    const query     = groq(range);
    const url = `https://${projectId}.api.sanity.io/v2023-10-10/data/query/${dataset}?query=${encodeURIComponent(query)}`;

    // Important: tag ties this to your webhook revalidation
    const res = await fetch(url, { next: { revalidate, tags: ['sanity'] } });
    if (!res.ok) throw new Error(`Sanity ${res.status}`);
    const { result = [] } = await res.json();

    const normalized = result.map(ev => ({
      id: ev._id,
      title: ev.title,
      start: ev.start || null,
      end: ev.end || ev.start || null, // RBC fallback
      allDay: !!ev.allDay,
      location: ev.location || '',
      description: ev.description || '',
      imageUrl: ev.imageUrl || null,
      slug: ev.slug || null,           // ✨ return slug string only
      href: ev.slug ? `/events/${ev.slug}` : null
    }));

    return Response.json(
      { events: normalized, fetchedAt: Date.now() },
      {
        headers: {
          // ✅ Browser: never reuse — immediate freshness after webhook
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          // ✅ Edge (Vercel): keep ISR speed; webhook busts via tag
          'CDN-Cache-Control': 's-maxage=86400, stale-while-revalidate=300'
        }
      }
    );
  } catch (e) {
    console.error('[events] error:', e);
    return Response.json({ events: [], fetchedAt: Date.now() }, { status: 200 });
  }
}
