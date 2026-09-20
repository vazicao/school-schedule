import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        maxWidth: 480,
        margin: "0 auto",
        padding: "96px 24px",
        textAlign: "center",
      }}
    >
      <h1 className="display1">Stranica nije pronađena</h1>
      <p className="paragraph-small text-secondary">
        Ovaj raspored ne postoji. Proverite link koji ste dobili od razredne
        starešine.
      </p>
      <p style={{ marginTop: 24, fontSize: 14, lineHeight: "20px" }}>
        <Link href="/" style={{ color: "#d17f00", fontWeight: 600 }}>
          Na početnu stranu
        </Link>
      </p>
    </main>
  );
}
