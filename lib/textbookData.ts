export interface Textbook {
  naziv: string;
  officialNaziv: string;
  autori: string[];
  isbn: string;
  link: string;
}

export interface SubjectTextbooks {
  naziv: string;
  izdavac: string;
  obavezna: boolean;
  knjige: Textbook[];
}

export const textbooks: Record<string, SubjectTextbooks> = {
  "Српски језик": {
    naziv: "Српски језик",
    izdavac: "БИГЗ школство",
    obavezna: true,
    knjige: [
      {
        naziv: "Читанка са почетницом за домаћу лектиру за други разред",
        officialNaziv:
          "Српски језик 2, Читанка са почетницом за домаћу лектиру за други разред",
        autori: [
          "Александра Станишић",
          "Даница Килибарда",
          "Зорица Цветановић",
        ],
        isbn: "9788660499310",
        link: "https://eknjizara.rs/izdanje/citanka-2-sa-pocetnicom-za-domacu-lektiru-za-drugi-razred",
      },
      {
        naziv: "Граматика за други разред",
        officialNaziv: "Српски језик 2, Граматика за други разред",
        autori: ["Мирјана Стакић"],
        isbn: "9788660499341",
        link: "https://eknjizara.rs/izdanje/gramatika-udzbenik-za-drugi-razred",
      },
      {
        naziv: "Латиница, уџбеник за други разред",
        officialNaziv: "Српски језик 2, Латиница, уџбеник за други разред",
        autori: [
          "Александра Станишић",
          "Даница Килибарда",
          "Зорица Цветановић",
        ],
        isbn: "9788660499327",
        link: "https://eknjizara.rs/izdanje/srpski-jezik-2-latinica-udzbenik-za-drugi-razred-2",
      },
      {
        naziv: "Радна свеска за други разред",
        officialNaziv: "Српски језик 2, Радна свеска за други разред",
        autori: ["Даница Килибарда", "Зорица Цветановић"],
        isbn: "9788660499334",
        link: "https://eknjizara.rs/izdanje/srpski-jezik-2-radna-sveska-za-drugi-razred-2",
      },
    ],
  },
  Математика: {
    naziv: "Математика",
    izdavac: "БИГЗ школство",
    obavezna: true,
    knjige: [
      {
        naziv: "Уџбеник за други разред",
        officialNaziv: "Математика 2, уџбеник за други разред",
        autori: ["Сања Маричић", "Драгица Ђуровић"],
        isbn: "9788660499273",
        link: "https://eknjizara.rs/izdanje/matematika-2-udzbenik-za-drugi-razred-2/",
      },
      {
        naziv: "Радна свеска 1. део за други разред",
        officialNaziv: "Математика 2, радна свеска 1. део за други разред",
        autori: ["Сања Маричић", "Драгица Ђуровић"],
        isbn: "9788660499280",
        link: "https://eknjizara.rs/izdanje/matematika-2-radna-sveska-1-deo-za-drugi-razred-2/",
      },
      {
        naziv: "Радна свеска 2. део за други разред",
        officialNaziv: "Математика 2, радна свеска 2. део за други разред",
        autori: ["Сања Маричић", "Драгица Ђуровић"],
        isbn: "9788660499303",
        link: "https://eknjizara.rs/izdanje/matematika-2-radna-sveska-2-deo-za-drugi-razred/",
      },
    ],
  },
  "Свет око нас": {
    naziv: "Свет око нас",
    izdavac: "БИГЗ школство",
    obavezna: true,
    knjige: [
      {
        naziv: "Уџбеник за други разред",
        officialNaziv: "Свет око нас 2, уџбеник за други разред",
        autori: ["др Сања Благданић", "др Зорица Ковачевић", "Славица Јовић"],
        isbn: "9788660499259",
        link: "https://eknjizara.rs/izdanje/svet-oko-nas-2-udzbenik-za-drugi-razred-novo-3/",
      },
      {
        naziv: "Радна свеска за други разред",
        officialNaziv: "Свет око нас 2, радна свеска за други разред",
        autori: ["др Сања Благданић", "др Зорица Ковачевић", "Славица Јовић"],
        isbn: "9788660499266",
        link: "https://eknjizara.rs/izdanje/svet-oko-nas-2-radna-sveska-za-drugi-razred-novo-2/",
      },
    ],
  },
  "Музичка култура": {
    naziv: "Музичка култура",
    izdavac: "БИГЗ школство",
    obavezna: true,
    knjige: [
      {
        naziv: "Уџбеник и ЦД за други разред",
        officialNaziv: "Музичка култура 2, уџбеник и ЦД за други разред",
        autori: ["Весна Марковић", "Вања Хршак"],
        isbn: "9788660495312",
        link: "https://eknjizara.rs/izdanje/muzicka-kultura-2-udzbenik-i-cd/",
      },
    ],
  },
  "Дигитални свет": {
    naziv: "Дигитални свет",
    izdavac: "БИГЗ школство",
    obavezna: true,
    knjige: [
      {
        naziv: "Уџбеник за други разред",
        officialNaziv: "Дигитални свет 2, уџбеник за други разред",
        autori: ["Горица Неговановић"],
        isbn: "9788660498320",
        link: "https://eknjizara.rs/izdanje/digitalni-svet-2/",
      },
    ],
  },
  "Енглески језик": {
    naziv: "Енглески језик",
    izdavac: "The English Book",
    obavezna: true,
    knjige: [
      {
        naziv: "Happy House 2, уџбеник и радна свеска",
        officialNaziv:
          "Happy House 2, енглески језик за други разред основне школе; уџбеник са електронским додатком",
        autori: ["Stella Maidment", "Lorena Roberts"],
        isbn: "9780194750141",
        link: "https://eknjizara.rs/izdanje/happy-house-2-3rd-edition-udzbenik-i-radna-sveska-sa-cd-om/",
      },
    ],
  },
};

export const getTextbooksForSubject = (subjectName: string): Textbook[] => {
  const subjectTextbooks = textbooks[subjectName];
  return subjectTextbooks?.knjige || [];
};
