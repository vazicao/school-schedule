import type { Teacher } from "../../../../lib/teacherData";
import type { SubjectId } from "../../../../lib/subjects";

export const teachers: Record<string, Teacher> = {
  "miljkovic-jovana": {
    id: "miljkovic-jovana",
    name: "Miljković Jovana",
    subjects: ["Razredna nastava"], // Default for all subjects except overrides
  },
  // The English teacher's full name isn't known yet (first name Maja). A
  // generic label for now, so the Engleski jezik popup doesn't fall back to
  // the homeroom teacher. Replace `name` once the surname is known.
  engleski: {
    id: "engleski",
    name: "Nastavnica engleskog jezika",
    subjects: ["Engleski jezik"],
  },
};

// Subjects NOT taught by the homeroom teacher (see homeroomTeacherId in config.ts)
export const subjectTeachers: Partial<Record<SubjectId, string>> = {
  "Engleski jezik": "engleski",
};
