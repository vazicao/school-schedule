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
import {
  getCurrentWeekInfo,
  getNextWeek,
  getPreviousWeek,
  getWeekInfo,
  getWeekDates,
  type WeekInfo,
} from "../../lib/weekNavigation";
import { format, isSameDay, startOfDay } from "date-fns";
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
      activity: "Ручак",
      startTime: "12:30",
      endTime: "13:00",
    },
    {
      time: "13:00-14:30",
      activity: "Домаћи",
      startTime: "13:00",
      endTime: "14:30",
    },
    {
      time: "14:30-17:30",
      activity: "Слободно време",
      startTime: "14:30",
      endTime: "17:30",
    },
  ],
  afternoon: [
    {
      time: "07:00-08:30",
      activity: "Пријем деце",
      startTime: "07:00",
      endTime: "08:30",
    },
    {
      time: "08:30-10:30",
      activity: "Домаћи задатак",
      startTime: "08:30",
      endTime: "10:30",
    },
    {
      time: "12:00-12:30",
      activity: "Ручак",
      startTime: "12:00",
      endTime: "12:30",
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
  const [selectedWeek, setSelectedWeek] = useState<WeekInfo | null>(null);
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);
  const [showDaycare, setShowDaycare] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEventDetails, setSelectedEventDetails] =
    useState<EventDetails | null>(null);
  const [weekExams, setWeekExams] = useState<Exam[]>([]);
  const [isClient, setIsClient] = useState(false);

  const days: Day[] = [
    "Понедељак",
    "Уторак",
    "Среда",
    "Четвртак",
    "Петак",
    "Субота",
    "Недеља",
  ];

  // Initialize client-side state to prevent hydration mismatches
  useEffect(() => {
    setIsClient(true);
    setSelectedWeek(getCurrentWeekInfo());
    setSelectedDay(getCurrentDay());
  }, []);

  // Fetch exams for the selected week
  useEffect(() => {
    if (selectedWeek) {
      const examsForWeek = getExamsForWeek(selectedWeek.week);
      setWeekExams(examsForWeek);
    }
  }, [selectedWeek]);

  // Don't render until client-side hydration is complete
  if (!isClient || !selectedWeek || !selectedDay) {
    return <div className={styles.container}>Loading...</div>;
  }

  // Get shift info for the selected week
  const shiftInfo = getShiftInfo(selectedWeek.startDate);

  // Get dates for the selected week (including weekends)
  const weekDates = getWeekDates(selectedWeek.year, selectedWeek.week, true);
  const today = startOfDay(new Date());

  // Get next week info for weekend preview
  const nextWeek = getNextWeek(selectedWeek.year, selectedWeek.week);
  const nextWeekInfo = getWeekInfo(nextWeek.year, nextWeek.week);
  const nextWeekShift = getShiftInfo(nextWeekInfo.startDate);
  const nextWeekExams = getExamsForWeek(nextWeekInfo.week);

  // Week navigation handlers
  const handlePreviousWeek = () => {
    const { year, week } = getPreviousWeek(
      selectedWeek.year,
      selectedWeek.week,
    );
    setSelectedWeek(getWeekInfo(year, week));
    setSelectedDay("Понедељак");
  };

  const handleNextWeek = () => {
    const { year, week } = getNextWeek(selectedWeek.year, selectedWeek.week);
    setSelectedWeek(getWeekInfo(year, week));
    setSelectedDay("Понедељак");
  };

  const handleGoToCurrentWeek = () => {
    const currentWeek = getCurrentWeekInfo();
    const currentDay = getCurrentDay();
    setSelectedWeek(currentWeek);
    setSelectedDay(currentDay);
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

  return (
    <div className={styles.container}>
      <ScheduleHeader
        selectedWeek={selectedWeek}
        selectedDay={selectedDay}
        showDaycare={showDaycare}
        onToggleDaycare={setShowDaycare}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
        onGoToCurrentWeek={handleGoToCurrentWeek}
      />

      <nav className={styles.dayButtons}>
        {days.map((day, index) => {
          const date = weekDates[index];
          const isToday = isSameDay(startOfDay(date), today);
          const isSelected = selectedDay === day;
          const isWeekend = day === "Субота" || day === "Недеља";

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

      {/* Exams section - hide on weekends */}
      {weekExams.length > 0 &&
        selectedDay !== "Субота" &&
        selectedDay !== "Недеља" && <ExamSummary exams={weekExams} />}

      <div className={styles.eventsContainer}>
        {selectedDay === "Субота" || selectedDay === "Недеља" ? (
          /* Weekend display */
          <>
            <div className={styles.weekendBlock}>
              <h2>Данас Нема Наставе</h2>
              <div className={styles.weekendIcon}>🎉</div>
              <p className="text-secondary">Уживајте у викенду</p>
            </div>

            <div className={styles.weekendBlock}>
              <h2>Следеће Недеље</h2>

              <div className={styles.weekendPreviewItem}>
                <SvgIcon
                  iconId={
                    nextWeekShift.shift === "morning" ? "sun-horizon" : "sun"
                  }
                  size={24}
                />
                <h3 className="text-primary">{nextWeekShift.shiftName}</h3>
              </div>

              {nextWeekExams.length > 0 && (
                <div className={styles.weekendPreviewItem}>
                  <SvgIcon iconId="brain" size={24} />
                  <h3 className="text-primary">
                    {nextWeekExams[0].subject} -{" "}
                    {nextWeekExams[0].topic || "Контролни задатак"}
                  </h3>
                </div>
              )}
            </div>
          </>
        ) : shiftInfo.shift === "afternoon" ? (
          <>
            {/* Daycare activities first for afternoon shift */}
            {showDaycare && (
              <>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>Продужени боравак</h3>
                  <h3 className={styles.sectionTimeRange}>
                    {(() => {
                      const firstClass =
                        schedules[shiftInfo.shift][selectedDay][0];
                      const freeTimeEnd = firstClass
                        ? firstClass.startTime
                        : "13:10";
                      const activitiesWithFreeTime = [
                        ...daycareActivities[shiftInfo.shift],
                        {
                          time: `12:30-${freeTimeEnd}`,
                          activity: "Слободно време",
                          startTime: "12:30",
                          endTime: freeTimeEnd,
                        },
                      ];
                      return calculateSectionTimeRange(activitiesWithFreeTime);
                    })()}
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
                  {(() => {
                    const firstClass =
                      schedules[shiftInfo.shift][selectedDay][0];
                    const freeTimeEnd = firstClass
                      ? firstClass.startTime
                      : "13:10";
                    const freeTimeActivity = {
                      time: `12:30-${freeTimeEnd}`,
                      activity: "Слободно време",
                      startTime: "12:30",
                      endTime: freeTimeEnd,
                    };
                    return (
                      <EventCard
                        key="daycare-freetime"
                        type="daycare"
                        icon={getSubjectIcon(freeTimeActivity.activity)}
                        title={freeTimeActivity.activity}
                        time={freeTimeActivity.time}
                        startTime={freeTimeActivity.startTime}
                        endTime={freeTimeActivity.endTime}
                        color={getSubjectInfo(freeTimeActivity.activity).color}
                        shift={shiftInfo.shift}
                        onClick={() =>
                          handleEventClick(
                            freeTimeActivity.activity,
                            freeTimeActivity.time,
                          )
                        }
                      />
                    );
                  })()}
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
                  onClick={() =>
                    handleEventClick(lesson.subject, lesson.order, lesson.order)
                  }
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
                  onClick={() =>
                    handleEventClick(lesson.subject, lesson.order, lesson.order)
                  }
                />
              ))}
            </div>
            {/* Daycare activities second for morning shift */}
            {showDaycare && (
              <>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>Продужени боравак</h3>
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
