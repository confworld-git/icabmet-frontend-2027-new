"use client";

import { useEffect, useState } from "react";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-950 via-rose-900 to-slate-950 z-0" />

      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-700/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-rose-400/5 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-5 animate-pulse" />
      </div>

      {/* Footer Content */}
      <footer className="relative z-20 bg-transparent backdrop-blur-sm">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div
              className={`md:w-2/5 md:px-6 mb-6 md:mb-0 transition-all duration-1000 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex flex-col justify-start items-start gap-y-4">
                <div className="bg-white p-5 md:p-8 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-rose-400/50">
                  <img
                    src="/images/logo/ceradalogo.webp"
                    className="h-20 w-20"
                    alt="Cerada Logo"
                  />
                </div>
                <div className="flex flex-col justify-start items-start">
                  <h1
                    className="font-bold animate-fade-in"
                    style={{ animationDelay: "0.2s" }}
                  >
                    3<sup>rd</sup> International Conference on Applied Science, Business and
                    Management, Engineering & Technology (ICABMET-2027)
                  </h1>
                  <h1
                    className="animate-fade-in"
                    style={{ animationDelay: "0.4s" }}
                  >
                    <b>Theme :</b> "Driving Innovation and Sustainable Solutions: Interdisciplinary Approaches in Applied Sciences, Business and Technology"
                  </h1>
                  <h1
                    className="animate-fade-in"
                    style={{ animationDelay: "0.6s" }}
                  >
                    <b>Organized by :</b> Confworld Educational Research and Development Association
                  </h1>
                </div>
              </div>
            </div>

            <div className="md:w-3/5 grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-3">
              {/* Navigation Links */}
              <div
                className={`transition-all duration-1000 transform ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: "0.2s" }}
              >
                <ul className="mt-4 text-rose-100 font-semibold space-y-2">
                  <li className="mb-2 flex items-center gap-x-2 group cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home transition-all duration-300 group-hover:text-rose-300 group-hover:scale-125">
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9,22 9,12 15,12 15,22" />
                    </svg>
                    <a href="/" className="hover:text-rose-300 transition-colors duration-300">Home</a>
                  </li>
                  <li className="mb-2 flex items-center gap-x-2 group cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info transition-all duration-300 group-hover:text-rose-300 group-hover:scale-125">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    <a href="/about-icabmet" className="hover:text-rose-300 transition-colors duration-300">About</a>
                  </li>
                  <li className="mb-2 flex items-center gap-x-2 group cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar transition-all duration-300 group-hover:text-rose-300 group-hover:scale-125">
                      <path d="M8 2v4" /><path d="M16 2v4" />
                      <rect width="18" height="18" x="3" y="4" rx="2" />
                      <path d="M3 10h18" />
                    </svg>
                    <a href="/session-tracks-call-for-papers" className="hover:text-rose-300 transition-colors duration-300">Session</a>
                  </li>
                  <li className="mb-2 flex items-center gap-x-2 group cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book transition-all duration-300 group-hover:text-rose-300 group-hover:scale-125">
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                    </svg>
                    <a href="/abstract-full-paper-submission" className="hover:text-rose-300 transition-colors duration-300">Paper Submission</a>
                  </li>
                  <li className="mb-2 flex items-center gap-x-2 group cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-plus transition-all duration-300 group-hover:text-rose-300 group-hover:scale-125">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <line x1="19" x2="19" y1="8" y2="14" />
                      <line x1="22" x2="16" y1="11" y2="11" />
                    </svg>
                    <a href="/registration-fees" className="hover:text-rose-300 transition-colors duration-300">Registration</a>
                  </li>
                </ul>
              </div>

              {/* Social Media Links */}
              <div
                className={`transition-all duration-1000 transform ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                }`}
                style={{ transitionDelay: "0.4s" }}
              >
                <ul className="mt-4 text-rose-100 font-semibold space-y-2">
                  <li className="mb-2 flex items-center gap-x-2 group cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook transition-all duration-300 group-hover:text-rose-300 group-hover:scale-125">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    <a href="https://www.facebook.com/people/Confworld-Educational-Research-and-Development-Association/61560894663027/" className="hover:text-rose-300 transition-colors duration-300">Facebook</a>
                  </li>
                  <li className="mb-2 flex items-center gap-x-2 group cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube transition-all duration-300 group-hover:text-rose-300 group-hover:scale-125">
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                      <path d="m10 15 5-3-5-3z" />
                    </svg>
                    <a href="https://www.youtube.com/@Confworld" className="hover:text-rose-300 transition-colors duration-300">Youtube</a>
                  </li>
                  <li className="mb-2 flex items-center gap-x-2 group cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram transition-all duration-300 group-hover:text-rose-300 group-hover:scale-125">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    <a href="https://www.instagram.com/infoconfworld/?hl=en" className="hover:text-rose-300 transition-colors duration-300">Instagram</a>
                  </li>
                  <li className="mb-2 flex items-center gap-x-2 group cursor-pointer">
                    <FaXTwitter className="w-4 h-4 transition-all duration-300 group-hover:text-rose-300 group-hover:scale-125" />
                    <a href="https://x.com/infoconfworld" className="hover:text-rose-300 transition-colors duration-300">Twitter</a>
                  </li>
                  <li className="mb-2 flex items-center gap-x-2 group cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin transition-all duration-300 group-hover:text-rose-300 group-hover:scale-125">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    <a href="https://www.linkedin.com/company/confworld-educational-research-and-development-association/" className="hover:text-rose-300 transition-colors duration-300">LinkedIn</a>
                  </li>
                  <li className="mb-2 flex items-center gap-x-2 group cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-4 h-4" fill="currentColor">
                      <path d="M16 .396C7.164.396 0 7.56 0 16.396c0 2.896.757 5.62 2.08 7.99L0 32l7.822-2.046A15.94 15.94 0 0 0 16 32c8.836 0 16-7.164 16-15.604C32 7.56 24.836.396 16 .396zm0 29.208c-2.574 0-4.992-.67-7.092-1.843l-.508-.302-4.642 1.214 1.238-4.522-.33-.522A13.51 13.51 0 0 1 2.49 16.396C2.49 9.11 8.724 2.876 16 2.876c7.276 0 13.51 6.234 13.51 13.52 0 7.286-6.234 13.208-13.51 13.208z" />
                    </svg>
                    <a href="https://whatsapp.com/channel/0029VbCQG5z4inos7Mt6r61W" className="hover:text-rose-300 transition-colors duration-300">Whatsapp</a>
                  </li>
                </ul>
              </div>

              {/* Contact Information */}
              <div
                className={`transition-all duration-1000 transform ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                }`}
                style={{ transitionDelay: "0.6s" }}
              >
                <ul className="text-rose-100 font-semibold space-y-2">
                  <li className="mb-4 flex justify-start items-center gap-x-2 group cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone transition-all duration-300 group-hover:text-rose-300">
                      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                    </svg>
                    <div className="hover:text-rose-300 transition-colors duration-300">+91 8072381719</div>
                  </li>
                  <li className="mb-4 flex justify-start items-center gap-x-2 group cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail transition-all duration-300 group-hover:text-rose-300">
                      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                    </svg>
                    <div className="hover:text-rose-300 transition-colors duration-300">info@icabmet.com</div>
                  </li>
                </ul>

                <div className="mt-6 pt-4 border-t border-rose-400/20 bg-rose-950/40 backdrop-blur-sm p-2 rounded-xl transition-all duration-300 hover:bg-rose-900/50 hover:shadow-lg hover:shadow-rose-400/20">
                  <h3 className="text-sm font-bold text-rose-300 mb-2">
                    Organizer Address:
                  </h3>
                  <div className="text-xs text-rose-200 space-y-1">
                    No.147/383A, Second Floor, Paper Mills Road, Peravallur,
                    Chennai-600082, Tamil Nadu, India.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-6 border-rose-400/20" />

          <div
            className={`sm:flex sm:items-center sm:justify-center transition-all duration-1000 transform ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "0.8s" }}
          >
            <span className="text-sm text-rose-200 sm:text-center hover:text-rose-300 transition-colors duration-300">
              © 2026{" "}
              <a href="https://confworld.org/" className="hover:underline">
                CERADA
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}

export default Footer;