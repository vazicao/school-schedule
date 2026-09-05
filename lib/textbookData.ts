import type { SubjectId } from "./scheduleData";

export interface Textbook {
  naziv: string;
  officialNaziv: string;
  autori: string[];
  isbn: string;
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
        naziv: "Čitanka sa početnicom za domaću lektiru za drugi razred",
        officialNaziv:
          "Srpski jezik 2, Čitanka sa početnicom za domaću lektiru za drugi razred",
        autori: [
          "Aleksandra Stanišić",
          "Danica Kilibarda",
          "Zorica Cvetanović",
        ],
        isbn: "9788660499310",
        link: "https://eknjizara.rs/izdanje/citanka-2-sa-pocetnicom-za-domacu-lektiru-za-drugi-razred",
        imageUrl: "https://eknjizara.rs/wp-content/uploads/2024/06/2SRC4.jpg",
      },
      {
        naziv: "Gramatika za drugi razred",
        officialNaziv: "Srpski jezik 2, Gramatika za drugi razred",
        autori: ["Mirjana Stakić"],
        isbn: "9788660499341",
        link: "https://eknjizara.rs/izdanje/gramatika-udzbenik-za-drugi-razred",
        imageUrl:
          "https://eknjizara.rs/wp-content/uploads/2024/05/9788660499341.jpg",
      },
      {
        naziv: "Latinica, udžbenik za drugi razred",
        officialNaziv: "Srpski jezik 2, Latinica, udžbenik za drugi razred",
        autori: [
          "Aleksandra Stanišić",
          "Danica Kilibarda",
          "Zorica Cvetanović",
        ],
        isbn: "9788660499327",
        link: "https://eknjizara.rs/izdanje/srpski-jezik-2-latinica-udzbenik-za-drugi-razred-2",
        imageUrl: "https://eknjizara.rs/wp-content/uploads/2024/06/2SRL4.jpg",
      },
      {
        naziv: "Radna sveska za drugi razred",
        officialNaziv: "Srpski jezik 2, Radna sveska za drugi razred",
        autori: ["Danica Kilibarda", "Zorica Cvetanović"],
        isbn: "9788660499334",
        link: "https://eknjizara.rs/izdanje/srpski-jezik-2-radna-sveska-za-drugi-razred-2",
        imageUrl:
          "https://eknjizara.rs/wp-content/uploads/2024/05/9788660499334.jpg",
      },
    ],
  },
  Matematika: {
    naziv: "Matematika",
    izdavac: "BIGZ školstvo",
    obavezna: true,
    knjige: [
      {
        naziv: "Udžbenik za drugi razred",
        officialNaziv: "Matematika 2, udžbenik za drugi razred",
        autori: ["Sanja Maričić", "Dragica Đurović"],
        isbn: "9788660499273",
        link: "https://eknjizara.rs/izdanje/matematika-2-udzbenik-za-drugi-razred-2/",
        imageUrl: "https://eknjizara.rs/wp-content/uploads/2024/08/2MA13.jpg",
      },
      {
        naziv: "Radna sveska 1. deo za drugi razred",
        officialNaziv: "Matematika 2, radna sveska 1. deo za drugi razred",
        autori: ["Sanja Maričić", "Dragica Đurović"],
        isbn: "9788660499280",
        link: "https://eknjizara.rs/izdanje/matematika-2-radna-sveska-1-deo-za-drugi-razred-2/",
        imageUrl: "https://eknjizara.rs/wp-content/uploads/2024/08/2MAS3.jpg",
      },
      {
        naziv: "Radna sveska 2. deo za drugi razred",
        officialNaziv: "Matematika 2, radna sveska 2. deo za drugi razred",
        autori: ["Sanja Maričić", "Dragica Đurović"],
        isbn: "9788660499303",
        link: "https://eknjizara.rs/izdanje/matematika-2-radna-sveska-2-deo-za-drugi-razred/",
        imageUrl: "https://eknjizara.rs/wp-content/uploads/2024/08/2MASH3.jpg",
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
        naziv: "Udžbenik i CD za drugi razred",
        officialNaziv: "Muzička kultura 2, udžbenik i CD za drugi razred",
        autori: ["Vesna Marković", "Vanja Hršak"],
        isbn: "9788660495312",
        link: "https://eknjizara.rs/izdanje/muzicka-kultura-2-udzbenik-i-cd/",
        imageUrl: "https://eknjizara.rs/wp-content/uploads/2021/05/2MU12.jpg",
      },
    ],
  },
  "Digitalni svet": {
    naziv: "Digitalni svet",
    izdavac: "BIGZ školstvo",
    obavezna: true,
    knjige: [
      {
        naziv: "Udžbenik za drugi razred",
        officialNaziv: "Digitalni svet 2, udžbenik za drugi razred",
        autori: ["Gorica Negovanović"],
        isbn: "9788660498320",
        link: "https://eknjizara.rs/izdanje/digitalni-svet-2/",
        imageUrl:
          "https://eknjizara.rs/wp-content/uploads/2023/06/9788660498320.jpg",
      },
    ],
  },
  "Engleski jezik": {
    naziv: "Engleski jezik",
    izdavac: "The English Book",
    obavezna: true,
    knjige: [
      {
        naziv: "Happy House 2, udžbenik i radna sveska",
        officialNaziv:
          "Happy House 2, engleski jezik za drugi razred osnovne škole; udžbenik sa elektronskim dodatkom",
        autori: ["Stella Maidment", "Lorena Roberts"],
        isbn: "9780194750141",
        link: "https://eknjizara.rs/izdanje/happy-house-2-3rd-edition-udzbenik-i-radna-sveska-sa-cd-om/",
        imageUrl:
          "https://eknjizara.rs/wp-content/uploads/2021/05/9780194750141.jpg",
      },
    ],
  },
};

export const getTextbooksForSubject = (subjectName: SubjectId): Textbook[] => {
  const subjectTextbooks = textbooks[subjectName];
  return subjectTextbooks?.knjige || [];
};
