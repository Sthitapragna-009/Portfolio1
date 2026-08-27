import PageHero from "../components/PageHero";
import { repositoryResources } from "../data/content";

export default function Repository() {
  return (
    <>
      <PageHero
        eyebrow="Repository & Infrastructure"
        title="Repository & Infrastructure"
        lede="The tools, data, and facilities that back the Centre's research and training."
      />

      <section className="section">
        <div className="container">
          <div className="repo-list">
            {repositoryResources.map((r) => (
              <div className="repo-row" key={r.code}>
                <span className="mono repo-row__code">{r.code}</span>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
