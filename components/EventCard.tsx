'use client';

import styles from './EventCard.module.css';

export type EventType = 'class' | 'daycare' | 'weekend' | 'exam';

export interface EventCardProps {
  type: EventType;
  icon: string;
  title: string;
  time: string;
  subtitle?: string;
  classType?: string;
  onClick?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  type,
  icon,
  title,
  time,
  subtitle,
  classType,
  onClick,
}) => {
  // Parse time string to extract class period and actual time
  const parseTimeString = (timeStr: string) => {
    // Handle formats like "1. čas (14:00)", "Pretčas (13:10)", "2. čas", or just "14:00"
    let parsedClassType = '';
    let actualTime = '';

    // First check for format with parentheses: "1. čas (14:00)"
    const withParenthesesMatch = timeStr.match(/^(.*?)\s*\(([^)]+)\)$/);
    if (withParenthesesMatch) {
      parsedClassType = withParenthesesMatch[1].trim();
      actualTime = withParenthesesMatch[2].trim();
    } else {
      // Check for class period without time: "2. čas", "Pretčas", "Dopunska nastava"
      const classOnlyMatch = timeStr.match(/^(\d+\.\s*čas|pretčas|dopunska nastava)$/i);
      if (classOnlyMatch) {
        parsedClassType = classOnlyMatch[1].trim();
        actualTime = ''; // No time provided
      } else {
        // Assume it's just a time: "14:00"
        actualTime = timeStr.trim();
      }
    }

    return {
      classType: classType || parsedClassType,
      time: actualTime || '—' // Show dash when no time is available
    };
  };

  const { classType: displayClassType, time: displayTime } = type === 'class'
    ? parseTimeString(time)
    : { classType: classType, time };

  const eventClassName = `${styles.event} ${
    type === 'class' ? styles.classEvent :
    type === 'daycare' ? styles.daycareEvent :
    type === 'exam' ? styles.examEvent :
    styles.weekendEvent
  }`;

  return (
    <div
      className={`${eventClassName} ${onClick ? styles.clickable : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      <div className={styles.eventContent}>
        <div className={styles.eventHeader}>
          <span className={styles.eventIcon}>{icon}</span>
          <div className={styles.eventDetails}>
            {displayClassType && (
              <div className={styles.classType}>{displayClassType}</div>
            )}
            <div className={styles.eventTitle}>{title}</div>
          </div>
        </div>
        {subtitle && (
          <div className={styles.eventSubtitle}>{subtitle}</div>
        )}
      </div>
      <div className={styles.eventTime}>{displayTime}</div>
    </div>
  );
};

export default EventCard;