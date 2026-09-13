import type { SubjectId } from "./scheduleData";

export interface Textbook {
  naziv: string;
  officialNaziv: string;
  autori: string[];
  // Optional: a few non-catalog items (electives like Građansko vaspitanje,
  // or supplementary workbooks) genuinely have no registered ISBN anywhere —
  // neither the retailer nor the publisher's own site lists one.
  isbn?: string;
  link: string;
  imageUrl?: string;
}

export interface SubjectTextbooks {
  naziv: string;
  izdavac: string;
  obavezna: boolean;
  knjige: Textbook[];
}

export const textbooks: Partial<Record<SubjectId, SubjectTextbooks>> = {
  "Srpski jezik": {
    naziv: "Srpski jezik",
    izdavac: "BIGZ školstvo",
    obavezna: true,
    knjige: [
      {
        naziv: "Čitanka za treći razred",
        officialNaziv: "Srpski jezik 3, čitanka za treći razred",
        autori: ["Zorica Cvetanović", "Danica Kilibarda"],
        isbn: "9788660499457",
        link: "https://eknjizara.rs/izdanje/srpski-jezik-3-citanka-za-treci-razred-2/",
        imageUrl:
          "https://eknjizara.rs/wp-content/uploads/2021/05/3SR%C2%BC3.jpg",
      },
      {
        naziv: "Radna sveska za treći razred",
        officialNaziv: "Srpski jezik 3, radna sveska za treći razred",
        autori: ["Zorica Cvetanović", "Danica Kilibarda"],
        isbn: "9788660499464",
        link: "https://eknjizara.rs/izdanje/srpski-jezik-3-radna-sveska-za-treci-razred-3/",
        imageUrl: "https://eknjizara.rs/wp-content/uploads/2021/05/3SRS3.jpg",
      },
      {
        naziv: "Gramatika za treći razred",
        officialNaziv: "Srpski jezik 3, Gramatika za treći razred",
        autori: ["Mirjana Stakić"],
        isbn: "9788660496203",
        link: "https://eknjizara.rs/izdanje/srpski-jezik-3-gramatika-2/",
        imageUrl:
          "https://eknjizara.rs/wp-content/uploads/2021/05/9788660496203.jpg",
      },
    ],
  },
  Matematika: {
    naziv: "Matematika",
    izdavac: "BIGZ školstvo",
    obavezna: true,
    knjige: [
      {
        naziv: "Udžbenik za treći razred",
        officialNaziv: "Matematika 3, udžbenik za treći razred",
        autori: ["Sanja Maričić"],
        isbn: "9788660499488",
        link: "https://eknjizara.rs/izdanje/matematika-3-udzbenik-za-treci-razred/",
        imageUrl: "https://eknjizara.rs/wp-content/uploads/2025/08/3MA13.jpg",
      },
      {
        naziv: "Radna sveska 1. deo za treći razred",
        officialNaziv: "Matematika 3, radna sveska za treći razred 1. deo",
        autori: ["Sanja Maričić"],
        isbn: "9788660499495",
        link: "https://eknjizara.rs/izdanje/matematika-3-radna-sveska-za-treci-razred-1-deo/",
        imageUrl: "https://eknjizara.rs/wp-content/uploads/2025/08/3MAS3.jpg",
      },
      {
        naziv: "Radna sveska 2. deo za treći razred",
        officialNaziv: "Matematika 3, radna sveska za treći razred 2. deo",
        autori: ["Sanja Maričić"],
        isbn: "9788660499501",
        link: "https://eknjizara.rs/izdanje/matematika-3-radna-sveska-za-treci-razred-2-deo/",
        imageUrl: "https://eknjizara.rs/wp-content/uploads/2025/08/3MASH3.jpg",
      },
    ],
  },
  "Svet oko nas": {
    naziv: "Svet oko nas",
    izdavac: "BIGZ školstvo",
    obavezna: true,
    knjige: [
      {
        naziv: "Udžbenik za drugi razred",
        officialNaziv: "Svet oko nas 2, udžbenik za drugi razred",
        autori: ["dr Sanja Blagdanić", "dr Zorica Kovačević", "Slavica Jović"],
        isbn: "9788660499259",
        link: "https://eknjizara.rs/izdanje/svet-oko-nas-2-udzbenik-za-drugi-razred-novo-3/",
        imageUrl:
          "https://eknjizara.rs/wp-content/uploads/2024/08/9788660499259.jpg",
      },
      {
        naziv: "Radna sveska za drugi razred",
        officialNaziv: "Svet oko nas 2, radna sveska za drugi razred",
        autori: ["dr Sanja Blagdanić", "dr Zorica Kovačević", "Slavica Jović"],
        isbn: "9788660499266",
        link: "https://eknjizara.rs/izdanje/svet-oko-nas-2-radna-sveska-za-drugi-razred-novo-2/",
        imageUrl:
          "https://eknjizara.rs/wp-content/uploads/2024/08/9788660499266.webp",
      },
    ],
  },
  "Muzička kultura": {
    naziv: "Muzička kultura",
    izdavac: "BIGZ školstvo",
    obavezna: true,
    knjige: [
      {
        naziv: "Udžbenik i CD sa muzičkim primerima za treći razred",
        officialNaziv:
          "Muzička kultura 3, udžbenik i CD sa muzičkim primerima za treći razred",
        autori: ["Mila Đačić"],
        isbn: "9788660496272",
        link: "https://eknjizara.rs/izdanje/muzicka-kultura-3-udzbenik-i-cd-sa-muzickim-primerima/",
        imageUrl: "https://eknjizara.rs/wp-content/uploads/2021/05/3MU13.jpg",
      },
    ],
  },
  "Digitalni svet": {
    naziv: "Digitalni svet",
    izdavac: "BIGZ školstvo",
    obavezna: true,
    knjige: [
      {
        naziv: "Digitalni svet 3",
        officialNaziv: "Digitalni svet 3, za treći razred osnovne škole",
        autori: ["Gorica Njegovanović"],
        isbn: "9788660498955",
        link: "https://eknjizara.rs/izdanje/digitalni-svet-3/",
        imageUrl:
          "https://eknjizara.rs/wp-content/uploads/2023/06/9788660498955.jpg",
      },
    ],
  },
  "Priroda i društvo": {
    naziv: "Priroda i društvo",
    izdavac: "BIGZ školstvo",
    obavezna: true,
    knjige: [
      {
        naziv: "Udžbenik za treći razred",
        officialNaziv: "Priroda i društvo 3, udžbenik za treći razred",
        autori: [
          "Sanja Blagdanić",
          "Zorica Kovačević",
          "Slavica Jović",
          "Aleksandar Petrović",
        ],
        isbn: "9788660496241",
        link: "https://eknjizara.rs/izdanje/priroda-i-drustvo-3-udzbenik-2/",
        imageUrl: "https://eknjizara.rs/wp-content/uploads/2021/05/3PD13.jpg",
      },
      {
        // Not carried by eknjizara.rs at all (checked) — linking the
        // publisher's own store instead. No ISBN listed on either site.
        naziv: "Radna sveska za treći razred",
        officialNaziv: "Priroda i društvo 3, radna sveska za treći razred",
        autori: [
          "Sanja Blagdanić",
          "Zorica Kovačević",
          "Slavica Jović",
          "Aleksandar Petrović",
        ],
        link: "https://bigzskolstvo.rs/proizvod/priroda-i-drustvo-3-radna-sveska/",
        imageUrl:
          "https://www.bigzskolstvo.rs/wp-content/uploads/2020/06/PiD-3.jpg",
      },
    ],
  },
  // Građansko vaspitanje / Verska nastava is an elective (Obavezna: NE per the
  // Ministry decision), so it's not part of the official textbook catalog —
  // no ISBN exists for it anywhere. Keyed by the combined slot name since
  // that's the actual subject string used in the schedule.
  "Građansko vaspitanje / Verska nastava": {
    naziv: "Građansko vaspitanje",
    izdavac: "BIGZ školstvo",
    obavezna: false,
    knjige: [
      {
        naziv: "Građansko vaspitanje 3",
        officialNaziv: "Građansko vaspitanje 3, za treći razred osnovne škole",
        autori: ["Mirjana Trifunović Paul", "Gordana Gajin Cvetkoski"],
        link: "https://bigzskolstvo.rs/proizvod/gradansko-vaspitanje-3/",
        imageUrl:
          "https://www.bigzskolstvo.rs/wp-content/uploads/2021/11/Gradjansko-3_korica-sajt.jpg",
      },
    ],
  },
  "Engleski jezik": {
    naziv: "Engleski jezik",
    izdavac: "Vulkan izdavaštvo",
    obavezna: true,
    knjige: [
      {
        naziv: "Story Garden 3, udžbenik za treći razred + Lapbook",
        officialNaziv:
          "Story Garden 3, udžbenik i radna sveska za engleski jezik za treći razred osnovne škole; udžbenički komplet",
        autori: ["Mariagrazia Bertarini", "Marta Huber"],
        isbn: "9788610050714",
        link: "https://eknjizara.rs/izdanje/engleski-jezik-za-3-the-story-garden-3-udzbenik-za-treci-razred-lapbook/",
      },
      {
        naziv: "Story Garden 3, radna sveska za treći razred",
        officialNaziv:
          "Story Garden 3, udžbenik i radna sveska za engleski jezik za treći razred osnovne škole; udžbenički komplet",
        autori: ["Mariagrazia Bertarini", "Marta Huber"],
        isbn: "9788610050721",
        link: "https://eknjizara.rs/izdanje/engleski-jezik-3-the-story-garden-3-radna-sveska-za-treci-razred/",
      },
    ],
  },
};

export const getTextbooksForSubject = (subjectName: SubjectId): Textbook[] => {
  const subjectTextbooks = textbooks[subjectName];
  return subjectTextbooks?.knjige || [];
};
