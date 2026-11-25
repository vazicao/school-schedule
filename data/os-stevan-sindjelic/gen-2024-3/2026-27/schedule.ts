import type { RawShiftSchedules } from "../../../../lib/schedule";

// Weekly timetable for the 2026/27 school year, from the class's printed
// "Raspored časova III/3" (pre podne / posle podne). Period TIMES come from
// the school's bell schedule (../../school.ts). The two shifts alternate
// weekly — see shiftAnchor in config.ts.
// Monday 4. čas is "Verska nastava / Građansko vaspitanje" — the class splits
// by each child's choice, so it's the combined slot (same as Jelena Ćetković).
export const schedule: RawShiftSchedules = {
  morning: {
    Ponedeljak: [
      { order: "1. čas", subject: "Srpski jezik" },
      { order: "2. čas", subject: "Matematika" },
      { order: "3. čas", subject: "Priroda i društvo" },
      { order: "4. čas", subject: "Građansko vaspitanje / Verska nastava" },
    ],
    Utorak: [
      { order: "1. čas", subject: "Matematika" },
      { order: "2. čas", subject: "Srpski jezik" },
      { order: "3. čas", subject: "Fizičko i zdravstveno vaspitanje" },
      { order: "4. čas", subject: "Likovna kultura" },
      { order: "5. čas", subject: "Likovna kultura" },
    ],
    Sreda: [
      { order: "1. čas", subject: "Srpski jezik" },
      { order: "2. čas", subject: "Matematika" },
      { order: "3. čas", subject: "Digitalni svet" },
      { order: "4. čas", subject: "Engleski jezik" },
    ],
    Četvrtak: [
      { order: "1. čas", subject: "Matematika" },
      { order: "2. čas", subject: "Srpski jezik" },
      {
        order: "3. čas",
        subject: "Fizičko i zdravstveno vaspitanje (bez sale)",
      },
      { order: "4. čas", subject: "Priroda i društvo" },
      { order: "5. čas", subject: "Muzička kultura" },
    ],
    Petak: [
      { order: "1. čas", subject: "Srpski jezik" },
      { order: "2. čas", subject: "Fizičko i zdravstveno vaspitanje" },
      { order: "3. čas", subject: "Matematika" },
      { order: "4. čas", subject: "ČOS" },
      { order: "5. čas", subject: "Engleski jezik" },
    ],
  },
  afternoon: {
    Ponedeljak: [
      { order: "1. čas", subject: "Srpski jezik" },
      { order: "2. čas", subject: "Matematika" },
      { order: "3. čas", subject: "Priroda i društvo" },
      { order: "4. čas", subject: "Građansko vaspitanje / Verska nastava" },
    ],
    Utorak: [
      { order: "1. čas", subject: "Matematika" },
      { order: "2. čas", subject: "Srpski jezik" },
      { order: "3. čas", subject: "Fizičko i zdravstveno vaspitanje" },
      { order: "4. čas", subject: "Likovna kultura" },
      { order: "5. čas", subject: "Likovna kultura" },
    ],
    Sreda: [
      { order: "1. čas", subject: "Srpski jezik" },
      { order: "2. čas", subject: "Engleski jezik" },
      { order: "3. čas", subject: "Matematika" },
      { order: "4. čas", subject: "Digitalni svet" },
    ],
    Četvrtak: [
      { order: "1. čas", subject: "Matematika" },
      { order: "2. čas", subject: "Srpski jezik" },
      { order: "3. čas", subject: "Priroda i društvo" },
      { order: "4. čas", subject: "Muzička kultura" },
      { order: "5. čas", subject: "Fizičko i zdravstveno vaspitanje" },
    ],
    Petak: [
      { order: "1. čas", subject: "Engleski jezik" },
      { order: "2. čas", subject: "Matematika" },
      { order: "3. čas", subject: "Fizičko i zdravstveno vaspitanje" },
      { order: "4. čas", subject: "Srpski jezik" },
      { order: "5. čas", subject: "ČOS" },
    ],
  },
};
