"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  
  // Add state for controlling view and navigation
  const [currentView, setCurrentView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const router = useRouter();

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Default to agenda view on mobile
      if (mobile && currentView === "month") {
        setCurrentView("agenda");
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Smart tooltip position
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

  // Fetch events
  useEffect(() => {
    fetch("/api/events?range=all", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        console.log("Fetched events:", d.events); // Debug log
        setEvents(d.events || []);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setEvents([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const rbcEvents = useMemo(() => {
    const processed = (events || [])
      .map((e) => {
        const start = e.start ? new Date(e.start) : null;
        const end = e.end ? new Date(e.end) : start;
        
        // Validate dates
        if (!start || isNaN(start.getTime())) {
          console.warn("Invalid start date for event:", e);
          return null;
        }
        if (!end || isNaN(end.getTime())) {
          console.warn("Invalid end date for event:", e);
          return null;
        }
        
        return {
          ...e,
          start,
          end,
          allDay: Boolean(e.allDay),
          href: e.href || (e.slug ? `/events/${e.slug}` : null),
        };
      })
      .filter((e) => e !== null);
    
    console.log("Processed events for calendar:", processed); // Debug log
    return processed;
  }, [events]);

  // Smart hover handler (disabled on mobile)
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

  // Handle navigation (Back, Next, Today buttons)
  const handleNavigate = useCallback((newDate) => {
    console.log("Navigating to:", newDate); // Debug log
    setCurrentDate(newDate);
  }, []);

  // Handle view change (Month, Agenda buttons)
  const handleViewChange = useCallback((newView) => {
    console.log("Changing view to:", newView); // Debug log
    setCurrentView(newView);
  }, []);

  // Render logic
  if (loading)
    return <div className={styles.loadingState}>Loading calendar…</div>;
  if (!rbcEvents.length)
    return <div className={styles.emptyState}>No events scheduled.</div>;

  // Custom Event Component for Month View
  const EventComponent = ({ event }) => (
    <div
      className={styles.eventItem}
      onMouseEnter={(e) => handleMouseMove(e, event)}
      onMouseMove={(e) => handleMouseMove(e, event)}
      onMouseLeave={() => !isMobile && setTimeout(() => setHoveredEvent(null), 120)}
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

  // Custom Agenda Event Component (mobile-optimized)
  const AgendaEvent = ({ event }) => (
    <div 
      className={styles.agendaEventItem}
      onClick={() => event.href && router.push(event.href)}
    >
      {event.heroUrl && (
        <img
          src={event.heroUrl}
          alt={event.title}
          className={styles.agendaEventImage}
        />
      )}
      <div className={styles.agendaEventContent}>
        <h4 className={styles.agendaEventTitle}>{event.title}</h4>
        {event.start && (
          <p className={styles.agendaEventTime}>
            {new Date(event.start).toLocaleString([], {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </p>
        )}
        {event.description && (
          <p className={styles.agendaEventDescription}>
            {event.description.slice(0, 120)}…
          </p>
        )}
      </div>
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
          components={{ 
            event: EventComponent,
            agenda: {
              event: AgendaEvent,
            }
          }}
          popup
          views={["month", "agenda"]}
          view={currentView}
          date={currentDate}
          onView={handleViewChange}
          onNavigate={handleNavigate}
          length={30}
          showMultiDayTimes
        />
      </div>

      {/* Hover card only shows on desktop in month view */}
      {hoveredEvent && !isMobile && currentView === "month" && (
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
