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
    </main>
  );
}
