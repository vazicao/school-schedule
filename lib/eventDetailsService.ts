import { EventDetails } from "../components/EventModal";
import { getExamsForSubject, type Exam } from "./examData";
import { getSubjectPribor } from "./priborData";
import { getSubjectInfo } from "./scheduleData";
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

// Dynamic subtitle generation for daycare activities
const getDaycareSubtitle = (activity: string): string => {
  const subtitles: Record<string, string> = {
    "Пријем деце": "Долазак деце у продужени боравак",
    "Домаћи задатак": "Рад под надзором васпитача",
    Ручак: "Оброк у школској мензи",
    Домаћи: "Рад под надзором васпитача",
    "Слободно време": "Слободне активности и игра",
  };

  return subtitles[activity] || "";
};

export const getEventDetails = (
  title: string,
  time: string,
  classType?: string,
): EventDetails | null => {
  // Get pribor data for the subject
  const priborData = getSubjectPribor(title);

  // Get subject info for icon
  const eventType = getEventType(title);
  const iconData = getSubjectIconData(title);

  // Build the event details
  const eventDetails: EventDetails = {
    type: eventType,
    icon: iconData,
    title,
    time,
    classType,
  };

  // Add books if available
  if (priborData?.books && priborData.books.length > 0) {
    eventDetails.books = priborData.books;
  }

  // Add equipment if available
  if (priborData?.equipment && priborData.equipment.length > 0) {
    eventDetails.equipment = priborData.equipment.map((item) => item.name);
  }

  // Add subtitle for daycare activities
  if (eventType === "daycare") {
    eventDetails.subtitle = getDaycareSubtitle(title);
  }

  // Add exams for class subjects
  if (eventType === "class") {
    eventDetails.allExams = getAllExamsForSubject(title);
  }

  return eventDetails;
};
