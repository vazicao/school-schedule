// Shared subject catalog: display info (name, icon, color) for every subject or
// activity ANY class might have. This is curriculum-wide, not class-specific —
// per-class data (schedule, exams, teachers, textbooks, pribor) lives under
// /data/<school>/<class>/<year>/ and refers to subjects by SubjectId.

// Subject definition with icon and color
export interface Subject {
  name: string;
  icon: string;
  color: string;
}

// All subjects any class can have
export const subjects = {
  Matematika: {
    name: "Matematika",
    icon: "🧮",
    color: "#FFE9D2",
  },
  "Srpski jezik": {
    name: "Srpski jezik",
    icon: "📖",
    color: "#FED712",
  },
  "Engleski jezik": {
    name: "Engleski jezik",
    icon: "🇬🇧",
    color: "#BFF2F4",
  },
  "Likovna kultura": {
    name: "Likovna kultura",
    icon: "🖼️",
    color: "#98D9E6",
  },
  "Muzička kultura": {
    name: "Muzička kultura",
    icon: "🎹",
    color: "#FE7209",
  },
  "Fizičko i zdravstveno vaspitanje": {
    name: "Fizičko i zdravstveno vaspitanje",
    icon: "👟",
    color: "#8EECC4",
  },
  "Fizičko i zdravstveno vaspitanje (sala)": {
    name: "Fizičko i zdravstveno vaspitanje (sala)",
    icon: "👟",
    color: "#8EECC4",
  },
  "Svet oko nas": {
    name: "Svet oko nas",
    icon: "🪴",
    color: "#FFD2B1",
  },
  // "Svet oko nas" (2nd grade) becomes "Priroda i društvo" starting 3rd grade
  // — a real curriculum rename, not a typo, so kept as a separate subject.
  "Priroda i društvo": {
    name: "Priroda i društvo",
    icon: "🌍",
    color: "#FFD2B1",
  },
  "Digitalni svet": {
    name: "Digitalni svet",
    icon: "💾",
    color: "#FBCCFF",
  },
  ČOS: {
    name: "ČOS",
    icon: "🧑‍🏫",
    color: "#FFE9D2",
  },
  "Građansko vaspitanje": {
    name: "Građansko vaspitanje",
    icon: "⛪",
    color: "#D4E3F1",
  },
  "Verska nastava": {
    name: "Verska nastava",
    icon: "⛪",
    color: "#D4E3F1",
  },
  "Građansko vaspitanje / Verska nastava": {
    name: "Građansko vaspitanje / Verska nastava",
    icon: "⛪",
    color: "#D4E3F1",
  },
  "Dopunska nastava": {
    name: "Dopunska nastava",
    icon: "🏋",
    color: "#F0E5FF",
  },
  // Daycare (boravak) activities — feature currently disabled, kept for reuse
  "Prijem dece": { name: "Prijem dece", icon: "👋", color: "#E3F2FD" },
  "Domaći zadatak": { name: "Domaći zadatak", icon: "📝", color: "#FBCCFF" },
  Ručak: { name: "Ručak", icon: "🍲", color: "#FFE9D2" },
  Domaći: { name: "Domaći", icon: "📝", color: "#FBCCFF" },
  "Slobodno vreme": { name: "Slobodno vreme", icon: "🛝", color: "#D8E1FD" },
} satisfies Record<string, Subject>;

// Union of every valid subject/activity key in `subjects` above, derived
// automatically so it can never drift out of sync. Every place that stores or
// looks up "which subject" (schedule entries, exams, teacher/textbook/pribor
// maps, in every class's data) should use this instead of a bare `string` — a
// typo or a stale name then fails at compile time instead of silently falling
// back at runtime.
export type SubjectId = keyof typeof subjects;

// Helper function to get subject info. Deliberately takes a plain `string`
// (not SubjectId) since this is called from generic display code (e.g. the
// event modal) that isn't always statically known to be a real subject — the
// fallback below covers that case. Data-authoring code should use SubjectId
// instead, so a mismatch there is a compile error rather than landing here.
export const getSubjectInfo = (subjectName: string): Subject => {
  return (
    (subjects as Record<string, Subject>)[subjectName] || {
      name: subjectName,
      icon: "📋",
      color: "#8E8E93",
    }
  );
};
