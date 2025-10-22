import React, { useState } from "react";
import styles from "./Calendar.module.css";

export default function CustomEvent({ event }) {
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const startTime = event.start
    ? new Date(event.start).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: rect.x + rect.width / 2, y: rect.y - 8 });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    // small delay to prevent flicker
    setTimeout(() => setIsHovered(false), 120);
  };

  return (
    <>
      <div
        className={styles.eventItem}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.eventTitle}>{event.title}</div>
        {startTime && <div className={styles.eventTime}>{startTime}</div>}
        {event.description && (
          <div className={styles.eventDesc}>
            {event.description.slice(0, 120)}…
          </div>
        )}
      </div>

      {isHovered && (
        <div
          className={styles.hoverCard}
          style={{
            top: coords.y,
            left: coords.x,
            transform: "translate(-50%, -100%)",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {event.heroUrl && (
            <img
              src={event.heroUrl}
              alt={event.title}
              className={styles.hoverImage}
            />
          )}
          <div className={styles.hoverContent}>
            <h4>{event.title}</h4>
            {event.start && (
              <p className={styles.hoverTime}>
                {new Date(event.start).toLocaleString([], {
                  dateStyle: "long",
                  timeStyle: "short",
                })}
              </p>
            )}
            {event.description && (
              <p>{event.description.slice(0, 140)}…</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
