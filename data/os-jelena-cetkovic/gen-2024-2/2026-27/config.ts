import type { ClassYearConfig } from "../../../../lib/schoolConfig";

export const config: ClassYearConfig = {
  schoolYear: "2026/2027",
  grade: 3,
  section: "2",
  schoolYearStart: "2026-09-01",
  // The week of Mon 14 Sep 2026 is a morning-shift week; shifts alternate
  // weekly from there.
  shiftAnchor: { mondayOfWeek: "2026-09-14", shift: "morning" },
  homeroomTeacherId: "maksimovic-bojana",
};
