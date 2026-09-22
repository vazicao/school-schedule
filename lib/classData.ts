import type { SubjectId } from "./subjects";
import type {
  BellSchedule,
  RawShiftSchedules,
  ShiftSchedules,
} from "./schedule";
import { resolveSchedules } from "./schedule";
import type { Exam } from "./examData";
import type { Teacher } from "./teacherData";
import type { ClassTextbooks } from "./textbookData";
import type { SchoolConfig, ClassYearConfig } from "./schoolConfig";
import { formatClassName } from "./schoolConfig";
import type { ShiftAnchor } from "./shiftDetection";
import type { NonSchoolDay } from "./schoolCalendar";

// What every year folder (data/<school>/<class>/<year>/index.ts) must export.
// Each file in the folder feeds one field; `satisfies ClassYearData` in the
// folder's index.ts makes the compiler check all of it.
export interface ClassYearData {
  config: ClassYearConfig;
  schedule: RawShiftSchedules;
  exams: Exam[];
  teachers: Record<string, Teacher>;
  subjectTeachers: Partial<Record<SubjectId, string>>;
  textbooks: ClassTextbooks;
  pribor: Partial<Record<SubjectId, string[]>>;
}

// The fully-assembled data for one class, as consumed by the schedule UI.
// Plain, serializable values only (no Dates/functions), because it's built on
// the server and passed to the client component as props.
export interface ClassData {
  slug: string; // class slug, e.g. "gen-2024-2"
  school: Pick<SchoolConfig, "slug" | "name" | "shortName">;
  displayName: string; // "III·2"
  schoolYear: string; // "2026/2027"
  schoolYearStart: string; // ISO date
  shiftAnchor: ShiftAnchor;
  bellSchedule: BellSchedule;
  schedules: ShiftSchedules; // periods with times filled in
  nonSchoolDays: NonSchoolDay[]; // raspusti + no-class holidays, from data/calendars
  exams: Exam[];
  teachers: Record<string, Teacher>;
  subjectTeachers: Partial<Record<SubjectId, string>>;
  homeroomTeacherId: string;
  textbooks: ClassTextbooks;
  pribor: Partial<Record<SubjectId, string[]>>;
}

// These pages are public, so contact details are only sent to the browser for
// teachers who opted in (showContact). For everyone else they're removed here
// on the server — not merely hidden in the UI, where they'd still be visible
// in the page's data.
const publicTeachers = (
  teachers: Record<string, Teacher>,
): Record<string, Teacher> =>
  Object.fromEntries(
    Object.entries(teachers).map(([id, t]) => [
      id,
      t.showContact ? t : { id: t.id, name: t.name, subjects: t.subjects },
    ]),
  );

// Combine a school, a class slug and one year's data into ClassData.
// Pure — no file access, so it's easy to reason about and test.
export const buildClassData = (
  school: SchoolConfig,
  classSlug: string,
  year: ClassYearData,
  nonSchoolDays: NonSchoolDay[],
): ClassData => ({
  slug: classSlug,
  school: {
    slug: school.slug,
    name: school.name,
    shortName: school.shortName,
  },
  displayName: formatClassName(year.config.grade, year.config.section),
  schoolYear: year.config.schoolYear,
  schoolYearStart: year.config.schoolYearStart,
  shiftAnchor: year.config.shiftAnchor,
  bellSchedule: school.bellSchedule,
  schedules: resolveSchedules(year.schedule, school.bellSchedule),
  nonSchoolDays,
  exams: year.exams,
  teachers: publicTeachers(year.teachers),
  subjectTeachers: year.subjectTeachers,
  homeroomTeacherId: year.config.homeroomTeacherId,
  textbooks: year.textbooks,
  pribor: year.pribor,
});
