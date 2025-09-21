'use client';

import { useState, useEffect } from 'react';
import styles from './schedule.module.css';
import { schedules, getCurrentDay, type Day, type TimeSlot } from '../../lib/scheduleData';
import { getWeeklyWeather, type WeeklyWeather } from '../../lib/weatherService';
import { getShiftInfo } from '../../lib/shiftDetection';
import { downloadWeeklySchedulePDF } from '../../lib/pdfService';
import { getCurrentSchool, getCurrentClass } from '../../lib/schoolConfig';
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
import SettingsDropdown from '../../components/SettingsDropdown';
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
  const iconMap: Record<string, string> = {
    // Core subjects
    'Matematika': '🔢',
    'Srpski jezik': '📝',
    'Engleski jezik': '🇬🇧',

    // Arts and culture
    'Likovna kultura': '🎨',
    'Muzička kultura': '🎵',

    // Physical education
    'Fizičko i zdravstveno vaspitanje (sala)': '🏃‍♂️',
    'Fizičko i zdravstveno vaspitanje': '🏃‍♂️',

    // Science and technology
    'Svet oko nas': '🌍',
    'Digitalni svet': '💻',

    // Other subjects
    'ČOS': '👥',
    'Građansko vaspitanje / Verska nastava': '🤝',
    'Dopunska nastava': '📚',

    // Daycare activities
    'Početak rada': '🌅',
    'Rad na domaćim zadacima': '📖',
    'Ručak': '🍽️',

    // Exam indicator
    'Exam': '📝',
  };

  return iconMap[subject] || '📋';
};

// Helper functions for schedule summary
const extractTime = (timeString: string): string => {
  // Extract time from formats like "1. čas (08:00)" or "Pretčas (13:10)"
  const match = timeString.match(/\((\d{2}:\d{2})\)/);
  return match ? match[1] : timeString;
};

