import React from "react";
import "./Success.css";
import { useLocation } from "react-router-dom";
// import { Helmet } from "react-helmet";

const Success = () => {
  const location = useLocation();
  const { paymentStatus, amount, time } = location.state || {};

  return (
    <div className="container_success">
      {/* <Helmet>
        <title>Payment Successful | ICAEBMS 2026</title>
        <meta
          name="description"
          content="Payment successful. Thank you for registering for ICAEBMS 2026. Your registration details are confirmed."
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://icaebms.cerada.in/success" />
      </Helmet> */}

      <main className="main-content">
        <CircleCheckIcon className="status-icon" data-aos="fade-up" />
        <h1 className="title" data-aos="fade-up" data-aos-duration="500">
          Payment Successful
        </h1>
        <p className="description" data-aos="fade-up" data-aos-duration="600">
          Thank you for your Registration!
        </p>
        <p className="welcome-message" data-aos="fade-up" data-aos-duration="650">
          Thank you for joining us in ICAEBMS-2026. We look forward to your 
          participation and contributions to the Confworld Educational Research 
          and Development Association (CERADA) Conference.
        </p>
        
        <div className="details-box" data-aos="fade-up" data-aos-duration="700">
          <div className="detail-item" data-aos="fade-up" data-aos-duration="700">
            <span>Total Amount:</span>
            <span className="detail-value">${amount}</span>
          </div>
          <div className="detail-item" data-aos="fade-up" data-aos-duration="700">
            <span>Payment Status:</span>
            <span className="detail-value status-badge">{paymentStatus}</span>
          </div>
          <div className="detail-item" data-aos="fade-up" data-aos-duration="700">
            <span>Date & Time:</span>
            <span className="detail-value">{time}</span>
          </div>
        </div>

        <div className="contact-box" data-aos="fade-up" data-aos-duration="750">
          <h3 className="contact-title">Need Help? Contact Us</h3>
          <p className="contact-description">
            For any queries or additional information, please contact our 
            conference support team:
          </p>
          <div className="contact-item">
            <EmailIcon className="contact-icon" />
            <a href="mailto:info@icaebms.com" className="contact-link">
              info@icaebms.com
            </a>
          </div>
          <div className="contact-item">
            <PhoneIcon className="contact-icon" />
            <a href="tel:+918072381719" className="contact-link">
              +91 8072381719
            </a>
          </div>
        </div>

        
        <a
          href="/"
          className="return-button"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          Return to Homepage
        </a>
      </main>
    </div>
  );
};

export default Success;

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function EmailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}