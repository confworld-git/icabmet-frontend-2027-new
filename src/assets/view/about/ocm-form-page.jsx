import React, { useState, useEffect, useRef } from "react";
import OCMform from "./OCMForm";
import Hero from "../commonhero/common-hero";

const OCMFormPage = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("organizing");
  const [hoveredRole, setHoveredRole] = useState(null);

  useEffect(() => {
    const target = document.getElementById("OCMform");
    if (target) {
      const observer = new IntersectionObserver(
        ([entry]) => setIsVisible(!entry.isIntersecting),
        { threshold: 0.3 },
      );
      observer.observe(target);
      return () => observer.disconnect();
    }
  }, []);

  const roles = [
    {
      name: "Strategic Guidance",
      desc: "Offering expert advice to guide CERADA's direction and long-term vision.",
      num: "01",
    },
    {
      name: "Conference Planning",
      desc: "Assisting in the development of conference themes and selection of speakers.",
      num: "02",
    },
    {
      name: "Review & Feedback",
      desc: "Reviewing research submissions and providing constructive, expert feedback.",
      num: "03",
    },
    {
      name: "Abstract / Full Paper Review",
      desc: "Evaluating submissions and ensuring alignment with the conference theme.",
      num: "04",
    },
    {
      name: "Networking",
      desc: "Facilitating connections with other researchers and professionals worldwide.",
      num: "05",
    },
    {
      name: "Outreach",
      desc: "Promoting CERADA's initiatives and recruiting new members and participants.",
      num: "06",
    },
    {
      name: "Mentorship",
      desc: "Supporting young researchers and professionals in their academic growth.",
      num: "07",
    },
    {
      name: "Planning & Coordination",
      desc: "Assisting with overall event organization including venue logistics and agenda setting.",
      num: "08",
    },
    {
      name: "Promotion",
      desc: "Engaging in marketing and outreach to attract participants and speakers.",
      num: "09",
    },
    {
      name: "Onsite Management",
      desc: "Facilitating sessions, guiding attendees and managing technical issues during hybrid events.",
      num: "10",
    },
    {
      name: "Post-Conference Tasks",
      desc: "Ensuring the publication of proceedings and addressing participant feedback.",
      num: "11",
    },
  ];

  const qualifications = {
    organizing: {
      label: "Organizing Committee",
      tagline: "The architects of our vision",
      requirements: [
        "Doctorates with over 10 years of professional experience",
        "Keynote speakers in at least 5 international conferences",
        "CEOs / Managing Directors / Deans / Principals",
        "Research Experts with demonstrated impact",
      ],
      responsibilities:
        "Responsible for selecting the conference venue, deciding on institutional and media partners and identifying potential co-hosts. They have the authority to choose keynote speakers, appoint program chairs and determine session topics.",
    },
    advisory: {
      label: "Advisory Committee",
      tagline: "The pillars of academic excellence",
      requirements: [
        "Dean / Director / Principal with a doctorate",
        "Professors / HODs with 10+ years of experience",
        "Associate / Assistant Professors with 5+ years of experience",
        "Industrial Professionals with 8+ years of experience",
        "Professionals from the host country",
      ],
      responsibilities:
        "Works closely with other teams to maintain the event schedule, assist with hospitality and registration and coordinate venue setup. They ensure that the conference environment is well-prepared and runs smoothly from start to finish.",
    },
    scientific: {
      label: "Scientific Committee",
      tagline: "The guardians of academic integrity",
      requirements: [
        "Dean / Director / Principal with a Doctorate",
        "Editorial Board Member of a Prestigious Journal",
        "Must be an experienced peer Reviewer",
        "Served on review committees for 10+ international conferences",
      ],
      responsibilities:
        "Comprises three subcommittees: Review, Technical and Editorial. Sets important dates, manages paper submissions, develops the final program and evaluates abstracts for acceptance at the educational conference.",
    },
    hospitality: {
      label: "Hospitality Committee",
      tagline: "The faces of our welcome",
      requirements: [
        "Dean / Director / Principal with a Doctorate",
        "Professor / HODs with 10+ years of experience",
        "Associate / Assistant Professors with 5+ years of experience",
        "Industrial Professionals with 8+ years of experience",
        "Professionals from the host country",
      ],
      responsibilities:
        "Provides conference venue details, shares the organization's background and addresses participant inquiries. Volunteers assist in hospitality, registration, venue setup and conference activities on a rotating schedule.",
    },
  };

  const tabs = Object.entries(qualifications);

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        .role-row {
          border-bottom: 2px solid #fde8d8;
          transition: all 0.25s ease;
          cursor: default;
        }
        .role-row:hover {
          background: #be123c;
          padding-left: 1.5rem;
        }
        .role-row:hover .role-num {
          color: #fff;
          opacity: 0.5;
        }
        .role-row:hover .role-name {
          color: #fff;
        }
        .role-row:hover .role-desc {
          color: rgba(255,255,255,0.75);
        }
        .role-row:hover .role-dots {
          border-color: rgba(255,255,255,0.3);
        }

        .tab-btn {
          position: relative;
          transition: all 0.2s ease;
          border-bottom: 3px solid transparent;
        }
        .tab-btn.active {
          border-bottom-color: #be123c;
          color: #be123c;
        }
        .tab-btn:hover:not(.active) {
          border-bottom-color: #f97316;
          color: #f97316;
        }

        .diagonal-stripe {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 10px,
            rgba(190,18,60,0.04) 10px,
            rgba(190,18,60,0.04) 20px
          );
        }

        .apply-btn {
          transition: all 0.3s ease;
          letter-spacing: 0.15em;
        }
        .apply-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(249,115,22,0.4);
        }

        .req-item {
          transition: all 0.2s;
        }
        .req-item:hover {
          transform: translateX(6px);
        }

        .section-label {
          letter-spacing: 0.25em;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
        }

        .scroll-line {
          animation: scrollDown 1.5s ease-in-out infinite;
        }
        @keyframes scrollDown {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.4; }
        }

        .number-badge {
          font-family: 'Playfair Display', serif;
          font-style: italic;
        }
      `}</style>

      <Hero
        title="Organizing Committee Form"
        breadcrumbs={[{ label: "Home", link: "#" }]}
        backgroundImage="/images/commonheroimages/5.webp"
      />

      {/* ── INTRO BANNER ── */}
      <div className="bg-rose-700 text-white py-5 px-6 overflow-hidden relative">
        <div
          className="diagonal-stripe"
          style={{
            background:
              "repeating-linear-gradient(-45deg,transparent,transparent 12px,rgba(255,255,255,0.04) 12px,rgba(255,255,255,0.04) 24px)",
          }}
        />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative z-10 page-font">
          <p className="text-white opacity-80 text-sm tracking-widest uppercase">
            CERADA Organizing Committee · Open Recruitment
          </p>
          <p className="text-white font-medium text-sm">
            Join a network of global academic leaders shaping the future of
            education.
          </p>
          <a
            href="#OCMform"
            className="shrink-0 bg-orange-500 text-white text-xs font-bold tracking-widest uppercase px-6 py-2 apply-btn"
          >
            Apply Now ↓
          </a>
        </div>
      </div>

      {/* ── KEY RESPONSIBILITIES ── */}
      <section className="py-20 px-6 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end gap-8 mb-16">
            <div className="flex-1">
              <div className="flex items-center gap-0 mb-6">
                <div className="bg-rose-700 text-white text-xs font-black uppercase tracking-[0.25em] px-4 py-2">
                  What You'll Do
                </div>
                <div className="bg-orange-500 px-3 py-2 flex items-center">
                  <span className="text-white text-xs font-black">✦</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-rose-700 leading-tight pb-6">
                Key Responsibilities
              </h1>
            </div>
            <div className="md:w-80">
              <div className="w-16 h-1 bg-orange-500 mb-4" />
              <p className="page-font text-gray-500 text-sm leading-relaxed">
                Committee members play multifaceted roles that span the full
                lifecycle of our international conferences — from ideation
                through publication.
              </p>
            </div>
          </div>

          {/* Role rows */}
          <div className="border-t-2 border-rose-700">
            {roles.map((role, idx) => (
              <div
                key={idx}
                className="role-row py-6 px-0 flex items-center gap-6 group"
                onMouseEnter={() => setHoveredRole(idx)}
                onMouseLeave={() => setHoveredRole(null)}
              >
                <span className="w-12 flex justify-center shrink-0 text-orange-500 text-3xl">
                  ✦
                </span>{" "}
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                  <h3 className="role-name display-font text-xl font-black text-gray-900 shrink-0 transition-colors duration-200">
                    {role.name}
                  </h3>
                  <div className="role-dots hidden sm:block flex-1 border-b-2 border-dotted border-rose-200 mb-1 transition-colors duration-200" />
                  <p className="role-desc page-font text-gray-500 text-sm sm:text-right sm:max-w-xs transition-colors duration-200">
                    {role.desc}
                  </p>
                </div>
                <span
                  className={`text-orange-500 text-2xl font-black transition-all duration-200 ${hoveredRole === idx ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
                >
                  →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="bg-orange-500 py-10 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-6">
          <div className="flex-1 h-px bg-white opacity-40" />
          <p className="section-label text-white text-center whitespace-nowrap">
            ACADEMIC EXCELLENCE AT EVERY LEVEL
          </p>
          <div className="flex-1 h-px bg-white opacity-40" />
        </div>
      </div>

      {/* ── WHO WE'RE LOOKING FOR ── */}
      <section className="py-8 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full -translate-y-32 translate-x-32 opacity-5" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-700 rounded-full translate-y-24 -translate-x-24 opacity-5" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="">
            <p className="section-label text-rose-700 mb-3">
              COMMITTEE STRUCTURES
            </p>

            <h1 className="text-4xl md:text-5xl font-black text-rose-700 leading-tight pb-6">
              Who We're Looking For
            </h1>
          </div>

          {/* Tab navigation */}
          <div className="flex flex-wrap gap-0 border-b border-gray-200 mb-10 page-font">
            {tabs.map(([key, val]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`tab-btn px-5 py-3 text-sm font-medium text-gray-500 bg-transparent ${activeTab === key ? "active" : ""}`}
              >
                {val.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {tabs.map(([key, qual]) =>
            activeTab === key ? (
              <div
                key={key}
                className="grid md:grid-cols-5 gap-0 bg-white shadow-sm overflow-hidden"
              >
                {/* Left panel — rose-700 */}
                <div className="md:col-span-2 bg-rose-700 p-10 flex flex-col justify-between">
                  <div>
                    <p className="section-label text-orange-300 mb-4">
                      {qual.tagline.toUpperCase()}
                    </p>
                    <h3 className="display-font text-3xl font-black text-white leading-tight mb-8">
                      {qual.label}
                    </h3>
                    <div className="w-12 h-0.5 bg-orange-500 mb-8" />
                    <p className="page-font text-white opacity-80 text-sm leading-relaxed">
                      {qual.responsibilities}
                    </p>
                  </div>
                  <div className="mt-10">
                    <a
                      href="#OCMform"
                      className="inline-block bg-orange-500 text-white text-xs font-bold tracking-widest uppercase px-6 py-3 apply-btn"
                    >
                      Apply for This Role →
                    </a>
                  </div>
                </div>

                {/* Right panel — requirements */}
                <div className="md:col-span-3 p-10">
                  <p className="section-label text-rose-700 mb-6">
                    ELIGIBILITY REQUIREMENTS
                  </p>
                  <ul className="space-y-4">
                    {qual.requirements.map((item, i) => (
                      <li
                        key={i}
                        className="req-item flex items-start gap-4 page-font"
                      >
                        <span className="number-badge text-orange-400 text-2xl font-bold leading-none w-8 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1">
                          <p className="text-gray-800 text-base leading-relaxed">
                            {item}
                          </p>
                          {i < qual.requirements.length - 1 && (
                            <div className="mt-4 border-b border-orange-100" />
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null,
          )}

          {/* Committee overview pills */}
          <div className="mt-10 flex flex-wrap gap-3 page-font">
            {tabs.map(([key, val]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 text-xs font-medium tracking-wider uppercase border transition-all duration-200 ${
                  activeTab === key
                    ? "bg-rose-700 border-rose-700 text-white"
                    : "bg-white border-orange-300 text-orange-500 hover:border-orange-500"
                }`}
              >
                {val.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLY SECTION ── */}
      <section
        id="OCMform"
        className="py-8 px-6 bg-white relative overflow-hidden"
      >
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-orange-500" />

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end gap-8 mb-12">
            <div className="flex-1">
              <p className="section-label text-rose-700 mb-3">JOIN US</p>

              <h1 className="text-4xl md:text-5xl font-black text-rose-700 leading-tight pb-6">
                Ready to Apply?
              </h1>
            </div>
            <div className="md:w-90 page-font">
              <div className="w-12 h-px bg-orange-500 mb-4" />
              <p className="text-gray-500 text-sm leading-relaxed">
                Complete the form below to join our distinguished committee of
                global educators and researchers.
              </p>
            </div>
          </div>

          <div className="border-t-4 border-rose-700 pt-10">
            <OCMform />
          </div>
        </div>
      </section>

      {/* ── FIXED APPLY BUTTON ── */}
      {isVisible && (
        <a
          href="#OCMform"
          className="apply-btn fixed bottom-8 right-8 z-50 bg-orange-500 text-white page-font font-bold text-xs tracking-widest uppercase px-7 py-4 shadow-2xl flex items-center gap-3"
        >
          <span>APPLY NOW</span>
          <span className="scroll-line inline-block">↓</span>
        </a>
      )}
    </div>
  );
};

export default OCMFormPage;
