import { getDay } from "date-fns";

export type Day =
  | "Ponedeljak"
  | "Utorak"
  | "Sreda"
  | "Četvrtak"
  | "Petak"
  | "Subota"
  | "Nedelja";

// Subject definition with icon, color, pribor and books
export interface Subject {
  name: string;
  icon: string;
  color: string;
  pribor?: string[];
  books?: string[];
}

// All subjects used in the school
export const subjects = {
  Matematika: {
    name: "Matematika",
    icon: "🧮",
    color: "#FFE9D2",
    pribor: ["Sveska A5 kvadratići", "Lenjiri", "Šestar"],
  },
  "Srpski jezik": {
    name: "Srpski jezik",
    icon: "📖",
    color: "#FED712",
    pribor: ["Sveska A5 linije"],
  },
  "Engleski jezik": {
    name: "Engleski jezik",
    icon: "🇬🇧",
    color: "#BFF2F4",
  },
  "Likovna kultura": {
    name: "Likovna kultura",
    icon: "🖼️",
    color: "#98D9E6",
    pribor: [
      "Blok broj 4",
      "Kolaž",
      "Voštane boje",
      "Plastelin",
      "Drvene bojice",
      "Flomasteri",
      "Vodene boje",
      "Tempere",
      "Četkice",
      "Paleta",
      "Zaštitna podloga za sto",
    ],
  },
  "Muzička kultura": {
    name: "Muzička kultura",
    icon: "🎹",
    color: "#FE7209",
    pribor: ["Sveska A5 kvadratići"],
  },
  "Fizičko i zdravstveno vaspitanje": {
    name: "Fizičko i zdravstveno vaspitanje",
    icon: "👟",
    color: "#8EECC4",
    pribor: [
      "Bele majice",
      "Crni šorc (devojčice mogu i crne helanke)",
      "Patike",
    ],
  },
  "Fizičko i zdravstveno vaspitanje (sala)": {
    name: "Fizičko i zdravstveno vaspitanje (sala)",
    icon: "👟",
    color: "#8EECC4",
    pribor: [
      "Bele majice",
      "Crni šorc (devojčice mogu i crne helanke)",
      "Patike",
    ],
  },
  "Svet oko nas": {
    name: "Svet oko nas",
    icon: "🪴",
    color: "#FFD2B1",
    pribor: ["Sveska A5 kvadratići"],
  },
  // "Svet oko nas" (2nd grade) becomes "Priroda i društvo" starting 3rd grade
  // — a real curriculum rename, not a typo, so kept as a separate subject
  // rather than overwriting the old one (which stays as unused 2nd-grade data).
  "Priroda i društvo": {
    name: "Priroda i društvo",
    icon: "🌍",
    color: "#FFD2B1",
    pribor: ["Sveska A5 kvadratići"],
  },
  "Digitalni svet": {
    name: "Digitalni svet",
    icon: "💾",
    color: "#FBCCFF",
    pribor: ["Sveska A5 kvadratići"],
  },
  ČOS: {
    name: "ČOS",
    icon: "🧑‍🏫",
    color: "#FFE9D2",
  },
  "Građansko vaspitanje": {
    name: "Građansko vaspitanje",
    icon: "⛪",
    color: "#D4E3F1",
    pribor: ["20 belih papira u fascikli"],
  },
  "Verska nastava": {
    name: "Verska nastava",
    icon: "⛪",
    color: "#D4E3F1",
    pribor: ["Velika sveska kvadratići"],
  },
  "Građansko vaspitanje / Verska nastava": {
    name: "Građansko vaspitanje / Verska nastava",
    icon: "⛪",
    color: "#D4E3F1",
  },
  "Dopunska nastava": {
    name: "Dopunska nastava",
    icon: "🏋",
    color: "#F0E5FF",
  },
  // Daycare activities
  "Prijem dece": { name: "Prijem dece", icon: "👋", color: "#E3F2FD" },
  "Domaći zadatak": { name: "Domaći zadatak", icon: "📝", color: "#FBCCFF" },
  Ručak: { name: "Ručak", icon: "🍲", color: "#FFE9D2" },
  Domaći: { name: "Domaći", icon: "📝", color: "#FBCCFF" },
  "Slobodno vreme": { name: "Slobodno vreme", icon: "🛝", color: "#D8E1FD" },
} satisfies Record<string, Subject>;

// Union of every valid subject/activity key in `subjects` above, derived
// automatically so it can never drift out of sync. Every place that stores or
// looks up "which subject" (schedule entries, exams, teacher/textbook/pribor
// maps) should use this instead of a bare `string` — a typo or a stale name
// then fails at compile time instead of silently falling back at runtime.
export type SubjectId = keyof typeof subjects;

