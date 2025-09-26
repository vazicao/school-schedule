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
    name: "Оловка",
    category: "writing",
    isRequired: true,
  },
  gumica: {
    name: "Гумица",
    category: "writing",
    isRequired: true,
  },
  nalivPero: {
    name: "Налив перо",
    category: "writing",
    isRequired: true,
  },
  sveska: {
    name: "Свеска",
    category: "general",
    isRequired: true,
  },
  sveskaA5Kvadratici: {
    name: "Свеска А5 квадратићи",
    category: "general",
    isRequired: true,
  },
  sveskaLinije: {
    name: "Свеска у линије",
    category: "general",
    isRequired: true,
  },
  bojice: {
    name: "Бојице",
    category: "drawing",
    isRequired: true,
  },
  flomastere: {
    name: "Фломастери",
    category: "drawing",
    isRequired: false,
  },
  vodeneBoze: {
    name: "Водене боје",
    category: "drawing",
    isRequired: false,
  },
  cetkice: {
    name: "Четкице",
    category: "drawing",
    isRequired: false,
  },
  papirZaCrtanje: {
    name: "Папир за цртање",
    category: "drawing",
    isRequired: false,
  },
  plastelin: {
    name: "Пластелин",
    category: "drawing",
    isRequired: false,
  },
  lenjiri: {
    name: "Лењири",
    category: "measuring",
    isRequired: true,
  },
  sestor: {
    name: "Шестар",
    category: "measuring",
    isRequired: true,
  },
  usbFlash: {
    name: "USB флеш меморија",
    category: "digital",
    isRequired: false,
  },
  slusalice: {
    name: "Слушалице",
    category: "digital",
    isRequired: false,
  },
  sportskaOprema: {
    name: "Спортска опрема",
    category: "sport",
    isRequired: true,
  },
  patikeZaSport: {
    name: "Патике за спорт",
    category: "sport",
    isRequired: true,
  },
  flasaVode: {
    name: "Флаша воде",
    category: "sport",
    isRequired: true,
  },
  lupica: {
    name: "Лупа (понекад)",
    category: "general",
    isRequired: false,
    notes: "Потребна само за неке активности",
  },
  decijeOrgulje: {
    name: "Дечије оргуље (опционо)",
    category: "general",
    isRequired: false,
  },
};

// Subject-specific pribor configuration
export const subjectPribor: Record<string, SubjectPribor> = {
  Математика: {
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
  "Српски језик": {
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
  "Енглески језик": {
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
  "Дигитални свет": {
    books: ["Digitalni svet za 2. razred - udžbenik"],
    equipment: [
      commonPribor.usbFlash,
      commonPribor.slusalice,
      commonPribor.olovka,
      commonPribor.sveska,
    ],
  },
  "Свет око нас": {
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
  "Ликовна култура": {
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
  "Музичка култура": {
    books: ["Muzička kultura za 2. razred - udžbenik"],
    equipment: [
      commonPribor.decijeOrgulje,
      commonPribor.olovka,
      commonPribor.sveska,
    ],
  },
  "Физичко и здравствено васпитање": {
    books: [],
    equipment: [
      commonPribor.sportskaOprema,
      commonPribor.patikeZaSport,
      commonPribor.flasaVode,
    ],
  },
  "Физичко и здравствено васпитање (сала)": {
    books: [],
    equipment: [
      commonPribor.sportskaOprema,
      commonPribor.patikeZaSport,
      commonPribor.flasaVode,
    ],
  },
  ЧОС: {
    books: ["ČOS za 2. razred - udžbenik"],
    equipment: [commonPribor.olovka, commonPribor.sveska],
  },
  "Грађанско васпитање / Верска настава": {
    books: [
      "Građansko vaspitanje za 2. razred - udžbenik",
      "ili Verska nastava za 2. razred - udžbenik",
    ],
    equipment: [commonPribor.olovka, commonPribor.sveska],
  },
  "Допунска настава": {
    books: [],
    equipment: [
      {
        name: "Материјали за предмет који се допуњује",
        category: "general",
        isRequired: true,
        notes: "Зависи од предмета",
      },
      commonPribor.olovka,
      commonPribor.sveska,
    ],
  },
};

// Daycare activities pribor
export const daycarePribor: Record<string, SubjectPribor> = {
  "Домаћи задатак": {
    books: [],
    equipment: [
      {
        name: "Сав школски прибор",
        category: "general",
        isRequired: true,
        notes: "Све што је потребно за школу",
      },
      {
        name: "Уџбеници и свеске",
        category: "general",
        isRequired: true,
      },
      {
        name: "Задаци за кућу",
        category: "general",
        isRequired: true,
      },
    ],
  },
  Домаћи: {
    books: [],
    equipment: [
      {
        name: "Сав школски прибор",
        category: "general",
        isRequired: true,
        notes: "Све што је потребно за школу",
      },
      {
        name: "Уџбеници и свеске",
        category: "general",
        isRequired: true,
      },
      {
        name: "Задаци за кућу",
        category: "general",
        isRequired: true,
      },
    ],
  },
};

// Helper function to get pribor for a subject
export const getSubjectPribor = (subjectName: string): SubjectPribor | null => {
  return subjectPribor[subjectName] || daycarePribor[subjectName] || null;
};

// Helper function to get all equipment names for a subject
export const getSubjectEquipmentNames = (subjectName: string): string[] => {
  const pribor = getSubjectPribor(subjectName);
  return pribor ? pribor.equipment.map((item) => item.name) : [];
};

// Helper function to get required equipment for a subject
export const getRequiredEquipment = (subjectName: string): PriborItem[] => {
  const pribor = getSubjectPribor(subjectName);
  return pribor ? pribor.equipment.filter((item) => item.isRequired) : [];
};

// Helper function to get optional equipment for a subject
export const getOptionalEquipment = (subjectName: string): PriborItem[] => {
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
