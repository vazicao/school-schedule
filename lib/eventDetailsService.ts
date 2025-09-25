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
        type: "Kontrolni zadatak",
        description: exam.topic || "Tema će biti najavljena",
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
  Matematika: {
    type: "class",
    icon: "🔢",
    title: "Matematika",
    time: "",
    books: [
      "Matematika za 2. razred - udžbenik",
      "Matematika za 2. razred - radna sveska",
      "Zbirka zadataka iz matematike",
    ],
    equipment: ["Свеска А5 квадратићи", "Лењири", "Шестар"],
    allExams: getAllExamsForSubject("Matematika"),
  },
  "Srpski jezik": {
    type: "class",
    icon: "📝",
    title: "Srpski jezik",
    time: "",
    books: [
      "Srpski jezik za 2. razred - udžbenik",
      "Srpski jezik za 2. razred - radna sveska",
      "Čitanka za 2. razred",
    ],
    equipment: ["Olovka", "Naliv pero", "Gumica", "Sveska u linije"],
    allExams: getAllExamsForSubject("Srpski jezik"),
  },
  "Engleski jezik": {
    type: "class",
    icon: "🇬🇧",
    title: "Engleski jezik",
    time: "",
    books: [
      "English for Kids 2 - udžbenik",
      "English for Kids 2 - radna sveska",
      "Ilustrovani rečnik",
    ],
    equipment: ["Olovka", "Bojice", "Gumica"],
    allExams: getAllExamsForSubject("Engleski jezik"),
  },
  "Digitalni svet": {
    type: "class",
    icon: "💻",
    title: "Digitalni svet",
    time: "",
    books: ["Digitalni svet za 2. razred - udžbenik"],
    equipment: ["USB flash memorija", "Slušalice"],
    allExams: [],
  },
  "Svet oko nas": {
    type: "class",
    icon: "🌍",
    title: "Svet oko nas",
    time: "",
    books: [
      "Svet oko nas za 2. razred - udžbenik",
      "Svet oko nas za 2. razred - radna sveska",
    ],
    equipment: ["Olovka", "Bojice", "Lupica (ponekad)"],
    allExams: getAllExamsForSubject("Svet oko nas"),
  },
  "Likovna kultura": {
    type: "class",
    icon: "🎨",
    title: "Likovna kultura",
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
  "Muzička kultura": {
    type: "class",
    icon: "🎵",
    title: "Muzička kultura",
    time: "",
    books: ["Muzička kultura za 2. razred - udžbenik"],
    equipment: ["Dečije orgulje (opciono)"],
    allExams: [],
  },
  "Fizičko i zdravstveno vaspitanje": {
    type: "class",
    icon: "🏃‍♂️",
    title: "Fizičko i zdravstveno vaspitanje",
    time: "",
    equipment: ["Sportska oprema", "Patike za sport", "Flaša vode"],
    allExams: [],
  },
  ČOS: {
    type: "class",
    icon: "👥",
    title: "ČOS",
    time: "",
    books: ["ČOS za 2. razred - udžbenik"],
    equipment: ["Olovka", "Sveska"],
  },
  "Građansko vaspitanje / Verska nastava": {
    type: "class",
    icon: "🤝",
    title: "Građansko vaspitanje / Verska nastava",
    time: "",
    books: [
      "Građansko vaspitanje za 2. razred - udžbenik",
      "ili Verska nastava za 2. razred - udžbenik",
    ],
    equipment: ["Olovka", "Sveska"],
  },
  "Dopunska nastava": {
    type: "class",
    icon: "📚",
    title: "Dopunska nastava",
    time: "",
    equipment: ["Materijali za predmet koji se dopunjuje", "Olovka", "Sveska"],
  },
  // Daycare activities
  "Početak rada": {
    type: "daycare",
    icon: "🌅",
    title: "Početak rada",
    time: "",
    subtitle: "Dolazak dece u produženi boravak",
  },
  "Rad na domaćim zadacima": {
    type: "daycare",
    icon: "📖",
    title: "Rad na domaćim zadacima",
    time: "",
    equipment: ["Sav školski pribor", "Udžbenici i sveske", "Zadaci za kuću"],
    subtitle: "Rad pod nadzorom vaspitača",
  },
  Ručak: {
    type: "daycare",
    icon: "🍽️",
    title: "Ručak",
    time: "",
    subtitle: "Obrok u školskoj menzi",
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
