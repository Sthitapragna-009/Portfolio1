// A map-legend-styled group of project cards for a single status
// (Ongoing / Upcoming / Completed), consistent with the drafting-sheet motif.
export default function StatusGroup({ swatch, label, code, items }) {
  return (
    <div className="status-group">
      <div className="status-group__key">
        <span className={`capability-dot capability-dot--${swatch}`} aria-hidden="true" />
        <span className="mono status-group__code">{code}</span>
        <h3>{label}</h3>
      </div>

      {items.length > 0 ? (
        <div className="status-group__items">
          {items.map((item) => (
            <div className="status-card" key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.note}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="status-group__empty mono">— to be updated —</p>
      )}
    </div>
  );
}
