export type Exam = {
  weekStart: string; // ISO date, first day of the exam week
  weekEnd: string; // ISO date, last day of the exam week
  isoWeek: number; // ISO week number
  subject: string; // e.g. "Matematika"
  topic?: string; // e.g. "Prirodni brojevi" or "Inicijalni test"
  semester: 1 | 2; // 1 = first polugodiste, 2 = second
  confirmedDate?: string | null; // optional exact date when known
};

// Exam data configuration
const examConfig = {
  metadata: {
    lastUpdated: "2025-09-20",
    schoolYear: "2025/2026",
    academicYear: 1,
  },
  exams: [
    {
      weekStart: "2025-09-01",
      weekEnd: "2025-09-05",
      isoWeek: 36,
      subject: "Свет око нас",
      topic: "Иницијални тест",
      semester: 1,
      confirmedDate: null,
    },
    {
      weekStart: "2025-09-01",
      weekEnd: "2025-09-05",
      isoWeek: 36,
      subject: "Српски језик",
      topic: "Иницијални тест",
      semester: 1,
      confirmedDate: null,
    },
    {
      weekStart: "2025-09-08",
      weekEnd: "2025-09-12",
      isoWeek: 37,
      subject: "Математика",
      topic: "Иницијални тест",
      semester: 1,
      confirmedDate: null,
    },
    {
      weekStart: "2025-09-08",
      weekEnd: "2025-09-12",
      isoWeek: 37,
      subject: "Енглески језик",
      topic: "Иницијални тест",
      semester: 1,
      confirmedDate: null,
    },
    {
      weekStart: "2025-09-29",
      weekEnd: "2025-10-03",
      isoWeek: 40,
      subject: "Математика",
      topic: "Природни бројеви",
      semester: 1,
      confirmedDate: null,
    },
    {
      weekStart: "2025-10-06",
      weekEnd: "2025-10-10",
      isoWeek: 41,
      subject: "Српски језик",
      topic: "Именице",
      semester: 1,
      confirmedDate: null,
    },
    {
      weekStart: "2025-10-13",
      weekEnd: "2025-10-17",
      isoWeek: 42,
      subject: "Свет око нас",
      topic: "Култура живљења",
      semester: 1,
      confirmedDate: null,
    },
    {
      weekStart: "2025-10-27",
      weekEnd: "2025-10-31",
      isoWeek: 44,
      subject: "Српски језик",
      topic: "Правопис (диктат)",
      semester: 1,
      confirmedDate: null,
    },
    {
      weekStart: "2025-11-03",
      weekEnd: "2025-11-07",
      isoWeek: 45,
      subject: "Математика",
      topic: "Јединице мере и обим фигуре",
      semester: 1,
      confirmedDate: null,
    },
    {
      weekStart: "2025-11-12",
      weekEnd: "2025-11-14",
      isoWeek: 46,
      subject: "Свет око нас",
      topic: "Оријентација у времену",
      semester: 1,
      confirmedDate: null,
    },
    {
      weekStart: "2025-11-17",
      weekEnd: "2025-11-21",
      isoWeek: 47,
      subject: "Српски језик",
      topic: "Придеви",
      semester: 1,
      confirmedDate: null,
    },
    {
      weekStart: "2025-11-24",
      weekEnd: "2025-11-28",
      isoWeek: 48,
      subject: "Математика",
      topic: "Једначине",
      semester: 1,
      confirmedDate: null,
    },
    {
      weekStart: "2025-12-01",
      weekEnd: "2025-12-05",
      isoWeek: 49,
      subject: "Математика",
      topic: "Задаци са две операције",
      semester: 1,
      confirmedDate: null,
    },
  ],
};

export const exams: Exam[] = examConfig.exams as Exam[];
export const examMetadata = examConfig.metadata;

// Helper functions for working with exam data

export const getExamsForWeek = (isoWeek: number): Exam[] => {
  return exams.filter((exam) => exam.isoWeek === isoWeek);
};

export const getExamsForSemester = (semester: 1 | 2): Exam[] => {
  return exams.filter((exam) => exam.semester === semester);
};

export const getExamsForSubject = (subject: string): Exam[] => {
  return exams.filter((exam) => exam.subject === subject);
};

export const getUpcomingExams = (fromDate: Date = new Date()): Exam[] => {
  const today = fromDate.toISOString().split("T")[0];
  return exams.filter((exam) => exam.weekStart >= today);
};

export const getExamsInDateRange = (
  startDate: string,
  endDate: string,
): Exam[] => {
  return exams.filter(
    (exam) => exam.weekStart >= startDate && exam.weekEnd <= endDate,
  );
};

// Get unique subjects from exams
export const getExamSubjects = (): string[] => {
  return [...new Set(exams.map((exam) => exam.subject))];
};
