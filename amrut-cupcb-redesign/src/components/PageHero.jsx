// Shared interior-page banner: bold gradient field, eyebrow pill + title.
export default function PageHero({ eyebrow, title, lede }) {
  return (
    <section className="page-hero">
      <div className="page-hero__glow" aria-hidden="true" />
      <div className="container page-hero__inner">
        <div className="eyebrow eyebrow--on-dark">{eyebrow}</div>
        <h1>{title}</h1>
        {lede && <p className="page-hero__lede">{lede}</p>}
      </div>
    </section>
  );
}
