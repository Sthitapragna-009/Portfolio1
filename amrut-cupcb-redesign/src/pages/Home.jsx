import { Link } from "react-router-dom";
import HeroGraphic from "../components/HeroGraphic";
import PartnerStrip from "../components/PartnerStrip";
import StatBand from "../components/StatBand";
import CapabilityList from "../components/CapabilityList";
import PullQuote from "../components/PullQuote";
import Carousel from "../components/Carousel";
import {
  siteInfo,
  themes,
  highlights,
  specialLectures,
  capacityBuildingInteractions,
} from "../data/content";

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <div className="eyebrow eyebrow--on-dark">AMRUT 2.0 &middot; Est. {siteInfo.established}</div>
            <h1 className="hero__title">
              Shaping <em>resilient</em> cities for India.
            </h1>
            <p className="hero__lede">{siteInfo.mission}</p>
            <div className="hero__actions">
              <Link to="/themes" className="btn btn-primary">View the themes</Link>
              <Link to="/projects" className="btn btn-ghost-dark">Explore projects</Link>
            </div>
          </div>
          <HeroGraphic />
        </div>
      </section>

      <div className="container">
        <PartnerStrip />
      </div>

      {/* --------------------------------------------------------- About */}
      <section className="section">
        <div className="container about-grid">
          <div className="stat-band-wrap">
            <StatBand />
          </div>
          <div className="surface about-grid__card">
            <div className="eyebrow">About the Centre</div>
            <p className="about-grid__lede">{siteInfo.about}</p>
            <p>{siteInfo.aboutExtended}</p>
            <Link to="/about" className="btn btn-ghost-light">Read the full brief</Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Themes */}
      <section className="section section--tight">
        <div className="container capability-layout">
          <div className="capability-layout__head">
            <div className="eyebrow">Our capabilities</div>
            <h2>Three instruments, one mission</h2>
            <p>Every project the Centre runs is drawn against one of these three themes.</p>
          </div>
          <CapabilityList items={themes} linkTo="/themes" />
        </div>
      </section>

      {/* ----------------------------------------------------- Pull quote */}
      <section className="section section--dark">
        <div className="container">
          <PullQuote text={siteInfo.mission} attribution="CUPCB Mission" />
        </div>
      </section>

      {/* ---------------------------------------------------- Highlights */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Recent activity</div>
            <h2>Highlights from the Centre</h2>
          </div>
          <Carousel>
            {highlights.map((h) => (
              <article className="highlight-card" key={h.title}>
                <span className="highlight-card__tag">{h.tag}</span>
                <h3>{h.title}</h3>
                <p>{h.detail}</p>
              </article>
            ))}
          </Carousel>
          <div className="section-cta">
            <Link to="/events" className="btn btn-ghost-light">View all events &amp; capacity building</Link>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Lectures */}
      <section className="section section--tight" style={{ background: "var(--cream-deep)" }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Special lectures</div>
            <h2>From the lecture roll</h2>
          </div>
          <ol className="lecture-list">
            {specialLectures.slice(0, 4).map((lec, i) => (
              <li key={lec.title} className="lecture-row">
                <span className="mono lecture-row__index">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h4>{lec.title}</h4>
                  {lec.speaker && <span className="mono lecture-row__speaker">{lec.speaker}</span>}
                </div>
              </li>
            ))}
          </ol>
          <div className="section-cta">
            <Link to="/events" className="btn btn-ghost-light">All special lectures</Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- Capacity Building */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Capacity building interactions</div>
            <h2>Where research meets the field</h2>
          </div>
          <div className="cbi-grid">
            {capacityBuildingInteractions.map((c) => (
              <article className="cbi-card" key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- CTA */}
      <section className="section section--tight">
        <div className="container">
          <div className="cta-band">
            <div>
              <div className="eyebrow eyebrow--on-dark">Get in touch</div>
              <h2>Working on urban policy for an Indian city?</h2>
              <p>Reach the Centre for research collaboration, training programs, or consultancy.</p>
            </div>
            <Link to="/contact" className="btn btn-primary">Contact the Centre</Link>
          </div>
        </div>
      </section>
    </>
  );
}
