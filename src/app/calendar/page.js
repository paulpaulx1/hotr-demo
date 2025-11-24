// src/app/calendar/page.js
import CalendarSection from "../components/events/CalendarSection";

export const revalidate = 86400; // 24h ISR

async function getEvents() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  // ✅ Include recurrence fields
  const query = `
    *[_type == "event" && defined(start)] | order(start asc) {
      _id,
      title,
      "slug": slug.current,
      start,
      end,
      allDay,
      featured,
      location,
      description,
      "heroUrl": coalesce(heroImage.asset->url, gallery[0].asset->url),
      recurrence {
        isRecurring,
        frequency,
        interval,
        daysOfWeek,
        count,
        until
      }
    }
  `;

  const url = `https://${projectId}.apicdn.sanity.io/v2023-10-10/data/query/${dataset}?query=${encodeURIComponent(
    query
  )}`;

  const res = await fetch(url, {
    next: { revalidate: 86400, tags: ["sanity"] },
  });

  if (!res.ok) throw new Error(`Sanity fetch failed: ${res.status}`);
  const { result } = await res.json();
  return result || [];
}

export default async function CalendarPage() {
  const events = await getEvents();

  return (
    <main className="container mx-auto px-4 py-12 mt-10 max-w-5xl">
      <CalendarSection initialEvents={events} />
    </main>
  );
}
