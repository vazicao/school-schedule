import type { SubjectId } from "../../../../lib/subjects";

// School supplies ("pribor") to bring, per subject, for the 2026/27 school year.
// Shown in the "Pribor" section of a class's detail popup.
export const pribor: Partial<Record<SubjectId, string[]>> = {
  Matematika: ["Sveska A5 kvadratići", "Lenjiri", "Šestar"],
  "Srpski jezik": ["Sveska A5 linije"],
  "Likovna kultura": [
    "Blok broj 4",
    "Kolaž",
    "Voštane boje",
    "Plastelin",
    "Drvene bojice",
    "Flomasteri",
    "Vodene boje",
    "Tempere",
    "Četkice",
    "Paleta",
    "Zaštitna podloga za sto",
  ],
  "Muzička kultura": ["Sveska A5 kvadratići"],
  "Fizičko i zdravstveno vaspitanje": [
    "Bele majice",
    "Crni šorc (devojčice mogu i crne helanke)",
    "Patike",
  ],
  "Fizičko i zdravstveno vaspitanje (sala)": [
    "Bele majice",
    "Crni šorc (devojčice mogu i crne helanke)",
    "Patike",
  ],
  "Priroda i društvo": ["Sveska A5 kvadratići"],
  "Digitalni svet": ["Sveska A5 kvadratići"],
  // The schedule uses the combined "Građansko vaspitanje / Verska nastava" slot
  // (no pribor listed for it); these two apply if the slot is ever split.
  "Građansko vaspitanje": ["20 belih papira u fascikli"],
  "Verska nastava": ["Velika sveska kvadratići"],
};
