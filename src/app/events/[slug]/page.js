// src/app/events/[slug]/page.js
import { notFound } from "next/navigation";
import styles from "./EventPage.module.css";
import Link from "next/link";
import { CalendarDays, Clock, MapPin, ArrowLeft } from "lucide-react";
import { RRule } from "rrule";

export const revalidate = 86400;
export const dynamic = "force-static";
export const fetchCache = "force-cache";

async function getEvent(slug) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "pionkkje";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const GROQ = `
    *[_type=="event" && slug.current==$slug][0]{
      _id, title, "slug": slug.current, start, end, allDay, location,
      description, recurrence,
      "heroUrl": coalesce(heroImage.asset->url, gallery[0].asset->url),
      "images": gallery[].asset->url
    }
  `;
  const qs = `query=${encodeURIComponent(GROQ)}&$slug=${encodeURIComponent(
    JSON.stringify(slug)
  )}`;
  const url = `https://${projectId}.api.sanity.io/v2023-10-10/data/query/${dataset}?${qs}`;

  const res = await fetch(url, { next: { revalidate, tags: ["sanity"] } });
  if (!res.ok) return null;

  const { result } = await res.json();
  return result;
}

/* ---------- Recurrence Helpers ---------- */
function formatRecurrence(recur) {
  if (!recur?.isRecurring) return "";

  const freqMap = {
    daily: "day",
    weekly: "week",
    monthly: "month",
    yearly: "year",
  };

  const days = (recur.daysOfWeek || [])
    .map(
      (d) =>
        ({
          MO: "Monday",
          TU: "Tuesday",
          WE: "Wednesday",
          TH: "Thursday",
          FR: "Friday",
          SA: "Saturday",
          SU: "Sunday",
        }[d])
    )
    .filter(Boolean);

  let text = "Happens every ";

  if (recur.interval && recur.interval > 1) {
    text += `${recur.interval} ${freqMap[recur.frequency] || "week"}s`;
  } else {
    text += `${freqMap[recur.frequency] || "week"}`;
  }

  if (days.length) text += ` on ${days.join(", ")}`;

  if (recur.until)
    text += ` until ${new Date(recur.until).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })}`;

  return text + ".";
}

function getNextOccurrence(event) {
  const recur = event.recurrence;
  if (!recur?.isRecurring || !event.start) return null;

  try {
    const rule = new RRule({
      freq: RRule[recur.frequency.toUpperCase()],
      interval: recur.interval || 1,
      byweekday: recur.daysOfWeek?.map((d) => RRule[d]),
      dtstart: new Date(event.start),
      until: recur.until ? new Date(recur.until) : undefined,
    });

    const after = rule.after(new Date(), true);
    return after ? new Date(after) : null;
  } catch (err) {
    console.error("[rrule] next occurrence failed", err);
    return null;
  }
}

function getUpcomingRecurrences(event, limit = 5) {
  const recur = event.recurrence;
  if (!recur?.isRecurring || !event.start) return [];

  try {
    const rule = new RRule({
      freq: RRule[recur.frequency.toUpperCase()],
      interval: recur.interval || 1,
      byweekday: recur.daysOfWeek?.map((d) => RRule[d]),
      dtstart: new Date(event.start),
      until: recur.until ? new Date(recur.until) : undefined,
      count: recur.count || undefined,
    });

    return rule
      .all()
      .slice(1, limit + 1)
      .map((date) => new Date(date));
  } catch (err) {
    console.error("[rrule] recurrence expansion failed", err);
    return [];
  }
}

/* ---------- Page ---------- */
export default async function EventPage({ params }) {
  const { slug } = params;
  const event = await getEvent(slug);
  if (!event) notFound();

  const startDate = event.start ? new Date(event.start) : null;
  const endDate = event.end ? new Date(event.end) : null;
  const isPast = startDate ? startDate.getTime() < Date.now() : false;
  const upcoming = getUpcomingRecurrences(event);

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <>
      {/* Hero section */}
      <div
        className={styles.heroContainer}
        style={{
          backgroundImage: event.heroUrl ? `url(${event.heroUrl})` : "none",
        }}
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
          <Link href="/calendar" className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>Back to Events</span>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* ---------- Main content ---------- */}
            <div className="md:col-span-2">
              {event.description && (
                <div className="mb-12">
                  <h2 className="text-2xl font-serif text-slate-800 mb-4">
                    About This Event
                  </h2>
                  <p className="text-slate-700 leading-relaxed text-lg">
                    {event.description}
                  </p>
                </div>
              )}

              {/* 🗓️ Upcoming Dates */}
              {upcoming.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-serif text-slate-800 mb-4">
                    Upcoming Dates
                  </h2>
                  <ul className="text-slate-700 space-y-2">
                    {upcoming.map((d, i) => (
                      <li key={i}>
                        {formatDate(d)} at {formatTime(d)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Gallery */}
              {event.images?.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-serif text-slate-800 mb-6">
                    Gallery
                  </h2>
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

            {/* ---------- Sidebar ---------- */}
            <div className="md:col-span-1">
              <div className={styles.eventDetails}>
                <h3 className="text-xl font-serif text-slate-800 mb-6">
                  Event Details
                </h3>

                {/* Date */}
                {startDate && (
                  <div className="flex items-start mb-6">
                    <div className={styles.iconWrapper}>
                      <CalendarDays size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">Date</h4>
                      <p className="text-slate-600">{formatDate(startDate)}</p>
                      {endDate &&
                        startDate.toDateString() !== endDate.toDateString() && (
                          <p className="text-slate-600 mt-1">
                            to {formatDate(endDate)}
                          </p>
                        )}
                    </div>
                  </div>
                )}

                {/* Time */}
                {startDate && !event.allDay && (
                  <div className="flex items-start mb-6">
                    <div className={styles.iconWrapper}>
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">Time</h4>
                      <p className="text-slate-600">{formatTime(startDate)}</p>
                      {endDate && (
                        <p className="text-slate-600 mt-1">
                          to {formatTime(endDate)}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Location */}
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

                {/* Recurrence Summary */}
                {event.recurrence?.isRecurring && (
                  <div className="flex items-start mb-6">
                    <div className={styles.iconWrapper}>
                      <CalendarDays size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">Recurrence</h4>
                      <p className="text-slate-600">
                        {formatRecurrence(event.recurrence)}
                      </p>
                      {getNextOccurrence(event) && (
                        <p className="text-slate-600 mt-1">
                          Next: {formatDate(getNextOccurrence(event))}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Add to Calendar */}
                <div className="mt-8">
                  <a
                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                      event.title
                    )}&dates=${
                      startDate
                        ? startDate.toISOString().replace(/-|:|\.\d+/g, "")
                        : ""
                    }/${
                      endDate
                        ? endDate.toISOString().replace(/-|:|\.\d+/g, "")
                        : ""
                    }&details=${encodeURIComponent(
                      event.description || ""
                    )}&location=${encodeURIComponent(event.location || "")}`}
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
  );
}

/* ---------- Static Params ---------- */
export async function generateStaticParams() {
  const pid = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "pionkkje";
  const ds = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const q = `*[_type=="event" && defined(slug.current)][0...50]{ "slug": slug.current }`;
  const url = `https://${pid}.api.sanity.io/v2023-10-10/data/query/${ds}?query=${encodeURIComponent(
    q
  )}`;
  const r = await fetch(url, { cache: "no-store" });
  const { result = [] } = await r.json();
  return result.map((e) => ({ slug: e.slug }));
}
