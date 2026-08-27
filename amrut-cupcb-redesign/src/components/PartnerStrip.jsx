const PARTNERS = ["IIT Roorkee", "MoHUA", "NIUA", "AMRUT 2.0", "Dept. of Architecture & Planning"];

export default function PartnerStrip() {
  return (
    <div className="partner-strip">
      <span className="partner-strip__label">Working with</span>
      <div className="partner-strip__row">
        {PARTNERS.map((p) => (
          <span className="partner-strip__item" key={p}>{p}</span>
        ))}
      </div>
    </div>
  );
}
