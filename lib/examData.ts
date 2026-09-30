import type { SubjectId } from "./subjects";

export type ExamType = "Kontrolni zadatak" | "Pismena vežba";

interface ExamCommon {
  subject: SubjectId; // must match a key in subjects.ts's `subjects`
  topic: string; // e.g. "Prirodni brojevi"
  type: ExamType;
  semester: 1 | 2; // 1 = first polugodište, 2 = second
}

// An exam with an exact, school-confirmed date.
export interface DatedExam extends ExamCommon {
  date: string; // ISO date (YYYY-MM-DD)
}

// An exam the school has only announced "sometime this week" for (common for
// 1st/2nd grade, where the school doesn't publish exact dates) — shown as a
// week-level banner rather than on one specific day.
export interface WeekExam extends ExamCommon {
  weekStart: string; // ISO date, Monday of that week
  weekEnd: string; // ISO date, Sunday of that week
}

export type Exam = DatedExam | WeekExam;

export const isWeekExam = (exam: Exam): exam is WeekExam => "weekStart" in exam;

// The exams themselves live in each class's data folder
// (data/<school>/<class>/<year>/exams.ts, typed as Exam[] so every entry's
// `subject` is checked against SubjectId as it's written). These helpers take
// that list as an argument.

// Exams falling on one exact calendar date (YYYY-MM-DD) — used to show the
// exam banner on the specific day rather than anywhere in its week. Only
// DatedExam entries can ever match — a WeekExam is surfaced by
// getExamsForWeek instead.
export const getExamsForDate = (exams: Exam[], date: string): DatedExam[] =>
  exams
    .filter((exam): exam is DatedExam => !isWeekExam(exam))
    .filter((exam) => exam.date === date);

// WeekExam entries whose week overlaps the given date range — used to show a
// "this week" banner regardless of which day is selected.
export const getExamsForWeek = (
  exams: Exam[],
  weekStart: string,
  weekEnd: string,
): WeekExam[] =>
  exams
    .filter((exam): exam is WeekExam => isWeekExam(exam))
    .filter((exam) => exam.weekStart <= weekEnd && exam.weekEnd >= weekStart);

export const getExamsForSemester = (exams: Exam[], semester: 1 | 2): Exam[] => {
  return exams.filter((exam) => exam.semester === semester);
};

export const getExamsForSubject = (
  exams: Exam[],
  subject: SubjectId,
): Exam[] => {
  return exams.filter((exam) => exam.subject === subject);
};

// A single sortable/comparable ISO date for an exam: its exact date, or the
// first day of its week when only the week is known.
export const examSortDate = (exam: Exam): string =>
  isWeekExam(exam) ? exam.weekStart : exam.date;

// The date used to decide whether an exam is "past" — the exact date, or the
// last day of its week (a week-scoped exam isn't past until the week is).
export const examEndDate = (exam: Exam): string =>
  isWeekExam(exam) ? exam.weekEnd : exam.date;

export const getUpcomingExams = (
  exams: Exam[],
  fromDate: Date = new Date(),
): Exam[] => {
  const today = fromDate.toISOString().split("T")[0];
  return exams.filter((exam) => examEndDate(exam) >= today);
};

// Exams (of either kind) whose relevant date/range overlaps [startDate, endDate].
export const getExamsInDateRange = (
  exams: Exam[],
  startDate: string,
  endDate: string,
): Exam[] =>
  exams.filter((exam) =>
    isWeekExam(exam)
      ? exam.weekStart <= endDate && exam.weekEnd >= startDate
      : exam.date >= startDate && exam.date <= endDate,
  );

// Get unique subjects from exams
export const getExamSubjects = (exams: Exam[]): SubjectId[] => {
  return [...new Set(exams.map((exam) => exam.subject))];
};
