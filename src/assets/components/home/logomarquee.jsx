export default function LogoMarquee() {
  // Dummy logo data - replace with your actual logo paths
  const logos = [
    { id: 1, src: "/images/institutes/1.webp", alt: "Logo 1" },
    { id: 2, src: "/images/institutes/2.webp", alt: "Logo 2" },
    { id: 9, src: "/images/institutes/9.webp", alt: "Logo 9" },

    { id: 3, src: "/images/institutes/3.webp", alt: "Logo 3" },
    { id: 4, src: "/images/institutes/4.webp", alt: "Logo 4" },
    { id: 5, src: "/images/institutes/5.webp", alt: "Logo 5" },
    { id: 6, src: "/images/institutes/6.webp", alt: "Logo 6" },
    { id: 7, src: "/images/institutes/7.webp", alt: "Logo 7" },
    { id: 8, src: "/images/institutes/8.webp", alt: "Logo 8" },
    { id: 10, src: "/images/institutes/10.webp", alt: "Logo 10" },
    { id: 11, src: "/images/institutes/11.jpeg", alt: "Logo 11" },
  ];

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="w-full bg-gradient-to-b from-cyan-50 py-2  overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>

          {/* Marquee container */}
          <div className="flex overflow-hidden logo-marquee-container">
            <div className="flex logo-marquee hover:pause">
              {duplicatedLogos.map((logo, index) => (
                <div
                  key={`${logo.id}-${index}`}
                  className="flex-shrink-0 mx-2 flex items-center justify-center "
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-12 md:h-19 w-auto object-contain hover:grayscale grayscale-0 transition-all duration-300   to-white hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes logo-marquee-animation {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .logo-marquee {
          animation: logo-marquee-animation 30s linear infinite;
        }

        .logo-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
