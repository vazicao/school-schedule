import type { SubjectId } from "./scheduleData";

export type ExamType = "Kontrolni zadatak" | "Pismena vežba";

export type Exam = {
  date: string; // ISO date (YYYY-MM-DD) — exact, school-confirmed exam date
  subject: SubjectId; // must match a key in scheduleData.ts's `subjects`
  topic: string; // e.g. "Prirodni brojevi"
  type: ExamType;
  semester: 1 | 2; // 1 = first polugodište, 2 = second
};

// Exam data configuration. `exams` is annotated as Exam[] (not cast) so that
// each entry's `subject` is checked against SubjectId as it's written — a
// typo'd or stale subject name is a compile error here, not a silent miss.
const examConfig: {
  metadata: { lastUpdated: string; schoolYear: string; academicYear: number };
  exams: Exam[];
} = {
  metadata: {
    lastUpdated: "2026-09-13",
    schoolYear: "2026/2027",
    academicYear: 3,
  },
  exams: [
    {
      date: "2026-09-24",
      subject: "Matematika",
      topic: "Brojevi prve hiljade i rimske cifre",
      type: "Kontrolni zadatak",
      semester: 1,
    },
    {
      date: "2026-09-29",
      subject: "Priroda i društvo",
      topic: "Orijentacija u prostoru i vremenu",
      type: "Kontrolni zadatak",
      semester: 1,
    },
    {
      date: "2026-09-30",
      subject: "Srpski jezik",
      topic: "Imenice i pravopis",
      type: "Kontrolni zadatak",
      semester: 1,
    },
    {
      date: "2026-10-22",
      subject: "Engleski jezik",
      topic: "Diktat (10 reči)",
      type: "Pismena vežba",
      semester: 1,
    },
    {
      date: "2026-10-27",
      subject: "Matematika",
      topic: "Sabiranje i oduzimanje brojeva do 1000",
      type: "Kontrolni zadatak",
      semester: 1,
    },
    {
      date: "2026-10-29",
      subject: "Priroda i društvo",
      topic: "Naš kraj i saobraćaj",
      type: "Kontrolni zadatak",
      semester: 1,
    },
    {
      date: "2026-11-06",
      subject: "Srpski jezik",
      topic: "Pridevi i pravopis",
      type: "Kontrolni zadatak",
      semester: 1,
    },
    {
      date: "2026-11-10",
      subject: "Matematika",
      topic: "Merenje i mere",
      type: "Kontrolni zadatak",
      semester: 1,
    },
    {
      date: "2026-12-09",
      subject: "Matematika",
      topic: "Sabiranje i oduzimanje do 1000; Jednačine i nejednačine",
      type: "Kontrolni zadatak",
      semester: 1,
    },
    {
      date: "2026-12-10",
      subject: "Engleski jezik",
      topic: "Vokabular i gramatika",
      type: "Kontrolni zadatak",
      semester: 1,
    },
    {
      date: "2026-12-14",
      subject: "Srpski jezik",
      topic: "Glagoli; Upravni i neupravni govor",
      type: "Kontrolni zadatak",
      semester: 1,
    },
  ],
};

export const exams: Exam[] = examConfig.exams;
export const examMetadata = examConfig.metadata;

// Helper functions for working with exam data

// Exams falling on one exact calendar date (YYYY-MM-DD) — the primary lookup
// now that every exam has a confirmed date, used to show the exam banner on
// the specific day rather than anywhere in its week.
export const getExamsForDate = (date: string): Exam[] => {
  return exams.filter((exam) => exam.date === date);
};

export const getExamsForSemester = (semester: 1 | 2): Exam[] => {
  return exams.filter((exam) => exam.semester === semester);
};

export const getExamsForSubject = (subject: SubjectId): Exam[] => {
  return exams.filter((exam) => exam.subject === subject);
};

export const getUpcomingExams = (fromDate: Date = new Date()): Exam[] => {
  const today = fromDate.toISOString().split("T")[0];
  return exams.filter((exam) => exam.date >= today);
};

export const getExamsInDateRange = (
  startDate: string,
  endDate: string,
): Exam[] => {
  return exams.filter((exam) => exam.date >= startDate && exam.date <= endDate);
};

// Get unique subjects from exams
export const getExamSubjects = (): SubjectId[] => {
  return [...new Set(exams.map((exam) => exam.subject))];
};
