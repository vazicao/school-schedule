import { getISOWeek, getISOWeekYear, startOfISOWeek, addWeeks, getDay } from 'date-fns';

export type ShiftType = 'morning' | 'afternoon';

// Week 38 of September 2025 is afternoon shift (reference point)
const REFERENCE_WEEK = 38;
const REFERENCE_YEAR = 2025;
const REFERENCE_SHIFT: ShiftType = 'afternoon';

/**
 * Get ISO week number for a given date
 */
function getWeekNumber(date: Date): { week: number; year: number } {
  return {
    week: getISOWeek(date),
    year: getISOWeekYear(date)
  };
}

/**
 * Determine the current shift based on the week number
 * Shifts alternate weekly: W37=afternoon, W38=morning, W39=afternoon, etc.
 */
export function getCurrentShift(date: Date = new Date()): ShiftType {
  const { week, year } = getWeekNumber(date);

  // Calculate total weeks from reference point
  const totalWeeksFromReference = (year - REFERENCE_YEAR) * 52 + (week - REFERENCE_WEEK);

  // If the difference is even, same shift as reference
  // If odd, opposite shift
  const isEvenWeekDifference = totalWeeksFromReference % 2 === 0;

  if (isEvenWeekDifference) {
    return REFERENCE_SHIFT;
  } else {
    return REFERENCE_SHIFT === 'afternoon' ? 'morning' : 'afternoon';
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

  const shiftName = shift === 'morning' ? 'Jutarnja smena' : 'Popodnevna smena';

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