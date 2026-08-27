import { Link } from "react-router-dom";

// A capability/feature list: icon dot, title, description, divider —
// used for the Centre's three themes.
export default function CapabilityList({ items, linkTo }) {
  return (
    <div className="capability-list">
      {items.map((t) => (
        <div className="capability-row" key={t.id}>
          <span className={`capability-dot capability-dot--${t.swatch}`} aria-hidden="true" />
          <div className="capability-row__body">
            <h3>{t.name}</h3>
            <p>{t.summary}</p>
          </div>
          {linkTo && (
            <Link to={linkTo} className="capability-row__link">
              Learn more →
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
