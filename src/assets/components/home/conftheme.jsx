import { useState, useEffect } from "react";

export default function ConferenceTheme() {
  const [shimmer, setShimmer] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setShimmer(true);
      setTimeout(() => setShimmer(false), 1000);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="min-h-screen bg-gray-100 flex items-center justify-center p-8"
      
    >
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes shimmer { 0%{opacity:0;transform:translateX(-100%)} 50%{opacity:1} 100%{opacity:0;transform:translateX(100%)} }
        @keyframes pulse-ring { 0%,100%{transform:scale(1);opacity:0.4} 50%{transform:scale(1.05);opacity:0.8} }
        @keyframes fade-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .float { animation: float 4s ease-in-out infinite; }
        .spin-slow { animation: spin-slow 18s linear infinite; }
        .pulse-ring { animation: pulse-ring 3s ease-in-out infinite; }
        .shimmer-bar { animation: shimmer 1s ease-in-out; }
        .fade-up { animation: fade-up 0.8s ease forwards; }
        .fade-up-1 { animation: fade-up 0.8s 0.1s ease both; }
        .fade-up-2 { animation: fade-up 0.8s 0.3s ease both; }
        .fade-up-3 { animation: fade-up 0.8s 0.5s ease both; }
        .fade-up-4 { animation: fade-up 0.8s 0.7s ease both; }
      `}</style>

      {/* THE SINGLE CARD DIV */}
      <div
        className="relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: "linear-gradient(145deg, #9f1239 0%, #be123c 40%, #881337 100%)", minHeight: "580px" }}
      >

        {/* Shimmer overlay */}
        {shimmer && (
          <div
            className="shimmer-bar absolute inset-0 z-20 pointer-events-none"
            style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)" }}
          />
        )}

        {/* Top-left spinning ornament */}
        <div className="spin-slow absolute -top-10 -left-10 w-40 h-40 opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="1" strokeDasharray="4 4"/>
            <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="0.5"/>
            <polygon points="50,10 55,40 85,40 62,58 70,88 50,70 30,88 38,58 15,40 45,40" fill="white" opacity="0.6"/>
          </svg>
        </div>

        {/* Bottom-right spinning ornament */}
        <div className="absolute -bottom-10 -right-10 w-44 h-44 opacity-10 pointer-events-none" style={{ animation: "spin-slow 24s linear infinite reverse" }}>
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="1" strokeDasharray="6 3"/>
            <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="white" opacity="0.5"/>
          </svg>
        </div>

        {/* Dotted grid pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-5"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        {/* Top decorative border line */}
        <div className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), white, rgba(255,255,255,0.6), transparent)" }} />

        {/* Bottom decorative border line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), white, rgba(255,255,255,0.6), transparent)" }} />

        {/* Corner flourishes */}
        {[["top-4 left-4", "0"], ["top-4 right-4", "90deg"], ["bottom-4 right-4", "180deg"], ["bottom-4 left-4", "270deg"]].map(([pos, rot], i) => (
          <div key={i} className={`absolute ${pos} w-10 h-10 opacity-40 pointer-events-none`} style={{ transform: `rotate(${rot})` }}>
            <svg viewBox="0 0 40 40" fill="none"><path d="M2 38 L2 2 L38 2" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
        ))}

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-center px-10 py-14 text-white text-center">

          {/* Top tag */}
          <div className="fade-up-1 flex items-center gap-3 mb-6">
            <div style={{ height: "1px", width: "40px", background: "rgba(255,255,255,0.5)" }} />
            <span className="text-xs uppercase tracking-[0.3em] opacity-80 font-sans" style={{ fontFamily: "sans-serif", letterSpacing: "0.3em" }}>
              International Academic Conference
            </span>
            <div style={{ height: "1px", width: "40px", background: "rgba(255,255,255,0.5)" }} />
          </div>

          {/* Floating star icon */}
          <div className="float fade-up-1 mb-5 opacity-90">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <polygon points="22,2 27,16 42,16 30,25 35,40 22,31 9,40 14,25 2,16 17,16" fill="white" opacity="0.95"/>
            </svg>
          </div>

          {/* Main theme — single line */}
          <h1
            className="fade-up-2 font-black leading-tight mb-5 text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.1rem, 3vw, 2rem)", letterSpacing: "-0.5px", textShadow: "0 2px 24px rgba(0,0,0,0.25)" }}
          >
            Driving Innovation and Sustainable Solutions: Interdisciplinary Approaches in Applied Sciences, Business &amp; Technology
          </h1>

          {/* Ornamental divider */}
          <div className="fade-up-3 flex items-center gap-4 my-6">
            <div style={{ height: "1px", width: "60px", background: "rgba(255,255,255,0.4)" }} />
            <div className="flex gap-2 items-center">
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "white", opacity: 0.5 }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "white" }} />
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "white", opacity: 0.5 }} />
            </div>
            <div style={{ height: "1px", width: "60px", background: "rgba(255,255,255,0.4)" }} />
          </div>

          {/* Subtitle */}
          <p
            className="fade-up-3 opacity-85 mb-10 max-w-xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.7, fontStyle: "italic" }}
          >
            Bridging disciplines to shape tomorrow's world through knowledge, collaboration and transformative research.
          </p>

          {/* Discipline pills */}
          <div className="fade-up-4 flex flex-wrap justify-center gap-3 mb-10">
            {["Applied Science", "Business", "Engineering & Technology", "Innovation", "Sustainability"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-200"
                style={{
                  fontFamily: "sans-serif",
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.35)",
                  backdropFilter: "blur(4px)",
                  letterSpacing: "0.12em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

       
        </div>

        {/* Pulsing inner ring glow */}
        <div
          className="pulse-ring absolute inset-6 rounded-2xl pointer-events-none"
          style={{ border: "1px solid rgba(255,255,255,0.12)" }}
        />

      </div>
    </div>
  );
}