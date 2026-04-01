import { useEffect, useState } from "react";
import conferenceSessions from "./sessionTracksPaperJons";
import Hero from '../commonhero/common-hero'
import DeadLine from '../../components/common/deadLine';

export default function SessionTracks() {
  const [activeId, setActiveId] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          if (id === conferenceSessions[0].id) {
            const headerOffset = 150;
            const elementPosition = el.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          } else {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      conferenceSessions.forEach((session) => {
        const el = document.getElementById(session.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const offset = 200;
          if (rect.top <= offset && rect.bottom > offset) {
            current = session.id;
          }
        }
      });
      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section>
      <Hero
        title="Session Tracks / Call for Papers"
        breadcrumbs={[{ label: 'Home', link: '#' }]}
        backgroundImage="/images/commonheroimages/6.webp"
      />

      <div className="min-h-screen bg-white flex flex-col">

        {/* Top Header Banner */}
        <header className="bg-white border-b-4 border-rose-700 px-6 md:px-16 py-10 w-full shadow-md">
          <div className="w-full">
            <div className="flex items-center gap-0 mb-4">
              <div className="bg-rose-700 text-white text-xs font-black uppercase tracking-[0.25em] px-4 py-2">
                Call for Submissions
              </div>
              <div className="bg-orange-500 px-3 py-2 flex items-center">
                <span className="text-white text-xs font-black">✦</span>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg pl-5 border-l-4 border-orange-500">
              We invite researchers, scholars and practitioners to contribute to the{" "}
              <span className="font-bold text-rose-700">ICABMET-2027 conference</span> by submitting
              papers and session proposals. Share your groundbreaking research, ideas and perspectives
              across various fields to advance the conference's focus on{" "}
              <span className="font-bold text-gray-800">
                Interdisciplinary Innovations for a Sustainable Future
              </span>.
            </p>
          </div>
        </header>

        <div className="flex flex-1 w-full relative px-4 md:px-0">

          {/* Sidebar — desktop */}
          <aside className="hidden md:flex flex-col sticky top-24 left-0 w-72 h-[calc(100vh-6rem)] bg-white border-r-2 border-rose-700 p-6 overflow-y-auto shadow-lg z-30">
            <div className="mb-6 pb-4 border-b-4 border-rose-700">
              <h2 className="text-lg font-extrabold text-gray-900 uppercase tracking-widest">
                Session Navigation
              </h2>
            </div>
            <nav className="flex flex-col space-y-1">
              {conferenceSessions.map((session) => (
                <a
                  key={session.id}
                  href={`#${session.id}`}
                  className={`block rounded-md px-4 py-3 text-sm font-semibold transition-all duration-200 border-l-4 ${
                    activeId === session.id
                      ? "bg-rose-700 text-white border-rose-900 shadow-md"
                      : "text-gray-600 border-transparent hover:bg-orange-50 hover:text-orange-500 hover:border-orange-500"
                  }`}
                >
                  {session.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden fixed top-28 left-4 z-40 bg-rose-700 text-white p-3 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            aria-label="Open sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Sidebar drawer — mobile */}
          {sidebarOpen && (
            <>
              <div
                className="fixed inset-0 bg-black bg-opacity-60 z-40"
                onClick={() => setSidebarOpen(false)}
                aria-hidden="true"
              />
              <aside className="fixed top-0 left-0 bottom-0 w-80 bg-white shadow-2xl p-6 overflow-y-auto z-50">
                <div className="flex justify-between items-center mb-6 pb-4 border-b-4 border-rose-700">
                  <h2 className="text-lg font-extrabold text-gray-900 uppercase tracking-widest">
                    Session Tracks
                  </h2>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="text-rose-700 text-3xl font-bold hover:text-rose-900 focus:outline-none leading-none"
                    aria-label="Close sidebar"
                  >
                    ×
                  </button>
                </div>
                <nav className="flex flex-col space-y-1">
                  {conferenceSessions.map((session) => (
                    <a
                      key={session.id}
                      href={`#${session.id}`}
                      onClick={() => setSidebarOpen(false)}
                      className={`block rounded-md px-4 py-3 text-sm font-semibold transition-all border-l-4 ${
                        activeId === session.id
                          ? "bg-rose-700 text-white border-rose-900"
                          : "text-gray-600 border-transparent hover:bg-orange-50 hover:text-orange-500 hover:border-orange-500"
                      }`}
                    >
                      {session.title}
                    </a>
                  ))}
                </nav>
              </aside>
            </>
          )}

          {/* Main content */}
          <main className="flex-1 md:pl-10 md:pr-8 md:max-w-4xl py-10 pt-16 space-y-12 overflow-y-auto">
            {conferenceSessions.map((session, idx) => (
              <section
                key={session.id}
                id={session.id}
                className="scroll-mt-40 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
              >
                {/* Section header bar — alternating rose-700 / orange-500 */}
                <div className={`px-8 py-5 ${idx % 2 === 0 ? "bg-rose-700 text-white" : "bg-orange-500 text-white"}`}>
                  <h2 className="text-xl md:text-2xl font-extrabold tracking-tight uppercase leading-snug">
                    {session.title}
                  </h2>
                </div>

                <div className="p-6 md:p-8">
                  {/* Image */}
                  <div className="w-full h-56 md:h-72 lg:h-80 flex items-center justify-center mb-8 rounded-lg overflow-hidden bg-white border border-gray-100 shadow-inner">
                    <img
                      src={session.cover}
                      alt={session.title}
                      title={session.title}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Topics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {session.topics.map((topic, topicIdx) => (
                      <div
                        key={topicIdx}
                        className={`flex items-start gap-3 p-4 rounded-lg border border-gray-100 bg-white transition-all duration-200 group ${
                          idx % 2 === 0
                            ? "hover:bg-rose-700 hover:border-rose-700"
                            : "hover:bg-orange-500 hover:border-orange-500"
                        }`}
                      >
                        <span className={`flex-shrink-0 mt-1.5 w-2 h-2 rounded-full transition-colors duration-200 ${
                          idx % 2 === 0
                            ? "bg-rose-700 group-hover:bg-white"
                            : "bg-orange-500 group-hover:bg-white"
                        }`}></span>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium group-hover:text-white transition-colors duration-200">
                          {topic}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </main>
        </div>
      </div>

      <DeadLine />
    </section>
  );
}