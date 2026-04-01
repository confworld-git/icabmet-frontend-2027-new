import React from 'react';

export default function Hero({ title, breadcrumbs = [{ label: 'Home'}], backgroundImage }) {
  return (
    <div className="relative bg-blue-600 text-white overflow-hidden h-[50vh] flex items-center">
      {/* Background Image - Full width */}
      <div className="absolute inset-0">
        <img 
          src={backgroundImage} 
          alt="Conference" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Blue Gradient Overlay - Covers from left and gradually fades to transparent on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-600/95 to-transparent"></div>
      
      {/* World Map Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
          {/* Continents simplified shapes */}
          <path d="M 150 180 Q 180 160 220 180 L 240 200 Q 250 220 240 240 L 220 260 Q 200 270 180 260 L 160 240 Q 150 220 150 200 Z" fill="white" opacity="0.15"/>
          <path d="M 280 200 Q 320 180 360 200 L 400 230 Q 420 260 400 290 L 360 310 Q 320 320 280 300 L 260 270 Q 250 240 260 220 Z" fill="white" opacity="0.15"/>
          <ellipse cx="500" cy="250" rx="80" ry="60" fill="white" opacity="0.12"/>
          <path d="M 150 350 Q 200 330 250 350 L 280 380 Q 290 410 270 430 L 240 450 Q 200 460 160 440 L 140 410 Q 130 380 150 350 Z" fill="white" opacity="0.15"/>
        </svg>
      </div>
      
      {/* Enhanced Starry Pattern - Neat diagonal grid */}
      <div className="absolute inset-0">
        {/* Main star grid */}
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `radial-gradient(circle, white 1.5px, transparent 1.5px)`,
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0'
        }}></div>
        
        {/* Offset star grid for depth */}
        <div className="absolute inset-0 opacity-35" style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          backgroundPosition: '30px 30px'
        }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12 w-full z-10">
        <div className="space-y-4 max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            {title}
          </h1>
          
          <div className="flex items-center space-x-2 text-sm md:text-base">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <a href="/" className="hover:text-orange-400 transition-colors">
                  {crumb.label}
                </a>
                {index < breadcrumbs.length && <span className="text-orange-400">»</span>}
              </React.Fragment>
            ))}
            <span className="text-orange-400">{title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}