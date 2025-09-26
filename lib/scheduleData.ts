import { getDay } from "date-fns";

export type Day =
  | "Понедељак"
  | "Уторак"
  | "Среда"
  | "Четвртак"
  | "Петак"
  | "Субота"
  | "Недеља";

// Subject definition with icon and color
export interface Subject {
  name: string;
  icon: string;
  color: string;
}

// All subjects used in the school
export const subjects: Record<string, Subject> = {
  Математика: { name: "Математика", icon: "🧮", color: "#FFE9D2" },
  "Српски језик": { name: "Српски језик", icon: "📖", color: "#FED712" },
  "Енглески језик": { name: "Енглески језик", icon: "🇬🇧", color: "#BFF2F4" },
  "Ликовна култура": { name: "Ликовна култура", icon: "🖼️", color: "#98D9E6" },
  "Музичка култура": { name: "Музичка култура", icon: "🎹", color: "#FE7209" },
  "Физичко и здравствено васпитање": {
    name: "Физичко и здравствено васпитање",
    icon: "👟",
    color: "#8EECC4",
  },
  "Физичко и здравствено васпитање (сала)": {
    name: "Физичко и здравствено васпитање (сала)",
    icon: "👟",
    color: "#8EECC4",
  },
  "Свет око нас": { name: "Свет око нас", icon: "🪴", color: "#FFD2B1" },
  "Дигитални свет": { name: "Дигитални свет", icon: "💾", color: "#FBCCFF" },
  ЧОС: { name: "ЧОС", icon: "🧑‍🏫", color: "#FFE9D2" },
  "Грађанско васпитање / Верска настава": {
    name: "Грађанско васпитање / Верска настава",
    icon: "⛪",
    color: "#D4E3F1",
  },
  "Допунска настава": {
    name: "Допунска настава",
    icon: "🏋",
    color: "#F0E5FF",
  },
  // Daycare activities
  "Пријем деце": { name: "Пријем деце", icon: "👋", color: "#E3F2FD" },
  "Домаћи задатак": { name: "Домаћи задатак", icon: "📝", color: "#FBCCFF" },
  Ручак: { name: "Ручак", icon: "🍲", color: "#FFE9D2" },
  Домаћи: { name: "Домаћи", icon: "📝", color: "#FBCCFF" },
  "Слободно време": { name: "Слободно време", icon: "🛝", color: "#D8E1FD" },
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
  "1. час": { startTime: "08:00", endTime: "08:45" },
  "2. час": { startTime: "08:50", endTime: "09:35" },
  "3. час": { startTime: "09:55", endTime: "10:40" },
  "4. час": { startTime: "10:45", endTime: "11:30" },
  "5. час": { startTime: "11:35", endTime: "12:20" },
  "6. час": { startTime: "12:25", endTime: "13:10" },
};

// Afternoon shift class times
const afternoonTimes = {
  Предчас: { startTime: "13:10", endTime: "13:55" },
  "1. час": { startTime: "14:00", endTime: "14:45" },
  "2. час": { startTime: "14:50", endTime: "15:35" },
  "3. час": { startTime: "15:55", endTime: "16:40" },
  "4. час": { startTime: "16:45", endTime: "17:30" },
  "5. час": { startTime: "17:35", endTime: "18:20" },
  "6. час": { startTime: "18:25", endTime: "19:10" },
};

