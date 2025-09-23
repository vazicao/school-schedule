'use client';

import { useState, useEffect } from 'react';
import styles from './schedule.module.css';
import { schedules, getCurrentDay, getSubjectInfo, type Day, type ClassPeriod } from '../../lib/scheduleData';
import { getWeeklyWeather, type WeeklyWeather } from '../../lib/weatherService';
import { getShiftInfo } from '../../lib/shiftDetection';
import { downloadWeeklySchedulePDF } from '../../lib/pdfService';
import {
  getCurrentWeekInfo,
  getNextWeek,
  getPreviousWeek,
  getWeekInfo,
  getWeekDates,
  type WeekInfo
} from '../../lib/weekNavigation';
import { format, isSameDay } from 'date-fns';
import { sr } from 'date-fns/locale';
import ScheduleHeader from '../../components/ScheduleHeader';
import EventCard from '../../components/EventCard';
import EventModal, { EventDetails } from '../../components/EventModal';
import { getEventDetails } from '../../lib/eventDetailsService';
import { getExamsForWeek, type Exam } from '../../lib/examData';

const daycareActivities = {
  morning: [
    { time: '07:00', activity: 'Početak rada' },
    { time: '08:30-10:30', activity: 'Rad na domaćim zadacima' },
    { time: '12:00', activity: 'Ručak' },
  ],
  afternoon: [
    { time: '12:30', activity: 'Ručak' },
    { time: '13:00-14:30', activity: 'Rad na domaćim zadacima' },
  ],
};

// Icon mapping for subjects and activities
const getSubjectIcon = (subject: string): string => {
  // For regular subjects, use the subject info
  const subjectInfo = getSubjectInfo(subject);
  if (subjectInfo.name === subject) {
    return subjectInfo.icon;
  }

  // For daycare activities and other non-subject items
  const iconMap: Record<string, string> = {
    'Početak rada': '🌅',
    'Rad na domaćim zadacima': '📖',
    'Ručak': '🍽️',
    'Exam': '📝',
  };

  return iconMap[subject] || '📋';
};

// Helper function to extract time from time string
const extractTime = (timeString: string): string => {
  // Extract time from formats like "1. čas (08:00)" or "Pretčas (13:10)" or just "08:00"
  if (!timeString) return '';
  const match = timeString.match(/\((\d{2}:\d{2})\)/);
  return match ? match[1] : timeString;
};

// Helper function to calculate time range for a section
const calculateSectionTimeRange = (events: Array<ClassPeriod | {time: string}>): string => {
  if (events.length === 0) return '';

  const times: string[] = [];

  // Handle both new ClassPeriod format and legacy format
  events.forEach(event => {
    if ('startTime' in event && 'endTime' in event) {
      // New ClassPeriod format
      times.push(event.startTime, event.endTime);
    } else if ('time' in event && event.time) {
      // Legacy format
      const time = extractTime(event.time);
      if (time && time !== '—') {
        times.push(time);
      }
    }
  });

  if (times.length === 0) return '';

  const sortedTimes = times.sort();
  const startTime = sortedTimes[0];
  const endTime = sortedTimes[sortedTimes.length - 1];

  if (startTime === endTime) return startTime;
  return `${startTime} - ${endTime}`;
};


