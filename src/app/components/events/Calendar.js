"use client";

import React, { useMemo, useState, useCallback, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  startOfDay,
  isSameDay,
} from "date-fns";
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

  // ✅ Normalize + expand recurring events
  const rbcEvents = useMemo(() => {
    const seen = new Set();

    const expandRecurrence = (event) => {
      const rec = event.recurrence;
      if (!rec?.isRecurring || !rec.frequency) return [event];

      const freq = rec.frequency.toLowerCase();
      const interval = rec.interval || 1;
      const count = rec.count || 50;
      const until = rec.until ? new Date(rec.until) : null;
      const daysOfWeek = rec.daysOfWeek || [];

      const instances = [];
      const start = new Date(event.start);
      const end = event.end ? new Date(event.end) : new Date(event.start);

      for (let i = 0; i < count; i++) {
        const nextStart = new Date(start);
        const nextEnd = new Date(end);

        if (freq === "daily") {
          nextStart.setDate(start.getDate() + i * interval);
          nextEnd.setDate(end.getDate() + i * interval);
        } else if (freq === "weekly") {
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

  // ✅ Create event count map (for "+X more" display)
  const eventCountByDay = useMemo(() => {
    const map = new Map();
    rbcEvents.forEach((event) => {
      const dayKey = startOfDay(event.start).toISOString();
      if (!map.has(dayKey)) {
        map.set(dayKey, []);
      }
      map.get(dayKey).push(event);
    });
    return map;
  }, [rbcEvents]);

  // ✅ Filter events for display: prefer featured, one per day in month view
  const displayEvents = useMemo(() => {
    if (currentView === "day") {
      return rbcEvents;
    }

    // Month view: pick one event per day (prefer featured)
    const uniqueByDay = new Map();

    rbcEvents.forEach((event) => {
      const dayKey = startOfDay(event.start).toISOString();
      const existing = uniqueByDay.get(dayKey);

      // If no event yet, or this one is featured and existing isn't, use this one
      if (!existing || (event.featured && !existing.featured)) {
        uniqueByDay.set(dayKey, {
          ...event,
          _dayKey: dayKey, // Store for later lookup
        });
      }
    });

    return Array.from(uniqueByDay.values());
  }, [rbcEvents, currentView]);

  const handleNavigate = useCallback((newDate) => setCurrentDate(newDate), []);

  const handleSelectSlot = useCallback((slotInfo) => {
    setCurrentDate(slotInfo.start);
    setCurrentView("day");
  }, []);

  // ✅ Date cell hover effect
  // ✅ Date cell hover effect
  useEffect(() => {
    if (currentView !== "month") return;

    const handleHover = (e) => {
      let dayBg = null;

      // Case 1: Hovering the day-bg directly
      if (e.target.classList.contains("rbc-day-bg")) {
        dayBg = e.target;
      }
      // Case 2: Hovering a date cell
      else if (e.target.closest(".rbc-date-cell")) {
        const dateCell = e.target.closest(".rbc-date-cell");
        const monthRow = dateCell.closest(".rbc-month-row");
        if (!monthRow) return;

        const rowContent = monthRow.querySelector(".rbc-row-content");
        if (!rowContent) return;
        const dateCells = Array.from(
          rowContent.querySelectorAll(".rbc-date-cell")
        );
        const cellIndex = dateCells.indexOf(dateCell);

        const rowBg = monthRow.querySelector(".rbc-row-bg");
        if (!rowBg) return;
        const dayBgs = Array.from(rowBg.querySelectorAll(".rbc-day-bg"));
        dayBg = dayBgs[cellIndex];
      }
      // Case 3: Hovering an event
      else if (e.target.closest(".rbc-event")) {
        const event = e.target.closest(".rbc-event");
        const monthRow = event.closest(".rbc-month-row");
        if (!monthRow) return;

        const rowContent = monthRow.querySelector(".rbc-row-content");
        if (!rowContent) return;

        // Find which cell contains this event
        const eventWrapper = event.closest(".rbc-row-segment");
        const allSegments = Array.from(
          rowContent.querySelectorAll(".rbc-row-segment")
        );
        const cellIndex = allSegments.indexOf(eventWrapper);

        const rowBg = monthRow.querySelector(".rbc-row-bg");
        if (!rowBg) return;
        const dayBgs = Array.from(rowBg.querySelectorAll(".rbc-day-bg"));
        dayBg = dayBgs[cellIndex];
      }

      if (dayBg && !dayBg.classList.contains("rbc-today")) {
        dayBg.style.boxShadow = "inset 0 0 0 2px #1e293b";
        dayBg.style.borderRadius = "0.45rem";
      }
    };

    const handleLeave = (e) => {
      let dayBg = null;

      // Case 1: Leaving the day-bg directly
      if (e.target.classList.contains("rbc-day-bg")) {
        dayBg = e.target;
      }
      // Case 2: Leaving a date cell
      else if (e.target.closest(".rbc-date-cell")) {
        const dateCell = e.target.closest(".rbc-date-cell");
        const monthRow = dateCell.closest(".rbc-month-row");
        if (!monthRow) return;

        const rowContent = monthRow.querySelector(".rbc-row-content");
        if (!rowContent) return;
        const dateCells = Array.from(
          rowContent.querySelectorAll(".rbc-date-cell")
        );
        const cellIndex = dateCells.indexOf(dateCell);

        const rowBg = monthRow.querySelector(".rbc-row-bg");
        if (!rowBg) return;
        const dayBgs = Array.from(rowBg.querySelectorAll(".rbc-day-bg"));
        dayBg = dayBgs[cellIndex];
      }
      // Case 3: Leaving an event
      else if (e.target.closest(".rbc-event")) {
        const event = e.target.closest(".rbc-event");
        const monthRow = event.closest(".rbc-month-row");
        if (!monthRow) return;

        const rowContent = monthRow.querySelector(".rbc-row-content");
        if (!rowContent) return;

        const eventWrapper = event.closest(".rbc-row-segment");
        const allSegments = Array.from(
          rowContent.querySelectorAll(".rbc-row-segment")
        );
        const cellIndex = allSegments.indexOf(eventWrapper);

        const rowBg = monthRow.querySelector(".rbc-row-bg");
        if (!rowBg) return;
        const dayBgs = Array.from(rowBg.querySelectorAll(".rbc-day-bg"));
        dayBg = dayBgs[cellIndex];
      }

      if (dayBg && !dayBg.classList.contains("rbc-today")) {
        dayBg.style.boxShadow = "";
      }
    };

    const calendar = document.querySelector(".rbc-month-view");
    if (!calendar) return;

    calendar.addEventListener("mouseover", handleHover);
    calendar.addEventListener("mouseout", handleLeave);

    return () => {
      calendar.removeEventListener("mouseover", handleHover);
      calendar.removeEventListener("mouseout", handleLeave);
    };
  }, [currentView]);

  // ✅ Custom toolbar
  const CustomToolbar = ({ label, onNavigate, view, onView }) => (
    <div className={styles.customToolbar}>
      {!isMobile && (
        <button
          className={styles.navButton}
          onClick={() => onNavigate("PREV")}
          aria-label={view === "month" ? "Previous month" : "Previous day"}
        >
          ← Previous {view === "month" ? "Month" : "Day"}
        </button>
      )}

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

      {!isMobile && (
        <button
          className={styles.navButton}
          onClick={() => onNavigate("NEXT")}
          aria-label={view === "month" ? "Next month" : "Next day"}
        >
          Next {view === "month" ? "Month" : "Day"} →
        </button>
      )}
    </div>
  );

  // ✅ Event cell with "+X more" indicator
  const EventComponent = ({ event }) => {
    if (currentView === "day") {
      return (
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
    }

    // Month view: show event + count
    const dayKey = event._dayKey || startOfDay(event.start).toISOString();
    const allEventsOnDay = eventCountByDay.get(dayKey) || [];
    const additionalCount = allEventsOnDay.length - 1;

    return (
      <div className={styles.eventItem}>
        <div className={styles.eventTitle}>{event.title}</div>
        {additionalCount > 0 && (
          <div className={styles.moreEvents}>+{additionalCount} more</div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.calendarContainer}>
        <Calendar
          localizer={localizer}
          events={displayEvents}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          allDayAccessor="allDay"
          components={{ event: EventComponent, toolbar: CustomToolbar }}
          popup={false}
          views={{ month: true, day: true }}
          view={currentView}
          onView={setCurrentView}
          date={currentDate}
          onNavigate={handleNavigate}
          onSelectSlot={handleSelectSlot}
          selectable
          onSelectEvent={(event) => {
            if (currentView === "month") {
              setCurrentDate(event.start);
              setCurrentView("day");
            } else if (event?.href) {
              router.push(event.href);
            }
          }}
          showMultiDayTimes={false}
          min={new Date(1970, 1, 1, 6, 0)}
          max={new Date(1970, 1, 1, 22, 0)}
        />
      </div>
    </div>
  );
}
