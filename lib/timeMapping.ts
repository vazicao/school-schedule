import type { ShiftType } from "./shiftDetection";
import type { BellSchedule, PeriodOrder } from "./schedule";

/**
 * Parse a period label ("1. čas", "Predčas", or legacy "2. čas (14:00)") and
 * look up its start/end times in the school's bell schedule.
 * Returns null when it isn't a regular class period.
 */
export function getClassTimes(
  bellSchedule: BellSchedule,
  timeString: string,
  shift: ShiftType,
): { startTime: string; endTime: string } | null {
  let order: PeriodOrder | null = null;

  if (/^predčas/i.test(timeString)) {
    order = "Predčas";
  } else {
    // Extract period number from formats like "1. čas", "2. čas (14:00)", etc.
    const periodMatch = timeString.match(/(\d+)\.\s*čas/i);
    if (periodMatch) {
      order = `${parseInt(periodMatch[1], 10)}. čas` as PeriodOrder;
    }
  }

  if (!order) {
    // Not a regular class period, return null to use original time
    return null;
  }

  const period = bellSchedule[shift].find((p) => p.order === order);
  if (!period) {
    return null;
  }

  return { startTime: period.startTime, endTime: period.endTime };
}

/**
 * Get time range for daycare (boravak) activities based on shift.
 * Boravak is currently disabled; kept for when it's re-enabled.
 */
export function getDaycareTimeRange(shift: ShiftType): {
  startTime: string;
  endTime: string;
} {
  if (shift === "morning") {
    return { startTime: "07:00", endTime: "12:00" };
  } else {
    return { startTime: "12:30", endTime: "14:30" };
  }
}
