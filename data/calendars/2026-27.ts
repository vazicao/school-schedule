import type { NonSchoolDay } from "../../lib/schoolCalendar";

// Official calendar for grades 1–7, from the Ministarstvo prosvete's
// "Pravilnik o kalendaru obrazovno-vaspitnog rada osnovne škole za školsku
// 2026/2027. godinu" (June 2026). This is the same for every school in
// Serbia, so it isn't tied to any one school or class — see data/README.md.
//
// Only actual non-school days are listed (raspusti, plus the two holidays
// with no classes). Left out on purpose:
// - Uto 10.11.2026, when classes follow Friday's timetable instead of
//   Tuesday's — a schedule swap, not a day off.
// - Dates the calendar "observes" but where classes still happen normally
//   (21.10.2026, 22.04.2027, 09.05.2027, and the 05–07.05.2027 themed week).
// - The Član 8 religious holidays — an individual student's right to skip,
//   not a whole-class closure.
// - The EXPO 2027 field-trip day — one day sometime 17.05–25.06.2027, not
//   yet chosen by the school.
export const nonSchoolDays: NonSchoolDay[] = [
  {
    startDate: "2026-11-11",
    endDate: "2026-11-13",
    label: "Jesenji raspust",
    emoji: "🍂",
  },
  {
    startDate: "2026-12-31",
    endDate: "2027-01-15",
    label: "Zimski raspust",
    emoji: "🎄",
  },
  {
    startDate: "2027-01-27",
    endDate: "2027-01-27",
    label: "Sveti Sava",
    emoji: "🕯️",
  },
  {
    startDate: "2027-02-15",
    endDate: "2027-02-19",
    label: "Sretenjski raspust",
    emoji: "⛄",
  },
  {
    startDate: "2027-04-30",
    endDate: "2027-05-04",
    label: "Prolećni raspust",
    emoji: "🌸",
  },
  {
    startDate: "2027-06-14",
    endDate: "2027-08-31",
    label: "Letnji raspust",
    emoji: "🏖️",
  },
  {
    startDate: "2027-06-28",
    endDate: "2027-06-28",
    label: "Vidovdan",
    emoji: "🎗️",
  },
];
