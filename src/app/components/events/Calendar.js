"use client";

import React, { useMemo, useState, useCallback, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./Calendar.module.css";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date),
  getDay,
  locales,
});

export default function EventsCalendar({ events = [] }) {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, flipY: false, flipX: false });
  const [isMobile, setIsMobile] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1024);
  const [currentDate, setCurrentDate] = useState(new Date());
  const router = useRouter();

  // ✅ Resize detection
  useEffect(() => {
    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const w = window.innerWidth;
        setViewportWidth(w);
        setIsMobile(w < 768);
      }, 100);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Normalize + sort events
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
          allDay: !!e.allDay,
          href: e.href || (e.slug ? `/events/${e.slug}` : null),
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.start - b.start);
  }, [events]);

  // ✅ Tooltip positioning
  const tooltipStyle = useMemo(() => {
    const offsetY = 20;
    const offsetX = 14;
    const tooltipWidth = 280;

    let top = coords.y - offsetY;
    let transform = "translate(-50%, -100%)";
    if (coords.flipY) {
      top = coords.y + offsetY;
      transform = "translate(-50%, 0)";
    }

    const preferredLeft = coords.x + offsetX;
    const maxLeft = viewportWidth - tooltipWidth - 24;
    const left = coords.flipX
      ? Math.max(12, maxLeft)
      : Math.max(12, Math.min(preferredLeft, maxLeft));

    return { top, left, transform };
  }, [coords, viewportWidth]);

  // ✅ Hover tracking
  const handleMouseMove = useCallback(
    (e, event) => {
      if (isMobile) return;
      const tooltipWidth = 280;
      const tooltipHeight = 200;
      const padding = 16;
      const flipY = e.clientY - tooltipHeight - padding < 0;
      const flipX = e.clientX + tooltipWidth / 2 > viewportWidth;
      setCoords({ x: e.clientX, y: e.clientY, flipY, flipX });
      setHoveredEvent(event);
    },
    [isMobile, viewportWidth]
  );

  const handleNavigate = useCallback((newDate) => setCurrentDate(newDate), []);

  // ✅ Custom toolbar
  const CustomToolbar = ({ label, onNavigate }) => (
    <div className={styles.customToolbar}>
      <button
        className={styles.navButton}
        onClick={() => onNavigate("PREV")}
        aria-label="Previous month"
      >
        ← Previous Month
      </button>

      <div className={styles.toolbarLabelWrap} aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={label}
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
        className={styles.navButton}
        onClick={() => onNavigate("NEXT")}
        aria-label="Next month"
      >
        Next Month →
      </button>
    </div>
  );

  // ✅ Event cell
  const EventComponent = ({ event }) => (
    <div
      className={styles.eventItem}
      onMouseEnter={(e) => handleMouseMove(e, event)}
      onMouseMove={(e) => handleMouseMove(e, event)}
      onMouseLeave={() => !isMobile && setHoveredEvent(null)}
    >
      <div className={styles.eventTitle}>{event.title}</div>
      {event.start && (
        <div className={styles.eventTime}>
          {event.start.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
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
          titleAccessor="title"
          allDayAccessor="allDay"
          components={{ event: EventComponent, toolbar: CustomToolbar }}
          popup
          views={{ month: true }}
          view="month"
          date={currentDate}
          onNavigate={handleNavigate}
          onSelectEvent={(event) => event?.href && router.push(event.href)}
          showMultiDayTimes={false}
        />
      </div>

      {/* ✅ Hover card */}
      {hoveredEvent && hoveredEvent.href && !isMobile && (
        <a
  href={hoveredEvent.href}
  className={styles.hoverCard}
  style={tooltipStyle}
  onClick={(e) => {
    e.stopPropagation();        // don't bubble to calendar
    e.preventDefault();         // stop browser from jumping
    if (hoveredEvent?.href) router.push(hoveredEvent.href); // manual nav
  }}
  onMouseDown={(e) => e.stopPropagation()}
  onMouseLeave={() => setHoveredEvent(null)}
>
          {hoveredEvent.heroUrl && (
            <img
              src={`${hoveredEvent.heroUrl}?w=600&fit=crop&auto=format`}
              alt={hoveredEvent.title}
              className={styles.hoverImage}
            />
          )}
          <div className={styles.hoverContent}>
            <h4 className={styles.hoverTitle}>{hoveredEvent.title}</h4>
            {hoveredEvent.start && (
              <p className={styles.hoverTime}>
                {hoveredEvent.start.toLocaleString([], {
                  dateStyle: "long",
                  timeStyle: "short",
                })}
              </p>
            )}
            {hoveredEvent.description && (
              <p>{hoveredEvent.description.slice(0, 140)}…</p>
            )}
            <div className={styles.hoverCta}>View details →</div>
          </div>
        </a>
      )}
    </div>
  );
}
