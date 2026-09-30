import type {
  RawShiftSchedules,
  RawWeekSchedule,
} from "../../../../lib/schedule";

// Weekly timetable for the 2026/27 school year. Period TIMES come from the
// school's bell schedule (../../school.ts).
const afternoonSchedule: RawWeekSchedule = {
  Ponedeljak: [
    { order: "1. čas", subject: "Srpski jezik" },
    { order: "2. čas", subject: "Engleski jezik" },
    { order: "3. čas", subject: "Matematika" },
    { order: "4. čas", subject: "Likovna kultura" },
  ],
  Utorak: [
    { order: "1. čas", subject: "Matematika" },
    { order: "2. čas", subject: "Srpski jezik" },
    { order: "3. čas", subject: "Svet oko nas" },
    { order: "4. čas", subject: "Građansko vaspitanje / Verska nastava" },
  ],
  Sreda: [
    { order: "1. čas", subject: "Srpski jezik" },
    { order: "2. čas", subject: "Matematika" },
    { order: "3. čas", subject: "Muzička kultura" },
    { order: "4. čas", subject: "Fizičko i zdravstveno vaspitanje" },
  ],
  Četvrtak: [
    { order: "1. čas", subject: "Matematika" },
    { order: "2. čas", subject: "Srpski jezik" },
    { order: "3. čas", subject: "Fizičko i zdravstveno vaspitanje" },
    { order: "4. čas", subject: "Svet oko nas" },
  ],
  Petak: [
    { order: "1. čas", subject: "Engleski jezik" },
    { order: "2. čas", subject: "Matematika" },
    { order: "3. čas", subject: "Srpski jezik" },
    { order: "4. čas", subject: "Fizičko i zdravstveno vaspitanje" },
  ],
};

export const schedule: RawShiftSchedules = {
  // Fixed afternoon shift, no alternation (see shiftAnchor in config.ts) —
  // "morning" is never rendered, pointed at the same schedule so there's
  // nothing that could drift out of sync.
  morning: afternoonSchedule,
  afternoon: afternoonSchedule,
};
