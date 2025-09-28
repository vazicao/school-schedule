import { EventDetails } from "../components/EventModal";
import { getExamsForSubject, type Exam } from "./examData";
import { getSubjectInfo } from "./scheduleData";
import { getTextbooksForSubject } from "./textbookData";
import { getTeacherForSubject } from "./teacherData";
import { getClassTimes } from "./timeMapping";
import { getCurrentShift } from "./shiftDetection";
import { format, parseISO, isBefore } from "date-fns";
import { sr } from "date-fns/locale";

// Helper functions to convert exam data
const formatExamDate = (exam: Exam): string => {
  if (exam.confirmedDate) {
    return format(parseISO(exam.confirmedDate), "d. MMMM yyyy", { locale: sr });
  }
  return `Nedelja ${exam.isoWeek} (${format(parseISO(exam.weekStart), "d.", { locale: sr })}-${format(parseISO(exam.weekEnd), "d. MMMM", { locale: sr })})`;
};

const getAllExamsForSubject = (
  subject: string,
): Array<{
  date: string;
  type: string;
  description: string;
  weekInfo: string;
  isPast?: boolean;
  isUpcoming?: boolean;
}> => {
  const subjectExams = getExamsForSubject(subject);

  // Find the next upcoming exam
  const upcomingExams = subjectExams
    .filter((exam) => {
      const examDate = exam.confirmedDate
        ? parseISO(exam.confirmedDate)
        : parseISO(exam.weekEnd);
      return !isBefore(examDate, new Date());
    })
    .sort((a, b) => {
      const dateA = a.confirmedDate
        ? parseISO(a.confirmedDate)
        : parseISO(a.weekStart);
      const dateB = b.confirmedDate
        ? parseISO(b.confirmedDate)
        : parseISO(b.weekStart);
      return dateA.getTime() - dateB.getTime();
    });

  const nextUpcomingExam = upcomingExams[0];

  return subjectExams
    .map((exam) => {
      const examDate = exam.confirmedDate
        ? parseISO(exam.confirmedDate)
        : parseISO(exam.weekEnd);
      const isPast = isBefore(examDate, new Date());
      const isUpcoming = nextUpcomingExam && exam === nextUpcomingExam;

      return {
        date: formatExamDate(exam),
        type: "Контролни задатак",
        description: exam.topic || "Тема ће бити најављена",
        weekInfo: `Недеља ${exam.isoWeek} (${format(parseISO(exam.weekStart), "d.", { locale: sr })} – ${format(parseISO(exam.weekEnd), "d. MMMM", { locale: sr })})`,
        isPast,
        isUpcoming,
      };
    })
    .sort((a, b) => {
      // Sort by date
      const dateA = subjectExams.find(
        (exam) => formatExamDate(exam) === a.date,
      );
      const dateB = subjectExams.find(
        (exam) => formatExamDate(exam) === b.date,
      );
      if (!dateA || !dateB) return 0;

      const parsedDateA = dateA.confirmedDate
        ? parseISO(dateA.confirmedDate)
        : parseISO(dateA.weekStart);
      const parsedDateB = dateB.confirmedDate
        ? parseISO(dateB.confirmedDate)
        : parseISO(dateB.weekStart);

      return parsedDateA.getTime() - parsedDateB.getTime();
    });
};

// Helper function to get icon for a subject - returns the icon string/identifier
const getSubjectIconData = (subject: string): string => {
  const subjectInfo = getSubjectInfo(subject);
  return subjectInfo.icon;
};

// Helper function to determine event type
const getEventType = (subject: string): "class" | "daycare" | "weekend" => {
  const daycareActivities = [
    "Пријем деце",
    "Домаћи задатак",
    "Ручак",
    "Домаћи",
    "Слободно време",
  ];

  if (daycareActivities.includes(subject)) {
    return "daycare";
  }

  return "class";
};

// Helper function to format class time information
const getFormattedClassTime = (classOrder: string): string => {
  const currentShift = getCurrentShift();
  const times = getClassTimes(classOrder, currentShift);

  if (times) {
    return `${times.startTime}–${times.endTime}`;
  }

  return "";
};

export const getEventDetails = (
  title: string,
  time: string,
  classType?: string,
): EventDetails | null => {
  // Get subject info which now contains pribor data
  const subjectInfo = getSubjectInfo(title);

  // Get subject info for icon
  const eventType = getEventType(title);
  const iconData = getSubjectIconData(title);

  // Get formatted time for classes and daycare activities
  let formattedTime: string | undefined;

  if (eventType === "class") {
    formattedTime = getFormattedClassTime(time);
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
  const textbooks = getTextbooksForSubject(title);
  if (textbooks.length > 0) {
    eventDetails.books = textbooks;
  }

  // Add pribor as equipment if available
  if (subjectInfo.pribor && subjectInfo.pribor.length > 0) {
    eventDetails.equipment = subjectInfo.pribor;
  }

  // Add teacher information for class subjects
  if (eventType === "class") {
    const teacher = getTeacherForSubject(title);
    if (teacher) {
      eventDetails.teacher = teacher;
    }
  }

  // Add exams for class subjects
  if (eventType === "class") {
    eventDetails.allExams = getAllExamsForSubject(title);
  }

  return eventDetails;
};
