"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
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
  const [isMobile, setIsMobile] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const tooltipStyle = useMemo(() => {
    const offsetY = 16;
    const tooltipWidth = 280;
    let top = coords.y - offsetY;
    let transform = "translate(-50%, -100%)";
    if (coords.flipY) {
      top = coords.y + offsetY;
      transform = "translate(-50%, 0)";
    }
    const left = coords.flipX ? window.innerWidth - tooltipWidth - 24 : coords.x;
    return { top, left, transform };
  }, [coords]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/events?range=all", { cache: "no-store" });
        const data = await res.json();
        setEvents(Array.isArray(data.events) ? data.events : []);
      } catch {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const rbcEvents = useMemo(() => {
    const seen = new Set();
    return (events || [])
      .map((e) => {
        if (!e.start) return null;
        const start = new Date(e.start);
        const end = e.end ? new Date(e.end) : start;
        if (isNaN(start) || isNaN(end)) return null;
        const id = `${e.title}-${start.toISOString()}`;
        if (seen.has(id)) return null;
        seen.add(id);
        return {
          ...e,
          start,
          end,
          allDay: Boolean(e.allDay),
          href: e.href || (e.slug ? `/events/${e.slug}` : null),
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.start - b.start);
  }, [events]);

  const handleMouseMove = (e, event) => {
    if (isMobile) return;
    const tooltipWidth = 280;
    const tooltipHeight = 200;
    const padding = 16;
    const flipY = e.clientY - tooltipHeight - padding < 0;
    const flipX = e.clientX + tooltipWidth / 2 > window.innerWidth;
    setCoords({ x: e.clientX, y: e.clientY, flipY, flipX });
    setHoveredEvent(event);
  };

  const handleNavigate = useCallback((newDate) => setCurrentDate(newDate), []);

  if (loading) return <div className={styles.loadingState}>Loading calendar…</div>;
  if (!rbcEvents.length) return <div className={styles.emptyState}>No events scheduled.</div>;

  const EventComponent = ({ event }) => (
    <div
      className={styles.eventItem}
      onMouseEnter={(e) => handleMouseMove(e, event)}
      onMouseMove={(e) => handleMouseMove(e, event)}
      onMouseLeave={() => !isMobile && setTimeout(() => setHoveredEvent(null), 100)}
      onClick={() => event.href && router.push(event.href)}
    >
      <div className={styles.eventTitle}>{event.title}</div>
      {event.start && (
        <div className={styles.eventTime}>
          {event.start.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
        </div>
      )}
    </div>
  );

  /* --- Custom Toolbar with fade + buttons --- */
  const CustomToolbar = ({ label, onNavigate }) => (
    <div className={styles.customToolbar} role="group" aria-label="Calendar navigation">
      <button
        type="button"
        className={styles.navButton}
        onClick={() => onNavigate("PREV")}
        aria-label="Previous month"
      >
        ← Previous Month
      </button>

      <div className={styles.toolbarLabelWrap} aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait">
          <motion.div
            key={label} // changes when month changes
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={styles.toolbarLabel}
          >
            {label}
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        type="button"
        className={styles.navButton}
        onClick={() => onNavigate("NEXT")}
        aria-label="Next month"
      >
        Next Month →
      </button>
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
          titleAccessor="title"
          allDayAccessor="allDay"
          components={{ event: EventComponent, toolbar: CustomToolbar }}
          popup
          views={{ month: true }}
          view="month"
          date={currentDate}
          onNavigate={handleNavigate}
          showMultiDayTimes={false}
        />
      </div>

      {hoveredEvent && !isMobile && (
        <div
          className={styles.hoverCard}
          style={tooltipStyle}
          onMouseLeave={() => setHoveredEvent(null)}
        >
          {hoveredEvent.heroUrl && (
            <img src={hoveredEvent.heroUrl} alt={hoveredEvent.title} className={styles.hoverImage} />
          )}
          <div className={styles.hoverContent}>
            <h4>{hoveredEvent.title}</h4>
            {hoveredEvent.start && (
              <p className={styles.hoverTime}>
                {hoveredEvent.start.toLocaleString([], { dateStyle: "long", timeStyle: "short" })}
              </p>
            )}
            {hoveredEvent.description && <p>{hoveredEvent.description.slice(0, 140)}…</p>}
          </div>
        </div>
      )}
    </div>
  );
}
