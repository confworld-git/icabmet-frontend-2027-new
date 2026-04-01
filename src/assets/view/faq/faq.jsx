"use client";

import { useState } from "react";
import Hero from "../commonhero/common-hero";

const faqs = [
  {
    q: "Who can attend the conference?",
    a: "ICABMET-2027 is open to a diverse range of participants who are dedicated to advancing sustainable practices in these critical areas. Attendees include: Academics and Researchers, Students and Young Professionals, Industry Professionals, Community Leaders and Activists.",
  },
  {
    q: "How do I register for the conference?",
    a: "You can register for ICABMET-2027 through our online registration portal. Choose your category, fill out the registration form, select your sessions and complete the payment process.",
  },
  {
    q: "What are the registration fees?",
    a: "The registration fees vary based on the category and registration period. Detailed fee information is available on the Registration Page.",
  },
  {
    q: "Can I submit my paper for presentation?",
    a: "Yes, you can submit your abstract or full paper through our submission portal. All submissions will be reviewed and accepted papers will be presented at the conference.",
  },
  {
    q: "Will my paper be published?",
    a: "High-quality papers presented at the conference will be considered for publication in various Web of Science, Scopus and other internationally indexed journals.",
  },
  {
    q: "What is the review process for submitted papers?",
    a: "All submitted papers will undergo a rigorous peer-review process conducted by experts in the respective fields. Reviewers will assess the originality, significance and technical quality of the papers. Authors will be notified of the review results and any required revisions.",
  },
  {
    q: "What is included in the registration fee?",
    a: "The registration fee includes access to all sessions and workshops, conference materials, refreshments and lunch during conference days, a certificate of participation and networking opportunities.",
  },
  {
    q: "Is there a cancellation policy?",
    a: "Yes, cancellations made 50 Days Before Conference: 40% refundable. 30–40 Days Before Conference: 35% refundable. Less Than 30 Days Before Conference: No refunds will be issued.",
  },
  {
    q: "How do I contact the conference organizers?",
    a: "For general inquiries, please email info@confworld.org. For registration-related queries, email info@icabmet.com. For sponsorship opportunities, reach out to collaboration@confworld.org.",
  },
  {
    q: "Will my presented paper be published?",
    a: "Yes, high-quality papers presented at the conference will be considered for publication in various Web of Science, Scopus and other internationally indexed journals.",
  },
  {
    q: "How do I submit my paper for publication?",
    a: "After presenting at the conference, you will receive detailed instructions on how to submit your paper for publication consideration in the indexed journals.",
  },
  {
    q: "What is the review process for publication?",
    a: "All submitted papers undergo a rigorous peer-review process by experts in the relevant field to ensure the quality and relevance of the research.",
  },
  {
    q: "Are there any additional fees for publication?",
    a: "There may be additional fees for publication in certain journals. Detailed information will be provided after your paper is accepted for presentation at the conference.",
  },
  {
    q: "When will I know if my paper is accepted for publication?",
    a: "You will be notified about the acceptance of your paper for publication after the review process is complete, typically within 5 months post-conference.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section>
      <Hero
        title="Frequently Asked Questions"
        breadcrumbs={[{ label: "Home", link: "#" }]}
        backgroundImage="/images/commonheroimages/commonhero6.webp"
      />

      <div className="bg-white px-6 md:px-12 py-14">

        {/* Header */}
        <div className="flex items-center gap-0 mb-10">
          <div className="bg-rose-700 text-white text-xs font-black uppercase tracking-[0.25em] px-4 py-2">
            FAQ
          </div>

          <div className="bg-orange-500 px-3 py-2 flex items-center">
            <span className="text-white text-xs font-black">✦</span>
          </div>
        </div>

        
        <h1 className="text-4xl md:text-5xl font-black text-rose-700 leading-tight pb-6">
         Frequently Asked Questions
        </h1>
        

        {/* FAQ list */}
        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const isOrange = i % 2 !== 0;
            const accentBg = isOrange ? "bg-orange-500" : "bg-rose-700";
            const accentBorder = isOrange ? "border-orange-500" : "border-rose-700";
            const accentText = isOrange ? "text-orange-500" : "text-rose-700";
            const answerBg = isOrange ? "bg-orange-500" : "bg-rose-700";

            return (
              <div key={i} className={`border-l-4 ${accentBorder} overflow-hidden`}>
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  className={`w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 ${
                    isOpen ? "bg-gray-100" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <span className={`shrink-0 w-3 h-3 rounded-full ${accentBg}`}></span>
                    <span className={`text-sm md:text-base font-bold leading-snug ${accentText}`}>
                      {faq.q}
                    </span>
                  </div>
                  <span className={`shrink-0 text-xl font-black transition-transform duration-300 ${accentText} ${isOpen ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>

                {/* Answer panel */}
                {isOpen && (
                  <div className={`${answerBg} px-5 py-4`}>
                    <p className="text-sm font-semibold text-white leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact footer */}
        <div className="mt-0 bg-rose-700 px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-white text-sm font-semibold opacity-90">
            Still have questions? Reach out to us directly.
          </p>
          <a
            href="mailto:info@confworld.org"
            className="shrink-0 bg-orange-500 text-white text-xs font-black uppercase tracking-[0.25em] px-6 py-3 hover:bg-orange-600 transition-colors duration-200"
          >
            Contact Us →
          </a>
        </div>

      </div>
    </section>
  );
}