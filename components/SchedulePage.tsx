"use client";

import { useState, useEffect } from "react";
import styles from "./SchedulePage.module.css";
import {
  getCurrentDay,
  type Day,
  type SchoolDay,
  type ClassPeriod,
} from "../lib/schedule";
import { getSubjectInfo, type SubjectId } from "../lib/subjects";
import { getShiftInfo, type ShiftType } from "../lib/shiftDetection";
import type { ClassData } from "../lib/classData";
import {
  getCurrentWeekInfo,
  getNextWeek,
  getPreviousWeek,
  getWeekInfo,
  getWeekDates,
  type WeekInfo,
} from "../lib/weekNavigation";
import {
  format,
  isSameDay,
  parseISO,
  startOfDay,
  startOfISOWeek,
} from "date-fns";
import { srLatn as sr } from "date-fns/locale";
import ScheduleHeader from "./ScheduleHeader";
import EventCard from "./EventCard";
import EventModal, { EventDetails } from "./EventModal";
import { getEventDetails } from "../lib/eventDetailsService";
import {
  getExamsForDate,
  getExamsForWeek,
  getExamsInDateRange,
} from "../lib/examData";
import { getNonSchoolDay } from "../lib/schoolCalendar";
import type { BoravakActivity } from "../lib/boravak";
import SvgIcon from "./SvgIcon";
import ExamSummary from "./ExamSummary";

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
  events: Array<ClassPeriod | BoravakActivity | { time: string }>,
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

