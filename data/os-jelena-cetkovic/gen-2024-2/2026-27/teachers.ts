import type { Teacher } from "../../../../lib/teacherData";
import type { SubjectId } from "../../../../lib/subjects";

export const teachers: Record<string, Teacher> = {
  "maksimovic-bojana": {
    id: "maksimovic-bojana",
    name: "Maksimović Bojana",
    subjects: ["Razredna nastava"], // Default for all subjects except overrides
    email: "bojanaucha@gmail.com",
    showContact: true,
    phone: "+381 11 123 4567",
    room: "101",
  },
  "domnic-popovic-natasa": {
    id: "domnic-popovic-natasa",
    name: "Domnić Popović Nataša",
    subjects: ["Engleski jezik"],
    phone: "+381 11 234 5678",
    room: "205",
  },
};

// Subjects NOT taught by the homeroom teacher (see homeroomTeacherId in config.ts)
export const subjectTeachers: Partial<Record<SubjectId, string>> = {
  "Engleski jezik": "domnic-popovic-natasa",
};
