// src/app/events/[slug]/page.js
import { notFound } from 'next/navigation'

export const revalidate = 86400            // ISR daily; webhook busts immediately
export const dynamic = 'force-static'
export const fetchCache = 'force-cache'

function buildQuery(projectId, dataset, slug) {
  const GROQ = `
    *[_type=="event" && slug.current==$slug][0]{
      _id, title, "slug": slug.current, start, end, allDay, location,
      description, "heroUrl": heroImage.asset->url, body,
      "images": gallery[].asset->url
    }
  `;
  const qs = `query=${encodeURIComponent(GROQ)}&$slug=${encodeURIComponent(JSON.stringify(slug))}`;
  return `https://${projectId}.api.sanity.io/v2023-10-10/data/query/${dataset}?${qs}`;
}


export default async function EventPage({ params }) {
  const { slug } = await params  // some Next versions pass params as a promise
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'pionkkje'
  const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  const url = buildQuery(projectId, dataset, slug)

  const res = await fetch(url, { next: { revalidate, tags: ['sanity'] } })
  if (!res.ok) return notFound()

  const { result: event } = await res.json()
  if (!event) return notFound()

  const startDate = event.start ? new Date(event.start) : null
  const isPast = startDate ? startDate.getTime() < Date.now() : false

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 text-white">
      <h1 className="font-serif text-4xl mb-3">{event.title}</h1>

      {(event.start || event.location) && (
        <p className="text-white/70 mb-6">
          {event.start && new Date(event.start).toLocaleString('en-US', {
            dateStyle: 'long',
            timeStyle: event.end ? 'short' : undefined
          })}
          {event.location ? ` — ${event.location}` : ''}
          {isPast ? ' · Past event' : ''}
        </p>
      )}

      {event.heroUrl && (
        <img src={event.heroUrl} alt="" className="w-full rounded-xl border border-white/10 mb-8" />
      )}

      {event.description && (
        <p className="text-white/85 leading-relaxed mb-8">{event.description}</p>
      )}

      {/* TODO: plug in your Portable Text renderer here */}
      {/* {event.body && <PortableText value={event.body} />} */}

      {event.images?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
          {event.images.map((src) => (
            <img key={src} src={src} alt="" className="rounded-lg border border-white/10" />
          ))}
        </div>
      )}
    </main>
  )
}

// (Optional) Pre-render some slugs
export async function generateStaticParams() {
  const pid = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'pionkkje'
  const ds  = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  const q   = `*[_type=="event" && defined(slug.current)][0...50]{ "slug": slug.current }`
  const url = `https://${pid}.api.sanity.io/v2023-10-10/data/query/${ds}?query=${encodeURIComponent(q)}`
  const r   = await fetch(url, { cache: 'no-store' })
  const { result = [] } = await r.json()
  return result.map(e => ({ slug: e.slug }))
}
