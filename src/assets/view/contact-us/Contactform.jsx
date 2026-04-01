import React, { useRef, useState } from "react";
import axios from "axios";
import { toaster } from "evergreen-ui";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const Contactform = () => {
  const ContactRef = useRef();
  const [MobileNumber, setMobileNumber] = useState(null);

  const validateForm = (data) => {
    for (const key in data) {
      if (!data[key] || String(data[key]).trim() === "") {
        toaster.warning(`Please fill out the ${key.replace(/_/g, " ")} field.`);
        return false;
      }
    }
    return true;
  };

  const HandleContactData = async (e) => {
    e.preventDefault();
    const formData = new FormData(ContactRef.current);
    const ContactData = Object.fromEntries(formData.entries());
    ContactData.Contact_Number = MobileNumber;

    const isValid = validateForm(ContactData);
    if (!isValid) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/contact`,
        ContactData
      );
      if (response) {
        ContactRef.current.reset();
        setMobileNumber("");
        toaster.success(response.data.message);
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      toaster.danger("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <style>{`
        .cf-wrap {
          background: #fff;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding:  ;
          box-sizing: border-box;
        }

        .cf-card {
          width: 100%;
          max-width: 780px;
          background: #fff;
          border-radius: 24px;
          border: 2px solid #f1f5f9;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(190,18,60,0.10), 0 4px 16px rgba(0,0,0,0.04);
        }

        .cf-header {
          background: #be123c;
          padding: 40px 48px 36px;
          position: relative;
          overflow: hidden;
        }

        .cf-header::after {
          content: '';
          position: absolute;
          right: -40px; top: -40px;
          width: 220px; height: 220px;
          border-radius: 50%;
          background: #ea580c;
          opacity: 0.22;
          pointer-events: none;
        }

        .cf-header::before {
          content: '';
          position: absolute;
          right: 60px; bottom: -60px;
          width: 160px; height: 160px;
          border-radius: 50%;
          background: #fb923c;
          opacity: 0.18;
          pointer-events: none;
        }

        .cf-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 16px;
          position: relative;
          z-index: 1;
        }

        .cf-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #fb923c;
        }

        .cf-title {
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.1;
          margin: 0 0 10px;
          letter-spacing: -0.02em;
          position: relative;
          z-index: 1;
        }

        .cf-title span {
          color: #fb923c;
        }

        .cf-subtitle {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.72);
          font-weight: 400;
          margin: 0;
          position: relative;
          z-index: 1;
        }

        .cf-stats {
          display: flex;
          gap: 10px;
          margin-top: 24px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .cf-stat {
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 10px;
          padding: 8px 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cf-stat-icon {
          width: 26px; height: 26px;
          border-radius: 7px;
          background: rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .cf-stat-label {
          font-size: 12px;
          color: rgba(255,255,255,0.85);
          font-weight: 500;
        }

        .cf-divider {
          height: 3px;
          background: linear-gradient(90deg, #be123c, #ea580c, #fda4af 80%, transparent);
          border: none;
          margin: 0;
        }

        .cf-body {
          padding: 40px 48px 44px;
        }

        .cf-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .cf-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .cf-field.full {
          grid-column: 1 / -1;
        }

        .cf-label {
          font-size: 12px;
          font-weight: 700;
          color: #be123c;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .cf-input {
          width: 100%;
          padding: 13px 16px;
          border: 2px solid #f1f5f9;
          border-radius: 12px;
          background: #fafafa;
          font-size: 0.95rem;
          color: #111;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
          font-family: inherit;
        }

        .cf-input::placeholder { color: #c4c4c4; }

        .cf-input:hover {
          border-color: #fda4af;
          background: #fff;
        }

        .cf-input:focus {
          border-color: #be123c;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(190,18,60,0.08);
        }

        textarea.cf-input {
          resize: vertical;
          min-height: 120px;
        }

        .phone-input-container :global(.PhoneInput) {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .phone-input-container :global(.PhoneInputCountry) {
          padding: 13px 12px;
          border: 2px solid #f1f5f9;
          border-radius: 12px;
          background: #fafafa;
          transition: border-color 0.2s, background 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .phone-input-container :global(.PhoneInputCountry:hover) {
          border-color: #fda4af;
          background: #fff;
        }

        .phone-input-container :global(.PhoneInputInput) {
          flex: 1;
          padding: 13px 16px;
          border: 2px solid #f1f5f9;
          border-radius: 12px;
          background: #fafafa;
          font-size: 0.95rem;
          color: #111;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          font-family: inherit;
        }

        .phone-input-container :global(.PhoneInputInput::placeholder) { color: #c4c4c4; }

        .phone-input-container :global(.PhoneInputInput:hover) {
          border-color: #fda4af;
          background: #fff;
        }

        .phone-input-container :global(.PhoneInputInput:focus) {
          border-color: #be123c;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(190,18,60,0.08);
        }

        .cf-submit {
          width: 100%;
          margin-top: 24px;
          padding: 17px 24px;
          border: none;
          border-radius: 14px;
          font-family: inherit;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          cursor: pointer;
          background: #be123c;
          color: #fff;
          transition: transform 0.18s, box-shadow 0.18s, background 0.18s;
          box-shadow: 0 6px 24px rgba(190,18,60,0.32);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .cf-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(190,18,60,0.42);
          background: #9f1239;
        }

        .cf-submit:active {
          transform: translateY(0);
          box-shadow: 0 4px 12px rgba(190,18,60,0.28);
        }

        .cf-arrow-chip {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: rgba(255,255,255,0.18);
          display: flex; align-items: center; justify-content: center;
          transition: background 0.18s;
          flex-shrink: 0;
        }

        .cf-submit:hover .cf-arrow-chip {
          background: #ea580c;
        }

        @media (max-width: 600px) {
          .cf-header, .cf-body { padding: 28px 24px; }
          .cf-grid { grid-template-columns: 1fr; }
          .cf-field.full { grid-column: 1; }
        }
      `}</style>

      <div className="cf-wrap">
        <div className="cf-card">

          {/* ── Header ── */}
          <div className="cf-header">
            <div className="cf-badge">
              <div className="cf-badge-dot" />
              We respond within 24 hrs
            </div>

            <h2 className="cf-title">
              Got a question?<br />
              <span>Let's talk.</span>
            </h2>
            <p className="cf-subtitle">Fill out the form and our team will be in touch shortly.</p>

            <div className="cf-stats">
              <div className="cf-stat">
                <div className="cf-stat-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#fff" strokeWidth="2"/>
                    <polyline points="22,6 12,13 2,6" stroke="#fff" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="cf-stat-label">Email support</span>
              </div>
              <div className="cf-stat">
                <div className="cf-stat-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015.13 12.8 19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="#fff" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="cf-stat-label">WhatsApp & Viber</span>
              </div>
              <div className="cf-stat">
                <div className="cf-stat-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="11" width="18" height="11" rx="2" stroke="#fff" strokeWidth="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="cf-stat-label">100% secure</span>
              </div>
            </div>
          </div>

          <hr className="cf-divider" />

          {/* ── Form ── */}
          <div className="cf-body">
            <form ref={ContactRef} onSubmit={HandleContactData}>
              <div className="cf-grid">

                <div className="cf-field">
                  <label className="cf-label">First name</label>
                  <input className="cf-input" type="text" name="First_Name" placeholder="John" required />
                </div>

                <div className="cf-field">
                  <label className="cf-label">Last name</label>
                  <input className="cf-input" type="text" name="Last_Name" placeholder="Doe" required />
                </div>

                <div className="cf-field full">
                  <label className="cf-label">Email address</label>
                  <input className="cf-input" type="email" name="Email" placeholder="john@example.com" required />
                </div>

                <div className="cf-field full">
                  <label className="cf-label ">WhatsApp / Viber number</label>
                  <div className="phone-input-container border p-2 border-gray-200 rounded-md bg-gray-50">
                    <PhoneInput
                      onChange={setMobileNumber}
                      value={MobileNumber}
                      defaultCountry="IN"
                      id="Mobile_Number"
                      placeholder=""
                    />
                  </div>
                </div>

                <div className="cf-field full">
                  <label className="cf-label">Your message</label>
                  <textarea className="cf-input" name="Message" rows={4} placeholder="How can we help you today?" required />
                </div>

              </div>

              <button type="submit" className="cf-submit">
                Send Message
                <div className="cf-arrow-chip">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
};

export default Contactform;