// Afternoon schedule
export const afternoonSchedule: WeekSchedule = {
  Понедељак: [
    {
      order: "Предчас",
      ...afternoonTimes["Предчас"],
      subject: "Физичко и здравствено васпитање (сала)",
    },
    { order: "1. час", ...afternoonTimes["1. час"], subject: "Математика" },
    { order: "2. час", ...afternoonTimes["2. час"], subject: "Дигитални свет" },
    { order: "3. час", ...afternoonTimes["3. час"], subject: "Енглески језик" },
    { order: "4. час", ...afternoonTimes["4. час"], subject: "Српски језик" },
  ],
  Уторак: [
    { order: "Предчас", ...afternoonTimes["Предчас"], subject: "Српски језик" },
    { order: "1. час", ...afternoonTimes["1. час"], subject: "Математика" },
    { order: "2. час", ...afternoonTimes["2. час"], subject: "Свет око нас" },
    {
      order: "3. час",
      ...afternoonTimes["3. час"],
      subject: "Ликовна култура",
    },
    {
      order: "4. час",
      ...afternoonTimes["4. час"],
      subject: "Ликовна култура",
    },
  ],
  Среда: [
    { order: "1. час", ...afternoonTimes["1. час"], subject: "Математика" },
    { order: "2. час", ...afternoonTimes["2. час"], subject: "Српски језик" },
    {
      order: "3. час",
      ...afternoonTimes["3. час"],
      subject: "Музичка култура",
    },
    { order: "4. час", ...afternoonTimes["4. час"], subject: "Енглески језик" },
  ],
  Четвртак: [
    {
      order: "Предчас",
      ...afternoonTimes["Предчас"],
      subject: "Физичко и здравствено васпитање (сала)",
    },
    { order: "1. час", ...afternoonTimes["1. час"], subject: "Српски језик" },
    { order: "2. час", ...afternoonTimes["2. час"], subject: "Математика" },
    { order: "3. час", ...afternoonTimes["3. час"], subject: "Свет око нас" },
    { order: "4. час", ...afternoonTimes["4. час"], subject: "ЧОС" },
  ],
  Петак: [
    {
      order: "Предчас",
      ...afternoonTimes["Предчас"],
      subject: "Допунска настава",
    },
    { order: "1. час", ...afternoonTimes["1. час"], subject: "Математика" },
    {
      order: "2. час",
      ...afternoonTimes["2. час"],
      subject: "Физичко и здравствено васпитање (сала)",
    },
    { order: "3. час", ...afternoonTimes["3. час"], subject: "Српски језик" },
    {
      order: "4. час",
      ...afternoonTimes["4. час"],
      subject: "Грађанско васпитање / Верска настава",
    },
  ],
  Субота: [],
  Недеља: [],
};

// Morning schedule
export const morningSchedule: WeekSchedule = {
  Понедељак: [
    { order: "1. час", ...morningTimes["1. час"], subject: "Математика" },
    { order: "2. час", ...morningTimes["2. час"], subject: "Дигитални свет" },
    { order: "3. час", ...morningTimes["3. час"], subject: "Енглески језик" },
    { order: "4. час", ...morningTimes["4. час"], subject: "Српски језик" },
    {
      order: "5. час",
      ...morningTimes["5. час"],
      subject: "Физичко и здравствено васпитање",
    },
  ],
  Уторак: [
    { order: "1. час", ...morningTimes["1. час"], subject: "Српски језик" },
    { order: "2. час", ...morningTimes["2. час"], subject: "Математика" },
    { order: "3. час", ...morningTimes["3. час"], subject: "Свет око нас" },
    { order: "4. час", ...morningTimes["4. час"], subject: "Ликовна култура" },
    { order: "5. час", ...morningTimes["5. час"], subject: "Ликовна култура" },
  ],
  Среда: [
    { order: "1. час", ...morningTimes["1. час"], subject: "Математика" },
    { order: "2. час", ...morningTimes["2. час"], subject: "Српски језик" },
    { order: "3. час", ...morningTimes["3. час"], subject: "Музичка култура" },
    { order: "4. час", ...morningTimes["4. час"], subject: "Енглески језик" },
  ],
  Четвртак: [
    { order: "1. час", ...morningTimes["1. час"], subject: "Српски језик" },
    { order: "2. час", ...morningTimes["2. час"], subject: "Математика" },
    { order: "3. час", ...morningTimes["3. час"], subject: "Свет око нас" },
    { order: "4. час", ...morningTimes["4. час"], subject: "ЧОС" },
    {
      order: "5. час",
      ...morningTimes["5. час"],
      subject: "Физичко и здравствено васпитање",
    },
  ],
  Петак: [
    { order: "1. час", ...morningTimes["1. час"], subject: "Математика" },
    {
      order: "2. час",
      ...morningTimes["2. час"],
      subject: "Физичко и здравствено васпитање (сала)",
    },
    { order: "3. час", ...morningTimes["3. час"], subject: "Српски језик" },
    {
      order: "4. час",
      ...morningTimes["4. час"],
      subject: "Грађанско васпитање / Верска настава",
    },
    { order: "5. час", ...morningTimes["5. час"], subject: "Допунска настава" },
  ],
  Субота: [],
  Недеља: [],
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
    0: "Недеља",
    1: "Понедељак",
    2: "Уторак",
    3: "Среда",
    4: "Четвртак",
    5: "Петак",
    6: "Субота",
  };
  return dayMap[today] || "Понедељак";
};

// Helper function to get subject info
export const getSubjectInfo = (subjectName: string): Subject => {
  return (
    subjects[subjectName] || { name: subjectName, icon: "📋", color: "#8E8E93" }
  );
};

// Day name mapping for English keys (if needed for compatibility)
export const dayKeyMap = {
  monday: "Понедељак",
  tuesday: "Уторак",
  wednesday: "Среда",
  thursday: "Четвртак",
  friday: "Петак",
} as const;

// Legacy TimeSlot type for backward compatibility
export type TimeSlot = {
  time: string;
  subject: string;
};
