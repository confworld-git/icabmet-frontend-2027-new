"use client";

import {
  Globe,
  BookOpen,
  TrendingUp,
  Network,
  Layers,
  GraduationCap,
  Award,
  Leaf,
  MonitorSmartphone,
} from "lucide-react";

const reasons = [
  {
    icon: <Globe className="w-10 h-10" />,
    title: "Engage with Global Experts",
    description:
      "Meet esteemed researchers, industry leaders and practitioners from around the world, sharing insights and advancements across multiple disciplines.",
  },
  {
    icon: <BookOpen className="w-10 h-10" />,
    title: "Present and Publish Your Research",
    description:
      "Showcase your work in front of an international audience and gain the opportunity to publish in conference proceedings, enhancing the visibility of your research.",
  },
  {
    icon: <TrendingUp className="w-10 h-10" />,
    title: "Discover Cutting-Edge Trends and Innovations",
    description:
      "Stay ahead by exploring the latest trends, technological breakthroughs and sustainable solutions that are shaping the future across applied sciences, business and engineering.",
  },
  {
    icon: <Network className="w-10 h-10" />,
    title: "Network and Build Collaborations",
    description:
      "Network with professionals from diverse backgrounds and discover potential collaborations, new perspectives and opportunities for future projects.",
  },
  {
    icon: <Layers className="w-10 h-10" />,
    title: "Access Multidisciplinary Insights",
    description:
      "Benefit from a multidisciplinary approach to problem-solving and innovation, enabling you to apply cross-disciplinary knowledge to your area of expertise.",
  },
  {
    icon: <GraduationCap className="w-10 h-10" />,
    title: "Enhance Professional Development",
    description:
      "Participate in workshops, panel discussions and breakout sessions led by experts, all geared toward developing skills and knowledge in various fields.",
  },
  {
    icon: <Award className="w-10 h-10" />,
    title: "Gain Certification and Recognitions",
    description:
      "Earn a conference participation certificate and recognition for your contributions, which can bolster your professional profile.",
  },
  {
    icon: <Leaf className="w-10 h-10" />,
    title: "Contribute to Sustainable Solutions",
    description:
      "Join like-minded individuals passionate about driving sustainable solutions in applied science, business and technology and contribute to global impact.",
  },
  {
    icon: <MonitorSmartphone className="w-10 h-10" />,
    title: "Flexible Participation Options",
    description:
      "With both in-person and virtual attendance options, ICABMET-2027 ensures accessibility and convenience, allowing you to join from anywhere.",
  },
];

export default function WhyJoinUs() {
  return (
    <section className="bg-white">

      {/* ── Header ── */}
      <div className="px-4 pb-10">
        
       

        
         <h1 className="text-4xl md:text-5xl text-center font-black text-rose-700 leading-tight pb-6">
          Why Join Us
        </h1>
       
        <p className="text-base md:text-lg text-gray-600 leading-relaxed ">
          Joining the{" "}
          <span className="font-semibold text-gray-800">
            3<sup>rd</sup> International Conference on Applied Science, Business and
            Management, Engineering & Technology (ICABMET-2027)
          </span>{" "}
          is an exceptional opportunity to connect, collaborate and expand your
          knowledge. Here's why you should be a part of this conference:
        </p>
      </div>

      {/* ── Alternating rows ── */}
      <div>
        {reasons.map((item, i) => {
          const isEven = i % 2 === 0;
          const num = String(i + 1).padStart(2, "0");

          return (
            <div
              key={i}
              className={`flex flex-col md:flex-row ${isEven ? "" : "md:flex-row-reverse"}`}
            >
              {/* Color slab — rose primary / orange secondary */}
              <div
                className={`md:w-64 lg:w-80 shrink-0 flex flex-col items-center justify-center gap-4 py-10 px-8 ${
                  isEven ? "bg-rose-700" : "bg-orange-500"
                }`}
              >
                <span className="text-white opacity-80">{item.icon}</span>
                <span className="text-5xl font-black text-white opacity-20 leading-none select-none">
                  {num}
                </span>
              </div>

              {/* Content slab — white bg for all rows */}
              <div className="flex-1 flex items-center px-8 md:px-12 py-8 border-b border-gray-100 bg-white">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs font-black uppercase tracking-[0.25em] ${isEven ? "text-rose-700" : "text-orange-500"}`}>
                      {num}
                    </span>
                    <div className={`h-px w-8 ${isEven ? "bg-rose-700" : "bg-orange-500"}`} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Closing band ── */}
      <div className="bg-rose-700 px-6 md:px-12 py-10 flex flex-col md:flex-row items-start md:items-center gap-6">
        <p className="text-base md:text-lg text-white opacity-80 leading-relaxed flex-1">
          Your presence will not only enhance your professional journey but also
          support the ongoing dialogue in driving innovation and sustainable
          practices globally.{" "}
          <span className="text-white font-bold opacity-100">
            Join us to be a part of this transformative experience!
          </span>
        </p>
        <div className="shrink-0 bg-orange-500 text-white text-xs font-black uppercase tracking-[0.25em] px-6 py-3 whitespace-nowrap">
          Join ICABMET · 2027
        </div>
      </div>
    </section>
  );
}