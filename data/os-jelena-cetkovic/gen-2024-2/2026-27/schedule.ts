import type { RawShiftSchedules } from "../../../../lib/schedule";

// Weekly timetable for the 2026/27 school year: which subject is in which
// period. Period TIMES come from the school's bell schedule (../../school.ts),
// so they're defined once per school, not repeated here.
// The two shifts alternate weekly — see shiftAnchor in config.ts.
export const schedule: RawShiftSchedules = {
  morning: {
    Ponedeljak: [
      { order: "1. čas", subject: "Fizičko i zdravstveno vaspitanje (sala)" },
      { order: "2. čas", subject: "Matematika" },
      { order: "3. čas", subject: "Digitalni svet" },
      { order: "4. čas", subject: "Srpski jezik" },
      { order: "5. čas", subject: "ČOS" },
    ],
    Utorak: [
      { order: "1. čas", subject: "Srpski jezik" },
      { order: "2. čas", subject: "Matematika" },
      { order: "3. čas", subject: "Priroda i društvo" },
      { order: "4. čas", subject: "Engleski jezik" },
      { order: "5. čas", subject: "Dopunska nastava" },
    ],
    Sreda: [
      { order: "1. čas", subject: "Matematika" },
      { order: "2. čas", subject: "Srpski jezik" },
      { order: "3. čas", subject: "Likovna kultura" },
      { order: "4. čas", subject: "Likovna kultura" },
    ],
    Četvrtak: [
      { order: "1. čas", subject: "Srpski jezik" },
      { order: "2. čas", subject: "Matematika" },
      { order: "3. čas", subject: "Priroda i društvo" },
      { order: "4. čas", subject: "Fizičko i zdravstveno vaspitanje (sala)" },
      { order: "5. čas", subject: "Engleski jezik" },
    ],
    Petak: [
      { order: "1. čas", subject: "Matematika" },
      { order: "2. čas", subject: "Srpski jezik" },
      { order: "3. čas", subject: "Muzička kultura" },
      { order: "4. čas", subject: "Fizičko i zdravstveno vaspitanje" },
      { order: "5. čas", subject: "Građansko vaspitanje / Verska nastava" },
    ],
  },
  // Afternoon-shift Thursday: Engleski jezik moved from the last period
  // (5. čas) to Pretčas, per the school's updated timetable.
  afternoon: {
    Ponedeljak: [
      { order: "Pretčas", subject: "ČOS" },
      { order: "1. čas", subject: "Fizičko i zdravstveno vaspitanje (sala)" },
      { order: "2. čas", subject: "Matematika" },
      { order: "3. čas", subject: "Digitalni svet" },
      { order: "4. čas", subject: "Srpski jezik" },
    ],
    Utorak: [
      { order: "Pretčas", subject: "Dopunska nastava" },
      { order: "1. čas", subject: "Srpski jezik" },
      { order: "2. čas", subject: "Matematika" },
      { order: "3. čas", subject: "Priroda i društvo" },
      { order: "4. čas", subject: "Engleski jezik" },
    ],
    Sreda: [
      { order: "1. čas", subject: "Matematika" },
      { order: "2. čas", subject: "Srpski jezik" },
      { order: "3. čas", subject: "Likovna kultura" },
      { order: "4. čas", subject: "Likovna kultura" },
    ],
    Četvrtak: [
      { order: "Pretčas", subject: "Engleski jezik" },
      { order: "1. čas", subject: "Srpski jezik" },
      { order: "2. čas", subject: "Matematika" },
      { order: "3. čas", subject: "Priroda i društvo" },
      { order: "4. čas", subject: "Fizičko i zdravstveno vaspitanje (sala)" },
    ],
    Petak: [
      { order: "1. čas", subject: "Matematika" },
      { order: "2. čas", subject: "Srpski jezik" },
      { order: "3. čas", subject: "Muzička kultura" },
      { order: "4. čas", subject: "Fizičko i zdravstveno vaspitanje" },
      { order: "5. čas", subject: "Građansko vaspitanje / Verska nastava" },
    ],
  },
};
