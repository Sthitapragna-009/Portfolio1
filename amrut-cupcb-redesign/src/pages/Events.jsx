import PageHero from "../components/PageHero";
import {
  workshops,
  conferences,
  specialLectures,
  capacityBuildingInteractions,
} from "../data/content";

function EventList({ items }) {
  return (
    <div className="event-list">
      {items.map((e) => (
        <div className="event-row" key={e.title}>
          <span className="mono event-row__date">{e.date}</span>
          <div>
            <h4>{e.title}</h4>
            <p>{e.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Events() {
  return (
    <>
      <PageHero
        eyebrow="Events & Capacity Building"
        title="Workshops, symposiums & lectures"
        lede="Training, dissemination, and dialogue — the Centre's capacity-building record."
      />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Workshops & training</div>
            <h2>Workshops &amp; Training</h2>
          </div>
          <EventList items={workshops} />
        </div>
      </section>

      <section className="section section--tight" style={{ background: "var(--cream-deep)" }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Symposiums & conferences</div>
            <h2>Symposiums &amp; Conferences</h2>
          </div>
          <EventList items={conferences} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Special lectures</div>
            <h2>Special Lectures</h2>
          </div>
          <ol className="lecture-list">
            {specialLectures.map((lec, i) => (
              <li key={lec.title} className="lecture-row">
                <span className="mono lecture-row__index">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h4>{lec.title}</h4>
                  {lec.speaker && <span className="mono lecture-row__speaker">{lec.speaker}</span>}
                  <p>{lec.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow eyebrow--on-dark">Capacity building interactions</div>
            <h2>Capacity Building Interactions</h2>
          </div>
          <div className="cbi-grid cbi-grid--dark">
            {capacityBuildingInteractions.map((c) => (
              <article className="cbi-card cbi-card--dark" key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
