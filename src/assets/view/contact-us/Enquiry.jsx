import React, { useRef } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { toaster } from "evergreen-ui";
import axios from "axios";

const Enquiry = ({ setPopup }) => {
  const EnquiryRef = useRef();

  const HandleEnquiryData = async (e) => {
    e.preventDefault();
    const formData = new FormData(EnquiryRef.current);
    const EnquiryData = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/enquiry`,
        EnquiryData
      );
      if (response) {
        EnquiryRef.current.reset();
        setPopup(false);
        toaster.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toaster.danger("Something's Wrong");
    }
  };

  return (
    <>
      <style>{`
        .eq-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 6, 8, 0.55);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          box-sizing: border-box;
        }

        .eq-modal {
          background: #fff;
          width: 100%;
          max-width: 560px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(190,18,60,0.18), 0 4px 24px rgba(0,0,0,0.08);
          animation: eq-pop 0.22s cubic-bezier(0.34,1.56,0.64,1) both;
          max-height: 92vh;
          overflow-y: auto;
        }

        @keyframes eq-pop {
          from { opacity: 0; transform: scale(0.93) translateY(16px); }
          to   { opacity: 1; transform: scale(1)   translateY(0);     }
        }

        /* Header */
        .eq-header {
          background: #be123c;
          padding: 28px 32px 24px;
          position: relative;
          overflow: hidden;
        }

        .eq-header::before {
          content: '';
          position: absolute;
          right: -30px; top: -30px;
          width: 160px; height: 160px;
          border-radius: 50%;
          background: #ea580c;
          opacity: 0.22;
          pointer-events: none;
        }

        .eq-header::after {
          content: '';
          position: absolute;
          left: -20px; bottom: -50px;
          width: 120px; height: 120px;
          border-radius: 50%;
          background: #fb923c;
          opacity: 0.15;
          pointer-events: none;
        }

        .eq-close {
          position: absolute;
          top: 14px; right: 14px;
          width: 32px; height: 32px;
          border-radius: 8px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.22);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: #fff;
          transition: background 0.18s;
          z-index: 2;
          flex-shrink: 0;
          padding: 0;
        }

        .eq-close:hover {
          background: rgba(255,255,255,0.28);
        }

        .eq-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.14);
          border: 1px solid rgba(255,255,255,0.22);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 100px;
          margin-bottom: 12px;
          position: relative;
          z-index: 1;
        }

        .eq-badge-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #fb923c;
        }

        .eq-title {
          font-size: 1.65rem;
          font-weight: 800;
          color: #fff;
          line-height: 1.15;
          margin: 0 0 6px;
          letter-spacing: -0.02em;
          position: relative;
          z-index: 1;
        }

        .eq-title span {
          color: #fb923c;
        }

        .eq-subtitle {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.65);
          margin: 0;
          position: relative;
          z-index: 1;
        }

        /* Gradient divider */
        .eq-divider {
          height: 3px;
          background: linear-gradient(90deg, #be123c, #ea580c, #fda4af 80%, transparent);
          border: none;
          margin: 0;
        }

        /* Form body */
        .eq-body {
          padding: 28px 32px 32px;
        }

        .eq-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }

        .eq-label {
          font-size: 11px;
          font-weight: 700;
          color: #be123c;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .eq-input {
          width: 100%;
          padding: 11px 14px;
          border: 2px solid #f1f5f9;
          border-radius: 11px;
          background: #fafafa;
          font-size: 0.9rem;
          color: #111;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
          font-family: inherit;
        }

        .eq-input::placeholder {
          color: #c4c4c4;
          font-size: 0.85rem;
        }

        .eq-input:hover {
          border-color: #fda4af;
          background: #fff;
        }

        .eq-input:focus {
          border-color: #be123c;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(190,18,60,0.08);
        }

        textarea.eq-input {
          resize: vertical;
          min-height: 76px;
        }

        .eq-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .eq-submit {
          width: 100%;
          margin-top: 6px;
          padding: 15px 24px;
          border: none;
          border-radius: 12px;
          font-family: inherit;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          cursor: pointer;
          background: #be123c;
          color: #fff;
          transition: transform 0.18s, box-shadow 0.18s, background 0.18s;
          box-shadow: 0 6px 24px rgba(190,18,60,0.30);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .eq-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(190,18,60,0.42);
          background: #9f1239;
        }

        .eq-submit:active {
          transform: translateY(0);
          box-shadow: 0 4px 12px rgba(190,18,60,0.25);
        }

        .eq-arrow-chip {
          width: 28px; height: 28px;
          border-radius: 7px;
          background: rgba(255,255,255,0.18);
          display: flex; align-items: center; justify-content: center;
          transition: background 0.18s;
          flex-shrink: 0;
        }

        .eq-submit:hover .eq-arrow-chip {
          background: #ea580c;
        }

        /* Scrollbar */
        .eq-modal::-webkit-scrollbar { width: 4px; }
        .eq-modal::-webkit-scrollbar-track { background: transparent; }
        .eq-modal::-webkit-scrollbar-thumb { background: #fda4af; border-radius: 4px; }

        @media (max-width: 500px) {
          .eq-header, .eq-body { padding: 22px 20px; }
          .eq-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="eq-overlay" onClick={(e) => e.target === e.currentTarget && setPopup(false)}>
        <div className="eq-modal" data-aos="fade-up">

          {/* ── Header ── */}
          <div className="eq-header">
            <button className="eq-close" onClick={() => setPopup(false)}>
              <HiMiniXMark size={18} />
            </button>

            <div className="eq-badge">
              <div className="eq-badge-dot" />
              Quick Enquiry
            </div>

            <h2 className="eq-title">
              Have a query?<br />
              <span>We're here.</span>
            </h2>
            <p className="eq-subtitle">We'll get back to you at your preferred time.</p>
          </div>

          <hr className="eq-divider" />

          {/* ── Form ── */}
          <div className="eq-body">
            <form ref={EnquiryRef} onSubmit={HandleEnquiryData}>

              <div className="eq-grid">
                <div className="eq-field">
                  <label className="eq-label">Your name</label>
                  <input className="eq-input" type="text" name="User_Name" placeholder="John Doe" required />
                </div>
                <div className="eq-field">
                  <label className="eq-label">Email</label>
                  <input className="eq-input" type="email" name="Email" placeholder="john@example.com" required />
                </div>
              </div>

              <div className="eq-field">
                <label className="eq-label">WhatsApp number</label>
                <input className="eq-input" type="tel" name="Contact_Number" placeholder="+1 415 555 2671" required />
              </div>

              <div className="eq-field">
                <label className="eq-label">Preferred contact time</label>
                <input className="eq-input" type="text" name="Preferred_Contact_Time" placeholder="Morning, Afternoon or Evening" required />
              </div>

              <div className="eq-field">
                <label className="eq-label">Subject</label>
                <input className="eq-input" type="text" name="Subject" placeholder="Subject of enquiry" />
              </div>

              <div className="eq-field">
                <label className="eq-label">Message</label>
                <textarea className="eq-input" rows={2} name="Message" placeholder="Your message..." />
              </div>

              <div className="eq-field">
                <label className="eq-label">How can we help?</label>
                <textarea className="eq-input" rows={2} name="Help_Description" placeholder="Describe how we can assist you..." />
              </div>

              <button type="submit" className="eq-submit">
                Send Enquiry
                <div className="eq-arrow-chip">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
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

export default Enquiry;