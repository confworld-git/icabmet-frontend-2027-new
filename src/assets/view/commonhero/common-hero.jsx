import React from 'react';

export default function Hero({ title, breadcrumbs = [{ label: 'Home' }], backgroundImage }) {
  return (
    <div className="relative h-[50vh] overflow-hidden">
      {/* Background Image - Full width on all devices */}
      {backgroundImage && (
        <div className="absolute inset-0 md:left-[60%] md:right-0">
          <img
            src={backgroundImage}
            alt="Hero"
            className="w-full h-full object-cover object-center md:object-[75%_center]"
            style={{
              imageRendering: 'auto',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
              WebkitFontSmoothing: 'antialiased'
            }}
            loading="eager"
            decoding="async"
          />
          {/* Subtle blend edge on desktop */}
          <div className="hidden md:block absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-rose-700 to-transparent"></div>
        </div>
      )}

      {/* Rose overlay with patterns - covers image on mobile, partial on desktop */}
      <div className="relative w-full md:w-3/5 h-full bg-gradient-to-br from-rose-800/95 via-rose-700/95 to-rose-800/95 md:from-rose-800 md:via-rose-700 md:to-rose-800">
        {/* Metallic sheen overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent"></div>
          <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-b from-white/[0.05] via-transparent to-transparent"></div>
        </div>

        {/* Diagonal hatch pattern */}
        <div className="absolute inset-0">
          {/* Primary hatch */}
          <div className="absolute inset-0 opacity-[0.07]" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 20px)',
          }}></div>

          {/* Soft glow blobs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/2 w-64 h-64 bg-rose-300/5 rounded-full blur-2xl"></div>
        </div>

        {/* Concentric rings */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <circle cx="90%" cy="110%" r="160" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="90%" cy="110%" r="110" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="90%" cy="110%" r="60" fill="none" stroke="white" strokeWidth="1" />
          {/* Subtle lines */}
          <line x1="20%" y1="30%" x2="35%" y2="45%" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          <line x1="35%" y1="45%" x2="50%" y2="40%" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          <line x1="60%" y1="60%" x2="75%" y2="70%" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <circle cx="20%" cy="30%" r="2" fill="rgba(255,255,255,0.3)" />
          <circle cx="35%" cy="45%" r="2" fill="rgba(255,255,255,0.3)" />
          <circle cx="50%" cy="40%" r="2" fill="rgba(255,255,255,0.3)" />
        </svg>

        {/* Corner accent */}
        <div className="absolute top-0 left-0 z-20 w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-rose-300 to-transparent"></div>
          <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-rose-300 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center z-30">
          <div className="w-full px-8 md:px-12 lg:px-20">
            <div className="max-w-2xl">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-6 text-sm font-medium">
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    <a
                      href={crumb.href || '/'}
                      className="text-rose-100 hover:text-white transition-colors"
                    >
                      {crumb.label}
                    </a>
                    <div className="text-rose-300 rounded-full">››</div>
                  </React.Fragment>
                ))}
                <span className="text-rose-300 font-semibold">{title}</span>
              </div>

              {/* Title */}
              <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
                {title || "International Conference"}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}