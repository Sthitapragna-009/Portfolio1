import PageHero from "../components/PageHero";
import PullQuote from "../components/PullQuote";
import { siteInfo, hierarchy } from "../data/content";

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="About the Centre"
        lede="IITR &middot; DAP &middot; MoHUA &middot; CUPCB — how the Centre sits within India's urban mission."
      />

      <section className="section">
        <div className="container">
          <div className="surface">
            <p className="lede-text">{siteInfo.about}</p>
            <p>{siteInfo.aboutExtended}</p>
          </div>
        </div>
      </section>

      <section className="section section--tight" style={{ background: "var(--cream-deep)" }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Institutional hierarchy</div>
            <h2>Where CUPCB sits</h2>
          </div>
          <div className="hierarchy-row">
            {hierarchy.map((h, i) => (
              <div className="hierarchy-block" key={h.code}>
                <span className="mono hierarchy-block__code">{h.code}</span>
                <h4>{h.name}</h4>
                <p>{h.role}</p>
                {i < hierarchy.length - 1 && <span className="hierarchy-arrow" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <PullQuote text={siteInfo.mission} attribution="CUPCB Mission" />
        </div>
      </section>
    </>
  );
}
