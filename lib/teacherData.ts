export interface Teacher {
  id: string;
  name: string;
  subjects: string[];
  classes: string[];
  email?: string;
  phone?: string;
  room?: string;
}

export const teachers: Record<string, Teacher> = {
  "maksimovic-bojana": {
    id: "maksimovic-bojana",
    name: "Максимовић Бојана",
    subjects: ["Разредна настава"], // Default for all subjects except overrides
    classes: ["II2"],
    email: "bojanaucha@gmail.com",
    phone: "+381 11 123 4567",
    room: "101",
  },
  "domnic-popovic-natasa": {
    id: "domnic-popovic-natasa",
    name: "Домнић Поповић Наташа",
    subjects: ["Енглески језик"],
    classes: [],
    phone: "+381 11 234 5678",
    room: "205",
  },
  "kalickanin-tamara": {
    id: "kalickanin-tamara",
    name: "Каличанин Тамара",
    subjects: ["Верска настава"],
    classes: [],
    phone: "+381 11 345 6789",
    room: "302",
  },
};

// Subject to teacher mapping for specific overrides
export const subjectTeacherMap: Record<string, string> = {
  "Енглески језик": "domnic-popovic-natasa",
  "Верска настава": "kalickanin-tamara",
  "Грађанско васпитање / Верска настава": "kalickanin-tamara", // Assuming same teacher handles this
};

// Default class teacher for subjects not in override map
export const classTeachers: Record<string, string> = {
  II2: "maksimovic-bojana",
};

export const getTeacherForSubject = (
  subject: string,
  className: string = "II2",
): Teacher | null => {
  // First check for specific subject override
  const specificTeacherId = subjectTeacherMap[subject];
  if (specificTeacherId && teachers[specificTeacherId]) {
    return teachers[specificTeacherId];
  }

  // Fall back to class teacher for general subjects
  const classTeacherId = classTeachers[className];
  if (classTeacherId && teachers[classTeacherId]) {
    return teachers[classTeacherId];
  }

  return null;
};

export const getTeacherById = (teacherId: string): Teacher | null => {
  return teachers[teacherId] || null;
};

export const getAllTeachers = (): Teacher[] => {
  return Object.values(teachers);
};
