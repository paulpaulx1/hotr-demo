// src/app/events/[slug]/page.js
import { notFound } from 'next/navigation'
import styles from './EventPage.module.css'
import Link from 'next/link'
import { CalendarDays, Clock, MapPin, ArrowLeft } from 'lucide-react'

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
  `
  const qs = `query=${encodeURIComponent(GROQ)}&$slug=${encodeURIComponent(JSON.stringify(slug))}`
  return `https://${projectId}.api.sanity.io/v2023-10-10/data/query/${dataset}?${qs}`
}

export default async function EventPage({ params }) {
  // ✅ `params` is a plain object, not a promise — remove await
  const { slug } = params
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'pionkkje'
  const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  const url = buildQuery(projectId, dataset, slug)

  const res = await fetch(url, { next: { revalidate, tags: ['sanity'] } })
  if (!res.ok) return notFound()

  const { result: event } = await res.json()
  if (!event) return notFound()

  const startDate = event.start ? new Date(event.start) : null
  const endDate = event.end ? new Date(event.end) : null
  const isPast = startDate ? startDate.getTime() < Date.now() : false

  const formatDate = (date) =>
    date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })

  const formatTime = (date) =>
    date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    })

  return (
    <>
      {/* Hero section */}
      <div
        className={styles.heroContainer}
        style={{ backgroundImage: event.heroUrl ? `url(${event.heroUrl})` : 'none' }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className="container mx-auto px-6">
            {isPast && (
              <span className="inline-block bg-amber-600 text-white px-3 py-1 rounded-md text-sm mb-4">
                Past Event
              </span>
            )}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      <main className="bg-white">
        <div className="container mx-auto px-6 py-12">
          {/* Back button */}
          <Link href="/calendar" className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>Back to Events</span>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Main content */}
            <div className="md:col-span-2">
              {event.description && (
                <div className="mb-12">
                  <h2 className="text-2xl font-serif text-slate-800 mb-4">About This Event</h2>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-700 leading-relaxed text-lg">{event.description}</p>
                  </div>
                </div>
              )}

              {/* Gallery */}
              {event.images?.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-serif text-slate-800 mb-6">Gallery</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {event.images.map((src, index) => (
                      <div key={index} className={styles.galleryImageWrapper}>
                        <img src={src} alt="" className={styles.galleryImage} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className={styles.eventDetails}>
                <h3 className="text-xl font-serif text-slate-800 mb-6">Event Details</h3>

                {startDate && (
                  <div className="flex items-start mb-6">
                    <div className={styles.iconWrapper}>
                      <CalendarDays size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">Date</h4>
                      <p className="text-slate-600">{formatDate(startDate)}</p>
                      {endDate && startDate.toDateString() !== endDate.toDateString() && (
                        <p className="text-slate-600 mt-1">to {formatDate(endDate)}</p>
                      )}
                    </div>
                  </div>
                )}

                {startDate && !event.allDay && (
                  <div className="flex items-start mb-6">
                    <div className={styles.iconWrapper}>
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">Time</h4>
                      <p className="text-slate-600">{formatTime(startDate)}</p>
                      {endDate && (
                        <p className="text-slate-600 mt-1">to {formatTime(endDate)}</p>
                      )}
                    </div>
                  </div>
                )}

                {event.location && (
                  <div className="flex items-start mb-6">
                    <div className={styles.iconWrapper}>
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">Location</h4>
                      <p className="text-slate-600">{event.location}</p>
                    </div>
                  </div>
                )}

                {/* ✅ Fixed missing <a> tag */}
                <div className="mt-8">
                  <a
                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate ? startDate.toISOString().replace(/-|:|\.\d+/g, '') : ''}/${endDate ? endDate.toISOString().replace(/-|:|\.\d+/g, '') : ''}&details=${encodeURIComponent(event.description || '')}&location=${encodeURIComponent(event.location || '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.addToCalendarButton}
                  >
                    Add to Calendar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

// Pre-render up to 50 slugs
export async function generateStaticParams() {
  const pid = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'pionkkje'
  const ds  = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  const q   = `*[_type=="event" && defined(slug.current)][0...50]{ "slug": slug.current }`
  const url = `https://${pid}.api.sanity.io/v2023-10-10/data/query/${ds}?query=${encodeURIComponent(q)}`
  const r   = await fetch(url, { cache: 'no-store' })
  const { result = [] } = await r.json()
  return result.map(e => ({ slug: e.slug }))
}
