import type { ClassYearConfig } from "../../../../lib/schoolConfig";

export const config: ClassYearConfig = {
  schoolYear: "2026/2027",
  grade: 2,
  section: "2",
  schoolYearStart: "2026-09-01",
  // This class doesn't alternate shifts — always afternoon.
  shiftAnchor: { fixed: "afternoon" },
  // Not known yet — no homeroom teacher entered in teachers.ts either.
  // See data/README.md for how to add one once we have a name.
  homeroomTeacherId: "",
};
