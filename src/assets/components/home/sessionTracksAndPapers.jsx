import { useState } from "react";

export default function SessionAndPapers() {
  const conferenceSessions = [
    {
      id: "applied-science",
      title: "Session 1: Applied Science Innovations",
      cover: "/images/session/session 1.webp",
    },
    {
      id: "business-management",
      title: "Session 2: Business and Management Trends",
      cover: "/images/session/session 2.webp",
    },
    {
      id: "engineering-tech",
      title: "Session 3: Engineering and Technological Advancements",
      cover: "/images/session/session 3.webp",
    },
    {
      id: "sustainable-development",
      title: "Session 4: Sustainable Development and Global Challenges",
      cover: "/images/session/session 4.webp",
    },
    {
      id: "healthcare-tech",
      title: "Session 5: Healthcare Technology and Biomedical Engineering",
      cover: "/images/session/session 5.webp",
    },
    {
      id: "it-data-science",
      title: "Session 6: Information Technology and Data Science",
      cover: "/images/session/session 6.webp",
    },
    {
      id: "education-society",
      title: "Session 7: Education, Society and Innovation",
      cover: "/images/session/session 7.webp",
    },
    {
      id: "emerging-industry",
      title: "Session 8: Emerging Technologies in Industry",
      cover: "/images/session/session 8.webp",
    },
  ];

  return (
    <div className="flex justify-center  ">
      <div className="w-full px-4">
        
      
            <h1 className="text-4xl md:text-5xl text-center font-black text-rose-700 leading-tight pb-6">
         Session Tracks / Call for Papers
        </h1>
        
        <p className="text-center my-5 text-gray-700   text-lg">
          We invite researchers, scholars and practitioners to contribute to the ICABMET-2027 conference by submitting papers and session proposals. Share your groundbreaking research, ideas and perspectives across various fields to advance the conference's focus on <span className="font-semibold text-orange-500">Interdisciplinary Innovations for a Sustainable Future</span>.
        </p>

        <p className="text-center mb-8 text-gray-600">
          Topics of interest include, but are not limited to:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conferenceSessions.map(({ id, cover, title }, index) => (
            <a
              key={index} 
              href={`/session-tracks-call-for-papers#${id}`}
              className="block group"
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500">
  <img
    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 border-4 border-rose-600 rounded-xl"
    src={cover}
    alt={title}
    title={title}
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end p-5">
    {/* <h3 className="text-white font-semibold text-lg leading-snug drop-shadow-md">
      {title}
    </h3> */}
  </div>
</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}