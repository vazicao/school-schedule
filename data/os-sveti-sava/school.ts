import type { SchoolConfig } from "../../lib/schoolConfig";
import type { BellPeriod } from "../../lib/schedule";

// We only have the exact start (14:30) and end (17:15) of this class's
// timetable, plus "35-minute periods" — the times below split the remaining
// time as 5/15/5-minute breaks (mirroring how Jelena Ćetković's own
// afternoon shift is structured: short breaks + one long one after period
// 2). Worth confirming with the school if it turns out wrong.
const afternoonPeriods: BellPeriod[] = [
  { order: "1. čas", startTime: "14:30", endTime: "15:05" },
  { order: "2. čas", startTime: "15:10", endTime: "15:45" },
  { order: "3. čas", startTime: "16:00", endTime: "16:35" },
  { order: "4. čas", startTime: "16:40", endTime: "17:15" },
];

const school: SchoolConfig = {
  slug: "os-sveti-sava",
  name: "OŠ Sveti Sava",
  shortName: "Sveti Sava",
  fullName: 'Osnovna škola "Sveti Sava"',
  // Period times per shift — shared by every class in the school.
  bellSchedule: {
    // gen-2025-2 doesn't alternate shifts (see its shiftAnchor) — the real
    // times are the afternoon ones above; "morning" is never read, pointed
    // at the same array so there's nothing that could drift out of sync.
    morning: afternoonPeriods,
    afternoon: afternoonPeriods,
  },
};

export default school;
