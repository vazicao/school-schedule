// Server-only: finds classes under /data on disk and loads the latest year's
// data for one. Uses `fs`, so it must only be imported from server code (the
// route's page.tsx) — never from a client component.
import fs from "node:fs";
import path from "node:path";
import {
  buildClassData,
  type ClassData,
  type ClassYearData,
} from "./classData";
import {
  SCHOOL_SLUG_RE,
  CLASS_SLUG_RE,
  YEAR_FOLDER_RE,
  type SchoolConfig,
} from "./schoolConfig";
import type { NonSchoolDay } from "./schoolCalendar";

const DATA_DIR = path.join(process.cwd(), "data");

// Names of sub-folders of `dir` matching `re`, sorted ascending.
const listDirs = (dir: string, re: RegExp): string[] => {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && re.test(entry.name))
    .map((entry) => entry.name)
    .sort();
};

// The newest year folder for a class, e.g. "2026-27". Year folders sort
// lexicographically, so the last one wins — publishing next year's data means
// adding its folder; no date logic involved.
const latestYearFolder = (school: string, classSlug: string): string | null =>
  listDirs(path.join(DATA_DIR, school, classSlug), YEAR_FOLDER_RE).at(-1) ??
  null;

// Every (school, class) that has at least one year of data — used to
// pre-render all valid routes at build time. Adding a class = adding a folder.
export const listClassParams = (): { school: string; class: string }[] =>
  listDirs(DATA_DIR, SCHOOL_SLUG_RE).flatMap((school) =>
    listDirs(path.join(DATA_DIR, school), CLASS_SLUG_RE)
      .filter((classSlug) => latestYearFolder(school, classSlug) !== null)
      .map((classSlug) => ({ school, class: classSlug })),
  );

// The official calendar (raspusti + no-class holidays) for a year folder,
// e.g. "2026-27" — the same file backs every school/class on that year (see
// data/calendars/). Older years may not have one yet; that's not an error,
// non-school days just won't show for them.
const loadCalendar = async (year: string): Promise<NonSchoolDay[]> => {
  try {
    const calendarModule = await import(`../data/calendars/${year}`);
    return calendarModule.nonSchoolDays as NonSchoolDay[];
  } catch {
    return [];
  }
};

// Load a class's latest year. Returns null if the school/class doesn't exist
// (callers turn that into a 404).
export const loadClassData = async (
  school: string,
  classSlug: string,
): Promise<ClassData | null> => {
  // Validate before building any import path from user-supplied values.
  if (!SCHOOL_SLUG_RE.test(school) || !CLASS_SLUG_RE.test(classSlug)) {
    return null;
  }
  const year = latestYearFolder(school, classSlug);
  if (!year) return null;

  const [schoolModule, yearModule, nonSchoolDays] = await Promise.all([
    import(`../data/${school}/school`),
    import(`../data/${school}/${classSlug}/${year}/index`),
    loadCalendar(year),
  ]);

  return buildClassData(
    schoolModule.default as SchoolConfig,
    classSlug,
    yearModule.default as ClassYearData,
    nonSchoolDays,
  );
};

// One entry per class, for the landing page's list. Built from the same data
// as the class pages, so a class added under /data appears there automatically.
export interface ClassListing {
  school: string; // school slug
  classSlug: string;
  schoolName: string; // "OŠ Jelena Ćetković"
  displayName: string; // "III·2"
  schoolYear: string; // "2026/2027"
}

export const listClasses = async (): Promise<ClassListing[]> => {
  const listings: ClassListing[] = [];
  for (const { school, class: classSlug } of listClassParams()) {
    const data = await loadClassData(school, classSlug);
    if (!data) continue;
    listings.push({
      school,
      classSlug,
      schoolName: data.school.name,
      displayName: data.displayName,
      schoolYear: data.schoolYear,
    });
  }
  return listings.sort(
    (a, b) =>
      a.schoolName.localeCompare(b.schoolName, "sr-Latn") ||
      a.displayName.localeCompare(b.displayName, "sr-Latn"),
  );
};
