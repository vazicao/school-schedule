import type { Teacher } from "../../../../lib/teacherData";
import type { SubjectId } from "../../../../lib/subjects";

// Homeroom teacher not known yet — see config.ts's homeroomTeacherId.
export const teachers: Record<string, Teacher> = {};

// Subjects NOT taught by the homeroom teacher.
export const subjectTeachers: Partial<Record<SubjectId, string>> = {};
