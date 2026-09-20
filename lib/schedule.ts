import { getDay } from "date-fns";
import type { SubjectId } from "./subjects";
import type { ShiftType } from "./shiftDetection";

export type Day =
  | "Ponedeljak"
  | "Utorak"
  | "Sreda"
  | "Četvrtak"
  | "Petak"
  | "Subota"
  | "Nedelja";

// Days that can have classes (weekends never do)
export type SchoolDay = Exclude<Day, "Subota" | "Nedelja">;

// Period labels used by every school's bell schedule and every class schedule.
export type PeriodOrder =
  | "Pretčas"
  | "1. čas"
  | "2. čas"
  | "3. čas"
  | "4. čas"
  | "5. čas"
  | "6. čas";

// --- Bell schedule (per SCHOOL): when each period starts/ends, per shift ---

export interface BellPeriod {
  order: PeriodOrder;
  startTime: string;
  endTime: string;
}

export type BellSchedule = Record<ShiftType, BellPeriod[]>;

// --- Class schedule as authored in a class's data folder ---
// Just "which subject in which period" — times come from the bell schedule, so
// they're defined once per school instead of repeated in every class.

export interface RawPeriod {
  order: PeriodOrder;
  subject: SubjectId;
}

export type RawWeekSchedule = Record<SchoolDay, RawPeriod[]>;
export type RawShiftSchedules = Record<ShiftType, RawWeekSchedule>;

// --- Resolved schedule (what the UI renders): periods with times filled in ---

export interface ClassPeriod {
  order: PeriodOrder;
  startTime: string;
  endTime: string;
  subject: SubjectId;
}

export type DaySchedule = ClassPeriod[];

export type WeekSchedule = {
  [D in Day]: DaySchedule;
};

export type ShiftSchedules = {
  morning: WeekSchedule;
  afternoon: WeekSchedule;
};

const resolveWeek = (
  week: RawWeekSchedule,
  bell: BellPeriod[],
  shift: ShiftType,
): WeekSchedule => {
  const resolveDay = (day: SchoolDay): DaySchedule =>
    week[day].map(({ order, subject }) => {
      const period = bell.find((p) => p.order === order);
      if (!period) {
        // Fails the build (the loader runs at build time) rather than
        // rendering a period with no time.
        throw new Error(
          `${day}: period "${order}" (${subject}) isn't in the ${shift} bell schedule`,
        );
      }
      return {
        order,
        startTime: period.startTime,
        endTime: period.endTime,
        subject,
      };
    });

  return {
    Ponedeljak: resolveDay("Ponedeljak"),
    Utorak: resolveDay("Utorak"),
    Sreda: resolveDay("Sreda"),
    Četvrtak: resolveDay("Četvrtak"),
    Petak: resolveDay("Petak"),
    Subota: [],
    Nedelja: [],
  };
};

// Combine a class's compact schedule with its school's bell schedule.
export const resolveSchedules = (
  raw: RawShiftSchedules,
  bellSchedule: BellSchedule,
): ShiftSchedules => ({
  morning: resolveWeek(raw.morning, bellSchedule.morning, "morning"),
  afternoon: resolveWeek(raw.afternoon, bellSchedule.afternoon, "afternoon"),
});

// Helper function to get current day
export const getCurrentDay = (): Day => {
  // Use the current date in the user's timezone consistently
  const today = new Date();
  const dayOfWeek = getDay(today);
  const dayMap: Record<number, Day> = {
    0: "Nedelja",
    1: "Ponedeljak",
    2: "Utorak",
    3: "Sreda",
    4: "Četvrtak",
    5: "Petak",
    6: "Subota",
  };
  return dayMap[dayOfWeek] || "Ponedeljak";
};
