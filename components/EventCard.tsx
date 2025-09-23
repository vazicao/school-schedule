"use client";

import styles from "./EventCard.module.css";
import { getClassTimes, getDaycareTimeRange } from "../lib/timeMapping";
import type { ShiftType } from "../lib/shiftDetection";

export type EventType = "class" | "daycare" | "weekend" | "exam";

export interface EventCardProps {
  type: EventType;
  icon: string;
  title: string;
  time: string;
  subtitle?: string;
  classType?: string;
  startTime?: string;
  endTime?: string;
  color?: string;
  shift?: ShiftType;
  onClick?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  type,
  icon,
  title,
  time,
  subtitle,
  classType,
  startTime,
  endTime,
  color,
  shift,
  onClick,
}) => {
  // Parse time string to extract class period and actual time
  const parseTimeString = (timeStr?: string) => {
    // Handle formats like "1. čas (14:00)", "Pretčas (13:10)", "2. čas", or just "14:00"
    let parsedClassType = "";
    let actualTime = "";

    if (!timeStr) {
      return {
        classType: classType || "",
        time: "—",
      };
    }

    // First check for format with parentheses: "1. čas (14:00)"
    const withParenthesesMatch = timeStr.match(/^(.*?)\s*\(([^)]+)\)$/);
    if (withParenthesesMatch) {
      parsedClassType = withParenthesesMatch[1].trim();
      actualTime = withParenthesesMatch[2].trim();
    } else {
      // Check for class period without time: "2. čas", "Pretčas", "Dopunska nastava"
      const classOnlyMatch = timeStr.match(
        /^(\d+\.\s*čas|pretčas|dopunska nastava)$/i,
      );
      if (classOnlyMatch) {
        parsedClassType = classOnlyMatch[1].trim();
        actualTime = ""; // No time provided
      } else {
        // Assume it's just a time: "14:00"
        actualTime = timeStr.trim();
      }
    }

    return {
      classType: classType || parsedClassType,
      time: actualTime || "—", // Show dash when no time is available
    };
  };

  const { classType: displayClassType } =
    type === "class" ? parseTimeString(time) : { classType: classType || "" };

  const eventClassName = `${styles.event} ${
    type === "class"
      ? styles.classEvent
      : type === "daycare"
        ? styles.daycareEvent
        : type === "exam"
          ? styles.examEvent
          : styles.weekendEvent
  }`;

  return (
    <div
      className={`${eventClassName} ${onClick ? styles.clickable : ""}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <div className={styles.iconContainer} style={{ backgroundColor: color }}>
        <span className={styles.eventIcon}>{icon}</span>
      </div>

      <div className={styles.eventContent}>
        {displayClassType && (
          <h3 className={styles.classType}>{displayClassType}</h3>
        )}
        <h2 className={styles.eventTitle}>{title}</h2>
        {subtitle && <div className={styles.eventSubtitle}>{subtitle}</div>}
      </div>

      <div className={styles.timeContainer}>
        {(() => {
          // Use provided start/end times if available, otherwise calculate
          let displayStartTime = startTime || "—";
          let displayEndTime = endTime || "";

          if (!startTime && !endTime) {
            // Fallback to old calculation logic
            if (type === "class" && shift) {
              const classTimes = getClassTimes(time, shift);
              if (classTimes) {
                displayStartTime = classTimes.startTime;
                displayEndTime = classTimes.endTime;
              }
            } else if (type === "daycare" && shift) {
              const daycareRange = getDaycareTimeRange(shift);
              const timeMatch = time.match(/(\d{2}:\d{2})/);
              if (timeMatch) {
                displayStartTime = timeMatch[1];
                displayEndTime = "";
              } else {
                displayStartTime = daycareRange.startTime;
                displayEndTime = daycareRange.endTime;
              }
            } else {
              const timeMatch = time.match(/(\d{2}:\d{2})/);
              if (timeMatch) {
                displayStartTime = timeMatch[1];
                displayEndTime = "";
              }
            }
          }

          return (
            <>
              <h3 className={styles.startTime}>{displayStartTime}</h3>
              {displayEndTime && (
                <h3 className={styles.endTime}>{displayEndTime}</h3>
              )}
            </>
          );
        })()}
      </div>
    </div>
  );
};

export default EventCard;
