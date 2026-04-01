import React, { useEffect, useRef, useState } from "react";
import {
  Globe, BookOpen, Users, Lightbulb,
  Star, Award, Sparkles, ChevronRight,
} from "lucide-react";
import Hero from "../commonhero/common-hero";

const useInView = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
};

/* ── tiny reusable label pill ── */
const Pill = ({ children, dark, orange }) => (
  <span className={`inline-flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-widest px-3.5 py-1.5 rounded-full ${
    dark ? "bg-white/20 text-white"
    : orange ? "bg-orange-500 text-white"
    : "bg-rose-700 text-white"
  }`}>
    <span className={`w-1.5 h-1.5 rounded-full ${dark || orange ? "bg-white" : "bg-white"}`} />
    {children}
  </span>
);

export default function AboutOrganizer() {

  const services = [
    { icon: <Globe className="w-5 h-5" />, title: "International Conferences", body: "CERADA organizes conferences, workshops, webinars, guest lectures, seminars, short-term training programs, public education programs and faculty development programs — all focused on Engineering and Science & Technology." },
    { icon: <Lightbulb className="w-5 h-5" />, title: "Research Innovation", body: "With a focus on curiosity, innovation and the latest trends in Engineering and Technology, CERADA is devoted to advancing knowledge in these fields." },
    { icon: <BookOpen className="w-5 h-5" />, title: "Academic Access", body: "We are committed to providing easy access to academic resources and support for aspiring students and research scholars from both urban and rural areas." },
    { icon: <Users className="w-5 h-5" />, title: "Collaborative Partnerships", body: "We are committed to fostering partnerships with universities, organizations and associations to promote knowledge sharing and work collectively toward building a better future." },
  ];

  const commitments = [
    { label: "Education", text: "CERADA organizes a wide range of educational initiatives including conferences, workshops, webinars, guest lectures, seminars, short-term training programs, public education programs and faculty development programs, all focused on Engineering and Science & Technology." },
    { label: "Innovation", text: "With a focus on curiosity, innovation and the latest trends in Engineering and Technology, CERADA is devoted to advancing knowledge in these fields." },
    { label: "Access", text: "We are committed to provide easy access to academic resources and support for aspiring students and research scholars from both urban and rural areas." },
    { label: "Partnerships", text: "We are committed to fostering partnerships with universities, organizations and associations to promote knowledge sharing and work collectively toward building a better future." },
  ];

  return (
    <div className="min-h-screen bg-white">

      <Hero
        title="About CERADA"
        breadcrumbs={[{ label: "Home", link: "#" }]}
        backgroundImage="/images/commonheroimages/2.webp"
      />

      {/* ═══════════════════════════════════════════
          INTRO  —  white bg
      ═══════════════════════════════════════════ */}
      <section className="bg-white py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <Reveal delay={0}>
            <div className="flex items-center gap-4 mb-10">
              <Pill>Who We Are</Pill>
              <div className="flex-1 h-px bg-orange-500 opacity-40" />
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <Reveal delay={80}>
              <h2 className="f-display text-5xl md:text-6xl text-rose-700 leading-tight">
                A Global Research<br />
                <span className="italic text-rose-700/20" style={{ WebkitTextStroke: "2px #be123c" }}>Community</span>
              </h2>
              <div className="mt-8 space-y-1.5">
                <div className="w-16 h-1 bg-rose-700 rounded-full" />
                <div className="w-10 h-1 bg-orange-500 rounded-full" />
              </div>
            </Reveal>

            <Reveal delay={180}>
              <p className="text-gray-600 text-lg leading-relaxed mb-5">
                The <strong className="text-rose-700">Confworld Educational Research And Development Association (CERADA)</strong> is an internationally recognized, globally operating multidisciplinary professional research and development association, aiming to integrate researchers and academicians working in the micro disciplines of science and technology.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-5">
                We organize <span className="font-semibold text-rose-700">top-tier international conferences</span>, offering a platform for researchers and professionals to present their work, share ideas and network.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our <span className="font-semibold text-rose-700">publication services</span> support the submission of research papers to reputable, double blind peer-reviewed journals through editing and peer-review assistance.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MISSION & VISION  —  rose-700 bg
      ═══════════════════════════════════════════ */}
      <section className="bg-rose-700 py-20 px-6 md:px-16 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border-[40px] border-white/5 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border-[32px] border-white/5 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal delay={0}>
            <div className="flex items-center gap-4 mb-12">
              <Pill dark>Our Purpose</Pill>
              <div className="flex-1 h-px bg-white/20" />
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Mission — white card */}
            <Reveal delay={100}>
              <div className="bg-white rounded-2xl p-10 relative overflow-hidden h-full">
                <span className="f-display absolute -bottom-6 -right-3 text-[8rem] font-black text-rose-100 leading-none select-none pointer-events-none">M</span>
                <div className="w-full h-1 bg-rose-700 rounded-full mb-8" />
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-rose-700 flex items-center justify-center text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="f-display text-2xl text-rose-700">Our Mission</h3>
                </div>
                <p className="text-gray-600 text-base leading-relaxed relative z-10">
                  CERADA advances global education and research through international conferences, research assistance and collaborative publications, fostering an inclusive environment for knowledge sharing and innovation.
                </p>
              </div>
            </Reveal>

            {/* Vision — orange-500 card */}
            <Reveal delay={220}>
              <div className="bg-orange-500 rounded-2xl p-10 relative overflow-hidden h-full">
                <span className="f-display absolute -bottom-6 -right-3 text-[8rem] font-black text-white/20 leading-none select-none pointer-events-none">V</span>
                <div className="w-full h-1 bg-white rounded-full mb-8" />
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-orange-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="f-display text-2xl text-white">Our Vision</h3>
                </div>
                <p className="text-white opacity-90 text-base leading-relaxed relative z-10">
                  CERADA envisions a borderless educational research community committed to lifelong learning and excellence, aiming to be a catalyst for transformative advancements through cutting-edge research and international partnerships.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHAT WE DO  —  white bg, alternating cards
      ═══════════════════════════════════════════ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <Reveal delay={0}>
            <div className="flex items-center gap-4 mb-4">
              <Pill>Our Work</Pill>
              <div className="flex-1 h-px bg-orange-500 opacity-40" />
            </div>
            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-12">
              <h2 className="f-display text-5xl text-rose-700 font-black leading-tight flex-1">What We Do</h2>
              
              <p className="text-gray-400 text-sm max-w-xs leading-relaxed md:text-right">
                Building a dynamic community across engineering, science & technology and beyond.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            {services.map((s, i) => {
              const dark = i % 2 === 0;
              return (
                <Reveal key={i} delay={i * 90}>
                  <div className={`hover-lift rounded-2xl p-8 h-full relative overflow-hidden ${dark ? "bg-rose-700 text-white" : "bg-orange-500 text-white"}`}>
                    <span className="f-display absolute -bottom-4 -right-1 text-[6rem] font-black leading-none select-none pointer-events-none text-white/10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className={`absolute left-0 top-8 bottom-8 w-1 rounded-r-full ${dark ? "bg-white/40" : "bg-white/40"}`} />
                    <div className="pl-5 relative z-10">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 bg-white/20 text-white">
                        {s.icon}
                      </div>
                      <h4 className="f-display text-xl mb-3 text-white">{s.title}</h4>
                      <p className="text-sm leading-relaxed text-white opacity-85">{s.body}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          COMMITMENTS  —  white bg
      ═══════════════════════════════════════════ */}
      <section className="bg-white pb-6 px-6 md:px-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 opacity-5 rounded-bl-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-700 opacity-5 rounded-tr-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal delay={0}>
            <div className="flex items-center gap-4 mb-12">
              <Pill orange>Pledges</Pill>
              <div className="flex-1 h-px bg-orange-500 opacity-40" />
            </div>
            <h2 className="f-display text-5xl text-rose-700 font-black leading-tight mb-12">Our Commitments</h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            {commitments.map((c, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="bg-white border border-gray-200 rounded-2xl p-8 h-full relative overflow-hidden group hover-lift">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 rounded-t-2xl">
                    <div className={`h-full rounded-t-2xl w-0 group-hover:w-full transition-all duration-500 ${i % 2 === 0 ? "bg-rose-700" : "bg-orange-500"}`} />
                  </div>
                  <span className="f-display absolute top-3 right-5 text-7xl text-gray-100 leading-none select-none pointer-events-none font-black">"</span>
                  <div className={`inline-flex items-center gap-2 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 ${i % 2 === 0 ? "bg-rose-700" : "bg-orange-500"}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    {c.label}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MEMBERSHIP  —  rose-700 bg
      ═══════════════════════════════════════════ */}
      <section className="bg-rose-700 py-20 px-6 md:px-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full border-[50px] border-white/5 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal delay={0}>
            <div className="flex items-center gap-4 mb-4">
              <Pill dark>Join Us</Pill>
              <div className="flex-1 h-px bg-white/20" />
            </div>
            <div className="flex flex-col md:flex-row md:items-end gap-3 mb-14">
              <h2 className="f-display text-5xl text-white leading-tight font-black flex-1">Join Our Community</h2>
              <p className="text-white/70 text-sm max-w-xs">Choose the membership that fits your profile</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5 items-stretch">

            {/* Institutional — white card */}
            <Reveal delay={0}>
              <a href="https://confworld.org/institutional" target="_blank" rel="noopener noreferrer"
                className="hover-lift group bg-white rounded-2xl p-8 flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-rose-700 rounded-t-2xl" />
                <div className="w-12 h-12 rounded-xl bg-rose-700 flex items-center justify-center text-white mb-6">
                  <Star className="w-6 h-6" />
                </div>
                <h4 className="f-display text-2xl text-rose-700 mb-1">Institutional</h4>
                <p className="text-gray-400 text-sm mb-auto pb-8">For Organizations</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm font-semibold text-rose-700">Learn More</span>
                  <div className="w-8 h-8 rounded-full bg-rose-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </a>
            </Reveal>

            {/* Professional — orange-500 card */}
            <Reveal delay={120}>
              <a href="https://confworld.org/professional" target="_blank" rel="noopener noreferrer"
                className="hover-lift group bg-orange-500 rounded-2xl p-8 flex flex-col h-full relative overflow-hidden md:-mt-3">
                <div className="absolute top-4 right-4 bg-white text-orange-500 text-[0.6rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                  Popular
                </div>
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/40 rounded-t-2xl" />
                <span className="f-display absolute -bottom-4 -right-2 text-[6rem] font-black text-white/10 leading-none select-none pointer-events-none">P</span>
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-orange-500 mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="f-display text-2xl text-white mb-1">Professional</h4>
                <p className="text-white/70 text-sm mb-auto pb-8">For Professionals</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/20 relative z-10">
                  <span className="text-sm font-semibold text-white">Learn More</span>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ChevronRight className="w-4 h-4 text-orange-500" />
                  </div>
                </div>
              </a>
            </Reveal>

            {/* Student — white card */}
            <Reveal delay={240}>
              <a href="https://confworld.org/student" target="_blank" rel="noopener noreferrer"
                className="hover-lift group bg-white rounded-2xl p-8 flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-rose-700 rounded-t-2xl" />
                <div className="w-12 h-12 rounded-xl bg-rose-700 flex items-center justify-center text-white mb-6">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="f-display text-2xl text-rose-700 mb-1">Student</h4>
                <p className="text-gray-400 text-sm mb-auto pb-8">For Students</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm font-semibold text-rose-700">Learn More</span>
                  <div className="w-8 h-8 rounded-full bg-rose-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </a>
            </Reveal>

          </div>
        </div>
      </section>

    </div>
  );
}