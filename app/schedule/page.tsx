'use client';

import { useState, useEffect } from 'react';
import styles from './schedule.module.css';
import { schedules, getCurrentDay, type Day } from '../../lib/scheduleData';
import { getWeeklyWeather, type WeeklyWeather } from '../../lib/weatherService';
import { getShiftInfo } from '../../lib/shiftDetection';
import { downloadWeeklySchedulePDF } from '../../lib/pdfService';

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
  };

  return iconMap[subject] || '📋';
};

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState<Day>(getCurrentDay());
  const [weather, setWeather] = useState<WeeklyWeather>({});
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const days: Day[] = ['Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak'];

  // Get current shift info
  const shiftInfo = getShiftInfo();

  // Helper function to get dates for each day of the current week
  const getWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const monday = new Date(today);

    // Get Monday of current week
    monday.setDate(today.getDate() - currentDay + 1);

    return days.map((_, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      return date;
    });
  };

  const weekDates = getWeekDates();
  const today = new Date();
  const todayDateStr = today.toDateString();

  // Fetch weather data on component mount
  useEffect(() => {
    const fetchWeather = async () => {
      setWeatherLoading(true);
      try {
        const weatherData = await getWeeklyWeather();
        setWeather(weatherData);
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const currentWeather = weather[selectedDay];

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await downloadWeeklySchedulePDF(
        shiftInfo.shift,
        shiftInfo.week,
        shiftInfo.year,
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
      <h1>Raspored časova</h1>

      <div className={styles.shiftIndicator}>
        <div className={styles.currentShift}>
          <h3>{shiftInfo.shiftName}</h3>
          <span className={styles.weekInfo}>Nedelja {shiftInfo.week}, {shiftInfo.year}</span>
        </div>
        <button
          onClick={handleDownloadPDF}
          disabled={isGeneratingPDF}
          className={styles.pdfButton}
        >
          {isGeneratingPDF ? '📄 Generiše...' : '📄 Preuzmi PDF'}
        </button>
      </div>

      <nav className={styles.dayButtons}>
        {days.map((day, index) => {
          const date = weekDates[index];
          const isToday = date.toDateString() === todayDateStr;
          const isSelected = selectedDay === day;

          return (
            <button
              key={day}
              className={`${isSelected ? styles.active : ''} ${isToday ? styles.today : ''}`}
              onClick={() => setSelectedDay(day)}
            >
              <span className={styles.dayName}>{day}</span>
              <span className={styles.dayDate}>
                {date.getDate()}.{date.getMonth() + 1}.
              </span>
            </button>
          );
        })}
      </nav>

      <div className={styles.weatherBar}>
        {weatherLoading ? (
          <span className={styles.weatherLoading}>⏳</span>
        ) : currentWeather ? (
          <>
            <span className={styles.weatherIcon}>{currentWeather.icon}</span>
            <span className={styles.temperature}>
              {currentWeather.high}°/{currentWeather.low}°
            </span>
          </>
        ) : (
          <span className={styles.weatherIcon}>☀️</span>
        )}
      </div>

      <div className={styles.eventsList}>
        {shiftInfo.shift === 'afternoon' ? (
          <>
            {/* Daycare activities first for afternoon shift */}
            {daycareActivities[shiftInfo.shift].map((activity, index) => (
              <div key={`daycare-${index}`} className={`${styles.event} ${styles.daycareEvent}`}>
                <div className={styles.eventTime}>{activity.time}</div>
                <div className={styles.eventContent}>
                  <div className={styles.eventHeader}>
                    <span className={styles.eventIcon}>{getSubjectIcon(activity.activity)}</span>
                    <div className={styles.eventTitle}>{activity.activity}</div>
                  </div>
                  <div className={styles.eventType}>Produženi boravak</div>
                </div>
              </div>
            ))}
            {/* Classes second for afternoon shift */}
            {schedules[shiftInfo.shift][selectedDay].map((lesson, index) => (
              <div key={`class-${index}`} className={`${styles.event} ${styles.classEvent}`}>
                <div className={styles.eventTime}>{lesson.time}</div>
                <div className={styles.eventContent}>
                  <div className={styles.eventHeader}>
                    <span className={styles.eventIcon}>{getSubjectIcon(lesson.subject)}</span>
                    <div className={styles.eventTitle}>{lesson.subject}</div>
                  </div>
                  <div className={styles.eventType}>Nastava</div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {/* Classes first for morning shift */}
            {schedules[shiftInfo.shift][selectedDay].map((lesson, index) => (
              <div key={`class-${index}`} className={`${styles.event} ${styles.classEvent}`}>
                <div className={styles.eventTime}>{lesson.time}</div>
                <div className={styles.eventContent}>
                  <div className={styles.eventHeader}>
                    <span className={styles.eventIcon}>{getSubjectIcon(lesson.subject)}</span>
                    <div className={styles.eventTitle}>{lesson.subject}</div>
                  </div>
                  <div className={styles.eventType}>Nastava</div>
                </div>
              </div>
            ))}
            {/* Daycare activities second for morning shift */}
            {daycareActivities[shiftInfo.shift].map((activity, index) => (
              <div key={`daycare-${index}`} className={`${styles.event} ${styles.daycareEvent}`}>
                <div className={styles.eventTime}>{activity.time}</div>
                <div className={styles.eventContent}>
                  <div className={styles.eventHeader}>
                    <span className={styles.eventIcon}>{getSubjectIcon(activity.activity)}</span>
                    <div className={styles.eventTitle}>{activity.activity}</div>
                  </div>
                  <div className={styles.eventType}>Produženi boravak</div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}