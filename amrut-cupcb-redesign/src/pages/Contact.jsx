import { useState } from "react";
import PageHero from "../components/PageHero";
import { siteInfo } from "../data/content";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach the Centre"
        lede="For research collaboration, training programs, media, or general enquiries."
      />

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-details">
            <div className="eyebrow">Address</div>
            <p className="lede-text">{siteInfo.room}</p>

            <div className="eyebrow">Phone</div>
            <p><a href={`tel:${siteInfo.phone}`}>{siteInfo.phone}</a></p>

            <div className="eyebrow">Email</div>
            <p><a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a></p>

            <div className="eyebrow">Coordinates</div>
            <p className="mono">{siteInfo.coordinates}</p>
          </div>

          <form className="contact-form surface" onSubmit={handleSubmit}>
            <h3>Send an enquiry</h3>

            {sent ? (
              <p className="form-success">
                Noted — this concept form doesn't send messages anywhere; for a real enquiry, use
                the phone or email above.
              </p>
            ) : (
              <>
                <label className="field">
                  <span>Name</span>
                  <input type="text" required />
                </label>
                <label className="field">
                  <span>Email</span>
                  <input type="email" required />
                </label>
                <label className="field">
                  <span>Message</span>
                  <textarea rows="5" required />
                </label>
                <button type="submit" className="btn btn-primary">Send message</button>
              </>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
