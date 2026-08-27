import { Link } from "react-router-dom";
import { siteInfo } from "../data/content";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="eyebrow eyebrow--on-dark">Coordinates</div>
            <p className="mono footer-coords">{siteInfo.coordinates}</p>
            <p className="footer-address">{siteInfo.room}</p>
          </div>

          <div>
            <div className="eyebrow eyebrow--on-dark">Contact</div>
            <p>
              <a href={`tel:${siteInfo.phone}`}>{siteInfo.phone}</a>
              <br />
              <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
            </p>
          </div>

          <div>
            <div className="eyebrow eyebrow--on-dark">Explore</div>
            <nav className="footer-links">
              <Link to="/about">About</Link>
              <Link to="/themes">Themes</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/events">Events</Link>
              <Link to="/people">People</Link>
              <Link to="/repository">Repository</Link>
              <Link to="/contact">Contact</Link>
            </nav>
          </div>

          <div>
            <div className="eyebrow eyebrow--on-dark">Follow</div>
            <nav className="footer-links">
              <a href="https://www.facebook.com/iitroorkee" target="_blank" rel="noreferrer">Facebook</a>
              <a href="https://www.instagram.com/iitroorkee" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://www.linkedin.com/school/iit-roorkee" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://twitter.com/iitroorkee" target="_blank" rel="noreferrer">Twitter</a>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="mono footer-disclaimer">
            Unofficial concept redesign — a portfolio case study, not affiliated with or endorsed by
            IIT Roorkee. Source content adapted from the public CUPCB page.
          </p>
          <p className="mono footer-copy">© {new Date().getFullYear()} CUPCB Concept Redesign</p>
        </div>
      </div>
    </footer>
  );
}
