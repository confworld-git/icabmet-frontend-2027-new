import { useState, useEffect } from "react";

export default function CardCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/images/carousel/1.webp",
    "/images/carousel/2.webp",
    "/images/carousel/3.webp",
    "/images/carousel/4.webp",
    "/images/carousel/5.webp",
    "/images/carousel/6.webp",
    "/images/carousel/7.webp",
    "/images/carousel/8.webp",
    "/images/carousel/9.webp",
    "/images/carousel/10.webp",
    
  ];

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index) => setCurrentImageIndex(index);

  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-rose-50 to-amber-50 px-4">
      
      <div className="w-full max-w-4xl">
        
        {/* Mobile */}
        <div className="lg:hidden w-full">
          <div className="relative w-full aspect-video overflow-hidden rounded-xl border-4 border-rose-700 shadow-2xl">
            
            {images.map((src, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  idx === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={src}
                  alt={`Slide ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/50 to-transparent"></div>
              </div>
            ))}

            {/* Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-rose-700/80 hover:bg-rose-900 text-white p-2 rounded-full"
            >
              ‹
            </button>

            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-rose-700/80 hover:bg-rose-900 text-white p-2 rounded-full"
            >
              ›
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`w-2 h-2 rounded-full ${
                    idx === currentImageIndex
                      ? "bg-amber-400 w-6"
                      : "bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:block w-full">
            <h1 className="text-4xl md:text-5xl text-center font-black text-rose-700 leading-tight pb-6">
         Past Conference Gallery
        </h1>
          <div className="w-full h-[500px] bg-gradient-to-br from-rose-700 to-rose-900 rounded-2xl shadow-2xl p-1">
            
            <div className="relative w-full h-full overflow-hidden rounded-xl ring-4 ring-amber-400 ring-offset-2 ring-offset-rose-700">
              
              {images.map((src, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    idx === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={src}
                    alt={`Slide ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 to-transparent"></div>
                </div>
              ))}

              {/* Arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-rose-700/80 hover:bg-rose-900 text-white p-3 rounded-full"
              >
                ‹
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-rose-700/80 hover:bg-rose-900 text-white p-3 rounded-full"
              >
                ›
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`rounded-full ${
                      idx === currentImageIndex
                        ? "bg-amber-400 w-8 h-3"
                        : "bg-white/60 w-3 h-3"
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}