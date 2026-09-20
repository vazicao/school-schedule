import { EventDetails } from "../components/EventModal";
import { getExamsForSubject, type Exam } from "./examData";
import { getSubjectInfo, type SubjectId } from "./subjects";
import { getTextbooksForSubject } from "./textbookData";
import { getTeacherForSubject } from "./teacherData";
import { getClassTimes } from "./timeMapping";
import type { ShiftType } from "./shiftDetection";
import type { BellSchedule } from "./schedule";
import type { ClassData } from "./classData";
import { format, parseISO, isBefore } from "date-fns";
import { srLatn as sr } from "date-fns/locale";

// Helper functions to convert exam data
const formatExamDate = (exam: Exam): string =>
  format(parseISO(exam.date), "d. MMMM yyyy", { locale: sr });

const capitalize = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1);

const getAllExamsForSubject = (
  exams: Exam[],
  subject: SubjectId,
): Array<{
  date: string;
  type: string;
  description: string;
  dayName: string;
  isPast?: boolean;
  isUpcoming?: boolean;
}> => {
  const today = new Date();

  const subjectExams = [...getExamsForSubject(exams, subject)].sort(
    (a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime(),
  );

  const nextUpcomingExam = subjectExams.find(
    (exam) => !isBefore(parseISO(exam.date), today),
  );

  return subjectExams.map((exam) => {
    const examDate = parseISO(exam.date);

    return {
      date: formatExamDate(exam),
      type: exam.type,
      description: exam.topic,
      dayName: capitalize(format(examDate, "EEEE", { locale: sr })),
      isPast: isBefore(examDate, today),
      isUpcoming: exam === nextUpcomingExam,
    };
  });
};

// Helper function to get icon for a subject - returns the icon string/identifier
const getSubjectIconData = (subject: SubjectId): string => {
  const subjectInfo = getSubjectInfo(subject);
  return subjectInfo.icon;
};

// Helper function to determine event type
const getEventType = (subject: SubjectId): "class" | "daycare" | "weekend" => {
  // BORAVAK — these activities are only ever produced by the daycare JSX in
  // components/SchedulePage.tsx, currently disabled for 3rd grade. Left here so
  // re-enabling boravak doesn't also require restoring this list.
  const daycareActivities: SubjectId[] = [
    "Prijem dece",
    "Domaći zadatak",
    "Ručak",
    "Domaći",
    "Slobodno vreme",
  ];

  if (daycareActivities.includes(subject)) {
    return "daycare";
  }

  return "class";
};

// Helper function to format class time information. Takes the shift of the
// day being VIEWED (not necessarily today's real shift) — see getEventDetails.
const getFormattedClassTime = (
  bellSchedule: BellSchedule,
  classOrder: string,
  shift: ShiftType,
): string => {
  const times = getClassTimes(bellSchedule, classOrder, shift);

  if (times) {
    return `${times.startTime}–${times.endTime}`;
  }

  return "";
};

export const getEventDetails = (
  data: ClassData,
  title: SubjectId,
  time: string,
  shift: ShiftType,
  classType?: string,
): EventDetails | null => {
  // Get subject info for icon
  const eventType = getEventType(title);
  const iconData = getSubjectIconData(title);

  // Get formatted time for classes and daycare activities
  let formattedTime: string | undefined;

  if (eventType === "class") {
    formattedTime = getFormattedClassTime(data.bellSchedule, time, shift);
  } else if (eventType === "daycare") {
    // Extract time range from daycare activity time (e.g., "12:30-13:00")
    const timeMatch = time.match(/(\d{2}:\d{2})-(\d{2}:\d{2})/);
    if (timeMatch) {
      formattedTime = `${timeMatch[1]}–${timeMatch[2]}`;
    }
  }

  // Build the event details
  const eventDetails: EventDetails = {
    type: eventType,
    icon: iconData,
    title,
    time,
    formattedTime,
    classType,
  };

  // Add books from textbook data
  const textbooks = getTextbooksForSubject(data.textbooks, title);
  if (textbooks.length > 0) {
    eventDetails.books = textbooks;
  }

  // Add pribor as equipment if available
  const pribor = data.pribor[title];
  if (pribor && pribor.length > 0) {
    eventDetails.equipment = pribor;
  }

  // Add teacher information for class subjects
  if (eventType === "class") {
    const teacher = getTeacherForSubject(data, title);
    if (teacher) {
      eventDetails.teacher = teacher;
    }
  }

  // Add exams for class subjects
  if (eventType === "class") {
    eventDetails.allExams = getAllExamsForSubject(data.exams, title);
  }

  return eventDetails;
};
