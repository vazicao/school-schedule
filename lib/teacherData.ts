import type { SubjectId } from "./subjects";

export interface Teacher {
  id: string;
  name: string;
  subjects: string[];
  email?: string;
  phone?: string;
  room?: string;
  // Contact details are only shown in the app when this is explicitly true —
  // these pages are public, so each teacher has to opt in.
  showContact?: boolean;
}

// A class's teachers for one school year (data/<school>/<class>/<year>/teachers.ts
// and config.ts): who exists, which subjects have a dedicated (non-homeroom)
// teacher, and who the homeroom teacher is.
export interface TeacherDirectory {
  teachers: Record<string, Teacher>;
  // Subject -> teacher id, for subjects NOT taught by the homeroom teacher
  subjectTeachers: Partial<Record<SubjectId, string>>;
  homeroomTeacherId: string;
}

export const getTeacherForSubject = (
  directory: TeacherDirectory,
  subject: SubjectId,
): Teacher | null => {
  // First check for a subject-specific teacher
  const specificTeacherId = directory.subjectTeachers[subject];
  if (specificTeacherId && directory.teachers[specificTeacherId]) {
    return directory.teachers[specificTeacherId];
  }

  // Fall back to the homeroom teacher for general subjects
  return directory.teachers[directory.homeroomTeacherId] ?? null;
};