export default function Schedule() {
  const [selectedWeek, setSelectedWeek] = useState<WeekInfo>(getCurrentWeekInfo());
  const [selectedDay, setSelectedDay] = useState<Day>(getCurrentDay());
  const [weather, setWeather] = useState<WeeklyWeather>({});
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showDaycare, setShowDaycare] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEventDetails, setSelectedEventDetails] = useState<EventDetails | null>(null);
  const [weekExams, setWeekExams] = useState<Exam[]>([]);

  const days: Day[] = ['Ponedeljak', 'Utorak', 'Sreda', 'Четврtak', 'Petak', 'Subota', 'Nedelja'];

  // Get shift info for the selected week
  const shiftInfo = getShiftInfo(selectedWeek.startDate);


  // Get dates for the selected week (including weekends)
  const weekDates = getWeekDates(selectedWeek.year, selectedWeek.week, true);
  const today = new Date();

  // Fetch weather data when selected week changes
  useEffect(() => {
    const currentWeekDates = getWeekDates(selectedWeek.year, selectedWeek.week, true);
    const fetchWeather = async () => {
      try {
        const weatherData = await getWeeklyWeather(currentWeekDates);
        setWeather(weatherData);
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      }
    };

    fetchWeather();
  }, [selectedWeek.week, selectedWeek.year]);

  // Fetch exams for the selected week
  useEffect(() => {
    const examsForWeek = getExamsForWeek(selectedWeek.week);
    setWeekExams(examsForWeek);
  }, [selectedWeek.week]);


  // Week navigation handlers
  const handlePreviousWeek = () => {
    const { year, week } = getPreviousWeek(selectedWeek.year, selectedWeek.week);
    setSelectedWeek(getWeekInfo(year, week));
  };

  const handleNextWeek = () => {
    const { year, week } = getNextWeek(selectedWeek.year, selectedWeek.week);
    setSelectedWeek(getWeekInfo(year, week));
  };

  const handleGoToCurrentWeek = () => {
    setSelectedWeek(getCurrentWeekInfo());
  };

  const handleEventClick = (title: string, time: string, classType?: string) => {
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
        weather,
        weekDates
      );
    } catch (error) {
      console.error('Failed to generate PDF:', error);
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
          const isWeekend = day === 'Subota' || day === 'Nedelja';

          return (
            <button
              key={day}
              className={`${styles.dayButton} ${isSelected ? styles.active : ''} ${isToday ? styles.today : ''} ${isWeekend ? styles.weekend : ''}`}
              onClick={() => setSelectedDay(day)}
            >
              <span className={styles.dayName}>{day.charAt(0)}</span>
              <div className={styles.dayDateWrapper}>
                <span className={styles.dayDate}>
                  {format(date, 'd', { locale: sr })}
                </span>
              </div>
            </button>
          );
        })}
      </nav>


      {/* Exams section */}
      {weekExams.length > 0 && (
        <div className={styles.examsContainer}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Kontrolni zadaci</h3>
            <h3 className={styles.sectionTimeRange}>
              {calculateSectionTimeRange(weekExams.map(exam => ({ time: exam.confirmedDate || `Nedelja ${exam.isoWeek}` })))}
            </h3>
          </div>
          <div className={styles.eventsList}>
            {weekExams.map((exam, index) => (
              <EventCard
                key={`exam-${index}`}
                type="exam"
                icon="📝"
                title={exam.subject}
                time={exam.confirmedDate || `Nedelja ${exam.isoWeek}`}
                subtitle={exam.topic}
                onClick={() => handleEventClick(exam.subject, exam.confirmedDate || `Nedelja ${exam.isoWeek}`, 'exam')}
              />
            ))}
          </div>
        </div>
      )}


      <div className={styles.eventsContainer}>
        {selectedDay === 'Subota' || selectedDay === 'Nedelja' ? (
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
                onClick={() => handleEventClick('Nema nastave', '☀️')}
              />
            </div>
          </>
        ) : shiftInfo.shift === 'afternoon' ? (
          <>
            {/* Daycare activities first for afternoon shift */}
            {showDaycare && (
              <>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>Produženi boravak</h3>
                  <h3 className={styles.sectionTimeRange}>
                    {calculateSectionTimeRange(daycareActivities[shiftInfo.shift])}
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
                      shift={shiftInfo.shift}
                      onClick={() => handleEventClick(activity.activity, activity.time)}
                    />
                  ))}
                </div>
              </>
            )}
            {/* Classes second for afternoon shift */}
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>{shiftInfo.shiftName}</h3>
              <h3 className={styles.sectionTimeRange}>
                {calculateSectionTimeRange(schedules[shiftInfo.shift][selectedDay])}
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
                {calculateSectionTimeRange(schedules[shiftInfo.shift][selectedDay])}
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
                    {calculateSectionTimeRange(daycareActivities[shiftInfo.shift])}
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
                      shift={shiftInfo.shift}
                      onClick={() => handleEventClick(activity.activity, activity.time)}
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