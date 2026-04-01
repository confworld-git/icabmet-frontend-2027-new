"use client";

import { useState } from "react";
import Hero from '../commonhero/common-hero'
import {
  FlaskConical,
  Briefcase,
  Settings,
  Brain,
  Leaf,
  BarChart2,
  Network,
  GraduationCap,
} from "lucide-react";

const focusAreas = [
  {
    icon: <FlaskConical className="w-6 h-6" />,
    title: "Applied Sciences and Technology Innovations",
    description:
      "Explore advancements in applied science, engineering and cutting-edge technology applications, focusing on problem-solving for real-world challenges.",
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Sustainable Business Practices",
    description:
      "Investigate sustainable business models, entrepreneurship and innovative strategies that drive corporate responsibility and environmental stewardship.",
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Management and Leadership",
    description:
      "Delve into modern management theories, leadership practices and strategic decision-making that foster growth, resilience and adaptability in organizations.",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Digital Transformation and Industry 4.0",
    description:
      "Analyze the impact of digital technologies and automation on industries, including artificial intelligence, IoT and machine learning, with an emphasis on creating smarter, more efficient processes.",
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Environmental Sustainability and Renewable Energy",
    description:
      "Focus on renewable energy solutions, resource management and sustainable environmental practices that aim to address climate change and resource conservation.",
  },
  {
    icon: <BarChart2 className="w-6 h-6" />,
    title: "Data Science and Analytics",
    description:
      "Discover advancements in data analytics, big data and statistical modeling, exploring how data-driven insights enhance business operations and scientific research.",
  },
  {
    icon: <Network className="w-6 h-6" />,
    title: "Interdisciplinary Research and Collaborative Solutions",
    description:
      "Encourage collaborative research approaches across disciplines to develop innovative, integrated solutions for complex global challenges.",
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Education and Knowledge Dissemination",
    description:
      "Examine innovative educational strategies and knowledge-sharing methods that support learning in applied sciences, business and technology fields.",
  },
];

const objectives = [
  "To foster interdisciplinary research and dialogue among experts in applied sciences, business, engineering and technology.",
  "To explore and promote sustainable practices and innovation.",
  "To create a network of like-minded professionals dedicated to advancing practical solutions for real-world challenges.",
];