// Class period with complete time information
export interface ClassPeriod {
  order: string; // 'Pretčas', '1. čas', '2. čas', etc.
  startTime: string;
  endTime: string;
  subject: SubjectId;
}

export type DaySchedule = ClassPeriod[];

export type WeekSchedule = {
  [D in Day]: DaySchedule;
};

export type ShiftSchedules = {
  morning: WeekSchedule;
  afternoon: WeekSchedule;
};

// Morning shift class times
const morningTimes = {
  "1. čas": { startTime: "08:00", endTime: "08:45" },
  "2. čas": { startTime: "08:50", endTime: "09:35" },
  "3. čas": { startTime: "09:55", endTime: "10:40" },
  "4. čas": { startTime: "10:45", endTime: "11:30" },
  "5. čas": { startTime: "11:35", endTime: "12:20" },
  "6. čas": { startTime: "12:25", endTime: "13:10" },
};

// Afternoon shift class times
const afternoonTimes = {
  Predčas: { startTime: "13:10", endTime: "13:55" },
  "1. čas": { startTime: "14:00", endTime: "14:45" },
  "2. čas": { startTime: "14:50", endTime: "15:35" },
  "3. čas": { startTime: "15:55", endTime: "16:40" },
  "4. čas": { startTime: "16:45", endTime: "17:30" },
  "5. čas": { startTime: "17:35", endTime: "18:20" },
  "6. čas": { startTime: "18:25", endTime: "19:10" },
};

// Afternoon schedule (3rd grade, confirmed against the school's printed
// timetable — see commit message for the source)
export const afternoonSchedule: WeekSchedule = {
  Ponedeljak: [
    { order: "Predčas", ...afternoonTimes["Predčas"], subject: "ČOS" },
    {
      order: "1. čas",
      ...afternoonTimes["1. čas"],
      subject: "Fizičko i zdravstveno vaspitanje (sala)",
    },
    { order: "2. čas", ...afternoonTimes["2. čas"], subject: "Matematika" },
    { order: "3. čas", ...afternoonTimes["3. čas"], subject: "Digitalni svet" },
    { order: "4. čas", ...afternoonTimes["4. čas"], subject: "Srpski jezik" },
  ],
  Utorak: [
    {
      order: "Predčas",
      ...afternoonTimes["Predčas"],
      subject: "Dopunska nastava",
    },
    { order: "1. čas", ...afternoonTimes["1. čas"], subject: "Srpski jezik" },
    { order: "2. čas", ...afternoonTimes["2. čas"], subject: "Matematika" },
    {
      order: "3. čas",
      ...afternoonTimes["3. čas"],
      subject: "Priroda i društvo",
    },
    { order: "4. čas", ...afternoonTimes["4. čas"], subject: "Engleski jezik" },
  ],
  Sreda: [
    { order: "1. čas", ...afternoonTimes["1. čas"], subject: "Matematika" },
    { order: "2. čas", ...afternoonTimes["2. čas"], subject: "Srpski jezik" },
    {
      order: "3. čas",
      ...afternoonTimes["3. čas"],
      subject: "Likovna kultura",
    },
    {
      order: "4. čas",
      ...afternoonTimes["4. čas"],
      subject: "Likovna kultura",
    },
  ],
  Četvrtak: [
    { order: "1. čas", ...afternoonTimes["1. čas"], subject: "Srpski jezik" },
    { order: "2. čas", ...afternoonTimes["2. čas"], subject: "Matematika" },
    {
      order: "3. čas",
      ...afternoonTimes["3. čas"],
      subject: "Priroda i društvo",
    },
    {
      order: "4. čas",
      ...afternoonTimes["4. čas"],
      subject: "Fizičko i zdravstveno vaspitanje (sala)",
    },
    { order: "5. čas", ...afternoonTimes["5. čas"], subject: "Engleski jezik" },
  ],
  Petak: [
    { order: "1. čas", ...afternoonTimes["1. čas"], subject: "Matematika" },
    { order: "2. čas", ...afternoonTimes["2. čas"], subject: "Srpski jezik" },
    {
      order: "3. čas",
      ...afternoonTimes["3. čas"],
      subject: "Muzička kultura",
    },
    {
      order: "4. čas",
      ...afternoonTimes["4. čas"],
      subject: "Fizičko i zdravstveno vaspitanje",
    },
    {
      order: "5. čas",
      ...afternoonTimes["5. čas"],
      subject: "Građansko vaspitanje / Verska nastava",
    },
  ],
  Subota: [],
  Nedelja: [],
};

