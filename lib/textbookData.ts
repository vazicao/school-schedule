import type { SubjectId } from "./subjects";
import type { TextbookId } from "../data/textbooks";

// One book edition, as defined once in the shared catalog (data/textbooks.ts).
export interface Textbook {
  naziv: string;
  officialNaziv: string;
  autori: string[];
  izdavac: string;
  // Optional: a few non-catalog items (electives like Građansko vaspitanje,
  // or supplementary workbooks) genuinely have no registered ISBN anywhere —
  // neither the retailer nor the publisher's own site lists one.
  isbn?: string;
  link: string;
  imageUrl?: string;
  // false for books outside the Ministry's mandatory catalog (electives).
  // Omitted = mandatory.
  obavezna?: boolean;
}

// A class's textbooks as authored (data/<school>/<class>/<year>/textbooks.ts):
// per subject, which catalog books it uses, in display order.
export type ClassTextbooks = Partial<Record<SubjectId, TextbookId[]>>;

// The same, with ids resolved to full book data — what the UI receives
// (resolved server-side in buildClassData, lib/classData.ts).
export type ResolvedClassTextbooks = Partial<Record<SubjectId, Textbook[]>>;

export const getTextbooksForSubject = (
  textbooks: ResolvedClassTextbooks,
  subject: SubjectId,
): Textbook[] => {
  return textbooks[subject] || [];
};
