import { getDay } from 'date-fns';

export type Day =
  | "Ponedeljak"
  | "Utorak"
  | "Sreda"
  | "Четврtak"
  | "Petak"
  | "Subota"
  | "Nedelja";

// Subject definition with icon and color
export interface Subject {
  name: string;
  icon: string;
  color: string;
}

// All subjects used in the school
export const subjects: Record<string, Subject> = {
  'Matematika': { name: 'Matematika', icon: '🧮', color: '#FFE9D2' },
  'Srpski jezik': { name: 'Srpski jezik', icon: '📝', color: '#FF9500' },
  'Engleski jezik': { name: 'Engleski jezik', icon: '🇬🇧', color: '#34C759' },
  'Likovna kultura': { name: 'Likovna kultura', icon: '🎨', color: '#FF2D92' },
  'Muzička kultura': { name: 'Muzička kultura', icon: '🎵', color: '#AF52DE' },
  'Fizičko i zdravstveno vaspitanje': { name: 'Fizičko i zdravstveno vaspitanje', icon: '🏃‍♂️', color: '#FF3B30' },
  'Fizičko i zdravstveno vaspitanje (sala)': { name: 'Fizičko i zdravstveno vaspitanje (sala)', icon: '🏃‍♂️', color: '#FF3B30' },
  'Svet oko nas': { name: 'Svet oko nas', icon: '🌍', color: '#30B0C7' },
  'Digitalni svet': { name: 'Digitalni svet', icon: '💻', color: '#8E8E93' },
  'ČOS': { name: 'ČOS', icon: '👥', color: '#FF9500' },
  'Građansko vaspitanje / Verska nastava': { name: 'Građansko vaspitanje / Verska nastava', icon: '🤝', color: '#5856D6' },
  'Dopunska nastava': { name: 'Dopunska nastava', icon: '📚', color: '#007AFF' },
};

// Class period with complete time information
export interface ClassPeriod {
  order: string; // 'Pretčas', '1. čas', '2. čas', etc.
  startTime: string;
  endTime: string;
  subject: string;
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
  '1. čas': { startTime: '08:00', endTime: '08:45' },
  '2. čas': { startTime: '08:50', endTime: '09:35' },
  '3. čas': { startTime: '09:55', endTime: '10:40' },
  '4. čas': { startTime: '10:45', endTime: '11:30' },
  '5. čas': { startTime: '11:35', endTime: '12:20' },
  '6. čas': { startTime: '12:25', endTime: '13:10' },
};

// Afternoon shift class times
const afternoonTimes = {
  'Pretčas': { startTime: '13:10', endTime: '13:55' },
  '1. čas': { startTime: '14:00', endTime: '14:45' },
  '2. čas': { startTime: '14:50', endTime: '15:35' },
  '3. čas': { startTime: '15:55', endTime: '16:40' },
  '4. čas': { startTime: '16:45', endTime: '17:30' },
  '5. čas': { startTime: '17:35', endTime: '18:20' },
  '6. čas': { startTime: '18:25', endTime: '19:10' },
};

// Afternoon schedule
export const afternoonSchedule: WeekSchedule = {
  Ponedeljak: [
    { order: 'Pretčas', ...afternoonTimes['Pretčas'], subject: 'Fizičko i zdravstveno vaspitanje (sala)' },
    { order: '1. čas', ...afternoonTimes['1. čas'], subject: 'Matematika' },
    { order: '2. čas', ...afternoonTimes['2. čas'], subject: 'Digitalni svet' },
    { order: '3. čas', ...afternoonTimes['3. čas'], subject: 'Engleski jezik' },
    { order: '4. čas', ...afternoonTimes['4. čas'], subject: 'Srpski jezik' },
  ],
  Utorak: [
    { order: 'Pretčas', ...afternoonTimes['Pretčas'], subject: 'Srpski jezik' },
    { order: '1. čas', ...afternoonTimes['1. čas'], subject: 'Matematika' },
    { order: '2. čas', ...afternoonTimes['2. čas'], subject: 'Svet oko nas' },
    { order: '3. čas', ...afternoonTimes['3. čas'], subject: 'Likovna kultura' },
    { order: '4. čas', ...afternoonTimes['4. čas'], subject: 'Likovna kultura' },
  ],
  Sreda: [
    { order: '1. čas', ...afternoonTimes['1. čas'], subject: 'Matematika' },
    { order: '2. čas', ...afternoonTimes['2. čas'], subject: 'Srpski jezik' },
    { order: '3. čas', ...afternoonTimes['3. čas'], subject: 'Muzička kultura' },
    { order: '4. čas', ...afternoonTimes['4. čas'], subject: 'Engleski jezik' },
  ],
  Четvrtak: [
    { order: 'Pretčas', ...afternoonTimes['Pretčas'], subject: 'Fizičko i zdravstveno vaspitanje (sala)' },
    { order: '1. čas', ...afternoonTimes['1. čas'], subject: 'Srpski jezik' },
    { order: '2. čas', ...afternoonTimes['2. čas'], subject: 'Matematika' },
    { order: '3. čas', ...afternoonTimes['3. čas'], subject: 'Svet oko nas' },
    { order: '4. čas', ...afternoonTimes['4. čas'], subject: 'ČOS' },
  ],
  Petak: [
    { order: 'Pretčas', ...afternoonTimes['Pretčas'], subject: 'Dopunska nastava' },
    { order: '1. čas', ...afternoonTimes['1. čas'], subject: 'Matematika' },
    { order: '2. čas', ...afternoonTimes['2. čas'], subject: 'Fizičko i zdravstveno vaspitanje (sala)' },
    { order: '3. čas', ...afternoonTimes['3. čas'], subject: 'Srpski jezik' },
    { order: '4. čas', ...afternoonTimes['4. čas'], subject: 'Građansko vaspitanje / Verska nastava' },
  ],
  Subota: [],
  Nedelja: [],
};

