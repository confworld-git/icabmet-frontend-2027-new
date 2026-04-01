import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ConferenceCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const publications = [
    {
      type: "Research article • Restricted access",
      title: "Evaluating the influence of courseware on online learning pedagogy at Pangasinan State University.",
      authors: "Angelou O Ramos",
      publication: "E-Learning and Digital Media",
      year: "2025",
    },
    {
      type: "Research article • Restricted access",
      title: "The assessment SHIFT: Traditional and technology-driven approaches to listening comprehension.",
      authors: "Johnedel Barrota Peralta",
      publication: "E-Learning and Digital Media",
      year: "2025",
    },
    {
      type: "Research article • Restricted access",
      title: "Redefining educational success: Analyzing the impact of closed management systems on student well-being and academic performance in Chinese technical education.",
      authors: "Jingkun Liu, Rovena I Dellova and Zhengxin Yi",
      publication: "E-Learning and Digital Media",
      year: "2024",
    },
    {
      type: "Research article • Restricted access",
      title: "Zeolite X from coal fly ash inhibits proliferation of human breast cancer cell lines (MCF-7) via induction of S phase arrest and apoptosis",
      authors: "S. Subhapriya and P. Gomathipriya",
      publication: "Molecular biology reports",
      year: "2018",
    },
    {
      type: "Research article • Restricted access",
      title: (<>Green synthesis of titanium dioxide (TiO<sub>2</sub>) nanoparticles by <i>Trigonella foenum-graecum</i> extract and its antimicrobial properties</>),
      authors: "S. Subhapriya and P. Gomathipriya",
      publication: "Microbial pathogenesis",
      year: "2018",
    },
    {
      type: "Research article • Restricted access",
      title: (<>Surfactant-free bio-synthesised TiO<sub>2</sub> nanorods from <i>Turbinaria conoides</i> – A study on photocatalytic and anti-bacterial activity</>),
      authors: "S. Subhapriya and P. Gomathipriya",
      publication: "Materials Research Express",
      year: "2018",
    },
    {
      type: "Research article • Restricted access",
      title: "Synthesis and characterization of zeolite X from coal fly ash: a study on anticancer activity",
      authors: "S. Subhapriya and P. Gomathipriya",
      publication: "Materials Research Express",
      year: "2018",
    },
    {
      type: "Research article • Restricted access",
      title: "Induction of apoptotic effects of anti-proliferative zeolite X from coal fly ash on cervical cancer (HeLa) cell lines",
      authors: "S. Subhapriya and P. Gomathipriya",
      publication: "Molecular Biology Reports",
      year: "2018",
    },
    {
      type: "Research article • Restricted access",
      title: "Design and analysis of high gain and low noise figure CMOS low noise amplifier for Q-band nano-sensor application",
      authors: "K Suganthi and S Malarvizhi",
      publication: "Materials Research Express",
      year: "2018",
    },
    {
      type: "Research article • Restricted access",
      title: "Detection and classification of cardiovascular abnormalities using FFT based multi-objective genetic algorithm",
      authors: "B. V. P Prasad and Velusamy Parthasarathy",
      publication: "Biotechnology & Biotechnological Equipment",
      year: "2017",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === publications.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? publications.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="bg-rose-100 flex flex-col items-center justify-center px-6 py-14">

      {/* Header */}
      <div className="w-full max-w-5xl mb-10 text-center">
        {/* Label bar */}
        <div className="flex items-center justify-center gap-0 mb-6">
          <div className="bg-rose-700 text-white text-xs font-black uppercase tracking-[0.25em] px-4 py-2">
            Publications
          </div>
          <div className="bg-white text-gray-500 text-xs font-bold uppercase tracking-[0.25em] px-4 py-2 border border-gray-200">
            ICABMET · 2027
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-gray-950 mb-4 leading-tight">
          Participate in ICABMET-2027 and Achieve{" "}
          <span className="text-rose-700">Scopus / SCIE</span> Indexed Publication
        </h1>

        {/* Divider */}
        <div className="flex gap-1 justify-center mb-6">
          <div className="h-1.5 w-16 bg-rose-700" />
          <div className="h-1.5 w-8 bg-rose-600" />
          <div className="h-1.5 w-4 bg-rose-300" />
        </div>

        <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
          ICABMET-2027 offers a valuable opportunity for researchers to present their work and achieve publication in reputed Scopus / SCIE indexed journals.{" "}
          <strong className="text-gray-800">Selected high-quality papers</strong> presented at the conference will be recommended and processed for legitimate{" "}
          <strong className="text-gray-800">Scopus / SCIE indexed journal publication</strong>, ensuring global academic visibility and recognition.
        </p>
      </div>

      {/* Proof section heading */}
      <div className="max-w-5xl w-full mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-black text-rose-700 mb-2">
          Proof of Scopus / SCIE Indexing
        </h2>
        <p className="text-base text-gray-600">
          Our clients' papers have been successfully indexed in Scopus / SCIE. Selected papers have been published in the following Scopus / SCIE indexed journals.
        </p>
      </div>

      {/* Carousel */}
      <div className="max-w-5xl w-full relative">
        {/* White card */}
        <div className="bg-white border border-gray-200 shadow-xl rounded-2xl px-10 md:px-16 py-12 min-h-[320px] flex flex-col justify-between transition-all duration-500">
          <div className="space-y-4">
            {/* Type badge */}
            <span className="inline-block bg-rose-50 border border-rose-200 text-rose-700 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
              {publications[currentIndex].type}
            </span>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-black text-gray-900 leading-snug">
              {publications[currentIndex].title}
            </h3>

            {/* Authors */}
            <p className="text-rose-700 font-semibold text-base">
              {publications[currentIndex].authors}
            </p>

            {/* Journal + year */}
            <p className="text-gray-500 italic text-sm">
              {publications[currentIndex].publication}, {publications[currentIndex].year}
            </p>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {publications.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-rose-700 w-8"
                    : "bg-rose-200 hover:bg-rose-400 w-2.5"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Nav buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 md:-translate-x-14 bg-white border border-gray-200 shadow-md text-rose-700 p-3 rounded-full hover:bg-rose-700 hover:text-white hover:border-rose-700 transition-all duration-200"
          aria-label="Previous slide"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 md:translate-x-14 bg-white border border-gray-200 shadow-md text-rose-700 p-3 rounded-full hover:bg-rose-700 hover:text-white hover:border-rose-700 transition-all duration-200"
          aria-label="Next slide"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* CTA */}
      <div className="max-w-5xl w-full mt-10 text-center">
        <p className="text-lg md:text-xl text-gray-700 font-semibold">
          Join us at ICABMET-2027 and unlock the opportunity to publish your research in reputed{" "}
          <span className="text-rose-700">Scopus / SCIE indexed journals.</span>
        </p>
      </div>
    </div>
  );
}