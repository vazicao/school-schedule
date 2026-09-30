import type { ClassYearConfig } from "../../../../lib/schoolConfig";

// BORAVAK — unlike Jelena Ćetković's class (disabled for that grade), this
// class DOES have produženi boravak, but we don't have its schedule/times
// yet. Once known, re-enable the commented-out boravak block in
// components/SchedulePage.tsx and components/ScheduleHeader.tsx (daycare
// activities per shift + the showDaycare toggle) for this class.

export const config: ClassYearConfig = {
  schoolYear: "2026/2027",
  grade: 2,
  section: "2",
  schoolYearStart: "2026-09-01",
  // This class doesn't alternate shifts — always afternoon.
  shiftAnchor: { fixed: "afternoon" },
  homeroomTeacherId: "tomanic-dragana",
};
