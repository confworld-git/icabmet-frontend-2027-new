import React from 'react';

const PlatformCard = ({ title, description, href, accent, bgGradient }) => {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="bg-white border border-gray-200 rounded-xl p-8 h-80 flex flex-col justify-between hover:border-gray-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div className={`p-3 ${accent.bg} rounded-lg`}>
              <svg className={`w-6 h-6 ${accent.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <div className="p-2 rounded-full group-hover:bg-gray-50 transition-colors duration-300">
              <svg className={`w-5 h-5 text-gray-400 group-hover:${accent.hover} transition-colors duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </div>
          
          <h3 className={`text-xl font-semibold text-gray-900 mb-4 group-hover:${accent.text} transition-colors duration-300`}>
            {title}
          </h3>
          
          <p className="text-gray-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>
        
        <div className="pt-6">
          <div className={`h-12 w-full rounded-lg ${bgGradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center`}>
            <span className="text-white font-medium text-sm flex items-center">
              Learn more
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default function PlatformsSection() {
  const platforms = [
    {
      title: "Primary Website",
      description: "Visit our primary website to explore our comprehensive range of services and discover what we have to offer.",
      href: "https://confworld.org/",
      accent: {
        bg: "bg-blue-50",
        icon: "text-blue-600",
        text: "text-blue-700",
        hover: "text-blue-600"
      },
      bgGradient: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      title: "Institutional Membership",
      description: "Learn more about our institutional membership program and the exclusive benefits available to organizations.",
      href: "https://confworld.org/institutional",
      accent: {
        bg: "bg-purple-50",
        icon: "text-purple-600",
        text: "text-purple-700",
        hover: "text-purple-600"
      },
      bgGradient: "bg-gradient-to-r from-purple-500 to-indigo-600"
    },
    {
      title: "Professional Membership",
      description: "Discover our professional membership options designed to advance your career and professional development.",
      href: "https://confworld.org/professional",
      accent: {
        bg: "bg-emerald-50",
        icon: "text-emerald-600",
        text: "text-emerald-700",
        hover: "text-emerald-600"
      },
      bgGradient: "bg-gradient-to-r from-emerald-500 to-teal-600"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50  px-6 py-12">
      <div className=" mx-auto">
        <div className="text-center">
          
          <h2 className="text-2xl md:text-3xl font-bold text-cyan-600 mb-4">
            Visit Our Platforms
          </h2>
          
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {platforms.map((platform, index) => (
            <PlatformCard
              key={index}
              title={platform.title}
              description={platform.description}
              href={platform.href}
              accent={platform.accent}
              bgGradient={platform.bgGradient}
            />
          ))}
        </div>
      </div>
    </div>
  );
}