export default function AboutICABMET() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="bg-white">
      <Hero
        title="About ICABMET"
        breadcrumbs={[{ label: 'Home', link: '#' }]}
        backgroundImage="/images/commonheroimages/1.webp"
      />

      {/* ═══ ABOUT ═══ */}
      <section className="px-6 md:px-12 pt-14 pb-12">

        
        

        {/* About content grid */}
        <div className="grid lg:grid-cols-3 gap-0 border border-gray-200 mb-12">
          {/* Main text — 2 cols */}
          <div className="lg:col-span-2 p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-gray-200">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              ICABMET-2027 is a platform designed to foster interdisciplinary
              collaboration and share cutting-edge research across the fields of
              applied science, business and management, engineering and
              technology. Through keynote sessions, workshops and paper
              presentations, this conference provides a unique space to engage
              in discussions on innovation, sustainability and global impact.
              Participants will gain insights into current trends, challenges
              and breakthroughs that define these evolving sectors.
            </p>
          </div>

          {/* Stat panel */}
          <div className="flex flex-row lg:flex-col divide-x lg:divide-x-0 lg:divide-y divide-gray-200">
            <div className="flex-1 bg-rose-700 text-white p-8 flex flex-col justify-center">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white opacity-70 mb-3">Format</p>
              <p className="text-2xl font-black leading-tight">Hybrid</p>
              <p className="text-white opacity-70 text-sm mt-1">In Person + Online</p>
            </div>
            <div className="flex-1 bg-orange-500 text-white p-8 flex flex-col justify-center">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white opacity-70 mb-3">Sessions</p>
              <p className="text-2xl font-black leading-tight">Keynotes</p>
              <p className="text-white opacity-70 text-sm mt-1">Workshops · Papers</p>
            </div>
          </div>
        </div>

        {/* ═══ OBJECTIVES ═══ */}
        <div className="flex items-center gap-0 mb-8">
          <div className="bg-rose-700 text-white text-xs font-black uppercase tracking-[0.25em] px-4 py-2">
            Objectives
          </div>
          
          <div className="bg-orange-500 px-3 py-2 flex items-center">
            <span className="text-white text-xs font-black">✦</span>
          </div>
        </div>

        <div className="border border-gray-200 mb-12">
          {objectives.map((obj, i) => (
            <div
              key={i}
              className={`flex items-start gap-6 p-6 border-b last:border-b-0 border-gray-200 bg-white transition-colors duration-200 ${
                i % 2 === 0 ? "hover:bg-rose-700 group" : "hover:bg-orange-500 group"
              }`}
            >
              <div className={`shrink-0 w-10 h-10 flex items-center justify-center border-2 font-black text-sm transition-colors duration-200 ${
                i % 2 === 0
                  ? "border-rose-700 text-rose-700 group-hover:border-white group-hover:text-white"
                  : "border-orange-500 text-orange-500 group-hover:border-white group-hover:text-white"
              }`}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="text-base text-gray-700 leading-relaxed pt-2 group-hover:text-white transition-colors duration-200">{obj}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ THEME BAND ═══ */}
      <section className="relative bg-rose-700 px-6 md:px-12 py-14 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-rose-600 opacity-40" />
          <div className="absolute -bottom-20 right-10 w-80 h-80 rounded-full bg-rose-800 opacity-30" />
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 20px)',
          }} />
        </div>
        <div className="relative max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-300 mb-4">Conference Theme</p>
          <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-snug">
            "Driving Innovation and Sustainable Solutions: Interdisciplinary
            Approaches in Applied Sciences, Business and Technology"
          </p>
          <p className="text-white opacity-75 text-base md:text-lg mt-6 leading-relaxed max-w-3xl">
            The ICABMET-2027 theme highlights the critical need for collaborative
            research that spans multiple disciplines. By addressing the intersections
            of applied sciences, business strategies, engineering innovations and
            technology advancements, the conference encourages participants to
            consider holistic and sustainable solutions to address global challenges.
          </p>
        </div>
      </section>

      {/* ═══ KEY FOCUS AREAS ═══ */}
      <section className="px-6 md:px-12 pt-14 pb-12">

       

       
        <h1 className="text-4xl md:text-5xl text-center font-black text-rose-700 leading-tight pb-6">
          Key Focus Areas
        </h1>
        

        {/* Focus area grid — 2 cols */}
        <div className="border border-gray-200">
          {Array.from({ length: Math.ceil(focusAreas.length / 2) }).map((_, rowIdx) => (
            <div
              key={rowIdx}
              className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 border-b last:border-b-0 border-gray-200"
            >
              {focusAreas.slice(rowIdx * 2, rowIdx * 2 + 2).map((area, colIdx) => {
                const idx = rowIdx * 2 + colIdx;
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onMouseLeave={() => setActiveIndex(null)}
                    className={`group p-8 flex items-start gap-6 cursor-default transition-colors duration-200 ${
                      activeIndex === idx
                        ? isEven ? "bg-rose-700" : "bg-orange-500"
                        : "bg-white hover:bg-rose-50"
                    }`}
                  >
                    {/* Number */}
                    <div
                      className={`shrink-0 w-10 h-10 flex items-center justify-center border-2 font-black text-sm transition-colors duration-200 ${
                        activeIndex === idx
                          ? "border-white text-white"
                          : isEven
                          ? "border-rose-700 text-rose-700"
                          : "border-orange-500 text-orange-500"
                      }`}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`transition-colors duration-200 ${
                            activeIndex === idx
                              ? "text-white opacity-80"
                              : isEven
                              ? "text-rose-700"
                              : "text-orange-500"
                          }`}
                        >
                          {area.icon}
                        </span>
                        <h3
                          className={`text-base font-black leading-snug transition-colors duration-200 ${
                            activeIndex === idx ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {area.title}
                        </h3>
                      </div>
                      <p
                        className={`text-sm leading-relaxed transition-colors duration-200 ${
                          activeIndex === idx ? "text-white opacity-80" : "text-gray-500"
                        }`}
                      >
                        {area.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Closing note */}
        <div className="mt-0 bg-orange-500 border border-orange-500 border-t-0 px-8 py-6">
          <p className="text-sm md:text-base text-white leading-relaxed">
            Each of these areas will feature engaging sessions, discussions and
            workshops designed to deepen expertise, foster collaboration and inspire
            new approaches to addressing key global issues.
          </p>
        </div>
      </section>
    </div>
  );
}