// Morning schedule (3rd grade, confirmed against the school's printed
// timetable — see commit message for the source)
export const morningSchedule: WeekSchedule = {
  Ponedeljak: [
    {
      order: "1. čas",
      ...morningTimes["1. čas"],
      subject: "Fizičko i zdravstveno vaspitanje (sala)",
    },
    { order: "2. čas", ...morningTimes["2. čas"], subject: "Matematika" },
    { order: "3. čas", ...morningTimes["3. čas"], subject: "Digitalni svet" },
    { order: "4. čas", ...morningTimes["4. čas"], subject: "Srpski jezik" },
    { order: "5. čas", ...morningTimes["5. čas"], subject: "ČOS" },
  ],
  Utorak: [
    { order: "1. čas", ...morningTimes["1. čas"], subject: "Srpski jezik" },
    { order: "2. čas", ...morningTimes["2. čas"], subject: "Matematika" },
    {
      order: "3. čas",
      ...morningTimes["3. čas"],
      subject: "Priroda i društvo",
    },
    { order: "4. čas", ...morningTimes["4. čas"], subject: "Engleski jezik" },
    {
      order: "5. čas",
      ...morningTimes["5. čas"],
      subject: "Dopunska nastava",
    },
  ],
  Sreda: [
    { order: "1. čas", ...morningTimes["1. čas"], subject: "Matematika" },
    { order: "2. čas", ...morningTimes["2. čas"], subject: "Srpski jezik" },
    { order: "3. čas", ...morningTimes["3. čas"], subject: "Likovna kultura" },
    { order: "4. čas", ...morningTimes["4. čas"], subject: "Likovna kultura" },
  ],
  Četvrtak: [
    { order: "1. čas", ...morningTimes["1. čas"], subject: "Srpski jezik" },
    { order: "2. čas", ...morningTimes["2. čas"], subject: "Matematika" },
    {
      order: "3. čas",
      ...morningTimes["3. čas"],
      subject: "Priroda i društvo",
    },
    {
      order: "4. čas",
      ...morningTimes["4. čas"],
      subject: "Fizičko i zdravstveno vaspitanje (sala)",
    },
    { order: "5. čas", ...morningTimes["5. čas"], subject: "Engleski jezik" },
  ],
  Petak: [
    { order: "1. čas", ...morningTimes["1. čas"], subject: "Matematika" },
    { order: "2. čas", ...morningTimes["2. čas"], subject: "Srpski jezik" },
    {
      order: "3. čas",
      ...morningTimes["3. čas"],
      subject: "Muzička kultura",
    },
    {
      order: "4. čas",
      ...morningTimes["4. čas"],
      subject: "Fizičko i zdravstveno vaspitanje",
    },
    {
      order: "5. čas",
      ...morningTimes["5. čas"],
      subject: "Građansko vaspitanje / Verska nastava",
    },
  ],
  Subota: [],
  Nedelja: [],
};

// Combined schedules
export const schedules: ShiftSchedules = {
  morning: morningSchedule,
  afternoon: afternoonSchedule,
};

// Helper function to get current day
export const getCurrentDay = (): Day => {
  // Use the current date in the user's timezone consistently
  const today = new Date();
  const dayOfWeek = getDay(today);
  const dayMap: Record<number, Day> = {
    0: "Nedelja",
    1: "Ponedeljak",
    2: "Utorak",
    3: "Sreda",
    4: "Četvrtak",
    5: "Petak",
    6: "Subota",
  };
  return dayMap[dayOfWeek] || "Ponedeljak";
};

// Helper function to get subject info. Deliberately takes a plain `string`
// (not SubjectId) since this is called from generic display code (e.g. the
// event modal) that isn't always statically known to be a real subject — the
// fallback below covers that case. Data-authoring code (schedules, exams,
// teacher/textbook/pribor maps) should use SubjectId instead, so a mismatch
// there is a compile error rather than silently landing here.
export const getSubjectInfo = (subjectName: string): Subject => {
  return (
    (subjects as Record<string, Subject>)[subjectName] || {
      name: subjectName,
      icon: "📋",
      color: "#8E8E93",
    }
  );
};

// Day name mapping for English keys (if needed for compatibility)
export const dayKeyMap = {
  monday: "Ponedeljak",
  tuesday: "Utorak",
  wednesday: "Sreda",
  thursday: "Četvrtak",
  friday: "Petak",
} as const;

// Legacy TimeSlot type for backward compatibility
export type TimeSlot = {
  time: string;
  subject: string;
};
