import type { ClassYearData } from "../../../../lib/classData";
import { config } from "./config";
import { schedule } from "./schedule";
import { exams } from "./exams";
import { teachers, subjectTeachers } from "./teachers";
import { textbooks } from "./textbooks";
import { pribor } from "./pribor";

// Everything for this class in the 2026/27 school year. `satisfies` type-checks
// the whole thing (every subject reference, every period label) at build time.
const data = {
  config,
  schedule,
  exams,
  teachers,
  subjectTeachers,
  textbooks,
  pribor,
} satisfies ClassYearData;

export default data;
