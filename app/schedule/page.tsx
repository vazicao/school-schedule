"use client";

import { useState, useEffect } from "react";
import styles from "./schedule.module.css";
import {
  schedules,
  getCurrentDay,
  getSubjectInfo,
  type Day,
  type ClassPeriod,
} from "../../lib/scheduleData";
import { getShiftInfo } from "../../lib/shiftDetection";
import { downloadWeeklySchedulePDF } from "../../lib/pdfService";
import {
  getCurrentWeekInfo,
  getNextWeek,
  getPreviousWeek,
  getWeekInfo,
  getWeekDates,
  type WeekInfo,
} from "../../lib/weekNavigation";
import { format, isSameDay } from "date-fns";
import { sr } from "date-fns/locale";
import ScheduleHeader from "../../components/ScheduleHeader";
import EventCard from "../../components/EventCard";
import EventModal, { EventDetails } from "../../components/EventModal";
import { getEventDetails } from "../../lib/eventDetailsService";
import { getExamsForWeek, type Exam } from "../../lib/examData";
import SvgIcon from "../../components/SvgIcon";
import ExamSummary from "../../components/ExamSummary";

const daycareActivities = {
  morning: [
    {
      time: "12:30-13:00",
      activity: "Ručak",
      startTime: "12:30",
      endTime: "13:00",
    },
    {
      time: "13:00-14:30",
      activity: "Domaći",
      startTime: "13:00",
      endTime: "14:30",
    },
    {
      time: "14:30-17:30",
      activity: "Slobodno vreme",
      startTime: "14:30",
      endTime: "17:30",
    },
  ],
  afternoon: [
    {
      time: "07:00-08:30",
      activity: "Prijem dece",
      startTime: "07:00",
      endTime: "08:30",
    },
    {
      time: "08:30-10:30",
      activity: "Domaći zadatak",
      startTime: "08:30",
      endTime: "10:30",
    },
    {
      time: "12:30-13:00",
      activity: "Ručak",
      startTime: "12:30",
      endTime: "13:00",
    },
    {
      time: "12:30-13:10",
      activity: "Slobodno vreme",
      startTime: "12:30",
      endTime: "13:10",
    },
  ],
};

// Icon mapping for subjects and activities
const getSubjectIcon = (subject: string): React.ReactNode => {
  // For all subjects and daycare activities, use the subject info
  const subjectInfo = getSubjectInfo(subject);

  // Check if it's an SVG icon
  if (subjectInfo.icon.startsWith("svg:")) {
    const iconId = subjectInfo.icon.replace("svg:", "");
    return <SvgIcon iconId={iconId} size={24} />;
  }

  // Return emoji as string
  return subjectInfo.icon;
};

// Helper function to extract time from time string
const extractTime = (timeString?: string): string => {
  // Extract time from formats like "1. čas (08:00)" or "Pretčas (13:10)" or just "08:00"
  if (!timeString) return "";
  const match = timeString.match(/\((\d{2}:\d{2})\)/);
  return match ? match[1] : timeString;
};

// Helper function to calculate time range for a section
const calculateSectionTimeRange = (
  events: Array<ClassPeriod | { time: string }>,
): string => {
  if (events.length === 0) return "";

  const times: string[] = [];

  // Handle both new ClassPeriod format and legacy format
  events.forEach((event) => {
    if ("startTime" in event && "endTime" in event) {
      // New ClassPeriod format
      times.push(event.startTime, event.endTime);
    } else if ("time" in event && event.time) {
      // Legacy format
      const time = extractTime(event.time);
      if (time && time !== "—") {
        times.push(time);
      }
    }
  });

  if (times.length === 0) return "";

  const sortedTimes = times.sort();
  const startTime = sortedTimes[0];
  const endTime = sortedTimes[sortedTimes.length - 1];

  if (startTime === endTime) return startTime;
  return `${startTime} - ${endTime}`;
};

