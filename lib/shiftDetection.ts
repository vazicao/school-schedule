import {
  getISOWeek,
  getISOWeekYear,
  startOfISOWeek,
  addWeeks,
  getDay,
  differenceInCalendarWeeks,
  parseISO,
} from "date-fns";

export type ShiftType = "morning" | "afternoon";

// A Monday whose shift is known. Each class has its own anchor (two classes in
// the same school are often on opposite shifts in the same week); shifts
// alternate weekly from it. Kept as plain strings so it can be passed from the
// server to client components.
export interface ShiftAnchor {
  mondayOfWeek: string; // ISO date of a Monday, e.g. "2026-09-14"
  shift: ShiftType; // the shift during that week
}

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
 * Determine the shift for a date, given the class's anchor.
 * Shifts alternate weekly relative to the anchor Monday. Uses exact
 * calendar-week arithmetic (not "weeks per year"), so it's correct across
 * year boundaries — e.g. 2026 has 53 ISO weeks.
 */
export function getCurrentShift(
  anchor: ShiftAnchor,
  date: Date = new Date(),
): ShiftType {
  const targetMonday = startOfISOWeek(date);
  const weeksFromReference = differenceInCalendarWeeks(
    targetMonday,
    parseISO(anchor.mondayOfWeek),
    { weekStartsOn: 1 },
  );

  // If the difference is even, same shift as the anchor
  // If odd, opposite shift
  const isEvenWeekDifference = ((weeksFromReference % 2) + 2) % 2 === 0;

  if (isEvenWeekDifference) {
    return anchor.shift;
  } else {
    return anchor.shift === "afternoon" ? "morning" : "afternoon";
  }
}

/**
 * Get shift info with week details for display
 */
export function getShiftInfo(
  anchor: ShiftAnchor,
  date: Date = new Date(),
): {
  shift: ShiftType;
  week: number;
  year: number;
  shiftName: string;
} {
  const { week, year } = getWeekNumber(date);
  const shift = getCurrentShift(anchor, date);

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
