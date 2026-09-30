import type { SubjectId } from "./subjects";
import type { SchoolDay } from "./schedule";

// One block of a day's produženi boravak (extended daycare) — either part of
// the core routine or an elective activity.
export interface BoravakActivity {
  activity: SubjectId;
  startTime: string;
  endTime: string;
}

// A class's boravak, if it has one (data/<school>/<class>/<year>/boravak.ts).
export interface BoravakData {
  // The core routine, the same every day: arrival, homework, lunch, etc.
  routine: BoravakActivity[];
  // That day's optional activities (chess, drama, ...) — a "menu" a child
  // picks from, not something every child attends; varies per weekday, and
  // a day with none is simply omitted. Can overlap the routine's homework
  // block — a child does the elective instead of homework during that time.
  electives: Partial<Record<SchoolDay, BoravakActivity[]>>;
}
