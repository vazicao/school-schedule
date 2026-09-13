import {
  getISOWeek,
  getISOWeekYear,
  startOfISOWeek,
  addWeeks,
  getDay,
  differenceInCalendarWeeks,
} from "date-fns";

export type ShiftType = "morning" | "afternoon";

// Reference point for 3rd grade: the Monday of ISO week 38, 2026
// (2026-09-14) is a morning-shift week; week 39 (2026-09-21) is afternoon.
// Shifts alternate weekly from there. Anchored to an actual date (not a
// week/year pair) so the parity math below is exact calendar arithmetic —
// no approximation of "weeks per year" that would drift across a year
// boundary (2026 itself has 53 ISO weeks, so a naive "* 52" would have
// silently flipped the parity wrong partway through this school year).
const REFERENCE_MONDAY = new Date(2026, 8, 14); // September 14, 2026
const REFERENCE_SHIFT: ShiftType = "morning";

/**
 * Get ISO week number for a given date
 */
function getWeekNumber(date: Date): { week: number; year: number } {
  return {
    week: getISOWeek(date),
    year: getISOWeekYear(date),
  };
}

/**
 * Determine the current shift based on the week
 * Shifts alternate weekly relative to REFERENCE_MONDAY.
 */
export function getCurrentShift(date: Date = new Date()): ShiftType {
  const targetMonday = startOfISOWeek(date);
  const weeksFromReference = differenceInCalendarWeeks(
    targetMonday,
    REFERENCE_MONDAY,
    { weekStartsOn: 1 },
  );

  // If the difference is even, same shift as reference
  // If odd, opposite shift
  const isEvenWeekDifference = ((weeksFromReference % 2) + 2) % 2 === 0;

  if (isEvenWeekDifference) {
    return REFERENCE_SHIFT;
  } else {
    return REFERENCE_SHIFT === "afternoon" ? "morning" : "afternoon";
  }
}

/**
 * Get shift info with week details for display
 */
export function getShiftInfo(date: Date = new Date()): {
  shift: ShiftType;
  week: number;
  year: number;
  shiftName: string;
} {
  const { week, year } = getWeekNumber(date);
  const shift = getCurrentShift(date);

  const shiftName = shift === "morning" ? "Jutarnja smena" : "Popodnevna smena";

  return {
    shift,
    week,
    year,
    shiftName,
  };
}

/**
 * Check if a specific date falls on a school day (Mon-Fri)
 */
export function isSchoolDay(date: Date): boolean {
  const day = getDay(date);
  return day >= 1 && day <= 5; // Monday = 1, Friday = 5
}

/**
 * Get the next shift change date
 */
export function getNextShiftChange(date: Date = new Date()): Date {
  // Find the Monday of next week
  const monday = startOfISOWeek(date);
  return addWeeks(monday, 1);
}
