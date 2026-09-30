import type { BoravakData } from "../../../../lib/boravak";

// Produženi boravak (extended daycare), which runs every morning before this
// class's fixed afternoon shift starts (14:30) — see config.ts. From the
// parent: boravak officially starts 07:30, homework is 08:30–10:45, lunch is
// "around 12:30" (exact duration not confirmed — assumed 30 min here), and
// boravak runs until class starts. Electives are from the school's own
// "Raspored izbornih aktivnosti" sheet — a menu of optional activities a
// child picks from, not something every child attends, so they're kept
// separate from the core routine below (and can overlap its homework block).
export const boravak: BoravakData = {
  routine: [
    { activity: "Prijem dece", startTime: "07:30", endTime: "08:30" },
    { activity: "Domaći zadatak", startTime: "08:30", endTime: "10:45" },
    { activity: "Ručak", startTime: "12:30", endTime: "13:00" },
    { activity: "Slobodno vreme", startTime: "13:00", endTime: "14:30" },
  ],
  electives: {
    Ponedeljak: [
      { activity: "Šah", startTime: "09:45", endTime: "10:30" },
      {
        activity: "Mala škola realnog aikidoa",
        startTime: "10:00",
        endTime: "11:30",
      },
      { activity: "Ruski kružok", startTime: "11:00", endTime: "11:45" },
    ],
    Utorak: [
      {
        activity:
          "Podrška razvoju socijalnih i komunikacionih veština i veština učenja",
        startTime: "10:00",
        endTime: "10:45",
      },
      { activity: "Gluma", startTime: "11:45", endTime: "12:30" },
    ],
    Sreda: [
      { activity: "Šah", startTime: "09:45", endTime: "10:30" },
      { activity: "Gluma", startTime: "11:45", endTime: "12:30" },
    ],
    Petak: [
      {
        activity: "Mala škola gimnastike",
        startTime: "12:15",
        endTime: "13:00",
      },
    ],
  },
};
