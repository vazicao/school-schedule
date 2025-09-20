export interface SchoolConfig {
  id: string;
  name: string;
  fullName: string;
  address?: string;
  classes: ClassConfig[];
}

export interface ClassConfig {
  id: string;
  name: string;
  grade: number;
  section: string;
  teacher?: string;
  studentCount?: number;
}

// Current school configuration
// This can be expanded to support multiple schools in the future
export const schoolConfigs: SchoolConfig[] = [
  {
    id: 'os-jelena-cetkovic',
    name: 'OŠ Jelena Četković',
    fullName: 'Osnovna škola "Jelena Četković"',
    address: 'Beograd, Srbija',
    classes: [
      {
        id: 'ii2',
        name: 'II2',
        grade: 2,
        section: '2',
        teacher: 'Marija Petrović',
        studentCount: 24,
      },
      // Future classes can be added here
      {
        id: 'ii1',
        name: 'II1',
        grade: 2,
        section: '1',
        teacher: 'Ana Nikolić',
        studentCount: 22,
      },
    ],
  },
];

// Default/current configuration
export const getCurrentSchool = (): SchoolConfig => {
  return schoolConfigs[0]; // For now, return the first (and only) school
};

export const getCurrentClass = (): ClassConfig => {
  const school = getCurrentSchool();
  return school.classes.find(c => c.id === 'ii2') || school.classes[0];
};

// Helper functions for future multi-school support
export const getSchoolById = (schoolId: string): SchoolConfig | undefined => {
  return schoolConfigs.find(school => school.id === schoolId);
};

export const getClassById = (schoolId: string, classId: string): ClassConfig | undefined => {
  const school = getSchoolById(schoolId);
  return school?.classes.find(c => c.id === classId);
};