export default function Schedule() {
  const [selectedWeek, setSelectedWeek] =
    useState<WeekInfo>(getCurrentWeekInfo());
  const [selectedDay, setSelectedDay] = useState<Day>(getCurrentDay());
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showDaycare, setShowDaycare] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEventDetails, setSelectedEventDetails] =
    useState<EventDetails | null>(null);
  const [weekExams, setWeekExams] = useState<Exam[]>([]);

  const days: Day[] = [
    "Ponedeljak",
    "Utorak",
    "Sreda",
    "Četvrtak",
    "Petak",
    "Subota",
    "Nedelja",
  ];

  // Get shift info for the selected week
  const shiftInfo = getShiftInfo(selectedWeek.startDate);

  // Get dates for the selected week (including weekends)
  const weekDates = getWeekDates(selectedWeek.year, selectedWeek.week, true);
  const today = new Date();

  // Fetch exams for the selected week
  useEffect(() => {
    const examsForWeek = getExamsForWeek(selectedWeek.week);
    setWeekExams(examsForWeek);
  }, [selectedWeek.week]);

  // Week navigation handlers
  const handlePreviousWeek = () => {
    const { year, week } = getPreviousWeek(
      selectedWeek.year,
      selectedWeek.week,
    );
    setSelectedWeek(getWeekInfo(year, week));
  };

  const handleNextWeek = () => {
    const { year, week } = getNextWeek(selectedWeek.year, selectedWeek.week);
    setSelectedWeek(getWeekInfo(year, week));
  };

  const handleGoToCurrentWeek = () => {
    setSelectedWeek(getCurrentWeekInfo());
  };

  const handleEventClick = (
    title: string,
    time: string,
    classType?: string,
  ) => {
    const details = getEventDetails(title, time, classType);
    if (details) {
      setSelectedEventDetails(details);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEventDetails(null);
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await downloadWeeklySchedulePDF(
        shiftInfo.shift,
        selectedWeek.week,
        selectedWeek.year,
        weekDates,
      );
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      // You could add a toast notification here
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className={styles.container}>
      <ScheduleHeader
        selectedWeek={selectedWeek}
        showDaycare={showDaycare}
        onToggleDaycare={setShowDaycare}
        onDownloadPDF={handleDownloadPDF}
        isGeneratingPDF={isGeneratingPDF}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
        onGoToCurrentWeek={handleGoToCurrentWeek}
      />

      <nav className={styles.dayButtons}>
        {days.map((day, index) => {
          const date = weekDates[index];
          const isToday = isSameDay(date, today);
          const isSelected = selectedDay === day;
          const isWeekend = day === "Subota" || day === "Nedelja";

          return (
            <button
              key={day}
              className={`${styles.dayButton} ${isSelected ? styles.active : ""} ${isToday ? styles.today : ""} ${isWeekend ? styles.weekend : ""}`}
              onClick={() => setSelectedDay(day)}
            >
              <span className={`${styles.dayName} caption-small`}>
                {day.charAt(0)}
              </span>
              <div className={styles.dayDateWrapper}>
                <h2 className={styles.dayDate}>
                  {format(date, "d", { locale: sr })}
                </h2>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Exams section */}
      {weekExams.length > 0 && <ExamSummary exams={weekExams} />}

      <div className={styles.eventsContainer}>
        {selectedDay === "Subota" || selectedDay === "Nedelja" ? (
          /* Weekend display */
          <>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Vikend</h3>
              <h3 className={styles.sectionTimeRange}></h3>
            </div>
            <div className={styles.eventsList}>
              <EventCard
                type="weekend"
                icon="🎉"
                title="Nema nastave"
                time="☀️"
                subtitle="Mogućnost dodavanja rođendana ili posebnih aktivnosti"
                onClick={() => handleEventClick("Nema nastave", "☀️")}
              />
            </div>
          </>
        ) : shiftInfo.shift === "afternoon" ? (
          <>
            {/* Daycare activities first for afternoon shift */}
            {showDaycare && (
              <>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>Produženi boravak</h3>
                  <h3 className={styles.sectionTimeRange}>
                    {calculateSectionTimeRange(
                      daycareActivities[shiftInfo.shift],
                    )}
                  </h3>
                </div>
                <div className={styles.eventsList}>
                  {daycareActivities[shiftInfo.shift].map((activity, index) => (
                    <EventCard
                      key={`daycare-${index}`}
                      type="daycare"
                      icon={getSubjectIcon(activity.activity)}
                      title={activity.activity}
                      time={activity.time}
                      startTime={activity.startTime}
                      endTime={activity.endTime}
                      color={getSubjectInfo(activity.activity).color}
                      shift={shiftInfo.shift}
                      onClick={() =>
                        handleEventClick(activity.activity, activity.time)
                      }
                    />
                  ))}
                </div>
              </>
            )}
            {/* Classes second for afternoon shift */}
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>{shiftInfo.shiftName}</h3>
              <h3 className={styles.sectionTimeRange}>
                {calculateSectionTimeRange(
                  schedules[shiftInfo.shift][selectedDay],
                )}
              </h3>
            </div>
            <div className={styles.eventsList}>
              {schedules[shiftInfo.shift][selectedDay].map((lesson, index) => (
                <EventCard
                  key={`class-${index}`}
                  type="class"
                  icon={getSubjectIcon(lesson.subject)}
                  title={lesson.subject}
                  time={lesson.order}
                  classType={lesson.order}
                  startTime={lesson.startTime}
                  endTime={lesson.endTime}
                  color={getSubjectInfo(lesson.subject).color}
                  shift={shiftInfo.shift}
                  onClick={() => handleEventClick(lesson.subject, lesson.order)}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Classes first for morning shift */}
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>{shiftInfo.shiftName}</h3>
              <h3 className={styles.sectionTimeRange}>
                {calculateSectionTimeRange(
                  schedules[shiftInfo.shift][selectedDay],
                )}
              </h3>
            </div>
            <div className={styles.eventsList}>
              {schedules[shiftInfo.shift][selectedDay].map((lesson, index) => (
                <EventCard
                  key={`class-${index}`}
                  type="class"
                  icon={getSubjectIcon(lesson.subject)}
                  title={lesson.subject}
                  time={lesson.order}
                  classType={lesson.order}
                  startTime={lesson.startTime}
                  endTime={lesson.endTime}
                  color={getSubjectInfo(lesson.subject).color}
                  shift={shiftInfo.shift}
                  onClick={() => handleEventClick(lesson.subject, lesson.order)}
                />
              ))}
            </div>
            {/* Daycare activities second for morning shift */}
            {showDaycare && (
              <>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>Produženi boravak</h3>
                  <h3 className={styles.sectionTimeRange}>
                    {calculateSectionTimeRange(
                      daycareActivities[shiftInfo.shift],
                    )}
                  </h3>
                </div>
                <div className={styles.eventsList}>
                  {daycareActivities[shiftInfo.shift].map((activity, index) => (
                    <EventCard
                      key={`daycare-${index}`}
                      type="daycare"
                      icon={getSubjectIcon(activity.activity)}
                      title={activity.activity}
                      time={activity.time}
                      startTime={activity.startTime}
                      endTime={activity.endTime}
                      color={getSubjectInfo(activity.activity).color}
                      shift={shiftInfo.shift}
                      onClick={() =>
                        handleEventClick(activity.activity, activity.time)
                      }
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      <EventModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        eventDetails={selectedEventDetails || undefined}
      />
    </div>
  );
}
