const STATS = [
  { value: "2023", label: "Centre approved" },
  { value: "03", label: "Core research themes" },
  { value: "14", label: "Towns — Punjab GIS master plan" },
  { value: "DAP", label: "IIT Roorkee" },
];

export default function StatBand() {
  return (
    <div className="stat-band">
      {STATS.map((s) => (
        <div className="stat-band__item" key={s.label}>
          <span className="stat-band__value">{s.value}</span>
          <span className="stat-band__label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
