import { EventDetails } from "../components/EventModal";
import { getExamsForSubject, type Exam } from "./examData";
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

// Dummy data for event details
const dummyEventDetails: Record<string, EventDetails> = {
  Математика: {
    type: "class",
    icon: "🔢",
    title: "Математика",
    time: "",
    books: [
      "Matematika za 2. razred - udžbenik",
      "Matematika za 2. razred - radna sveska",
      "Zbirka zadataka iz matematike",
    ],
    equipment: ["Свеска А5 квадратићи", "Лењири", "Шестар"],
    allExams: getAllExamsForSubject("Математика"),
  },
  "Српски језик": {
    type: "class",
    icon: "📝",
    title: "Српски језик",
    time: "",
    books: [
      "Srpski jezik za 2. razred - udžbenik",
      "Srpski jezik za 2. razred - radna sveska",
      "Čitanka za 2. razred",
    ],
    equipment: ["Olovka", "Naliv pero", "Gumica", "Sveska u linije"],
    allExams: getAllExamsForSubject("Српски језик"),
  },
  "Енглески језик": {
    type: "class",
    icon: "🇬🇧",
    title: "Енглески језик",
    time: "",
    books: [
      "English for Kids 2 - udžbenik",
      "English for Kids 2 - radna sveska",
      "Ilustrovani rečnik",
    ],
    equipment: ["Olovka", "Bojice", "Gumica"],
    allExams: getAllExamsForSubject("Енглески језик"),
  },
  "Дигитални свет": {
    type: "class",
    icon: "💻",
    title: "Дигитални свет",
    time: "",
    books: ["Digitalni svet za 2. razred - udžbenik"],
    equipment: ["USB flash memorija", "Slušalice"],
    allExams: [],
  },
  "Свет око нас": {
    type: "class",
    icon: "🌍",
    title: "Свет око нас",
    time: "",
    books: [
      "Svet oko nas za 2. razred - udžbenik",
      "Svet oko nas za 2. razred - radna sveska",
    ],
    equipment: ["Olovka", "Bojice", "Lupica (ponekad)"],
    allExams: getAllExamsForSubject("Свет око нас"),
  },
  "Ликовна култура": {
    type: "class",
    icon: "🎨",
    title: "Ликовна култура",
    time: "",
    books: ["Likovna kultura za 2. razred - udžbenik"],
    equipment: [
      "Bojice",
      "Flomastere",
      "Vodene boje",
      "Četkice",
      "Papir za crtanje",
      "Plastelin",
    ],
    allExams: [],
  },
  "Музичка култура": {
    type: "class",
    icon: "🎵",
    title: "Музичка култура",
    time: "",
    books: ["Muzička kultura za 2. razred - udžbenik"],
    equipment: ["Dečije orgulje (opciono)"],
    allExams: [],
  },
  "Физичко и здравствено васпитање": {
    type: "class",
    icon: "🏃‍♂️",
    title: "Физичко и здравствено васпитање",
    time: "",
    equipment: ["Sportska oprema", "Patike za sport", "Flaša vode"],
    allExams: [],
  },
  ЧОС: {
    type: "class",
    icon: "👥",
    title: "ЧОС",
    time: "",
    books: ["ČOS za 2. razred - udžbenik"],
    equipment: ["Olovka", "Sveska"],
  },
  "Грађанско васпитање / Верска настава": {
    type: "class",
    icon: "🤝",
    title: "Грађанско васпитање / Верска настава",
    time: "",
    books: [
      "Građansko vaspitanje za 2. razred - udžbenik",
      "ili Verska nastava za 2. razred - udžbenik",
    ],
    equipment: ["Olovka", "Sveska"],
  },
  "Допунска настава": {
    type: "class",
    icon: "📚",
    title: "Допунска настава",
    time: "",
    equipment: ["Materijali za predmet koji se dopunjuje", "Olovka", "Sveska"],
  },
  // Daycare activities
  "Пријем деце": {
    type: "daycare",
    icon: "🌅",
    title: "Пријем деце",
    time: "",
    subtitle: "Долазак деце у продужени боравак",
  },
  "Домаћи задатак": {
    type: "daycare",
    icon: "📖",
    title: "Домаћи задатак",
    time: "",
    equipment: ["Sav školski pribor", "Udžbenici i sveske", "Zadaci za kuću"],
    subtitle: "Рад под надзором васпитача",
  },
  Ручак: {
    type: "daycare",
    icon: "🍽️",
    title: "Ручак",
    time: "",
    subtitle: "Оброк у школској мензи",
  },
  Домаћи: {
    type: "daycare",
    icon: "📝",
    title: "Домаћи",
    time: "",
    equipment: ["Sav školski pribor", "Udžbenici i sveske", "Zadaci za kuću"],
    subtitle: "Рад под надзором васпитача",
  },
  "Слободно време": {
    type: "daycare",
    icon: "🛝",
    title: "Слободно време",
    time: "",
    subtitle: "Слободне активности и игра",
  },
};

export const getEventDetails = (
  title: string,
  time: string,
  classType?: string,
): EventDetails | null => {
  const details = dummyEventDetails[title];
  if (!details) return null;

  return {
    ...details,
    time,
    classType,
  };
};
