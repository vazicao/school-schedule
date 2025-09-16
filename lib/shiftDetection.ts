export type ShiftType = 'morning' | 'afternoon';

// Week 38 of September 2025 is afternoon shift (reference point)
const REFERENCE_WEEK = 38;
const REFERENCE_YEAR = 2025;
const REFERENCE_SHIFT: ShiftType = 'afternoon';

/**
 * Get ISO week number for a given date
 */
function getWeekNumber(date: Date): { week: number; year: number } {
  // Create a copy of the date to avoid modifying the original
  const tempDate = new Date(date.getTime());

  // Set to Thursday of the week (ISO week date)
  tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));

  // Get the year of the Thursday
  const year = tempDate.getFullYear();

  // Calculate the week number
  const yearStart = new Date(year, 0, 1);
  const week = Math.ceil(((tempDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);

  return { week, year };
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
  const day = date.getDay();
  return day >= 1 && day <= 5; // Monday = 1, Friday = 5
}

/**
 * Get the next shift change date
 */
export function getNextShiftChange(date: Date = new Date()): Date {
  // Find the Monday of next week
  const nextMonday = new Date(date);
  const daysUntilNextMonday = ((7 - date.getDay()) % 7) + 1;
  nextMonday.setDate(date.getDate() + daysUntilNextMonday);

  return nextMonday;
}