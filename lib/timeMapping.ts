import type { ShiftType } from "./shiftDetection";

export interface ClassPeriod {
  period: number;
  startTime: string;
  endTime: string;
}

// Morning shift timetable (Преподневна смена)
const morningTimetable: ClassPeriod[] = [
  { period: 1, startTime: "08:00", endTime: "08:45" },
  { period: 2, startTime: "08:50", endTime: "09:35" },
  { period: 3, startTime: "09:55", endTime: "10:40" },
  { period: 4, startTime: "10:45", endTime: "11:30" },
  { period: 5, startTime: "11:35", endTime: "12:20" },
  { period: 6, startTime: "12:25", endTime: "13:10" },
];

// Afternoon shift timetable (Поподневна смена)
const afternoonTimetable: ClassPeriod[] = [
  { period: 0, startTime: "13:10", endTime: "13:55" }, // Предчас
  { period: 1, startTime: "14:00", endTime: "14:45" },
  { period: 2, startTime: "14:50", endTime: "15:35" },
  { period: 3, startTime: "15:55", endTime: "16:40" },
  { period: 4, startTime: "16:45", endTime: "17:30" },
  { period: 5, startTime: "17:35", endTime: "18:20" },
  { period: 6, startTime: "18:25", endTime: "19:10" },
];

/**
 * Get the timetable for a specific shift
 */
export function getTimetableForShift(shift: ShiftType): ClassPeriod[] {
  return shift === "morning" ? morningTimetable : afternoonTimetable;
}

/**
 * Parse class period from time string and get start/end times
 */
export function getClassTimes(
  timeString: string,
  shift: ShiftType,
): { startTime: string; endTime: string } | null {
  // Handle "Предчас" specifically for afternoon shift
  if (timeString === "Предчас" && shift === "afternoon") {
    return { startTime: "13:10", endTime: "13:55" };
  }

  // Extract period number from formats like "1. час", "2. час (14:00)", etc.
  const periodMatch = timeString.match(/(\d+)\.\s*час/i);

  if (!periodMatch) {
    // Not a regular class period, return null to use original time
    return null;
  }

  const periodNumber = parseInt(periodMatch[1], 10);
  const timetable = getTimetableForShift(shift);
  const classPeriod = timetable.find((p) => p.period === periodNumber);

  if (!classPeriod) {
    return null;
  }

  return {
    startTime: classPeriod.startTime,
    endTime: classPeriod.endTime,
  };
}

/**
 * Get time range for daycare activities based on shift
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
