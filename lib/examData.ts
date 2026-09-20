import type { SubjectId } from "./subjects";

export type ExamType = "Kontrolni zadatak" | "Pismena vežba";

export type Exam = {
  date: string; // ISO date (YYYY-MM-DD) — exact, school-confirmed exam date
  subject: SubjectId; // must match a key in subjects.ts's `subjects`
  topic: string; // e.g. "Prirodni brojevi"
  type: ExamType;
  semester: 1 | 2; // 1 = first polugodište, 2 = second
};

// The exams themselves live in each class's data folder
// (data/<school>/<class>/<year>/exams.ts, typed as Exam[] so every entry's
// `subject` is checked against SubjectId as it's written). These helpers take
// that list as an argument.

// Exams falling on one exact calendar date (YYYY-MM-DD) — used to show the exam
// banner on the specific day rather than anywhere in its week.
export const getExamsForDate = (exams: Exam[], date: string): Exam[] => {
  return exams.filter((exam) => exam.date === date);
};

export const getExamsForSemester = (exams: Exam[], semester: 1 | 2): Exam[] => {
  return exams.filter((exam) => exam.semester === semester);
};

export const getExamsForSubject = (
  exams: Exam[],
  subject: SubjectId,
): Exam[] => {
  return exams.filter((exam) => exam.subject === subject);
};

export const getUpcomingExams = (
  exams: Exam[],
  fromDate: Date = new Date(),
): Exam[] => {
  const today = fromDate.toISOString().split("T")[0];
  return exams.filter((exam) => exam.date >= today);
};

export const getExamsInDateRange = (
  exams: Exam[],
  startDate: string,
  endDate: string,
): Exam[] => {
  return exams.filter((exam) => exam.date >= startDate && exam.date <= endDate);
};

// Get unique subjects from exams
export const getExamSubjects = (exams: Exam[]): SubjectId[] => {
  return [...new Set(exams.map((exam) => exam.subject))];
};
