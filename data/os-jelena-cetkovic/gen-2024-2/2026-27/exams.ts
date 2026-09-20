import type { Exam } from "../../../../lib/examData";

// Exams for the 2026/27 school year, with exact confirmed dates.
// Typed as Exam[] (not cast) so every entry's `subject` is checked against
// SubjectId — a typo'd or stale subject name is a compile error, not a silent miss.
export const exams: Exam[] = [
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
];
