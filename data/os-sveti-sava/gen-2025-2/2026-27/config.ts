import type { ClassYearConfig } from "../../../../lib/schoolConfig";

export const config: ClassYearConfig = {
  schoolYear: "2026/2027",
  grade: 2,
  section: "2",
  schoolYearStart: "2026-09-01",
  // This class doesn't alternate shifts — always afternoon.
  shiftAnchor: { fixed: "afternoon" },
  homeroomTeacherId: "tomanic-dragana",
};
