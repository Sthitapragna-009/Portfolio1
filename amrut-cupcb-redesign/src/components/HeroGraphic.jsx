// Signature visual: an abstract, glossy "site plan" mosaic — gradient tiles
// standing in for the aerial photography a real site might use, built from
// the Centre's own material (contour lines, plot grids, transit lines,
// a compass) rather than stock photos of people.
export default function HeroGraphic() {
  return (
    <div className="hero-mosaic" aria-hidden="true">
      <div className="hero-tile hero-tile--grid">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="hg-grid" width="14" height="14" patternUnits="userSpaceOnUse">
              <path d="M14 0H0V14" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#hg-grid)" />
        </svg>
      </div>

      <div className="hero-tile hero-tile--contour">
        <svg viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="10" stroke="white" strokeOpacity="0.9" strokeWidth="1.4" />
          <circle cx="50" cy="50" r="22" stroke="white" strokeOpacity="0.6" strokeWidth="1.4" />
          <circle cx="50" cy="50" r="34" stroke="white" strokeOpacity="0.35" strokeWidth="1.4" />
        </svg>
      </div>

      <div className="hero-tile hero-tile--compass">
        <svg viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="1.2" strokeOpacity="0.7" />
          <path d="M50 20 L58 50 L50 80 L42 50 Z" fill="white" fillOpacity="0.85" />
          <path d="M50 20 L58 50 L50 50 Z" fill="white" />
        </svg>
      </div>

      <div className="hero-tile hero-tile--transit">
        <svg viewBox="0 0 100 100" fill="none">
          <path d="M5 80 C 30 20, 60 90, 95 25" stroke="white" strokeWidth="2.4" strokeOpacity="0.85" strokeLinecap="round" />
          <circle cx="5" cy="80" r="3.5" fill="white" />
          <circle cx="95" cy="25" r="3.5" fill="white" />
        </svg>
      </div>

      <div className="hero-tile hero-tile--plots">
        <svg viewBox="0 0 100 100" fill="none">
          <rect x="8" y="10" width="35" height="35" stroke="white" strokeOpacity="0.7" strokeWidth="1.2" />
          <rect x="50" y="10" width="42" height="20" stroke="white" strokeOpacity="0.7" strokeWidth="1.2" />
          <rect x="50" y="36" width="20" height="20" stroke="white" strokeOpacity="0.7" strokeWidth="1.2" />
          <rect x="74" y="36" width="18" height="20" stroke="white" strokeOpacity="0.7" strokeWidth="1.2" />
          <rect x="8" y="52" width="84" height="16" stroke="white" strokeOpacity="0.5" strokeWidth="1.2" />
        </svg>
      </div>

      <div className="hero-tile hero-tile--mark">
        <span>AMRUT 2.0</span>
      </div>
    </div>
  );
}
