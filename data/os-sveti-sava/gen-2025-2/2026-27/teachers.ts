import type { Teacher } from "../../../../lib/teacherData";
import type { SubjectId } from "../../../../lib/subjects";

export const teachers: Record<string, Teacher> = {
  "tomanic-dragana": {
    id: "tomanic-dragana",
    name: "Tomanić Dragana",
    subjects: ["Razredna nastava"], // Default for all subjects except overrides
  },
  "zaric-tijana": {
    id: "zaric-tijana",
    name: "Zarić Tijana",
    subjects: ["Engleski jezik"],
  },
};

// Subjects NOT taught by the homeroom teacher (see homeroomTeacherId in config.ts)
export const subjectTeachers: Partial<Record<SubjectId, string>> = {
  "Engleski jezik": "zaric-tijana",
};
