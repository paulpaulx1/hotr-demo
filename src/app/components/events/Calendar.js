"use client";

import React, { useMemo, useState, useCallback, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, startOfDay } from "date-fns";
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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");
  const router = useRouter();

  // 🔍 Debug log events once
  useEffect(() => {
    console.group("📅 RAW EVENTS FROM SANITY");
    events.forEach((e, i) => {
      console.log(`#${i + 1}`, {
        title: e.title,
        start_raw: e.start,
        end_raw: e.end,
        start_iso: new Date(e.start).toISOString(),
        end_iso: new Date(e.end).toISOString(),
      });
    });
    console.groupEnd();
  }, [events]);

  // 📱 Mobile detection
  useEffect(() => {
    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Normalise event times (strip seconds/ms so RBC overlaps behave)
  function normalizeEventTimes(list) {
    return list.map((e) => {
      const start = new Date(e.start);
      const end = new Date(e.end);

      start.setSeconds(0);
      start.setMilliseconds(0);
      end.setSeconds(0);
      end.setMilliseconds(0);

      return { ...e, start, end };
    });
  }

  // 🔁 Expand recurrence + normalise base events
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
      const end = new Date(event.end);

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

      const base = {
        ...e,
        start: new Date(e.start),
        end: e.end ? new Date(e.end) : new Date(e.start),
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

  // 📊 Map: day ISO -> all events that day (for “+X more”)
  const eventCountByDay = useMemo(() => {
    const map = new Map();
    rbcEvents.forEach((event) => {
      const key = startOfDay(event.start).toISOString();
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(event);
    });
    return map;
  }, [rbcEvents]);

  // 🗓 Month view: show one event per day (prefer featured)
  const displayEvents = useMemo(() => {
    if (currentView === "day") return rbcEvents;

    const uniqueByDay = new Map();

    rbcEvents.forEach((event) => {
      const dayKey = startOfDay(event.start).toISOString();
      const existing = uniqueByDay.get(dayKey);

      if (!existing || (event.featured && !existing.featured)) {
        uniqueByDay.set(dayKey, { ...event, _dayKey: dayKey });
      }
    });

    return Array.from(uniqueByDay.values());
  }, [rbcEvents, currentView]);

  // 🔁 Basic navigation
  const handleNavigate = useCallback((newDate) => {
    setCurrentDate(newDate);
  }, []);

  const handleSelectSlot = useCallback((slotInfo) => {
    setCurrentDate(slotInfo.start);
    setCurrentView("day");
  }, []);

  // ✨ Custom toolbar
  // ✨ Custom toolbar
  const CustomToolbar = ({ label, onNavigate, view, onView }) => {
    const isDay = view === "day";

    return (
      <div className={styles.customToolbar}>
        {/* Prev */}
        <button
          type="button"
          className={styles.navButton}
          onClick={() => onNavigate("PREV")}
          aria-label={isDay ? "Previous day" : "Previous month"}
        >
          <span className={styles.navButtonIcon} aria-hidden="true">
            ←
          </span>
          <span className={styles.navButtonText}>
            Previous {isDay ? "Day" : "Month"}
          </span>
        </button>

        {/* Label + Back to Month */}
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

          {isDay && (
            <button
              type="button"
              onClick={() => onView("month")}
              className={styles.backToMonthButton}
              aria-label="Back to month view"
            >
              ← Back to Month
            </button>
          )}
        </div>

        {/* Next */}
        <button
          type="button"
          className={styles.navButton}
          onClick={() => onNavigate("NEXT")}
          aria-label={isDay ? "Next day" : "Next month"}
        >
          <span className={styles.navButtonText}>
            Next {isDay ? "Day" : "Month"}
          </span>
          <span className={styles.navButtonIcon} aria-hidden="true">
            →
          </span>
        </button>
      </div>
    );
  };

  // 🟦 Day view event: single inline line “time – time: title”
  const DayEventComponent = ({ event }) => {
    const start = event.start.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    const end = event.end.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    return (
      <span>
        {start} – {end}: {event.title}
      </span>
    );
  };

  // 🟧 Month view event: title + “+X more”
  const MonthEventComponent = ({ event }) => {
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
          events={normalizeEventTimes(displayEvents)}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          allDayAccessor="allDay"
          components={{
            month: { event: MonthEventComponent },
            day: { event: DayEventComponent },
            toolbar: CustomToolbar,
          }}
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
          dayLayoutAlgorithm="no-overlap"
        />
      </div>
    </div>
  );
}
