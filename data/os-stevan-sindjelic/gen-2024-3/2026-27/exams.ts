import type { Exam } from "../../../../lib/examData";

// "Raspored pisanih provera znanja – treći razred" (photo from the parent),
// exact dates. All are "kontrolna vežba" on the sheet. Only Srpski,
// Matematika and Priroda i društvo are listed; nothing for Engleski yet.
// Note: 9 Jun 2027 (PiD godišnji test) is a Wednesday, when PiD isn't on the
// timetable — copied as printed.
export const exams: Exam[] = [
  {
    date: "2026-09-30",
    subject: "Srpski jezik",
    topic: "Imenice",
    type: "Kontrolna vežba",
    semester: 1,
  },
  {
    date: "2026-11-05",
    subject: "Srpski jezik",
    topic: "Pridevi",
    type: "Kontrolna vežba",
    semester: 1,
  },
  {
    date: "2026-12-10",
    subject: "Srpski jezik",
    topic: "Glagoli",
    type: "Kontrolna vežba",
    semester: 1,
  },
  {
    date: "2026-12-22",
    subject: "Srpski jezik",
    topic: "Pravopis 1",
    type: "Kontrolna vežba",
    semester: 1,
  },
  {
    date: "2026-12-28",
    subject: "Srpski jezik",
    topic: "Polugodišnja provera",
    type: "Kontrolna vežba",
    semester: 1,
  },
  {
    date: "2026-09-25",
    subject: "Matematika",
    topic: "Brojevi prve hiljade",
    type: "Kontrolna vežba",
    semester: 1,
  },
  {
    date: "2026-10-01",
    subject: "Matematika",
    topic: "Usmeno sabiranje i oduzimanje brojeva do 1 000 – prvi deo",
    type: "Kontrolna vežba",
    semester: 1,
  },
  {
    date: "2026-12-08",
    subject: "Matematika",
    topic: "Usmeno sabiranje i oduzimanje brojeva do 1 000 – drugi deo",
    type: "Kontrolna vežba",
    semester: 1,
  },
  {
    date: "2026-12-21",
    subject: "Matematika",
    topic: "Usmeno množenje i deljenje dvocifrenih brojeva",
    type: "Kontrolna vežba",
    semester: 1,
  },
  {
    date: "2026-12-29",
    subject: "Matematika",
    topic: "Polugodišnja provera",
    type: "Kontrolna vežba",
    semester: 1,
  },
  {
    date: "2026-09-28",
    subject: "Priroda i društvo",
    topic: "Orijentacija u prostoru i reljef",
    type: "Kontrolna vežba",
    semester: 1,
  },
  {
    date: "2026-11-02",
    subject: "Priroda i društvo",
    topic: "Naš kraj i saobraćaj",
    type: "Kontrolna vežba",
    semester: 1,
  },
  {
    date: "2026-11-30",
    subject: "Priroda i društvo",
    topic: "Prošlost",
    type: "Kontrolna vežba",
    semester: 1,
  },
  {
    date: "2026-12-24",
    subject: "Priroda i društvo",
    topic: "Polugodišnja provera",
    type: "Kontrolna vežba",
    semester: 1,
  },
  {
    date: "2027-06-09",
    subject: "Priroda i društvo",
    topic: "Naučili smo u trećem razredu – godišnji test",
    type: "Kontrolna vežba",
    semester: 2,
  },
];