// Morning schedule
export const morningSchedule: WeekSchedule = {
  Ponedeljak: [
    { order: '1. čas', ...morningTimes['1. čas'], subject: 'Matematika' },
    { order: '2. čas', ...morningTimes['2. čas'], subject: 'Digitalni svet' },
    { order: '3. čas', ...morningTimes['3. čas'], subject: 'Engleski jezik' },
    { order: '4. čas', ...morningTimes['4. čas'], subject: 'Srpski jezik' },
    { order: '5. čas', ...morningTimes['5. čas'], subject: 'Fizičko i zdravstveno vaspitanje' },
  ],
  Utorak: [
    { order: '1. čas', ...morningTimes['1. čas'], subject: 'Srpski jezik' },
    { order: '2. čas', ...morningTimes['2. čas'], subject: 'Matematika' },
    { order: '3. čas', ...morningTimes['3. čas'], subject: 'Svet oko nas' },
    { order: '4. čas', ...morningTimes['4. čas'], subject: 'Likovna kultura' },
    { order: '5. čas', ...morningTimes['5. čas'], subject: 'Likovna kultura' },
  ],
  Sreda: [
    { order: '1. čas', ...morningTimes['1. čas'], subject: 'Matematika' },
    { order: '2. čas', ...morningTimes['2. čas'], subject: 'Srpski jezik' },
    { order: '3. čas', ...morningTimes['3. čas'], subject: 'Muzička kultura' },
    { order: '4. čas', ...morningTimes['4. čas'], subject: 'Engleski jezik' },
  ],
  Четврtak: [
    { order: '1. čas', ...morningTimes['1. čas'], subject: 'Srpski jezik' },
    { order: '2. čas', ...morningTimes['2. čas'], subject: 'Matematika' },
    { order: '3. čas', ...morningTimes['3. čas'], subject: 'Svet oko nas' },
    { order: '4. čas', ...morningTimes['4. čas'], subject: 'ČOS' },
    { order: '5. čas', ...morningTimes['5. čas'], subject: 'Fizičko i zdravstveno vaspitanje' },
  ],
  Petak: [
    { order: '1. čas', ...morningTimes['1. čas'], subject: 'Matematika' },
    { order: '2. čas', ...morningTimes['2. čas'], subject: 'Fizičko i zdravstveno vaspitanje (sala)' },
    { order: '3. čas', ...morningTimes['3. čas'], subject: 'Srpski jezik' },
    { order: '4. čas', ...morningTimes['4. čas'], subject: 'Građansko vaspitanje / Verska nastava' },
    { order: '5. čas', ...morningTimes['5. čas'], subject: 'Dopunska nastava' },
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
  const today = getDay(new Date());
  const dayMap: Record<number, Day> = {
    0: 'Nedelja',
    1: 'Ponedeljak',
    2: 'Utorak',
    3: 'Sreda',
    4: 'Четврtak',
    5: 'Petak',
    6: 'Subota',
  };
  return dayMap[today] || 'Ponedeljak';
};

// Helper function to get subject info
export const getSubjectInfo = (subjectName: string): Subject => {
  return subjects[subjectName] || { name: subjectName, icon: '📋', color: '#8E8E93' };
};

// Day name mapping for English keys (if needed for compatibility)
export const dayKeyMap = {
  monday: 'Ponedeljak',
  tuesday: 'Utorak',
  wednesday: 'Sreda',
  thursday: 'Четврtak',
  friday: 'Petak',
} as const;

// Legacy TimeSlot type for backward compatibility
export type TimeSlot = {
  time: string;
  subject: string;
};