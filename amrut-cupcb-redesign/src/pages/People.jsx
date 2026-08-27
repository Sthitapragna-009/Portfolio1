import PageHero from "../components/PageHero";
import { peopleGroups } from "../data/content";

export default function People() {
  return (
    <>
      <PageHero
        eyebrow="People"
        title="The people behind CUPCB"
        lede="Guided by faculty, researchers, and staff from the Department of Architecture & Planning and allied disciplines."
      />

      <section className="section">
        <div className="container">
          <div className="people-groups">
            {peopleGroups.map((g, i) => (
              <div className="people-group" key={g.id}>
                <span className="mono people-group__code">P.{String(i + 1).padStart(2, "0")}</span>
                <h3>{g.label}</h3>
                <p>{g.note}</p>
                <p className="mono people-group__pending">— Directory being onboarded —</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
