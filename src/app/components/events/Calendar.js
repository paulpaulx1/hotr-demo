"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useRouter } from "next/navigation";
import styles from "./Calendar.module.css";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date),
  getDay,
  locales,
});

export default function EventsCalendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  // Fetch events
  useEffect(() => {
    fetch("/api/events?range=all", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setEvents(d.events || []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  const rbcEvents = useMemo(() => {
    return (events || [])
      .map((e) => {
        const start = e.start ? new Date(e.start) : null;
        const end = e.end ? new Date(e.end) : start;
        return {
          ...e,
          start,
          end,
          allDay: Boolean(e.allDay),
          href: e.href || (e.slug ? `/events/${e.slug}` : null),
        };
      })
      .filter((e) => e.start && e.end);
  }, [events]);

  if (loading)
    return <div className={styles.loadingState}>Loading calendar…</div>;
  if (!rbcEvents.length)
    return <div className={styles.emptyState}>No events scheduled.</div>;

  // Event component with hover behavior
  const EventComponent = ({ event }) => (
    <div
      className={styles.eventItem}
      onMouseEnter={(e) => {
        const parentCell = e.currentTarget.closest(
          ".rbc-event-content, .rbc-day-bg, .rbc-row-segment"
        );
        setHoveredEvent(event);
        setAnchorEl(parentCell);
      }}
      onMouseLeave={() => {
        setTimeout(() => setHoveredEvent(null), 120);
      }}
      onClick={() => event.href && router.push(event.href)}
    >
      <div className={styles.eventTitle}>{event.title}</div>
    </div>
  );

  const hoverPosition = (() => {
    if (!anchorEl) return { top: 0, left: 0 };

    // Anchor to the nearest full calendar cell instead of the small event div
    const cell =
      anchorEl.closest(".rbc-day-bg, .rbc-date-cell, .rbc-row-segment") ||
      anchorEl;
    const rect = cell.getBoundingClientRect();

    const cardHeight = 200; // estimated tooltip height (image + text)
    const gap = 8; // spacing between event and tooltip

    const top = rect.top + window.scrollY - cardHeight - gap;
    const left = rect.left + rect.width / 2 + window.scrollX;

    return { top, left };
  })();

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.calendarContainer}>
        <Calendar
          localizer={localizer}
          events={rbcEvents}
          startAccessor="start"
          endAccessor="end"
          components={{ event: EventComponent }}
          popup
          views={["month", "agenda"]}
        />
      </div>

      {hoveredEvent && (
        <div
          className={styles.hoverCard}
          style={{ top: hoverPosition.top, left: hoverPosition.left }}
          onMouseEnter={() => setHoveredEvent(hoveredEvent)}
          onMouseLeave={() => setHoveredEvent(null)}
        >
          {hoveredEvent.heroUrl && (
            <img
              src={hoveredEvent.heroUrl}
              alt={hoveredEvent.title}
              className={styles.hoverImage}
            />
          )}
          <div className={styles.hoverContent}>
            <h4>{hoveredEvent.title}</h4>
            {hoveredEvent.start && (
              <p className={styles.hoverTime}>
                {new Date(hoveredEvent.start).toLocaleString([], {
                  dateStyle: "long",
                  timeStyle: "short",
                })}
              </p>
            )}
            {hoveredEvent.description && (
              <p>{hoveredEvent.description.slice(0, 140)}…</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
