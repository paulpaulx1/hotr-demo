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
  const [isMobile, setIsMobile] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1024);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");
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
  // ✅ Normalize + expand recurring events based on Sanity schema
  const rbcEvents = useMemo(() => {
    const seen = new Set();

    const expandRecurrence = (event) => {
      const rec = event.recurrence;
      if (!rec?.isRecurring || !rec.frequency) return [event];

      const freq = rec.frequency.toLowerCase();
      const interval = rec.interval || 1;
      const count = rec.count || 50; // max 50 repeats safeguard
      const until = rec.until ? new Date(rec.until) : null;
      const daysOfWeek = rec.daysOfWeek || [];

      const instances = [];
      const start = new Date(event.start);
      const end = event.end ? new Date(event.end) : new Date(event.start);

      // daily, weekly, monthly, yearly
      for (let i = 0; i < count; i++) {
        const nextStart = new Date(start);
        const nextEnd = new Date(end);

        if (freq === "daily") {
          nextStart.setDate(start.getDate() + i * interval);
          nextEnd.setDate(end.getDate() + i * interval);
        } else if (freq === "weekly") {
          // generate for selected days or default to same weekday
          const baseWeekday = start.getDay();
          const activeDays = daysOfWeek.length
            ? daysOfWeek.map((d) =>
                ["SU", "MO", "TU", "WE", "TH", "FR", "SA"].indexOf(d)
              )
            : [baseWeekday];
          activeDays.forEach((day) => {
            const next = new Date(start);
            const weekOffset = i * interval * 7;
            next.setDate(start.getDate() + weekOffset + (day - baseWeekday));
            const nextE = new Date(next);
            nextE.setTime(next.getTime() + (end - start));
            if (!until || next <= until) {
              instances.push({ ...event, start: next, end: nextE });
            }
          });
          continue;
        } else if (freq === "monthly") {
          nextStart.setMonth(start.getMonth() + i * interval);
          nextEnd.setMonth(end.getMonth() + i * interval);
        } else if (freq === "yearly") {
          nextStart.setFullYear(start.getFullYear() + i * interval);
          nextEnd.setFullYear(end.getFullYear() + i * interval);
        }

        if (!until || nextStart <= until) {
          instances.push({ ...event, start: nextStart, end: nextEnd });
        }
      }

      return instances;
    };

    // expand all events
    const expanded = [];
    (events || []).forEach((e) => {
      if (!e.start) return;
      const baseStart = new Date(e.start);
      const baseEnd = e.end ? new Date(e.end) : baseStart;
      if (isNaN(baseStart) || isNaN(baseEnd)) return;

      const base = {
        ...e,
        start: baseStart,
        end: baseEnd,
        allDay: !!e.allDay,
        href: e.href || (e.slug ? `/events/${e.slug}` : null),
      };

      const series = expandRecurrence(base);
      series.forEach((evt) => {
        const id = `${evt.title}-${evt.start.toISOString()}`;
        if (!seen.has(id)) {
          seen.add(id);
          expanded.push(evt);
        }
      });
    });

    return expanded.sort((a, b) => a.start - b.start);
  }, [events]);

  const handleNavigate = useCallback((newDate) => setCurrentDate(newDate), []);

  const handleSelectSlot = useCallback((slotInfo) => {
    setCurrentDate(slotInfo.start);
    setCurrentView("day");
  }, []);

  // ✅ Custom toolbar
  const CustomToolbar = ({ label, onNavigate, view, onView }) => (
    <div className={styles.customToolbar}>
      <button
        className={styles.navButton}
        onClick={() => onNavigate("PREV")}
        aria-label={view === "month" ? "Previous month" : "Previous day"}
      >
        ← Previous {view === "month" ? "Month" : "Day"}
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
        {/* Add view toggle button below the label */}
        {view === "day" && (
          <button
            onClick={() => onView("month")}
            className={styles.backToMonthButton}
            aria-label="Back to month view"
          >
            ← Back to Month
          </button>
        )}
      </div>

      <button
        className={styles.navButton}
        onClick={() => onNavigate("NEXT")}
        aria-label={view === "month" ? "Next month" : "Next day"}
      >
        Next {view === "month" ? "Month" : "Day"} →
      </button>
    </div>
  );

  // ✅ Event cell
  const EventComponent = ({ event }) => (
    <div className={styles.eventItem}>
      <div className={styles.eventTitle}>{event.title}</div>
      {event.start && (
        <div className={styles.eventTime}>
          {event.start.toLocaleTimeString([], {
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
          titleAccessor="title"
          allDayAccessor="allDay"
          components={{ event: EventComponent, toolbar: CustomToolbar }}
          popup
          views={{ month: true, day: true }} // ✅ Enable both views
          view={currentView} // ✅ Use state for current view
          onView={setCurrentView} // ✅ Handle view changes
          date={currentDate}
          onNavigate={handleNavigate}
          onSelectSlot={handleSelectSlot} // ✅ Handle day cell clicks
          selectable // ✅ Enable slot selection
          onSelectEvent={(event) => event?.href && router.push(event.href)}
          showMultiDayTimes={false}
          /* ⭐️ NEW: BUSINESS HOURS LIMITS */
          min={new Date(1970, 1, 1, 6, 0)} // start day view at 6:00am
          max={new Date(1970, 1, 1, 22, 0)} // end at 10:00pm
        />
      </div>
    </div>
  );
}
