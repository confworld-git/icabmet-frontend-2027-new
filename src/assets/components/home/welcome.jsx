"use client";

import { useState } from "react";
import {
  Users,
  Globe,
  Lightbulb,
  Target,
  BookOpen,
  Building,
  FlaskConical,
  Briefcase,
  Cpu,
  Leaf,
  ChevronRight,
} from "lucide-react";
import ConferenceTheme from "./conftheme";

export default function Welcome() {
  const [activeIndex, setActiveIndex] = useState(null);

  const objectives = [
    {
      icon: <Users className="w-5 h-5" />,
      title: "Encourage interdisciplinary collaboration",
      description:
        "Among researchers, academicians, industry experts and policymakers across applied sciences, business and technology.",
    },
    {
      icon: <Building className="w-5 h-5" />,
      title: "Bridge the gap between science, technology, business and society",
      description:
        "Through knowledge-sharing, discourse and practical innovation that transcends boundaries.",
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Empower future leaders and young scholars",
      description:
        "With insights and opportunities for global engagement and sustainable impact.",
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Foster solutions that are practical, inclusive and impactful",
      description:
        "In addressing real-world challenges faced by industries across the globe.",
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Promote innovative research and practices",
      description:
        "That drive sustainable development across engineering, business and applied sciences.",
    },
  ];

  const pillars = [
    { icon: <FlaskConical className="w-8 h-8" />, label: "Applied Sciences", desc: "Cutting-edge research and scientific inquiry" },
    { icon: <Briefcase className="w-8 h-8" />, label: "Business & Management", desc: "Strategic leadership and organizational excellence" },
    { icon: <Cpu className="w-8 h-8" />, label: "Engineering", desc: "Innovative systems and technical solutions" },
    { icon: <Leaf className="w-8 h-8" />, label: "Technology", desc: "Digital transformation and emerging tech" },
  ];

  return (
    <div className="bg-white pt-8">

      {/* ═══════════════════ WELCOME ═══════════════════ */}
      <section className="px-4">
        <h1 className="text-4xl md:text-5xl font-black text-rose-700 leading-tight pb-6">
          Welcome to ICABMET-2027
        </h1>

        <div className="grid lg:grid-cols-5 gap-6">

          <div className="lg:col-span-3 space-y-5">
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
              The{" "}
              <strong className="text-rose-700">
                3<sup>rd</sup> International Conference on Applied Science, Business and
                Management, Engineering & Technology
              </strong>{" "}
              invites researchers, academics, professionals and students to join
              us for a transformative experience in interdisciplinary research
              and collaboration.
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              Focused on{" "}
              <span className="font-semibold text-gray-800">
                "Driving Innovation and Sustainable Solutions,"
              </span>{" "}
              the conference brings together experts from diverse fields to
              address pressing global challenges through innovative and
              sustainable approaches.
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              This hybrid conference offers the flexibility to join either in
              person in the vibrant city of Chennai, India or virtually from
              anywhere in the world — making it accessible to a truly global
              audience.
            </p>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Global reach — primary rose */}
            <div className="bg-rose-700 text-white p-6 flex items-start gap-4">
              <Globe className="w-10 h-10 shrink-0 mt-1 opacity-90" />
              <div>
                <p className="text-xl font-black leading-tight mb-1">Global Reach</p>
                <p className="text-white text-sm leading-relaxed opacity-80">
                  Connecting researchers, academics and professionals from across continents in one platform.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* In Person — secondary orange */}
              <div className="bg-orange-500 text-white p-5 flex flex-col gap-2">
                <div className="w-8 h-8 bg-white flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-xs font-black uppercase tracking-wider text-white">In Person</p>
                <p className="text-sm font-bold text-white leading-snug">Chennai, India</p>
              </div>
              {/* Online — white */}
              <div className="bg-white border-2 border-rose-700 p-5 flex flex-col gap-2">
                <div className="w-8 h-8 bg-rose-700 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                  </svg>
                </div>
                <p className="text-xs font-black uppercase tracking-wider text-rose-700">Online</p>
                <p className="text-sm font-bold text-gray-800 leading-snug">Worldwide</p>
              </div>
            </div>

            {/* Date strip */}
            <div className="bg-white border-2 border-rose-700 flex overflow-hidden">
              <div className="bg-orange-500 text-white px-5 py-4 text-center shrink-0 flex flex-col justify-center">
                <p className="text-2xl font-black leading-none">26–27</p>
                <p className="text-xs font-bold uppercase tracking-wider text-white opacity-80 mt-1">Jul 2027</p>
              </div>
              <div className="px-5 py-4 flex flex-col justify-center">
                <p className="text-xs font-black uppercase tracking-wider text-rose-700 mb-1">Conference Date</p>
                <p className="text-sm text-gray-600 leading-snug">Chennai, India · Hybrid</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars — rose primary / orange secondary alternating */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border-2 border-rose-700 mt-8">
          {pillars.map((p, i) => (
            <div
              key={i}
              className={`p-6 border-r-2 last:border-r-0 border-rose-700 transition-colors duration-200 cursor-default group ${
                i >= 2 ? "border-t-2 lg:border-t-0 border-rose-700" : ""
              } ${i % 2 === 0 ? "hover:bg-rose-700" : "hover:bg-orange-500"}`}
            >
              <span className={`transition-colors duration-200 block mb-3 group-hover:text-white ${i % 2 === 0 ? "text-rose-700" : "text-orange-500"}`}>
                {p.icon}
              </span>
              <p className="text-sm font-black uppercase tracking-wide text-gray-900 group-hover:text-white transition-colors duration-200 mb-1">
                {p.label}
              </p>
              <p className="text-xs text-gray-500 group-hover:text-white group-hover:opacity-80 transition-colors duration-200 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ JOIN US BANNER ═══════════════════ */}
      <section className="relative bg-rose-700 px-6 md:px-12 py-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-rose-600 opacity-40" />
          <div className="absolute -bottom-20 right-10 w-80 h-80 rounded-full bg-rose-800 opacity-30" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-snug">
            Join us in redefining how applied sciences,
            <br className="hidden md:block" /> business &amp; engineering intersect
            to build a{" "}
            <span className="text-orange-300 underline decoration-orange-300 underline-offset-4">
              sustainable future.
            </span>
          </p>
        </div>
      </section>

      {/* ═══════════════════ CONFERENCE THEME ═══════════════════ */}
      <section className="px-6 md:px-12 pt-14 pb-12">

        <div className="flex items-center gap-0 mb-8">
          <div className="bg-rose-700 text-white text-xs font-black uppercase tracking-[0.25em] px-4 py-2">
            Conference Theme
          </div>
          <div className="bg-orange-500 px-3 py-2 flex items-center">
            <span className="text-white text-xs font-black">✦</span>
          </div>
        </div>

        <ConferenceTheme />

        <div className="grid lg:grid-cols-3 gap-0 mb-12 border-2 border-rose-700 overflow-hidden">
          {/* Theme Focus — primary rose */}
          <div className="bg-rose-700 p-8 flex flex-col ">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-white  mb-4">Theme Focus</p>
              <p className="text-white text-lg font-bold leading-relaxed">
                Combining interdisciplinary insights to foster sustainable solutions and innovations.
              </p>
            </div>
            <div className="space-y-2 pt-4">
              {["Applied Science", "Business & Management", "Engineering & Technology", "Innovation", "Sustainability"].map((tag, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full shrink-0 opacity-60" />
                  <span className="text-white text-sm font-semibold opacity-90">{tag}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 grid md:grid-rows-2 divide-y-2 divide-rose-700">
            {/* Why It Matters — white */}
            <div className="bg-white p-8">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-rose-700 mb-3">Why It Matters</p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                As industries face complex challenges, ICABMET-2027's focus is on creating
                holistic, adaptable strategies that integrate applied sciences with
                business acumen and engineering technology.
              </p>
            </div>
            {/* Our Vision — secondary orange */}
            <div className="bg-orange-500 p-8">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white  mb-3">Our Vision</p>
              <p className="text-base md:text-lg text-white leading-relaxed">
                By uniting applied sciences, business practices, engineering and
                technology, the conference aims to foster creativity, collaboration
                and sustainable solutions that transcend traditional boundaries and
                create real-world impact.
              </p>
            </div>
          </div>
        </div>

        {/* ══ OBJECTIVES ══ */}
        <div className="flex items-center gap-0 mb-8">
          <div className="bg-rose-700 text-white text-xs font-black uppercase tracking-[0.25em] px-4 py-2">
            Conference Objectives
          </div>
          <div className="bg-orange-500 px-3 py-2 flex items-center">
            <span className="text-white text-xs font-black">✦</span>
          </div>
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">
          Through this theme, ICABMET‑2027 seeks:
        </h3>

        <div className="space-y-0 border-2 border-rose-700">
          {objectives.map((obj, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
              className={`flex items-start gap-6 p-6 border-b-2 last:border-b-0 border-rose-700 transition-colors duration-200 cursor-default ${
                activeIndex === idx
                  ? idx % 2 === 0 ? "bg-rose-700" : "bg-orange-500"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              {/* <div
                className={`shrink-0 w-10 h-10 flex items-center justify-center font-black text-sm border-2 transition-colors duration-200 ${
                  activeIndex === idx
                    ? "border-white text-white"
                    : idx % 2 === 0
                    ? "border-rose-700 text-rose-700"
                    : "border-orange-500 text-orange-500"
                }`}
              >
                {String(idx + 1).padStart(2, "0")}
              </div> */}

              <div className="flex items-start gap-4 flex-1">
                <span
                  className={`mt-0.5 shrink-0 transition-colors duration-200 ${
                    activeIndex === idx
                      ? "text-white opacity-80"
                      : idx % 2 === 0
                      ? "text-rose-700"
                      : "text-orange-500"
                  }`}
                >
                  {obj.icon}
                </span>
                <div>
                  <h4
                    className={`text-base font-black mb-1 transition-colors duration-200 ${
                      activeIndex === idx ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {obj.title}
                  </h4>
                  <p
                    className={`text-sm leading-relaxed transition-colors duration-200 ${
                      activeIndex === idx ? "text-white opacity-80" : "text-gray-500"
                    }`}
                  >
                    {obj.description}
                  </p>
                </div>
              </div>

              <ChevronRight
                className={`shrink-0 w-5 h-5 mt-0.5 transition-colors duration-200 ${
                  activeIndex === idx ? "text-white opacity-60" : "text-gray-300"
                }`}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}