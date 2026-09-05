"use client";

import { format } from "date-fns";
import { srLatn as sr } from "date-fns/locale";
import styles from "../app/schedule/schedule.module.css";
// BORAVAK — SettingsDropdown currently only holds the daycare toggle, disabled
// for 3rd grade. Keep the import commented alongside the JSX below so it's a
// one-step re-enable (also uncomment showDaycare/onToggleDaycare props here
// and in app/schedule/page.tsx) if a future school/class needs boravak, or
// this dropdown grows other settings.
// import SettingsDropdown from "./SettingsDropdown";
import SvgIcon from "./SvgIcon";
import { getCurrentClass } from "../lib/schoolConfig";
import { type WeekInfo } from "../lib/weekNavigation";
import { getCurrentDay } from "../lib/scheduleData";

interface ScheduleHeaderProps {
  selectedWeek: WeekInfo;
  selectedDay: string;
  // showDaycare: boolean; // BORAVAK — disabled for 3rd grade
  // onToggleDaycare: (show: boolean) => void;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  onGoToCurrentWeek: () => void;
}

export default function ScheduleHeader({
  selectedWeek,
  selectedDay,
  // showDaycare,
  // onToggleDaycare,
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
          <h2>Jelena Ćetković</h2>
        </div>
        {/* BORAVAK — settings gear only toggled boravak visibility; disabled
            for 3rd grade. Uncomment along with the import above to restore.
        <SettingsDropdown
          showDaycare={showDaycare}
          onToggleDaycare={onToggleDaycare}
        />
        */}
      </div>

      <div className={styles.shiftIndicator}>
        <div className={styles.currentShift}>
          <h3 className="text-secondary">{capitalizedMonth}</h3>
          <h1 className="display1">Nedelja {selectedWeek.week}</h1>
        </div>
        <div className={styles.weekNavigation}>
          {(selectedDay !== getCurrentDay() || !selectedWeek.isCurrentWeek) && (
            <button
              onClick={onGoToCurrentWeek}
              className={styles.currentWeekButton}
              aria-label="Idi na trenutnu nedelju"
            >
              <h3 className="text-secondary">Danas</h3>
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
