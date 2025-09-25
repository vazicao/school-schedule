"use client";

import { useRef, useEffect } from "react";
import styles from "./EventModal.module.css";
import { EventType } from "./EventCard";
import { getSubjectInfo } from "../lib/scheduleData";
import SvgIcon from "./SvgIcon";

export interface EventDetails {
  type: EventType;
  icon: React.ReactNode;
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
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Close modal when clicking outside
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  if (!isOpen || !eventDetails) return null;

  const { title, time, classType, subtitle, books, equipment, allExams } =
    eventDetails;
  const subjectInfo = getSubjectInfo(title);

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div
        className={styles.modal}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.header}>
          <div className={styles.eventInfo}>
            <div
              className={styles.iconContainer}
              style={{ backgroundColor: subjectInfo.color }}
            >
              <div className={styles.eventIcon}>{subjectInfo.icon}</div>
            </div>
            <div className={styles.eventDetails}>
              {classType && (
                <p className={`${styles.classType} caption-large`}>
                  {classType}
                </p>
              )}
              <h1 className="display1">{title}</h1>
              {subtitle && (
                <p className={`${styles.subtitle} paragraph-small`}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <p className={`${styles.timeDisplay} caption-large`}>{time}</p>
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
              <div className={styles.sectionHeadline}>
                <SvgIcon iconId="notebook" size={24} />
                <h3>Udžbenici</h3>
              </div>
              <ul className={styles.list}>
                {books.map((book, index) => (
                  <li key={index} className={styles.listItem}>
                    {book}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Equipment Section */}
          {equipment && equipment.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionHeadline}>
                <SvgIcon iconId="briefcase" size={24} />
                <h3>Pribor</h3>
              </div>
              <ul className={styles.list}>
                {equipment.map((item, index) => (
                  <li key={index} className={styles.listItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Exams Section */}
          {allExams && allExams.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionHeadline}>
                <SvgIcon iconId="brain" size={24} />
                <h3>Pismeni zadaci</h3>
              </div>
              <div className={styles.examsList}>
                {allExams.map((exam, index) => (
                  <div
                    key={index}
                    className={`${styles.examItem} ${exam.isPast ? styles.pastExam : ""} ${exam.isUpcoming ? styles.upcomingExam : ""}`}
                  >
                    <p className={`${styles.examDate} caption-small`}>
                      {exam.date}
                    </p>
                    <div className={styles.examDetails}>
                      <h4 className={`${styles.examType} caption-large`}>
                        {exam.type}
                      </h4>
                      <p
                        className={`${styles.examDescription} paragraph-small`}
                      >
                        {exam.description}
                      </p>
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
