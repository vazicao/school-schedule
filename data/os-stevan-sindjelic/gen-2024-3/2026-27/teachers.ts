import type { Teacher } from "../../../../lib/teacherData";
import type { SubjectId } from "../../../../lib/subjects";

// Not known yet — add the homeroom teacher (and set homeroomTeacherId in
// config.ts) plus any subject teachers (e.g. Engleski jezik) once known.
export const teachers: Record<string, Teacher> = {};

// Subjects NOT taught by the homeroom teacher (see homeroomTeacherId in config.ts)
export const subjectTeachers: Partial<Record<SubjectId, string>> = {};
