// src/components/events/Calendar.js
'use client'
import React, { useEffect, useState, useMemo } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { enUS } from 'date-fns/locale'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useRouter } from 'next/navigation'
import styles from './Calendar.module.css'

const locales = { 'en-US': enUS }
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date), // uses system locale start day
  getDay,
  locales,
})

export default function EventsCalendar() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/events?range=all', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => setEvents(d.events || []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false))
  }, [])

  const rbcEvents = useMemo(() => {
    return (events || [])
      .map((e) => {
        const start = e.start ? new Date(e.start) : null
        const end = e.end ? new Date(e.end) : start // fallback so RBC is happy
        return {
          ...e,
          start,
          end,
          allDay: Boolean(e.allDay),
          // single canonical URL for BOTH future & past events
          href: e.href || (e.slug ? `/events/${e.slug}` : null),
        }
      })
      .filter((e) => e.start && e.end)
  }, [events])

  if (loading) return <div className={styles.loadingState}>Loading calendar…</div>
  if (!rbcEvents.length) return <div className={styles.emptyState}>No events scheduled.</div>

  return (
    <div className={styles.calendarWrapper}>
      <Calendar
        localizer={localizer}
        events={rbcEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 520 }}
        popup
        views={['month', 'agenda']}
        onSelectEvent={(e) => {
          if (e?.href) router.push(e.href)
        }}
        // Optional: gray out past events a bit
        eventPropGetter={(event) => {
          const isPast = event.start && event.start.getTime() < Date.now()
          return {
            className: isPast ? 'opacity-75' : '',
          }
        }}
      />
    </div>
  )
}