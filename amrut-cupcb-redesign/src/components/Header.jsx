import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/themes", label: "Themes" },
  { to: "/projects", label: "Projects" },
  { to: "/events", label: "Events" },
  { to: "/people", label: "People" },
  { to: "/repository", label: "Repository" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" width="30" height="30">
              <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M20 12 L20 20 L26 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
          <span className="brand__text">
            <strong>CUPCB</strong>
            <span className="brand__sub">AMRUT &middot; IIT Roorkee</span>
          </span>
        </NavLink>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`site-nav ${open ? "site-nav--open" : ""}`}>
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `site-nav__link ${isActive ? "is-active" : ""}`}
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn btn-primary site-nav__cta" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