export default function SchedulePage({ data }: { data: ClassData }) {
  const [selectedWeek, setSelectedWeek] = useState<WeekInfo | null>(null);
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);
  // Whether to show boravak, for classes that have it — a per-visit
  // preference (no persistence), defaulting to shown.
  const [showDaycare, setShowDaycare] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEventDetails, setSelectedEventDetails] =
    useState<EventDetails | null>(null);
  const [isClient, setIsClient] = useState(false);

  const days: Day[] = [
    "Ponedeljak",
    "Utorak",
    "Sreda",
    "Četvrtak",
    "Petak",
    "Subota",
    "Nedelja",
  ];

  // Initialize client-side state to prevent hydration mismatches
  useEffect(() => {
    setIsClient(true);
    setSelectedWeek(getCurrentWeekInfo());
    setSelectedDay(getCurrentDay());
  }, []);

  // Don't render until client-side hydration is complete
  if (!isClient || !selectedWeek || !selectedDay) {
    return <div className={styles.container}>Loading...</div>;
  }

  // Get shift info for the selected week
  const shiftInfo = getShiftInfo(data.shiftAnchor, selectedWeek.startDate);

  // Get dates for the selected week (including weekends)
  const weekDates = getWeekDates(selectedWeek.year, selectedWeek.week, true);
  const today = startOfDay(new Date());

  // Don't allow navigating back before the school year started: stop at the
  // Monday of the week containing the class's schoolYearStart.
  const earliestWeekStart = startOfISOWeek(parseISO(data.schoolYearStart));
  const canGoToPreviousWeek = selectedWeek.startDate > earliestWeekStart;

  // Exams for the specific day being viewed — only exams with an exact,
  // school-confirmed date show here, on the day they actually fall on.
  const selectedDayDate = weekDates[days.indexOf(selectedDay)];
  const selectedDayIso = format(selectedDayDate, "yyyy-MM-dd");
  const dayExams = getExamsForDate(data.exams, selectedDayIso);
  const dayNonSchool = getNonSchoolDay(data.nonSchoolDays, selectedDayIso);

  // Week-only exams (some classes only get "sometime this week" from the
  // school, not an exact date) — shown for the whole week rather than one day.
  const weekExams = getExamsForWeek(
    data.exams,
    format(weekDates[0], "yyyy-MM-dd"),
    format(weekDates[6], "yyyy-MM-dd"),
  );

  // Get next week info for weekend preview
  const nextWeek = getNextWeek(selectedWeek.year, selectedWeek.week);
  const nextWeekInfo = getWeekInfo(nextWeek.year, nextWeek.week);
  const nextWeekShift = getShiftInfo(data.shiftAnchor, nextWeekInfo.startDate);
  const nextWeekExams = getExamsInDateRange(
    data.exams,
    format(nextWeekInfo.startDate, "yyyy-MM-dd"),
    format(nextWeekInfo.endDate, "yyyy-MM-dd"),
  );

  // Week navigation handlers
  const handlePreviousWeek = () => {
    if (!canGoToPreviousWeek) return;
    const { year, week } = getPreviousWeek(
      selectedWeek.year,
      selectedWeek.week,
    );
    setSelectedWeek(getWeekInfo(year, week));
    setSelectedDay("Ponedeljak");
  };

  const handleNextWeek = () => {
    const { year, week } = getNextWeek(selectedWeek.year, selectedWeek.week);
    setSelectedWeek(getWeekInfo(year, week));
    setSelectedDay("Ponedeljak");
  };

  const handleGoToCurrentWeek = () => {
    const currentWeek = getCurrentWeekInfo();
    const currentDay = getCurrentDay();
    setSelectedWeek(currentWeek);
    setSelectedDay(currentDay);
  };

  const handleEventClick = (
    title: SubjectId,
    time: string,
    shift: ShiftType,
    classType?: string,
  ) => {
    const details = getEventDetails(data, title, time, shift, classType);
    if (details) {
      setSelectedEventDetails(details);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEventDetails(null);
  };

  // Boravak (produženi boravak) — only for classes that have it (see
  // lib/boravak.ts). Shown before classes on an afternoon-shift day, after on
  // a morning-shift day — same as this class's actual classes.
  const boravakTime = (activity: BoravakActivity) =>
    `${activity.startTime}-${activity.endTime}`;

  const renderBoravakActivities = (
    activities: BoravakActivity[],
    keyPrefix: string,
  ) =>
    activities.map((activity, index) => (
      <EventCard
        key={`${keyPrefix}-${index}`}
        type="daycare"
        icon={getSubjectIcon(activity.activity)}
        title={activity.activity}
        time={boravakTime(activity)}
        startTime={activity.startTime}
        endTime={activity.endTime}
        color={getSubjectInfo(activity.activity).color}
        shift={shiftInfo.shift}
        onClick={() =>
          handleEventClick(
            activity.activity,
            boravakTime(activity),
            shiftInfo.shift,
          )
        }
      />
    ));

  // That day's optional activities (chess, drama, ...) — a menu, not
  // something every child attends, but shown as part of the same boravak
  // section rather than split out, interleaved by time with the routine.
  const todaysElectives =
    data.boravak?.electives[selectedDay as SchoolDay] ?? [];

  const boravakActivities = data.boravak
    ? [...data.boravak.routine, ...todaysElectives].sort((a, b) =>
        a.startTime.localeCompare(b.startTime),
      )
    : [];

  const boravakSection = data.boravak && (
    <>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Produženi boravak</h3>
        <h3 className={styles.sectionTimeRange}>
          {calculateSectionTimeRange(boravakActivities)}
        </h3>
      </div>
      <div className={styles.eventsList}>
        {renderBoravakActivities(boravakActivities, "boravak")}
      </div>
    </>
  );

  return (
    <div className={styles.container}>
      <ScheduleHeader
        classLabel={data.displayName}
        schoolName={data.school.shortName}
        selectedWeek={selectedWeek}
        selectedDay={selectedDay}
        hasBoravak={!!data.boravak}
        showDaycare={showDaycare}
        onToggleDaycare={setShowDaycare}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
        onGoToCurrentWeek={handleGoToCurrentWeek}
        canGoToPreviousWeek={canGoToPreviousWeek}
      />

      <nav className={styles.dayButtons}>
        {days.map((day, index) => {
          const date = weekDates[index];
          const isToday = isSameDay(startOfDay(date), today);
          const isSelected = selectedDay === day;
          const isWeekend = day === "Subota" || day === "Nedelja";
          const isNonSchool =
            !isWeekend &&
            !!getNonSchoolDay(data.nonSchoolDays, format(date, "yyyy-MM-dd"));

          return (
            <button
              key={day}
              className={`${styles.dayButton} ${isSelected ? styles.active : ""} ${isToday ? styles.today : ""} ${isWeekend ? styles.weekend : ""} ${isNonSchool ? styles.nonSchool : ""}`}
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

      {/* Exams section - only on the day the exam actually falls on, hidden on weekends and non-school days */}
      {dayExams.length > 0 &&
        selectedDay !== "Subota" &&
        selectedDay !== "Nedelja" &&
        !dayNonSchool && <ExamSummary exams={dayExams} />}

      {/* Week-only exams (no exact date from the school) - shown all week, hidden on weekends and non-school days */}
      {weekExams.length > 0 &&
        selectedDay !== "Subota" &&
        selectedDay !== "Nedelja" &&
        !dayNonSchool && <ExamSummary exams={weekExams} />}

      <div className={styles.eventsContainer}>
        {selectedDay === "Subota" || selectedDay === "Nedelja" ? (
          /* Weekend display */
          <>
            <div className={styles.weekendBlock}>
              <h2>Danas Nema Nastave</h2>
              <div className={styles.weekendIcon}>🎉</div>
              <p className="text-secondary">Uživajte u vikendu</p>
            </div>

            <div className={styles.weekendBlock}>
              <h2>Sledeće Nedelje</h2>

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
                    {nextWeekExams[0].subject} - {nextWeekExams[0].topic}
                  </h3>
                </div>
              )}
            </div>
          </>
        ) : dayNonSchool ? (
          /* Raspust / no-class holiday — same block as the weekend one, but
             with a reason and an emoji specific to the occasion. */
          <div className={styles.weekendBlock}>
            <h2>Danas Nema Nastave</h2>
            <div className={styles.weekendIcon}>{dayNonSchool.emoji}</div>
            <p className="text-secondary">{dayNonSchool.label}</p>
          </div>
        ) : shiftInfo.shift === "afternoon" ? (
          <>
            {/* Boravak first for afternoon shift (it runs beforehand, in the morning) */}
            {showDaycare && boravakSection}
            {/* Classes second for afternoon shift */}
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>{shiftInfo.shiftName}</h3>
              <h3 className={styles.sectionTimeRange}>
                {calculateSectionTimeRange(
                  data.schedules[shiftInfo.shift][selectedDay],
                )}
              </h3>
            </div>
            <div className={styles.eventsList}>
              {data.schedules[shiftInfo.shift][selectedDay].map(
                (lesson, index) => (
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
                      handleEventClick(
                        lesson.subject,
                        lesson.order,
                        shiftInfo.shift,
                        lesson.order,
                      )
                    }
                  />
                ),
              )}
            </div>
          </>
        ) : (
          <>
            {/* Classes first for morning shift */}
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>{shiftInfo.shiftName}</h3>
              <h3 className={styles.sectionTimeRange}>
                {calculateSectionTimeRange(
                  data.schedules[shiftInfo.shift][selectedDay],
                )}
              </h3>
            </div>
            <div className={styles.eventsList}>
              {data.schedules[shiftInfo.shift][selectedDay].map(
                (lesson, index) => (
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
                      handleEventClick(
                        lesson.subject,
                        lesson.order,
                        shiftInfo.shift,
                        lesson.order,
                      )
                    }
                  />
                ),
              )}
            </div>
            {/* Boravak second for morning shift (it runs afterward, in the afternoon) */}
            {showDaycare && boravakSection}
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
