import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SvgIcon from "@/components/SvgIcon";
import { listClasses } from "@/lib/classLoader";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "Moj Raspored — raspored časova, kontrolni zadaci i udžbenici",
  description:
    "Raspored časova, kontrolni zadaci i udžbenici za vaš razred, na jednom mestu. Besplatno, bez prijave, može na početni ekran telefona.",
};

const features = [
  {
    icon: "sun-horizon",
    title: "Prava smena, automatski",
    text: "Aplikacija zna koje su nedelje jutarnja, a koje popodnevna smena, pa uvek vidite tačan raspored.",
  },
  {
    icon: "brain",
    title: "Kontrolni i pismeni zadaci",
    text: "Prikazani na tačnom datumu, sa temom i vrstom zadatka.",
  },
  {
    icon: "notebook",
    title: "Udžbenici",
    text: "Naslovi, autori, ISBN i korice, sa vezom do prodavnice.",
  },
  {
    icon: "briefcase",
    title: "Pribor i nastavnik",
    text: "Šta poneti na koji čas i ko ga drži.",
  },
  {
    icon: "check",
    title: "Bez prijave, besplatno",
    text: "Nema naloga ni lozinki. Poslednji viđeni raspored otvara se i kada nema interneta.",
  },
];

export default async function Home() {
  const classes = await listClasses();

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <Image
          src="/icons/icon-192.png"
          alt=""
          width={88}
          height={88}
          priority
          className={styles.heroIcon}
        />
        <h1 className="display1">Moj Raspored</h1>
        <p className={styles.tagline}>
          Raspored časova, kontrolni zadaci i udžbenici za vaš razred — na
          jednom mestu.
        </p>
      </header>

      <section className={styles.section} aria-labelledby="classes-title">
        <h2 id="classes-title">Otvorite raspored</h2>
        <ul className={styles.list}>
          {classes.map((c) => (
            <li key={`${c.school}/${c.classSlug}`}>
              <Link
                href={`/${c.school}/${c.classSlug}`}
                className={styles.classCard}
              >
                <span className={styles.classBadge} aria-hidden="true">
                  {c.displayName}
                </span>
                <span className={styles.classInfo}>
                  <h3>{c.schoolName}</h3>
                  <p>Školska godina {c.schoolYear}</p>
                </span>
                <SvgIcon iconId="caret-right" size={20} />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="features-title">
        <h2 id="features-title">Šta dobijate</h2>
        <ul className={styles.list}>
          {features.map((f) => (
            <li key={f.title} className={styles.feature}>
              <span className={styles.featureIcon}>
                <SvgIcon iconId={f.icon} size={22} />
              </span>
              <span className={styles.featureText}>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="install-title">
        <h2 id="install-title">Dodajte na početni ekran</h2>
        <p className={styles.intro}>
          Tako se raspored otvara jednim dodirom, kao prava aplikacija — bez
          prodavnice aplikacija.
        </p>
        <p className={styles.note}>
          <strong>Prvo otvorite raspored svog razreda</strong> (gore), pa tek
          onda sledite korake. Tako se na početni ekran dodaje baš taj razred.
        </p>

        <div className={styles.platform}>
          <h3>iPhone (Safari)</h3>
          <ol className={styles.steps}>
            <li>
              Otvorite raspored u <strong>Safariju</strong>.
            </li>
            <li>
              Dodirnite dugme <strong>Podeli</strong> (kvadrat sa strelicom
              nagore) — nalazi se na dnu ekrana, a ako ga ne vidite, dodirnite{" "}
              <strong>•••</strong>.
            </li>
            <li>
              Izaberite <strong>Dodaj na početni ekran</strong> (Add to Home
              Screen).
            </li>
            <li>
              Dodirnite <strong>Dodaj</strong>.
            </li>
          </ol>
        </div>

        <div className={styles.platform}>
          <h3>Android (Chrome)</h3>
          <ol className={styles.steps}>
            <li>
              Otvorite raspored u <strong>Chrome-u</strong>.
            </li>
            <li>
              Dodirnite meni <strong>⋮</strong> (tri tačke) gore desno.
            </li>
            <li>
              Izaberite <strong>Instaliraj aplikaciju</strong> (ili{" "}
              <strong>Dodaj na početni ekran</strong>).
            </li>
            <li>
              Potvrdite sa <strong>Instaliraj</strong>.
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
}
