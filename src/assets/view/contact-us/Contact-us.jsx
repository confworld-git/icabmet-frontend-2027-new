import React, { useState, useEffect } from "react";
import AOS from "aos";
import Hero from "../commonhero/common-hero";
import "aos/dist/aos.css";
import Contactform from "./Contactform";
import Enquiry from "./Enquiry";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contactus = () => {
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
    AOS.refresh();
  }, []);

  return (
    <>
      <style>{`
        .cu-wrap {
          background: #fff;
          font-family: inherit;
        }

        /* ── Section shell ── */
        .cu-section {
          background: #fff;
          padding: 72px 20px;
        }

        .cu-inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ── Intro split ── */
        .cu-intro {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
          margin-bottom: 80px;
        }

        .cu-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(190,18,60,0.07);
          border: 1.5px solid rgba(190,18,60,0.18);
          color: #be123c;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 20px;
        }

        .cu-eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #ea580c;
        }

        .cu-main-heading {
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 800;
          color: #111;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0 0 8px;
        }

        .cu-main-heading span {
          color: #be123c;
        }

        .cu-sub-heading {
          font-size: 1.2rem;
          font-weight: 700;
          color: #ea580c;
          margin: 20px 0 10px;
        }

        .cu-body-text {
          font-size: 0.97rem;
          line-height: 1.75;
          color: #444;
          margin: 0 0 16px;
        }

        .cu-highlight-box {
          background: rgba(190,18,60,0.04);
          border-left: 4px solid #be123c;
          padding: 16px 20px;
          border-radius: 0 12px 12px 0;
          margin-bottom: 28px;
        }

        .cu-highlight-box strong {
          display: block;
          color: #be123c;
          font-weight: 700;
          margin-bottom: 4px;
          font-size: 0.9rem;
        }

        .cu-highlight-box p {
          margin: 0;
          font-size: 0.9rem;
          color: #555;
          line-height: 1.65;
        }

        .cu-highlight-box a {
          color: #be123c;
          font-weight: 600;
          text-decoration: underline;
        }

        .cu-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #be123c;
          color: #fff;
          padding: 15px 28px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: transform 0.18s, box-shadow 0.18s, background 0.18s;
          box-shadow: 0 6px 24px rgba(190,18,60,0.28);
          letter-spacing: 0.02em;
        }

        .cu-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(190,18,60,0.38);
          background: #9f1239;
        }

        .cu-cta-btn:active {
          transform: translateY(0);
        }

        .cu-cta-chip {
          width: 28px; height: 28px;
          border-radius: 7px;
          background: rgba(255,255,255,0.18);
          display: flex; align-items: center; justify-content: center;
          transition: background 0.18s;
        }

        .cu-cta-btn:hover .cu-cta-chip {
          background: #ea580c;
        }

        /* Right image */
        .cu-img-wrap {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(190,18,60,0.12), 0 4px 16px rgba(0,0,0,0.06);
        }

        .cu-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .cu-img-wrap:hover img {
          transform: scale(1.04);
        }

        .cu-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(159,18,57,0.25), transparent);
        }

        /* ── Section divider ── */
        .cu-section-divider {
          height: 3px;
          background: linear-gradient(90deg, #be123c, #ea580c, #fda4af 80%, transparent);
          border: none;
          margin: 0 0 64px;
          border-radius: 2px;
        }

        /* ── Cards heading ── */
        .cu-cards-heading {
          text-align: center;
          margin-bottom: 40px;
        }

        .cu-cards-heading h2 {
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          font-weight: 800;
          color: #111;
          letter-spacing: -0.02em;
          margin: 0 0 8px;
        }

        .cu-cards-heading h2 span {
          color: #be123c;
        }

        .cu-cards-heading p {
          font-size: 0.95rem;
          color: #888;
          margin: 0;
        }

        /* ── Contact cards grid ── */
        .cu-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 72px;
        }

        .cu-card {
          background: #fff;
          border-radius: 20px;
          border: 2px solid #f1f5f9;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          transition: transform 0.22s, box-shadow 0.22s, border-color 0.22s;
        }

        .cu-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(190,18,60,0.12);
        }

        .cu-card.rose:hover { border-color: #be123c; }
        .cu-card.orange:hover { border-color: #ea580c; }

        .cu-card-img {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .cu-card-img img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }

        .cu-card:hover .cu-card-img img {
          transform: scale(1.07);
        }

        .cu-card-img-overlay {
          position: absolute;
          inset: 0;
        }

        .cu-card-img-overlay.rose {
          background: linear-gradient(to top, rgba(159,18,57,0.75), transparent);
        }

        .cu-card-img-overlay.orange {
          background: linear-gradient(to top, rgba(154,52,18,0.75), transparent);
        }

        .cu-card-img-label {
          position: absolute;
          bottom: 16px; left: 20px;
        }

        .cu-card-img-label h3 {
          font-size: 1.2rem;
          font-weight: 800;
          color: #fff;
          margin: 0 0 2px;
        }

        .cu-card-img-label p {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.75);
          margin: 0;
          font-weight: 500;
        }

        /* Card top accent */
        .cu-card-accent {
          height: 3px;
        }

        .cu-card-accent.rose {
          background: linear-gradient(90deg, #be123c, #ea580c);
        }

        .cu-card-accent.orange {
          background: linear-gradient(90deg, #ea580c, #fb923c);
        }

        /* Card body */
        .cu-card-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cu-card-body.two-col {
          flex-direction: row;
          gap: 0;
        }

        .cu-contact-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .cu-contact-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .cu-contact-icon.rose { background: rgba(190,18,60,0.08); }
        .cu-contact-icon.orange { background: rgba(234,88,12,0.09); }

        .cu-contact-meta {
          font-size: 11px;
          font-weight: 700;
          color: #aaa;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .cu-contact-name {
          font-size: 0.97rem;
          font-weight: 700;
          color: #111;
          margin: 0 0 1px;
        }

        .cu-contact-value {
          font-size: 0.9rem;
          color: #555;
          margin: 0;
        }

        .cu-contact-link-rose {
          font-size: 0.9rem;
          color: #be123c;
          font-weight: 600;
          text-decoration: underline;
        }

        .cu-contact-link-orange {
          font-size: 0.9rem;
          color: #ea580c;
          font-weight: 600;
          text-decoration: underline;
        }

        .cu-card-divider {
          width: 1px;
          background: #f1f5f9;
          margin: 0 8px;
          flex-shrink: 0;
          align-self: stretch;
        }

        .cu-card-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* ── Form section ── */
        .cu-form-wrap {
          max-width: 900px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .cu-intro { grid-template-columns: 1fr; gap: 36px; }
          .cu-cards-grid { grid-template-columns: 1fr; }
          .cu-card-body.two-col { flex-direction: column; }
          .cu-card-divider { display: none; }
        }
      `}</style>

      <section className="cu-wrap">
        <Hero
          title="Contact Us"
          breadcrumbs={[{ label: "Home", link: "#" }]}
          backgroundImage="/images/commonheroimages/14.webp"
        />

        <div className="cu-section">
          <div className="cu-inner">

            {/* ── Intro split ── */}
            <div className="cu-intro">

              {/* Left */}
              <div data-aos="fade-right">
                <div className="cu-eyebrow">
                  <div className="cu-eyebrow-dot" />
                  Get in Touch
                </div>

                <h1 className="cu-main-heading">
                  Partner with<br />
                  <span>CERADA Today</span>
                </h1>

                <h2 className="cu-sub-heading">Explore Opportunities</h2>

                <p className="cu-body-text">
                  Discover how CERADA sponsorship can benefit your organization. We look forward to partnering with you and creating a memorable and impactful experience at the CERADA International Conference.
                </p>

                <div className="cu-highlight-box">
                  <strong>Contact Us</strong>
                  <p>
                    Reach out to our team to discuss customized sponsorship and exhibition packages at{" "}
                    <a href="mailto:collaboration@confworld.org">collaboration@confworld.org</a>
                  </p>
                </div>

                <button className="cu-cta-btn" onClick={() => setPopup(true)} aria-label="Ask Enquiries">
                  <Mail size={18} />
                  Ask Enquiries
                  <div className="cu-cta-chip">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>
              </div>

              {/* Right image */}
              <div data-aos="fade-left">
                <div className="cu-img-wrap">
                  <img
                    src="/images/registration-instructions/contact.webp"
                    alt="Connect with our international conference team"
                    title="Contact our international conference organizers"
                    loading="lazy"
                  />
                  <div className="cu-img-overlay" />
                </div>
              </div>
            </div>

            {/* ── Divider ── */}
            <hr className="cu-section-divider" />

            {/* ── Cards heading ── */}
            <div className="cu-cards-heading" data-aos="fade-up">
              <h2>Get in <span>Touch</span></h2>
              <p>Reach the right person directly</p>
            </div>

            {/* ── Contact cards ── */}
            <div className="cu-cards-grid">

              {/* Academic Partnership */}
              <div className="cu-card rose" data-aos="zoom-in" data-aos-delay="100">
                <div className="cu-card-img">
                  <img
                    src="/images/registration-instructions/academic.webp"
                    alt="Academic partnership and sponsorship"
                    title="Reach out for partnership inquiries"
                  />
                  <div className="cu-card-img-overlay rose" />
                  <div className="cu-card-img-label">
                    <h3>Academic Partnership</h3>
                    <p>Sponsorship & Promotion</p>
                  </div>
                </div>
                <div className="cu-card-accent rose" />
                <div className="cu-card-body">
                  <div className="cu-contact-row">
                    <div className="cu-contact-icon rose">
                      <Phone size={16} color="#be123c" />
                    </div>
                    <div>
                      <p className="cu-contact-meta">Contact Person</p>
                      <p className="cu-contact-name">Ms. Suhana S</p>
                      <p className="cu-contact-value">+91 8610656424</p>
                    </div>
                  </div>
                  <div className="cu-contact-row">
                    <div className="cu-contact-icon orange">
                      <Mail size={16} color="#ea580c" />
                    </div>
                    <div>
                      <p className="cu-contact-meta">Email Address</p>
                      <a href="mailto:collaboration@confworld.org" className="cu-contact-link-rose">
                        collaboration@confworld.org
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* ICABMET Queries */}
              <div className="cu-card orange" data-aos="zoom-in" data-aos-delay="200">
                <div className="cu-card-img">
                  <img
                    src="/images/registration-instructions/support.webp"
                    alt="Conference queries and information"
                    title="Find contact details for conference queries"
                  />
                  <div className="cu-card-img-overlay orange" />
                  <div className="cu-card-img-label">
                    <h3>ICABMET Queries</h3>
                    <p>General Information</p>
                  </div>
                </div>
                <div className="cu-card-accent orange" />
                <div className="cu-card-body two-col">

                  <div className="cu-card-col">
                    <div className="cu-contact-row">
                      <div className="cu-contact-icon orange">
                        <Phone size={16} color="#ea580c" />
                      </div>
                      <div>
                        <p className="cu-contact-meta">Contact Person</p>
                        <p className="cu-contact-name">Ms. Aishwarya S</p>
                        <p className="cu-contact-value">+91 8072381719</p>
                      </div>
                    </div>
                    <div className="cu-contact-row">
                      <div className="cu-contact-icon rose">
                        <Mail size={16} color="#be123c" />
                      </div>
                      <div>
                        <p className="cu-contact-meta">Email Address</p>
                        <a href="mailto:info@icabmet.com" className="cu-contact-link-orange">
                          info@icabmet.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="cu-card-divider" />

                  <div className="cu-card-col">
                    <div className="cu-contact-row">
                      <div className="cu-contact-icon orange">
                        <Phone size={16} color="#ea580c" />
                      </div>
                      <div>
                        <p className="cu-contact-meta">Contact Person</p>
                        <p className="cu-contact-name">Ms. Malathy G</p>
                        <p className="cu-contact-value">+91 6383055014</p>
                      </div>
                    </div>
                    <div className="cu-contact-row">
                      <div className="cu-contact-icon rose">
                        <Mail size={16} color="#be123c" />
                      </div>
                      <div>
                        <p className="cu-contact-meta">Email Address</p>
                        <a href="mailto:info@icabmet.com" className="cu-contact-link-orange">
                          info@icabmet.com
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* ── Contact Form ── */}
            <div className="cu-form-wrap" data-aos="fade-up">
              <Contactform />
            </div>

          </div>
        </div>

        {/* Enquiry Popup */}
        {popup && <Enquiry setPopup={setPopup} />}
      </section>
    </>
  );
};

export default Contactus;