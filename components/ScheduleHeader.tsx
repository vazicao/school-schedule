'use client';

import { format } from 'date-fns';
import { sr } from 'date-fns/locale';
import styles from '../app/schedule/schedule.module.css';
import SettingsDropdown from './SettingsDropdown';
import { getCurrentClass } from '../lib/schoolConfig';
import { type WeekInfo } from '../lib/weekNavigation';

interface ScheduleHeaderProps {
  selectedWeek: WeekInfo;
  showDaycare: boolean;
  onToggleDaycare: (show: boolean) => void;
  onDownloadPDF: () => void;
  isGeneratingPDF: boolean;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  onGoToCurrentWeek: () => void;
}

export default function ScheduleHeader({
  selectedWeek,
  showDaycare,
  onToggleDaycare,
  onDownloadPDF,
  isGeneratingPDF,
  onPreviousWeek,
  onNextWeek,
  onGoToCurrentWeek,
}: ScheduleHeaderProps) {
  const classInfo = getCurrentClass();

  return (
    <>
      <div className={styles.header}>
        <div className={styles.classContainer}>
          {classInfo.name}
        </div>
        <div className={styles.schoolInfo}>
          <h2 className={styles.schoolName}>Јелена Ћетковић</h2>
          <div className="caption-large" style={{ color: 'var(--color-text-secondary)' }}>
            Врањска 26, Београд
          </div>
        </div>
        <SettingsDropdown
          showDaycare={showDaycare}
          onToggleDaycare={onToggleDaycare}
          onDownloadPDF={onDownloadPDF}
          isGeneratingPDF={isGeneratingPDF}
        />
      </div>

      <div className={styles.shiftIndicator}>
        <div className={styles.currentShift}>
          <span className={styles.weekInfo}>
            <span className="display1">{format(selectedWeek.startDate, 'MMMM', { locale: sr })}</span> W{selectedWeek.week}
            {selectedWeek.isCurrentWeek && ' (trenutna nedelja)'}
          </span>
        </div>
        <div className={styles.weekNavigation}>
          {!selectedWeek.isCurrentWeek && (
            <button
              onClick={onGoToCurrentWeek}
              className={styles.currentWeekButton}
              aria-label="Idi na trenutnu nedelju"
            >
              📅 Danas
            </button>
          )}
          <button
            onClick={onPreviousWeek}
            className={styles.weekNavButton}
            aria-label="Prethodna nedelja"
          >
            ←
          </button>
          <button
            onClick={onNextWeek}
            className={styles.weekNavButton}
            aria-label="Sledeća nedelja"
          >
            →
          </button>
        </div>
      </div>
    </>
  );
}