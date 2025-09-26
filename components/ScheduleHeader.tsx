"use client";

import { format } from "date-fns";
import { sr } from "date-fns/locale";
import styles from "../app/schedule/schedule.module.css";
import SettingsDropdown from "./SettingsDropdown";
import SvgIcon from "./SvgIcon";
import { getCurrentClass } from "../lib/schoolConfig";
import { type WeekInfo } from "../lib/weekNavigation";
import { getCurrentDay } from "../lib/scheduleData";

interface ScheduleHeaderProps {
  selectedWeek: WeekInfo;
  selectedDay: string;
  showDaycare: boolean;
  onToggleDaycare: (show: boolean) => void;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  onGoToCurrentWeek: () => void;
}

export default function ScheduleHeader({
  selectedWeek,
  selectedDay,
  showDaycare,
  onToggleDaycare,
  onPreviousWeek,
  onNextWeek,
  onGoToCurrentWeek,
}: ScheduleHeaderProps) {
  const classInfo = getCurrentClass();
  const monthName = format(selectedWeek.startDate, "MMMM", { locale: sr });
  const capitalizedMonth =
    monthName.charAt(0).toUpperCase() + monthName.slice(1);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.schoolInfo}>
          <h2>{classInfo.name}</h2>
          <div className={styles.separator}></div>
          <h2>Јелена Ћетковић</h2>
        </div>
        <SettingsDropdown
          showDaycare={showDaycare}
          onToggleDaycare={onToggleDaycare}
        />
      </div>

      <div className={styles.shiftIndicator}>
        <div className={styles.currentShift}>
          <h3 className="text-secondary">{capitalizedMonth}</h3>
          <h1 className="display1">Недеља {selectedWeek.week}</h1>
        </div>
        <div className={styles.weekNavigation}>
          {(selectedDay !== getCurrentDay() || !selectedWeek.isCurrentWeek) && (
            <button
              onClick={onGoToCurrentWeek}
              className={styles.currentWeekButton}
              aria-label="Idi na trenutnu nedelju"
            >
              <h3 className="text-secondary">Данас</h3>
            </button>
          )}
          <button
            onClick={onPreviousWeek}
            className={styles.weekNavButton}
            aria-label="Prethodna nedelja"
          >
            <SvgIcon iconId="caret-left" size={20} />
          </button>
          <button
            onClick={onNextWeek}
            className={styles.weekNavButton}
            aria-label="Sledeća nedelja"
          >
            <SvgIcon iconId="caret-right" size={20} />
          </button>
        </div>
      </div>
    </>
  );
}
