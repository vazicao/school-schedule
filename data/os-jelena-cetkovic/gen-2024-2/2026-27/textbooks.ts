import type { ClassTextbooks } from "../../../../lib/textbookData";

// Textbooks for the 2026/27 school year: per subject, which books from the
// shared catalog (data/textbooks.ts) this class uses.
export const textbooks: ClassTextbooks = {
  "Srpski jezik": [
    "bigz-srpski-3-citanka",
    "bigz-srpski-3-radna-sveska",
    "bigz-srpski-3-gramatika",
  ],
  Matematika: [
    "bigz-matematika-3-udzbenik",
    "bigz-matematika-3-radna-sveska-1",
    "bigz-matematika-3-radna-sveska-2",
  ],
  "Muzička kultura": ["bigz-muzicka-3-udzbenik"],
  "Digitalni svet": ["bigz-digitalni-svet-3"],
  "Priroda i društvo": [
    "bigz-priroda-i-drustvo-3-udzbenik",
    "bigz-priroda-i-drustvo-3-radna-sveska",
  ],
  // Keyed by the combined slot name since that's the actual subject string
  // used in the schedule.
  "Građansko vaspitanje / Verska nastava": ["bigz-gradjansko-3"],
  "Engleski jezik": [
    "vulkan-story-garden-3-udzbenik",
    "vulkan-story-garden-3-radna-sveska",
  ],
};
