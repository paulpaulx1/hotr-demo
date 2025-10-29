// src/app/api/events/route.js
import { RRule } from 'rrule'

export const revalidate = 86400 // 1 day ISR
export const dynamic = 'force-static'
export const fetchCache = 'force-cache'

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
  recurrence,
  "heroUrl": coalesce(heroImage.asset->url, gallery[0].asset->url)
`

function groq(range) {
  const now = 'now()'
  if (range === 'upcoming')
    return `*[_type=="event" && defined(start) && start >= ${now}] | order(start asc){${FIELDS}}`
  if (range === 'past')
    return `*[_type=="event" && defined(start) && start < ${now}] | order(start desc){${FIELDS}}`
  return `*[_type=="event"] | order(start asc){${FIELDS}}`
}

/**
 * Expand recurring events into multiple concrete occurrences.
 */
function expandRecurringEvents(events) {
  const expanded = []

  for (const ev of events) {
    const recur = ev.recurrence
    if (recur?.isRecurring && recur.frequency) {
      try {
        const freq = RRule[recur.frequency.toUpperCase()]
        const rule = new RRule({
          freq,
          interval: recur.interval || 1,
          byweekday: recur.daysOfWeek?.map((d) => RRule[d]),
          dtstart: new Date(ev.start),
          until: recur.until ? new Date(recur.until) : undefined,
          count: recur.count || undefined,
        })

        const duration = ev.end
          ? new Date(ev.end).getTime() - new Date(ev.start).getTime()
          : 0

        rule.all().forEach((date) => {
          expanded.push({
            ...ev,
            start: date,
            end: duration ? new Date(date.getTime() + duration) : date,
          })
        })
      } catch (err) {
        console.error('[rrule] expansion failed:', err)
        expanded.push(ev)
      }
    } else {
      expanded.push(ev)
    }
  }

  return expanded
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const range = searchParams.get('range') || 'all'

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'pionkkje'
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
    const query = groq(range)
    const url = `https://${projectId}.api.sanity.io/v2023-10-10/data/query/${dataset}?query=${encodeURIComponent(
      query
    )}`

    const res = await fetch(url, { next: { revalidate, tags: ['sanity'] } })
    if (!res.ok) throw new Error(`Sanity ${res.status}`)
    const { result = [] } = await res.json()

    // Normalize for react-big-calendar
    const normalized = result.map((ev) => ({
      id: ev._id,
      title: ev.title,
      start: ev.start ? new Date(ev.start) : null,
      end: ev.end ? new Date(ev.end) : ev.start ? new Date(ev.start) : null,
      allDay: !!ev.allDay,
      location: ev.location || '',
      description: ev.description || '',
      recurrence: ev.recurrence || null,
      heroUrl: ev.heroUrl || null,
      slug: ev.slug || null,
      href: ev.slug ? `/events/${ev.slug}` : null,
    }))

    // ✅ Expand recurring events into multiple concrete instances
    const expanded = expandRecurringEvents(normalized)

    return Response.json(
      { events: expanded, fetchedAt: Date.now() },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'CDN-Cache-Control': 's-maxage=86400, stale-while-revalidate=300',
        },
      }
    )
  } catch (e) {
    console.error('[events] error:', e)
    return Response.json({ events: [], fetchedAt: Date.now() }, { status: 200 })
  }
}
