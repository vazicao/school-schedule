/**
 * Week navigation utilities for cycling through school weeks
 */

import { getISOWeek, getISOWeekYear, startOfISOWeek, addWeeks, isSameISOWeek, addDays, format } from 'date-fns';
import { sr } from 'date-fns/locale';

export interface WeekInfo {
  week: number;
  year: number;
  startDate: Date;
  endDate: Date;
  isCurrentWeek: boolean;
}

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
 * Get the Monday of a given ISO week
 */
function getMondayOfWeek(year: number, week: number): Date {
  // Create a date in the target year
  const jan4 = new Date(year, 0, 4); // January 4th is always in week 1
  const startOfYear = startOfISOWeek(jan4);

  // Add weeks to get to target week
  return addWeeks(startOfYear, week - 1);
}

/**
 * Get week info for a specific week
 */
export function getWeekInfo(year: number, week: number): WeekInfo {
  const startDate = getMondayOfWeek(year, week);
  // For school week, we want Friday as end
  const fridayEndDate = addDays(startDate, 4); // Friday

  const today = new Date();
  const isCurrentWeek = isSameISOWeek(today, startDate);

  return {
    week,
    year,
    startDate,
    endDate: fridayEndDate,
    isCurrentWeek,
  };
}

/**
 * Get current week info
 */
export function getCurrentWeekInfo(): WeekInfo {
  const { week, year } = getWeekNumber(new Date());
  return getWeekInfo(year, week);
}

/**
 * Navigate to next week
 */
export function getNextWeek(currentYear: number, currentWeek: number): { year: number; week: number } {
  const nextWeek = currentWeek + 1;

  // Check if we need to move to next year
  const lastWeekOfYear = getWeeksInYear(currentYear);
  if (nextWeek > lastWeekOfYear) {
    return { year: currentYear + 1, week: 1 };
  }

  return { year: currentYear, week: nextWeek };
}

/**
 * Navigate to previous week
 */
export function getPreviousWeek(currentYear: number, currentWeek: number): { year: number; week: number } {
  const prevWeek = currentWeek - 1;

  // Check if we need to move to previous year
  if (prevWeek < 1) {
    const prevYear = currentYear - 1;
    return { year: prevYear, week: getWeeksInYear(prevYear) };
  }

  return { year: currentYear, week: prevWeek };
}

/**
 * Get number of weeks in a year
 */
function getWeeksInYear(year: number): number {
  // Check December dates to find the last week that belongs to this year
  // December 31st might belong to week 1 of next year in ISO week numbering
  for (let day = 31; day >= 25; day--) {
    const date = new Date(year, 11, day);
    const weekYear = getISOWeekYear(date);
    if (weekYear === year) {
      return getISOWeek(date);
    }
  }
  // Fallback - most years have 52 weeks
  return 52;
}

/**
 * Get dates for each day of a specific week
 */
export function getWeekDates(year: number, week: number, includeWeekends: boolean = false): Date[] {
  const monday = getMondayOfWeek(year, week);
  const dates: Date[] = [];
  const dayCount = includeWeekends ? 7 : 5; // Monday to Sunday or Monday to Friday

  for (let i = 0; i < dayCount; i++) {
    dates.push(addDays(monday, i));
  }

  return dates;
}

/**
 * Format week for display
 */
export function formatWeekDisplay(weekInfo: WeekInfo): string {
  const startStr = format(weekInfo.startDate, 'd. MMM', { locale: sr });
  const endStr = format(weekInfo.endDate, 'd. MMM', { locale: sr });

  return `${startStr} - ${endStr}`;
}