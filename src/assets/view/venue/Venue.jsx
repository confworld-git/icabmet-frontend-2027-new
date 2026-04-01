import React from "react";
import Hero from "../commonhero/common-hero";

const Venue = () => {
  const klImages = [
    { src: "/images/venue/Marina Beach, Chennai.webp", alt: "Marina Beach, Chennai", title: "Marina Beach, Chennai" },
    { src: "/images/venue/Vandalur Zoo, Chennai.webp", alt: "Vandalur Zoo, Chennai", title: "Vandalur Zoo, Chennai" },
    { src: "/images/venue/Elliot's Beach.webp", alt: "Elliot's Beach", title: "Elliot's Beach" },
    { src: "/images/venue/Mahabalipuram.webp", alt: "Mahabalipuram", title: "Mahabalipuram" },
    { src: "/images/venue/Ripon Building, Chennai.webp", alt: "Ripon Building, Chennai", title: "Ripon Building, Chennai" },
    { src: "/images/venue/Santhome Church, Chennai.webp", alt: "Santhome Church, Chennai", title: "Santhome Church, Chennai" },
    { src: "/images/venue/Taj Mahal, Agra.webp", alt: "Taj Mahal, Agra", title: "Taj Mahal, Agra" },
    { src: "/images/venue/Mysuru Palace, Mysore.webp", alt: "Mysuru Palace, Mysore", title: "Mysuru Palace, Mysore" },
    { src: "/images/venue/Charminar, Hyderabad.webp", alt: "Charminar, Hyderabad", title: "Charminar, Hyderabad" },
    { src: "/images/venue/Ajanta Caves, Maharashtra.webp", alt: "Ajanta Caves, Maharashtra", title: "Ajanta Caves, Maharashtra" },
    { src: "/images/venue/Sonamarg, Kashmir.webp", alt: "Sonamarg, Kashmir", title: "Sonamarg, Kashmir" },
    { src: "/images/venue/Red Fort, Delhi.webp", alt: "Red Fort, Delhi", title: "Red Fort, Delhi" },
  ];

  return (
    <section>
      <Hero
        title="Venue"
        breadcrumbs={[{ label: "Home", link: "#" }]}
        backgroundImage="/images/commonheroimages/commonhero17.webp"
      />

      <section className="relative py-4 px-4 sm:px-4 lg:px-4 bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
        <div className="w-full relative z-10">

          {/* Title and Subtitle */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-rose-700 leading-tight">
              Chennai, India
            </h1>
            <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto animate-fade-in">
              Experience the vibrant culture, modern marvels and natural beauty
              of Chennai, India.
            </p>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {klImages.map((image, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 animate-fade-in-stagger"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image wrapper with overlay */}
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    title={image.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay that fades in on group hover */}
                  <div className="absolute inset-0 bg-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Name label below image */}
                <div className="px-4 py-3 border-t border-orange-500 bg-rose-700 group-hover:bg-orange-500 transition-colors duration-300">
                  <p className="text-sm font-medium text-white text-center tracking-wide group-hover:tracking-wider transition-all duration-300">
                    {image.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </section>
  );
};

export default Venue;