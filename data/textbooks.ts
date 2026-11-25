import type { Textbook } from "../lib/textbookData";

// Shared textbook catalog: every book EDITION any class uses, defined once.
// A book is a published edition (publisher + title + ISBN), not something
// school-specific — so classes don't copy book data, they list the ids they
// use, per subject, in their own textbooks.ts (see ClassTextbooks in
// lib/textbookData.ts). An unknown id there is a compile error.
//
// Ids are readable slugs: <publisher>-<subject>-<grade>-<part>. To add a
// class's books, reuse existing entries where the edition matches and append
// new ones for anything else.
export const textbooks = {
  // --- BIGZ školstvo, 3. razred ---
  "bigz-srpski-3-citanka": {
    naziv: "Čitanka za treći razred",
    officialNaziv: "Srpski jezik 3, čitanka za treći razred",
    autori: ["Zorica Cvetanović", "Danica Kilibarda"],
    izdavac: "BIGZ školstvo",
    isbn: "9788660499457",
    link: "https://eknjizara.rs/izdanje/srpski-jezik-3-citanka-za-treci-razred-2/",
    imageUrl: "https://eknjizara.rs/wp-content/uploads/2021/05/3SR%C2%BC3.jpg",
  },
  "bigz-srpski-3-radna-sveska": {
    naziv: "Radna sveska za treći razred",
    officialNaziv: "Srpski jezik 3, radna sveska za treći razred",
    autori: ["Zorica Cvetanović", "Danica Kilibarda"],
    izdavac: "BIGZ školstvo",
    isbn: "9788660499464",
    link: "https://eknjizara.rs/izdanje/srpski-jezik-3-radna-sveska-za-treci-razred-3/",
    imageUrl: "https://eknjizara.rs/wp-content/uploads/2021/05/3SRS3.jpg",
  },
  "bigz-srpski-3-gramatika": {
    naziv: "Gramatika za treći razred",
    officialNaziv: "Srpski jezik 3, Gramatika za treći razred",
    autori: ["Mirjana Stakić"],
    izdavac: "BIGZ školstvo",
    isbn: "9788660496203",
    link: "https://eknjizara.rs/izdanje/srpski-jezik-3-gramatika-2/",
    imageUrl:
      "https://eknjizara.rs/wp-content/uploads/2021/05/9788660496203.jpg",
  },
  "bigz-matematika-3-udzbenik": {
    naziv: "Udžbenik za treći razred",
    officialNaziv: "Matematika 3, udžbenik za treći razred",
    autori: ["Sanja Maričić"],
    izdavac: "BIGZ školstvo",
    isbn: "9788660499488",
    link: "https://eknjizara.rs/izdanje/matematika-3-udzbenik-za-treci-razred/",
    imageUrl: "https://eknjizara.rs/wp-content/uploads/2025/08/3MA13.jpg",
  },
  "bigz-matematika-3-radna-sveska-1": {
    naziv: "Radna sveska 1. deo za treći razred",
    officialNaziv: "Matematika 3, radna sveska za treći razred 1. deo",
    autori: ["Sanja Maričić"],
    izdavac: "BIGZ školstvo",
    isbn: "9788660499495",
    link: "https://eknjizara.rs/izdanje/matematika-3-radna-sveska-za-treci-razred-1-deo/",
    imageUrl: "https://eknjizara.rs/wp-content/uploads/2025/08/3MAS3.jpg",
  },
  "bigz-matematika-3-radna-sveska-2": {
    naziv: "Radna sveska 2. deo za treći razred",
    officialNaziv: "Matematika 3, radna sveska za treći razred 2. deo",
    autori: ["Sanja Maričić"],
    izdavac: "BIGZ školstvo",
    isbn: "9788660499501",
    link: "https://eknjizara.rs/izdanje/matematika-3-radna-sveska-za-treci-razred-2-deo/",
    imageUrl: "https://eknjizara.rs/wp-content/uploads/2025/08/3MASH3.jpg",
  },
  "bigz-muzicka-3-udzbenik": {
    naziv: "Udžbenik i CD sa muzičkim primerima za treći razred",
    officialNaziv:
      "Muzička kultura 3, udžbenik i CD sa muzičkim primerima za treći razred",
    autori: ["Mila Đačić"],
    izdavac: "BIGZ školstvo",
    isbn: "9788660496272",
    link: "https://eknjizara.rs/izdanje/muzicka-kultura-3-udzbenik-i-cd-sa-muzickim-primerima/",
    imageUrl: "https://eknjizara.rs/wp-content/uploads/2021/05/3MU13.jpg",
  },
  "bigz-digitalni-svet-3": {
    naziv: "Digitalni svet 3",
    officialNaziv: "Digitalni svet 3, za treći razred osnovne škole",
    autori: ["Gorica Njegovanović"],
    izdavac: "BIGZ školstvo",
    isbn: "9788660498955",
    link: "https://eknjizara.rs/izdanje/digitalni-svet-3/",
    imageUrl:
      "https://eknjizara.rs/wp-content/uploads/2023/06/9788660498955.jpg",
  },
  "bigz-priroda-i-drustvo-3-udzbenik": {
    naziv: "Udžbenik za treći razred",
    officialNaziv: "Priroda i društvo 3, udžbenik za treći razred",
    autori: [
      "Sanja Blagdanić",
      "Zorica Kovačević",
      "Slavica Jović",
      "Aleksandar Petrović",
    ],
    izdavac: "BIGZ školstvo",
    isbn: "9788660496241",
    link: "https://eknjizara.rs/izdanje/priroda-i-drustvo-3-udzbenik-2/",
    imageUrl: "https://eknjizara.rs/wp-content/uploads/2021/05/3PD13.jpg",
  },
  // Not carried by eknjizara.rs at all (checked) — linking the publisher's
  // own store instead. No ISBN listed on either site.
  "bigz-priroda-i-drustvo-3-radna-sveska": {
    naziv: "Radna sveska za treći razred",
    officialNaziv: "Priroda i društvo 3, radna sveska za treći razred",
    autori: [
      "Sanja Blagdanić",
      "Zorica Kovačević",
      "Slavica Jović",
      "Aleksandar Petrović",
    ],
    izdavac: "BIGZ školstvo",
    link: "https://bigzskolstvo.rs/proizvod/priroda-i-drustvo-3-radna-sveska/",
    imageUrl:
      "https://www.bigzskolstvo.rs/wp-content/uploads/2020/06/PiD-3.jpg",
  },
  // Građansko vaspitanje is an elective (Obavezna: NE per the Ministry
  // decision), so it's not in the official textbook catalog — no ISBN exists
  // for it anywhere.
  "bigz-gradjansko-3": {
    naziv: "Građansko vaspitanje 3",
    officialNaziv: "Građansko vaspitanje 3, za treći razred osnovne škole",
    autori: ["Mirjana Trifunović Paul", "Gordana Gajin Cvetkoski"],
    izdavac: "BIGZ školstvo",
    obavezna: false,
    link: "https://bigzskolstvo.rs/proizvod/gradansko-vaspitanje-3/",
    imageUrl:
      "https://www.bigzskolstvo.rs/wp-content/uploads/2021/11/Gradjansko-3_korica-sajt.jpg",
  },

  // --- Vulkan izdavaštvo, 3. razred ---
  "vulkan-story-garden-3-udzbenik": {
    naziv: "Story Garden 3, udžbenik za treći razred + Lapbook",
    officialNaziv:
      "Story Garden 3, udžbenik i radna sveska za engleski jezik za treći razred osnovne škole; udžbenički komplet",
    autori: ["Mariagrazia Bertarini", "Marta Huber"],
    izdavac: "Vulkan izdavaštvo",
    isbn: "9788610050714",
    link: "https://eknjizara.rs/izdanje/engleski-jezik-za-3-the-story-garden-3-udzbenik-za-treci-razred-lapbook/",
  },
  "vulkan-story-garden-3-radna-sveska": {
    naziv: "Story Garden 3, radna sveska za treći razred",
    officialNaziv:
      "Story Garden 3, udžbenik i radna sveska za engleski jezik za treći razred osnovne škole; udžbenički komplet",
    autori: ["Mariagrazia Bertarini", "Marta Huber"],
    izdavac: "Vulkan izdavaštvo",
    isbn: "9788610050721",
    link: "https://eknjizara.rs/izdanje/engleski-jezik-3-the-story-garden-3-radna-sveska-za-treci-razred/",
  },
} satisfies Record<string, Textbook>;

// Union of every catalog id, derived so it can't drift out of sync.
export type TextbookId = keyof typeof textbooks;
