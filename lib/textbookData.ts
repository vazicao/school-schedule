import type { SubjectId } from "./subjects";

export interface Textbook {
  naziv: string;
  officialNaziv: string;
  autori: string[];
  // Optional: a few non-catalog items (electives like Građansko vaspitanje,
  // or supplementary workbooks) genuinely have no registered ISBN anywhere —
  // neither the retailer nor the publisher's own site lists one.
  isbn?: string;
  link: string;
  imageUrl?: string;
}

export interface SubjectTextbooks {
  naziv: string;
  izdavac: string;
  obavezna: boolean;
  knjige: Textbook[];
}

// A class's textbooks, keyed by subject
// (data/<school>/<class>/<year>/textbooks.ts)
export type ClassTextbooks = Partial<Record<SubjectId, SubjectTextbooks>>;

export const getTextbooksForSubject = (
  textbooks: ClassTextbooks,
  subject: SubjectId,
): Textbook[] => {
  return textbooks[subject]?.knjige || [];
};
