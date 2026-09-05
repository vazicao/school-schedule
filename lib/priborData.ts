import type { SubjectId } from "./scheduleData";

export interface PriborItem {
  name: string;
  category:
    | "writing"
    | "drawing"
    | "measuring"
    | "storage"
    | "digital"
    | "sport"
    | "general";
  isRequired: boolean;
  notes?: string;
}

export interface SubjectPribor {
  books: string[];
  equipment: PriborItem[];
}

// Common pribor items used across multiple subjects
export const commonPribor: Record<string, PriborItem> = {
  olovka: {
    name: "Olovka",
    category: "writing",
    isRequired: true,
  },
  gumica: {
    name: "Gumica",
    category: "writing",
    isRequired: true,
  },
  nalivPero: {
    name: "Naliv pero",
    category: "writing",
    isRequired: true,
  },
  sveska: {
    name: "Sveska",
    category: "general",
    isRequired: true,
  },
  sveskaA5Kvadratici: {
    name: "Sveska A5 kvadratići",
    category: "general",
    isRequired: true,
  },
  sveskaLinije: {
    name: "Sveska u linije",
    category: "general",
    isRequired: true,
  },
  bojice: {
    name: "Bojice",
    category: "drawing",
    isRequired: true,
  },
  flomastere: {
    name: "Flomasteri",
    category: "drawing",
    isRequired: false,
  },
  vodeneBoze: {
    name: "Vodene boje",
    category: "drawing",
    isRequired: false,
  },
  cetkice: {
    name: "Četkice",
    category: "drawing",
    isRequired: false,
  },
  papirZaCrtanje: {
    name: "Papir za crtanje",
    category: "drawing",
    isRequired: false,
  },
  plastelin: {
    name: "Plastelin",
    category: "drawing",
    isRequired: false,
  },
  lenjiri: {
    name: "Lenjiri",
    category: "measuring",
    isRequired: true,
  },
  sestor: {
    name: "Šestar",
    category: "measuring",
    isRequired: true,
  },
  usbFlash: {
    name: "USB fleš memorija",
    category: "digital",
    isRequired: false,
  },
  slusalice: {
    name: "Slušalice",
    category: "digital",
    isRequired: false,
  },
  sportskaOprema: {
    name: "Sportska oprema",
    category: "sport",
    isRequired: true,
  },
  patikeZaSport: {
    name: "Patike za sport",
    category: "sport",
    isRequired: true,
  },
  flasaVode: {
    name: "Flaša vode",
    category: "sport",
    isRequired: true,
  },
  lupica: {
    name: "Lupa (ponekad)",
    category: "general",
    isRequired: false,
    notes: "Potrebna samo za neke aktivnosti",
  },
  decijeOrgulje: {
    name: "Dečije orgulje (opciono)",
    category: "general",
    isRequired: false,
  },
};

