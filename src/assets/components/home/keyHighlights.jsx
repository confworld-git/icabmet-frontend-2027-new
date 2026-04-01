"use client";

import {
  Mic2,
  MessageSquare,
  Wrench,
  Users,
  BookOpen,
  Wifi,
  Award,
} from "lucide-react";

const highlights = [
  {
    icon: <Mic2 className="w-7 h-7" />,
    title: "Keynote Speakers",
    description:
      "Hear from leaders in applied science, business, engineering and technology.",
  },
  {
    icon: <MessageSquare className="w-7 h-7" />,
    title: "Panel Discussions",
    description:
      "Engage with diverse perspectives on sustainable development, interdisciplinary approaches and the future of these fields.",
  },
  {
    icon: <Wrench className="w-7 h-7" />,
    title: "Workshops",
    description:
      "Participate in hands-on sessions designed to enhance practical skills and research methods.",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Networking Events",
    description:
      "Connect with peers, collaborators and potential mentors.",
  },
  {
    icon: <BookOpen className="w-7 h-7" />,
    title: "Publication Opportunities",
    description:
      "Present your research and get it published in Scopus-indexed journals and Clarivate WoS proceedings.",
  },
  {
    icon: <Wifi className="w-7 h-7" />,
    title: "Hybrid Flexibility",
    description:
      "Choose to attend in person or virtually, with full access to all conference sessions, materials and networking opportunities.",
  },
  {
    icon: <Award className="w-7 h-7" />,
    title: "CERADA Awards",
    description:
      "Celebrate excellence with our prestigious awards, recognizing outstanding contributions to the field.",
  },
];

export default function KeyHighlights() {
  return (
    <section className="px-4 pb-12 bg-white">

     
     
      <h1 className="text-4xl md:text-5xl font-black text-rose-700 leading-tight pb-6">
         Key Highlights
        </h1>


      {/* Grid — first 6 in 3-col, last one full width */}
      <div className="border border-gray-200">

        {/* Row 1 — 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 border-b border-gray-200">
          {highlights.slice(0, 3).map((item, i) => (
            <Card key={i} item={item} index={i} />
          ))}
        </div>

        {/* Row 2 — 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 border-b border-gray-200">
          {highlights.slice(3, 6).map((item, i) => (
            <Card key={i + 3} item={item} index={i + 3} />
          ))}
        </div>

        {/* Last card — full width featured */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-3 flex flex-col md:flex-row items-start md:items-center gap-6 p-8 bg-rose-700 group">
            <div className="shrink-0 w-14 h-14 flex items-center justify-center border-2 border-rose-300 text-white">
              {highlights[6].icon}
            </div>
            <div className="flex-1">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-rose-300 mb-1">
                Featured Highlight
              </p>
              <h3 className="text-xl md:text-2xl font-black text-white mb-2">
                {highlights[6].title}
              </h3>
              <p className="text-rose-200 text-base leading-relaxed max-w-2xl">
                {highlights[6].description}
              </p>
            </div>
            {/* Decorative large text */}
            <div className="hidden md:block text-[80px] font-black text-rose-600 leading-none select-none">
              07
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ item, index }) {
  const isOdd = (index + 1) % 2 !== 0;
  return (
    <div className={`group p-8 hover:bg-rose-700 transition-colors duration-200 cursor-default ${isOdd ? "bg-rose-100" : "bg-white"}`}>
      {/* Number + icon row */}
      <div className="flex items-center justify-between mb-6">
        <div className="w-10 h-10 flex items-center justify-center border-2 border-rose-700 group-hover:border-white text-rose-700 group-hover:text-white font-black text-sm transition-colors duration-200">
          {String(index + 1).padStart(2, "0")}
        </div>
        <span className="text-rose-700 group-hover:text-rose-200 transition-colors duration-200">
          {item.icon}
        </span>
      </div>

      {/* Text */}
      <h3 className="text-lg font-black text-gray-900 group-hover:text-white mb-2 transition-colors duration-200">
        {item.title}
      </h3>
      <p className="text-sm text-gray-500 group-hover:text-rose-200 leading-relaxed transition-colors duration-200">
        {item.description}
      </p>
    </div>
  );
}