const getScheduleSummary = (schedule: TimeSlot[]) => {
  if (schedule.length === 0) {
    return { startTime: '', endTime: '', classCount: 0 };
  }

  const firstClass = schedule[0];
  const lastClass = schedule[schedule.length - 1];

  const startTime = extractTime(firstClass.time);
  const endTime = extractTime(lastClass.time);

  return {
    startTime,
    endTime,
    classCount: schedule.length
  };
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

  const days: Day[] = ['Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota', 'Nedelja'];

  // Get shift info for the selected week
  const shiftInfo = getShiftInfo(selectedWeek.startDate);

  // Get school and class info
  const school = getCurrentSchool();
  const classInfo = getCurrentClass();

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

  const currentWeather = weather[selectedDay];

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
      <div className={styles.header}>
        <div className={styles.schoolInfo}>
          <h1 className={styles.schoolName}>{school.name}</h1>
          <p className={styles.className}>Razred {classInfo.name}</p>
        </div>
        <SettingsDropdown
          showDaycare={showDaycare}
          onToggleDaycare={setShowDaycare}
          onDownloadPDF={handleDownloadPDF}
          isGeneratingPDF={isGeneratingPDF}
        />
      </div>

      <div className={styles.shiftIndicator}>
        <div className={styles.currentShift}>
          <span className={styles.weekInfo}>
            {format(selectedWeek.startDate, 'MMMM', { locale: sr })} W{selectedWeek.week}
            {selectedWeek.isCurrentWeek && ' (trenutna nedelja)'}
          </span>
        </div>
        <div className={styles.weekNavigation}>
          {!selectedWeek.isCurrentWeek && (
            <button
              onClick={handleGoToCurrentWeek}
              className={styles.currentWeekButton}
              aria-label="Idi na trenutnu nedelju"
            >
              📅 Danas
            </button>
          )}
          <button
            onClick={handlePreviousWeek}
            className={styles.weekNavButton}
            aria-label="Prethodna nedelja"
          >
            ←
          </button>
          <button
            onClick={handleNextWeek}
            className={styles.weekNavButton}
            aria-label="Sledeća nedelja"
          >
            →
          </button>
        </div>
      </div>


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
          <div className={styles.sectionHeader}>Kontrolni zadaci</div>
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

      {/* Summary block for weekdays */}
      {selectedDay !== 'Subota' && selectedDay !== 'Nedelja' && (
        <div className={styles.summaryBlock}>
          {(() => {
            const daySchedule = schedules[shiftInfo.shift][selectedDay];
            const summary = getScheduleSummary(daySchedule);

            if (summary.classCount === 0) {
              return (
                <div className={styles.summaryContent}>
                  <div className={`${styles.summaryItem} ${styles.summaryShift}`}>
                    <span className={styles.summaryIcon}>🌅</span>
                    <span>{shiftInfo.shiftName}</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryIcon}>📅</span>
                    <span>Nema nastave danas</span>
                  </div>
                  {currentWeather && (
                    <div className={styles.summaryItem}>
                      <span className={styles.summaryIcon}>{currentWeather.icon}</span>
                      <span>Vreme: {currentWeather.high}°/{currentWeather.low}°</span>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div className={styles.summaryContent}>
                <div className={`${styles.summaryItem} ${styles.summaryShift}`}>
                  <span className={styles.summaryIcon}>🌅</span>
                  <span>{shiftInfo.shiftName}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryIcon}>🕐</span>
                  <span>Nastava počinje u {summary.startTime}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryIcon}>🕕</span>
                  <span>Deca se uzimaju u {summary.endTime}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryIcon}>📚</span>
                  <span>{summary.classCount} {summary.classCount === 1 ? 'čas' : summary.classCount < 5 ? 'časa' : 'časova'}</span>
                </div>
                {currentWeather && (
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryIcon}>{currentWeather.icon}</span>
                    <span>Vreme: {currentWeather.high}°/{currentWeather.low}°</span>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      <div className={styles.eventsContainer}>
        {selectedDay === 'Subota' || selectedDay === 'Nedelja' ? (
          /* Weekend display */
          <>
            <div className={styles.sectionHeader}>Vikend</div>
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
                <div className={styles.sectionHeader}>Produženi boravak</div>
                <div className={styles.eventsList}>
                  {daycareActivities[shiftInfo.shift].map((activity, index) => (
                    <EventCard
                      key={`daycare-${index}`}
                      type="daycare"
                      icon={getSubjectIcon(activity.activity)}
                      title={activity.activity}
                      time={activity.time}
                      onClick={() => handleEventClick(activity.activity, activity.time)}
                    />
                  ))}
                </div>
              </>
            )}
            {/* Classes second for afternoon shift */}
            <div className={styles.sectionHeader}>Nastava</div>
            <div className={styles.eventsList}>
              {schedules[shiftInfo.shift][selectedDay].map((lesson, index) => (
                <EventCard
                  key={`class-${index}`}
                  type="class"
                  icon={getSubjectIcon(lesson.subject)}
                  title={lesson.subject}
                  time={lesson.time}
                  onClick={() => handleEventClick(lesson.subject, lesson.time)}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Classes first for morning shift */}
            <div className={styles.sectionHeader}>Nastava</div>
            <div className={styles.eventsList}>
              {schedules[shiftInfo.shift][selectedDay].map((lesson, index) => (
                <EventCard
                  key={`class-${index}`}
                  type="class"
                  icon={getSubjectIcon(lesson.subject)}
                  title={lesson.subject}
                  time={lesson.time}
                  onClick={() => handleEventClick(lesson.subject, lesson.time)}
                />
              ))}
            </div>
            {/* Daycare activities second for morning shift */}
            {showDaycare && (
              <>
                <div className={styles.sectionHeader}>Produženi boravak</div>
                <div className={styles.eventsList}>
                  {daycareActivities[shiftInfo.shift].map((activity, index) => (
                    <EventCard
                      key={`daycare-${index}`}
                      type="daycare"
                      icon={getSubjectIcon(activity.activity)}
                      title={activity.activity}
                      time={activity.time}
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