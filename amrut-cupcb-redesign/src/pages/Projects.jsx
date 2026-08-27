import PageHero from "../components/PageHero";
import StatusGroup from "../components/StatusGroup";
import { projects } from "../data/content";

export default function Projects() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Ongoing, upcoming & completed"
        lede="Action-research and consultancy work carried out by the Centre, tracked by status."
      />

      <section className="section">
        <div className="container">
          <div className="legend-strip">
            <span><span className="capability-dot capability-dot--brick" /> Ongoing</span>
            <span><span className="capability-dot capability-dot--mustard" /> Upcoming</span>
            <span><span className="capability-dot capability-dot--moss" /> Completed</span>
          </div>

          <StatusGroup
            swatch="brick"
            code="P.01"
            label="Ongoing Action Research Projects"
            items={projects.ongoingResearch}
          />
          <StatusGroup
            swatch="brick"
            code="P.02"
            label="Ongoing Consultancy Projects"
            items={projects.ongoingConsultancy}
          />
          <StatusGroup
            swatch="mustard"
            code="P.03"
            label="Upcoming Projects"
            items={projects.upcoming}
          />
          <StatusGroup
            swatch="moss"
            code="P.04"
            label="Completed Projects"
            items={projects.completed}
          />
        </div>
      </section>
    </>
  );
}
