import { useEffect } from "react";
import { Link } from "react-router-dom";
import register from '../../../images/icons/register-now.webp'
import academic from '../../../images/icons/apply-for-academic-partner.webp'
import call from '../../../images/icons/call.webp'
import mail from '../../../images/icons/mail.webp'
import gt from '../../../images/icons/google-translate.webp'
export default function TopNavbar() {
  useEffect(() => {
    // Define the translate init function globally before script loads
    window.googleTranslateElementInit = () => {
      if (
        !document.getElementById("google_translate_element").hasChildNodes()
      ) {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en", autoDisplay: false },
          "google_translate_element"
        );
      }
    };

    // Inject Google Translate script if not already loaded
    if (
      !document.querySelector(
        'script[src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]'
      )
    ) {
      const addScript = document.createElement("script");
      addScript.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      addScript.async = true;
      document.body.appendChild(addScript);
    }

    // Add custom styles for Google Translate
    const addCustomStyles = () => {
      const style = document.createElement("style");
      style.textContent = `
        /* Style the Google Translate select dropdown */
        .goog-te-combo {
          color: black !important;
          font-weight: 600 !important;
          background-color: white !important;
          border: 1px solid #ccc !important;
          padding: 4px 8px !important;
          border-radius: 4px !important;
        }
        
        /* Style the Google Translate text elements */
        .goog-te-gadget {
          color: black !important;
          font-weight: 600 !important;
        }
        
        .goog-te-gadget-simple {
          color: black !important;
          font-weight: 600 !important;
        }
        
        .goog-te-gadget-simple .goog-te-menu-value {
          color: black !important;
          font-weight: 600 !important;
        }
        
        .goog-te-gadget-simple .goog-te-menu-value span {
          color: black !important;
        }
        
        /* Hide the Google Translate banner */
        .goog-te-banner-frame {
          display: none !important;
        }
        
        /* Hide the "Powered by" text */
        .goog-te-gadget-simple .goog-te-menu-value:hover {
          text-decoration: none !important;
        }
        
        .goog-logo-link {
          display: none !important;
        }
        
        .goog-te-gadget {
          font-size: 0 !important;
        }
        
        .goog-te-gadget > span > a {
          display: none !important;
        }
        
        .goog-te-gadget .goog-te-combo {
          font-size: 14px !important;
        }
      `;
      document.head.appendChild(style);
    };

    // Add styles immediately and also after a short delay to ensure they apply
    addCustomStyles();
    setTimeout(addCustomStyles, 1000);
  }, []);
  const topNavList = [
  {
    title: "Register Now",
    icon: register,
    link: "/registration-fees",
    alt: "register-icon",
  },
  {
    title: "info@icabmet.com",
    icon: mail,
    link: "mailto:info@icabmet.com",
    alt: "mail-icon",
  },
  {
    title: "+91 8072381719",
    icon: call,
    link: "https://wa.me/918072381719",
    alt: "call-icon",
  },
  {
    title: "Apply for Academic Partner",
    icon: academic,
    link: "/contact-us",
    alt: "apply-for-academic-partner-icon",
  },
];


  return (
    <div className="hidden lg:block fixed left-0 right-0 top-6 z-999">
      <div className="flex justify-center bg-white ">
        <div className="container flex justify-around">
          <div className="flex gap-x-1 items-center font-semibold  ">
            <img
              loading="lazy"
              src={gt}
              alt="Translate Icon"
              width={30}
            />
            <div id="google_translate_element"></div>
          </div>
          {topNavList.map(({ title, link, alt, icon }, index) => (
            <a
              className="flex items-center gap-2 text-blue-900 font-semibold p-2"
              key={index}
              href={link}
              rel="noopener"
              target={
                title == "info@icmersh.com" || title == "+91 8072381719"
                  ? "_blank"
                  : ""
              }
            >
              <img src={icon} width={35} height={35} loading="lazy" alt={alt} />
              {title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}