import type { ClassYearConfig } from "../../../../lib/schoolConfig";

export const config: ClassYearConfig = {
  schoolYear: "2026/2027",
  grade: 3,
  section: "3",
  schoolYearStart: "2026-09-01",
  // UNCONFIRMED — the class alternates morning/afternoon weekly (the school
  // gave both timetables), but we don't yet know which shift any given week
  // is. Placeholder: week of Mon 23 Nov 2026 = morning. If it's actually
  // afternoon that week, flip `shift` below.
  shiftAnchor: { mondayOfWeek: "2026-11-23", shift: "morning" },
  // Not known yet — no teachers in teachers.ts, so no teacher is shown.
  homeroomTeacherId: "",
};
