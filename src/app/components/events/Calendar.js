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
  const [coords, setCoords] = useState({ x: 0, y: 0, flipY: false, flipX: false });
  const router = useRouter();

  // --- Smart tooltip position (hook must always run) ---
  const tooltipStyle = useMemo(() => {
    const offsetY = 16;
    const offsetX = 0;
    const tooltipWidth = 280;

    let top = coords.y - offsetY;
    let transform = "translate(-50%, -100%)";

    if (coords.flipY) {
      top = coords.y + offsetY;
      transform = "translate(-50%, 0)";
    }

    const left = coords.flipX
      ? window.innerWidth - tooltipWidth - 24
      : coords.x + offsetX;

    return { top, left, transform };
  }, [coords]);

  // --- Fetch events ---
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

  // --- Smart hover handler (always defined) ---
  const handleMouseMove = (e, event) => {
    const tooltipWidth = 280;
    const tooltipHeight = 200;
    const padding = 16;

    const flipY = e.clientY - tooltipHeight - padding < 0;
    const flipX = e.clientX + tooltipWidth / 2 > window.innerWidth;

    setCoords({ x: e.clientX, y: e.clientY, flipY, flipX });
    setHoveredEvent(event);
  };

  // --- Render logic ---
  if (loading)
    return <div className={styles.loadingState}>Loading calendar…</div>;
  if (!rbcEvents.length)
    return <div className={styles.emptyState}>No events scheduled.</div>;

  const EventComponent = ({ event }) => (
    <div
      className={styles.eventItem}
      onMouseEnter={(e) => handleMouseMove(e, event)}
      onMouseMove={(e) => handleMouseMove(e, event)}
      onMouseLeave={() => setTimeout(() => setHoveredEvent(null), 120)}
      onClick={() => event.href && router.push(event.href)}
    >
      <div className={styles.eventTitle}>{event.title}</div>
      {event.start && (
        <div className={styles.eventTime}>
          {new Date(event.start).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })}
        </div>
      )}
    </div>
  );

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
          style={tooltipStyle}
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
