import PageHero from "../components/PageHero";
import { themes } from "../data/content";

export default function Themes() {
  return (
    <>
      <PageHero
        eyebrow="Centre's Themes"
        title="Three instruments, one mission"
        lede="Every project the Centre runs is drawn against one of these three themes."
      />

      {themes.map((t, i) => (
        <section
          key={t.id}
          className={`section theme-detail ${i % 2 === 1 ? "theme-detail--alt" : ""}`}
        >
          <div className="container theme-detail__inner">
            <div className="theme-detail__label">
              <span className={`capability-dot capability-dot--${t.swatch}`} aria-hidden="true" />
              <span className="mono">{t.code}</span>
            </div>
            <div>
              <h2>{t.name}</h2>
              <p className="lede-text">{t.summary}</p>
              <p>{t.body}</p>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
