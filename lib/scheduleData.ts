export type Day =
  | "Ponedeljak"
  | "Utorak"
  | "Sreda"
  | "Četvrtak"
  | "Petak"
  | "Subota"
  | "Nedelja";

export type TimeSlot = {
  time: string;
  subject: string;
};

export type DaySchedule = TimeSlot[];

export type WeekSchedule = {
  [D in Day]: DaySchedule;
};

export type ShiftSchedules = {
  morning: WeekSchedule;
  afternoon: WeekSchedule;
};

// Afternoon schedule (provided)
export const afternoonSchedule: WeekSchedule = {
  Ponedeljak: [
    { time: 'Pretčas (13:10)', subject: 'Fizičko i zdravstveno vaspitanje (sala)' },
    { time: '1. čas (14:00)', subject: 'Matematika' },
    { time: '2. čas', subject: 'Digitalni svet' },
    { time: '3. čas', subject: 'Engleski jezik' },
    { time: '4. čas (17:30)', subject: 'Srpski jezik' },
  ],
  Utorak: [
    { time: 'Pretčas (13:10)', subject: 'Srpski jezik' },
    { time: '1. čas (14:00)', subject: 'Matematika' },
    { time: '2. čas', subject: 'Svet oko nas' },
    { time: '3. čas', subject: 'Likovna kultura' },
    { time: '4. čas (17:30)', subject: 'Likovna kultura' },
  ],
  Sreda: [
    { time: '1. čas (14:00)', subject: 'Matematika' },
    { time: '2. čas', subject: 'Srpski jezik' },
    { time: '3. čas', subject: 'Muzička kultura' },
    { time: '4. čas (17:30)', subject: 'Engleski jezik' },
  ],
  Četvrtak: [
    { time: 'Pretčas (13:10)', subject: 'Fizičko i zdravstveno vaspitanje (sala)' },
    { time: '1. čas (14:00)', subject: 'Srpski jezik' },
    { time: '2. čas', subject: 'Matematika' },
    { time: '3. čas', subject: 'Svet oko nas' },
    { time: '4. čas (17:30)', subject: 'ČOS' },
  ],
  Petak: [
    { time: 'Pretčas (13:10)', subject: 'Dopunska nastava' },
    { time: '1. čas (14:00)', subject: 'Matematika' },
    { time: '2. čas', subject: 'Fizičko i zdravstveno vaspitanje (sala)' },
    { time: '3. čas', subject: 'Srpski jezik' },
    { time: '4. čas (17:30)', subject: 'Građansko vaspitanje / Verska nastava' },
  ],
  Subota: [],
  Nedelja: [],
};

// Morning schedule
export const morningSchedule: WeekSchedule = {
  Ponedeljak: [
    { time: '1. čas (08:00)', subject: 'Matematika' },
    { time: '2. čas', subject: 'Digitalni svet' },
    { time: '3. čas', subject: 'Engleski jezik' },
    { time: '4. čas', subject: 'Srpski jezik' },
    { time: '5. čas', subject: 'Fizičko i zdravstveno vaspitanje' },
  ],
  Utorak: [
    { time: '1. čas (08:00)', subject: 'Srpski jezik' },
    { time: '2. čas', subject: 'Matematika' },
    { time: '3. čas', subject: 'Svet oko nas' },
    { time: '4. čas', subject: 'Likovna kultura' },
    { time: '5. čas', subject: 'Likovna kultura' },
  ],
  Sreda: [
    { time: '1. čas (08:00)', subject: 'Matematika' },
    { time: '2. čas', subject: 'Srpski jezik' },
    { time: '3. čas', subject: 'Muzička kultura' },
    { time: '4. čas', subject: 'Engleski jezik' },
  ],
  Četvrtak: [
    { time: '1. čas (08:00)', subject: 'Srpski jezik' },
    { time: '2. čas', subject: 'Matematika' },
    { time: '3. čas', subject: 'Svet oko nas' },
    { time: '4. čas', subject: 'ČOS' },
    { time: '5. čas', subject: 'Fizičko i zdravstveno vaspitanje' },
  ],
  Petak: [
    { time: '1. čas (08:00)', subject: 'Matematika' },
    { time: '2. čas', subject: 'Fizičko i zdravstveno vaspitanje (sala)' },
    { time: '3. čas', subject: 'Srpski jezik' },
    { time: '4. čas', subject: 'Građansko vaspitanje / Verska nastava' },
    { time: '5. čas', subject: 'Dopunska nastava' },
  ],
  Subota: [],
  Nedelja: [],
};

// Combined schedules
export const schedules: ShiftSchedules = {
  morning: morningSchedule,
  afternoon: afternoonSchedule,
};

import { getDay } from 'date-fns';

// Helper function to get current day
export const getCurrentDay = (): Day => {
  const today = getDay(new Date());
  const dayMap: Record<number, Day> = {
    0: 'Nedelja',
    1: 'Ponedeljak',
    2: 'Utorak',
    3: 'Sreda',
    4: 'Četvrtak',
    5: 'Petak',
    6: 'Subota',
  };
  return dayMap[today] || 'Ponedeljak';
};

// Day name mapping for English keys (if needed for compatibility)
export const dayKeyMap = {
  monday: 'Ponedeljak',
  tuesday: 'Utorak',
  wednesday: 'Sreda',
  thursday: 'Četvrtak',
  friday: 'Petak',
} as const;