// Subject-specific pribor configuration
export const subjectPribor: Partial<Record<SubjectId, SubjectPribor>> = {
  Matematika: {
    books: [
      "Matematika za 2. razred - udžbenik",
      "Matematika za 2. razred - radna sveska",
      "Zbirka zadataka iz matematike",
    ],
    equipment: [
      commonPribor.sveskaA5Kvadratici,
      commonPribor.lenjiri,
      commonPribor.sestor,
      commonPribor.olovka,
      commonPribor.gumica,
    ],
  },
  "Srpski jezik": {
    books: [
      "Srpski jezik za 2. razred - udžbenik",
      "Srpski jezik za 2. razred - radna sveska",
      "Čitanka za 2. razred",
    ],
    equipment: [
      commonPribor.olovka,
      commonPribor.nalivPero,
      commonPribor.gumica,
      commonPribor.sveskaLinije,
    ],
  },
  "Engleski jezik": {
    books: [
      "English for Kids 2 - udžbenik",
      "English for Kids 2 - radna sveska",
      "Ilustrovani rečnik",
    ],
    equipment: [
      commonPribor.olovka,
      commonPribor.bojice,
      commonPribor.gumica,
      commonPribor.sveska,
    ],
  },
  "Digitalni svet": {
    books: ["Digitalni svet za 2. razred - udžbenik"],
    equipment: [
      commonPribor.usbFlash,
      commonPribor.slusalice,
      commonPribor.olovka,
      commonPribor.sveska,
    ],
  },
  "Svet oko nas": {
    books: [
      "Svet oko nas za 2. razred - udžbenik",
      "Svet oko nas za 2. razred - radna sveska",
    ],
    equipment: [
      commonPribor.olovka,
      commonPribor.bojice,
      commonPribor.lupica,
      commonPribor.sveska,
    ],
  },
  "Likovna kultura": {
    books: ["Likovna kultura za 2. razred - udžbenik"],
    equipment: [
      commonPribor.bojice,
      commonPribor.flomastere,
      commonPribor.vodeneBoze,
      commonPribor.cetkice,
      commonPribor.papirZaCrtanje,
      commonPribor.plastelin,
    ],
  },
  "Muzička kultura": {
    books: ["Muzička kultura za 2. razred - udžbenik"],
    equipment: [
      commonPribor.decijeOrgulje,
      commonPribor.olovka,
      commonPribor.sveska,
    ],
  },
  "Fizičko i zdravstveno vaspitanje": {
    books: [],
    equipment: [
      commonPribor.sportskaOprema,
      commonPribor.patikeZaSport,
      commonPribor.flasaVode,
    ],
  },
  "Fizičko i zdravstveno vaspitanje (sala)": {
    books: [],
    equipment: [
      commonPribor.sportskaOprema,
      commonPribor.patikeZaSport,
      commonPribor.flasaVode,
    ],
  },
  ČOS: {
    books: ["ČOS za 2. razred - udžbenik"],
    equipment: [commonPribor.olovka, commonPribor.sveska],
  },
  "Građansko vaspitanje / Verska nastava": {
    books: [
      "Građansko vaspitanje za 2. razred - udžbenik",
      "ili Verska nastava za 2. razred - udžbenik",
    ],
    equipment: [commonPribor.olovka, commonPribor.sveska],
  },
  "Dopunska nastava": {
    books: [],
    equipment: [
      {
        name: "Materijali za predmet koji se dopunjuje",
        category: "general",
        isRequired: true,
        notes: "Zavisi od predmeta",
      },
      commonPribor.olovka,
      commonPribor.sveska,
    ],
  },
};

// Daycare activities pribor
export const daycarePribor: Partial<Record<SubjectId, SubjectPribor>> = {
  "Domaći zadatak": {
    books: [],
    equipment: [
      {
        name: "Sav školski pribor",
        category: "general",
        isRequired: true,
        notes: "Sve što je potrebno za školu",
      },
      {
        name: "Udžbenici i sveske",
        category: "general",
        isRequired: true,
      },
      {
        name: "Zadaci za kuću",
        category: "general",
        isRequired: true,
      },
    ],
  },
  Domaći: {
    books: [],
    equipment: [
      {
        name: "Sav školski pribor",
        category: "general",
        isRequired: true,
        notes: "Sve što je potrebno za školu",
      },
      {
        name: "Udžbenici i sveske",
        category: "general",
        isRequired: true,
      },
      {
        name: "Zadaci za kuću",
        category: "general",
        isRequired: true,
      },
    ],
  },
};

// Helper function to get pribor for a subject
export const getSubjectPribor = (
  subjectName: SubjectId,
): SubjectPribor | null => {
  return subjectPribor[subjectName] || daycarePribor[subjectName] || null;
};

// Helper function to get all equipment names for a subject
export const getSubjectEquipmentNames = (subjectName: SubjectId): string[] => {
  const pribor = getSubjectPribor(subjectName);
  return pribor ? pribor.equipment.map((item) => item.name) : [];
};

// Helper function to get required equipment for a subject
export const getRequiredEquipment = (subjectName: SubjectId): PriborItem[] => {
  const pribor = getSubjectPribor(subjectName);
  return pribor ? pribor.equipment.filter((item) => item.isRequired) : [];
};

// Helper function to get optional equipment for a subject
export const getOptionalEquipment = (subjectName: SubjectId): PriborItem[] => {
  const pribor = getSubjectPribor(subjectName);
  return pribor ? pribor.equipment.filter((item) => !item.isRequired) : [];
};

// Get all unique equipment items across all subjects
export const getAllEquipment = (): PriborItem[] => {
  const allEquipment = new Map<string, PriborItem>();

  Object.values(subjectPribor).forEach((subject) => {
    subject.equipment.forEach((item) => {
      allEquipment.set(item.name, item);
    });
  });

  Object.values(daycarePribor).forEach((activity) => {
    activity.equipment.forEach((item) => {
      allEquipment.set(item.name, item);
    });
  });

  return Array.from(allEquipment.values());
};
