import type { ClassYearConfig } from "../../../../lib/schoolConfig";

export const config: ClassYearConfig = {
  schoolYear: "2026/2027",
  grade: 3,
  section: "3",
  schoolYearStart: "2026-09-01",
  // Confirmed by the parent: the week of Mon 23 Nov 2026 is a morning-shift
  // week; shifts alternate weekly from there.
  shiftAnchor: { mondayOfWeek: "2026-11-23", shift: "morning" },
  homeroomTeacherId: "miljkovic-jovana",
};
