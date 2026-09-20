import type { BellSchedule } from "./schedule";
import type { ShiftAnchor } from "./shiftDetection";

// --- School level: data/<school>/school.ts ---

export interface SchoolConfig {
  slug: string; // must equal the folder name, e.g. "os-jelena-cetkovic"
  name: string; // "OŠ Jelena Ćetković"
  shortName: string; // shown in the schedule header, e.g. "Jelena Ćetković"
  fullName: string;
  address?: string;
  // When each period starts/ends, per shift. Shared by every class in the school.
  bellSchedule: BellSchedule;
}

// --- Class level, per school year: data/<school>/<class>/<year>/config.ts ---

export interface ClassYearConfig {
  schoolYear: string; // "2026/2027"
  grade: number; // 1-8 — bump this together with the new year's data
  section: string; // "2" (or "a"/"b" for schools that use letters)
  // First day of the school year. "Previous week" navigation stops at the
  // Monday of this date's week (no schedule exists before it).
  schoolYearStart: string; // ISO date, "2026-09-01"
  // A Monday whose shift is known; shifts alternate weekly from it.
  shiftAnchor: ShiftAnchor;
  homeroomTeacherId: string; // key into this year's teachers.ts
}

// --- Display helpers ---

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export const toRoman = (n: number): string => ROMAN[n] ?? String(n);

// "III·2" — grade as a roman numeral, then the section
export const formatClassName = (grade: number, section: string): string =>
  `${toRoman(grade)}·${section.toUpperCase()}`;

// --- Slug conventions ---
// School slug: lowercase ASCII kebab-case, e.g. "os-jelena-cetkovic".
// Class slug:  "gen-<year the group started 1st grade>-<section>", e.g.
//              "gen-2024-2". It identifies the GROUP of kids, so it never
//              changes as they move up a grade — the link parents get stays
//              valid for all years. Grade lives in each year's config instead.
// Year folder: "2026-27" (the latest one is what the app shows).

export const SCHOOL_SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
export const CLASS_SLUG_RE = /^gen-\d{4}-[a-z0-9]+$/;
export const YEAR_FOLDER_RE = /^\d{4}-\d{2}$/;
