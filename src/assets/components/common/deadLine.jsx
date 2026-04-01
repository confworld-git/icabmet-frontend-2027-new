"use client";

import { Bird, PenTool, FileText, CalendarCheck } from "lucide-react";

const deadlines = [
  {
    icon: <Bird className="w-8 h-8" />,
    title: "Early Bird Registration",
    day: "30",
    suffix: "th",
    month: "Sep 2026",
    secondary: false,
  },
  {
    icon: <PenTool className="w-8 h-8" />,
    title: "Abstract Submission",
    day: "31",
    suffix: "st",
    month: "Aug 2026",
    secondary: true,
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Full Paper Submission",
    day: "30",
    suffix: "th",
    month: "Sep 2026",
    secondary: false,
  },
  {
    icon: <CalendarCheck className="w-8 h-8" />,
    title: "Final Registration",
    day: "31",
    suffix: "st",
    month: "Oct 2026",
    secondary: true,
  },
];

export default function SubmissionDeadlines() {
  return (
    <section className="px-4 pt-14 pb-8 bg-white">
      {/* Header */}
        
        <h1 className="text-4xl md:text-5xl font-black text-center text-rose-700 leading-tight">
         Submission Deadlines
        </h1>
        <p className="text-gray-500 text-base text-center font-medium pb-6">
          Secure your spot – Mark your calendar!
        </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {deadlines.map((item, i) => (
          <div
            key={i}
            className="relative flex flex-col rounded-2xl overflow-hidden shadow-lg border border-gray-200"
          >
            {/* Pin dots */}
            <div className="absolute top-0 left-0 right-0 flex justify-around px-8 -translate-y-1/2 z-10 pointer-events-none">
              <div className="w-3 h-3 rounded-full bg-gray-800 shadow" />
              <div className="w-3 h-3 rounded-full bg-gray-800 shadow" />
            </div>

            {/* Top — primary rose or secondary orange */}
            <div className={`${item.secondary ? "bg-orange-500" : "bg-rose-700"} text-white px-5 pt-6 pb-5 text-center`}>
              <p className="text-sm font-black uppercase tracking-wide leading-snug mb-3">
                {item.title}
              </p>
              <div className="flex justify-center text-white opacity-80">
                {item.icon}
              </div>
            </div>

            {/* Bottom — white date */}
            <div className="bg-white flex-1 flex flex-col items-center justify-center py-6 px-4">
              <div className="flex items-start justify-center leading-none mb-1">
                <span className={`text-6xl font-black leading-none ${item.secondary ? "text-orange-500" : "text-rose-700"}`}>
                  {item.day}
                </span>
                <span className={`text-xl font-black mt-2 ${item.secondary ? "text-orange-500" : "text-rose-700"}`}>
                  {item.suffix}
                </span>
              </div>
              <p className="text-gray-700 font-bold text-base mt-1">
                {item.month}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}