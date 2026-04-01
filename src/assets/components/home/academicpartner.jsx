"use client";

export default function AcademicPartner() {
  return (
    <section className="px-4 py-12 bg-white">

     

      
      <h1 className="text-4xl md:text-5xl font-black text-rose-800 leading-tight text-center pb-6">
              Our Academic Partner
            </h1>

      {/* Partner card */}
      <div className="max-w-sm border border-gray-200 overflow-hidden mx-auto">

        {/* Logo area */}
        <div className="bg-rose-700 relative overflow-hidden flex items-center justify-center p-6 h-72">
          {/* Decorative background rings */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full border border-rose-500 opacity-20" />
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full border border-rose-500 opacity-20" />
          {/* Hatch pattern */}
          <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 18px)',
          }} />
          {/* Logo */}
          <div className="relative z-10 bg-white rounded-lg shadow-xl p-4 w-full h-full flex items-center justify-center">
            <img
              src="/images/sdca.webp"
              alt="St. Dominic College of Asia"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Info panel */}
        <div className="p-6 bg-white border-t-4 border-rose-700">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-rose-700 mb-2">
            Academic Partner
          </p>
          <h3 className="text-lg md:text-xl font-black text-gray-900 leading-snug mb-1">
            St. Dominic College of Asia
          </h3>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Philippines
          </p>
        </div>
      </div>

    </section>
  );
}