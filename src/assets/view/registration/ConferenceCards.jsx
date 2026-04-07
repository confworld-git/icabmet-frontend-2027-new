"use client";

import { Users, FileText, AlertCircle, Mail, Zap, Award } from "lucide-react";

export default function GroupDiscountPage() {
  return (
    <section>
      

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;600;800&display=swap');
        .f-display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.04em; }
        .f-body { font-family: 'DM Sans', sans-serif; }

        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(190,18,60,0.2);
        }
        .orange-hover:hover {
          box-shadow: 0 20px 40px rgba(249,115,22,0.2);
        }

        .diagonal-bg {
          background-image: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 8px,
            rgba(255,255,255,0.06) 8px,
            rgba(255,255,255,0.06) 16px
          );
        }

        .check-item {
          transition: all 0.2s ease;
        }
        .check-item:hover {
          transform: translateX(6px);
        }
      `}</style>

      <div className="bg-white ">

       

        <div className="px-4   space-y-16">

          {/* ══ GROUP DISCOUNT ══ */}
          <div>
            {/* Big label */}
            <div className="flex items-end gap-4 mb-8">
              <div className="bg-rose-700 w-2 self-stretch shrink-0" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-500 mb-1">Section 01</p>
                <h2 className="f-display text-5xl md:text-7xl text-rose-600 leading-none">
                  Group Discount
                </h2>
              </div>
              <Users className="w-16 h-16 text-rose-700 opacity-20 mb-2 hidden md:block" />
            </div>

            {/* Eligibility — two big cards */}
            <div className="mb-8">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-4">Eligibility Criteria — You qualify if:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="card-hover bg-rose-700 p-8 relative overflow-hidden">
                  <div className="absolute -bottom-4 -right-4 f-display text-[8rem] text-white/10 leading-none select-none">01</div>
                  <div className="w-10 h-10 bg-white/20 flex items-center justify-center mb-5">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="f-display text-4xl text-white leading-tight mb-3">5+ MEMBERS</h3>
                  <p className="text-white/75 text-sm leading-relaxed">You are a group of 5 members or more individuals registering together.</p>
                </div>
                <div className="card-hover orange-hover bg-orange-500 p-8 relative overflow-hidden">
                  <div className="absolute -bottom-4 -right-4 f-display text-[8rem] text-white/10 leading-none select-none">02</div>
                  <div className="w-10 h-10 bg-white/20 flex items-center justify-center mb-5">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="f-display text-4xl text-white leading-tight mb-3">CO-AUTHOR</h3>
                  <p className="text-white/75 text-sm leading-relaxed">You are a co-author of a paper presentation at the conference.</p>
                </div>
              </div>
            </div>

            {/* Large group special offer */}
            <div className="border-2 border-rose-700 relative overflow-hidden">
              {/* Top accent */}
              <div className="h-2 bg-orange-500 w-full" />
              <div className="p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className="bg-rose-700 w-14 h-14 flex items-center justify-center shrink-0">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-500 mb-1">Special Offer</p>
                    <h3 className="f-display text-3xl text-gray-900 leading-tight mb-2">10+ MEMBERS? GET MORE.</h3>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-md">
                      If your group consists of more than 10 members, reach out to our Academic Partnership Team to discuss a higher discount percentage on the registration fee.
                    </p>
                  </div>
                </div>
                <a
                  href="mailto:info@confworld.org"
                  className="shrink-0 flex items-center gap-2 bg-rose-700 text-white font-black text-xs uppercase tracking-[0.2em] px-7 py-4 hover:bg-rose-800 transition-colors duration-200 whitespace-nowrap"
                >
                  <Mail className="w-4 h-4" />
                  Contact Team
                </a>
              </div>
            </div>
          </div>

          {/* ══ DIVIDER ══ */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-rose-700 rotate-45" />
              <div className="w-3 h-3 bg-orange-500 rotate-45" />
              <div className="w-3 h-3 bg-rose-700 rotate-45" />
            </div>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* ══ MULTIPLE PAPERS ══ */}
          <div>
            <div className="flex items-end gap-4 mb-8">
              <div className="bg-orange-500 w-2 self-stretch shrink-0" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-rose-700 mb-1">Section 02</p>
                <h2 className="f-display text-5xl md:text-7xl text-orange-500 leading-none">
                  MULTIPLE PAPERS
                </h2>
              </div>
              <FileText className="w-16 h-16 text-orange-500 opacity-20 mb-2 hidden md:block" />
            </div>

            <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Guidelines for presenting multiple papers</p>

            {/* Rules — numbered rows */}
            <div className="space-y-3 mb-8">
              {[
                { num: "⭐", text: "An author may submit and present a maximum of three papers at the conference.", rose: true },
                { num: "⭐", text: "If you are presenting more than one paper, full payment is required for the first paper.", rose: false },
                { num: "⭐", text: "Additional oral or poster presentations incur an additional fee of $150 USD for each paper.", rose: true },
                { num: "⭐", text: "If any paper requires Scopus publication, you must pay the publication fee for each paper.", rose: false },
                { num: "⭐", text: "If you have more than 3 papers, additional papers can be presented by a co-author on full registration.", rose: true },
              ].map((item) => (
                <div
                  key={item.num}
                  className={`check-item flex items-center gap-0 border-2 overflow-hidden ${item.rose ? "border-rose-700" : "border-orange-500"}`}
                >
                  <div className={`shrink-0 w-16 h-full flex items-center justify-center py-5 ${item.rose ? "bg-rose-700" : "bg-orange-500"}`}>
                    <span className="f-display text-2xl text-white">{item.num}</span>
                  </div>
                  <p className="flex-1 px-6 py-4 text-sm font-semibold text-gray-800 leading-relaxed">{item.text}</p>
                  <Zap className={`shrink-0 mr-5 w-4 h-4 ${item.rose ? "text-rose-700" : "text-orange-500"} opacity-40`} />
                </div>
              ))}
            </div>

            {/* Important deadline — hero callout */}
            <div className="bg-rose-700 diagonal-bg p-8 md:p-10 relative overflow-hidden">
              <div className="absolute -bottom-6 -right-4 f-display text-[10rem] text-white/10 leading-none select-none">3W</div>
              <div className="flex items-start gap-6 relative z-10">
                <div className="shrink-0">
                  <div className="bg-orange-500 px-4 py-3 text-center">
                    <p className="f-display text-6xl text-white leading-none">3</p>
                    <p className="text-white text-xs font-black uppercase tracking-widest opacity-80">Weeks</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-orange-300" />
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-300">Important Deadline</p>
                  </div>
                  <h3 className="f-display text-3xl md:text-4xl text-white leading-tight mb-3">
                    CONFIRM YOUR PAPERS EARLY
                  </h3>
                  <p className="text-white/75 text-sm leading-relaxed max-w-lg">
                    Confirmation on the number of papers should be given to the <strong className="text-white">Conference Coordinator</strong> 3 weeks prior to the final payment deadline.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}