'use client';

import { useRef, useEffect } from 'react';
import styles from './EventModal.module.css';
import { EventType } from './EventCard';

export interface EventDetails {
  type: EventType;
  icon: string;
  title: string;
  time: string;
  classType?: string;
  subtitle?: string;
  books?: string[];
  equipment?: string[];
  allExams?: {
    date: string;
    type: string;
    description: string;
    isPast?: boolean;
    isUpcoming?: boolean;
  }[];
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventDetails?: EventDetails;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  eventDetails,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Close modal when clicking outside
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  if (!isOpen || !eventDetails) return null;

  const { icon, title, time, classType, subtitle, books, equipment, allExams } = eventDetails;

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal} ref={modalRef} role="dialog" aria-modal="true">
        <div className={styles.header}>
          <div className={styles.eventInfo}>
            <div className={styles.eventIcon}>{icon}</div>
            <div className={styles.eventDetails}>
              {classType && <div className={styles.classType}>{classType}</div>}
              <h2 className={styles.eventTitle}>{title}</h2>
              {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
            </div>
          </div>
          <div className={styles.timeDisplay}>{time}</div>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Zatvori"
          >
            ✕
          </button>
        </div>

        <div className={styles.content}>
          {/* Books Section */}
          {books && books.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>📚 Potrebne knjige</h3>
              <ul className={styles.list}>
                {books.map((book, index) => (
                  <li key={index} className={styles.listItem}>{book}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Equipment Section */}
          {equipment && equipment.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>🎒 Potrebna oprema</h3>
              <ul className={styles.list}>
                {equipment.map((item, index) => (
                  <li key={index} className={styles.listItem}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Exams Section */}
          {allExams && allExams.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>📝 Pismeni zadaci</h3>
              <div className={styles.examsList}>
                {allExams.map((exam, index) => (
                  <div
                    key={index}
                    className={`${styles.examItem} ${exam.isPast ? styles.pastExam : ''} ${exam.isUpcoming ? styles.upcomingExam : ''}`}
                  >
                    <div className={styles.examDate}>{exam.date}</div>
                    <div className={styles.examDetails}>
                      <div className={styles.examType}>{exam.type}</div>
                      <div className={styles.examDescription}>{exam.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventModal;