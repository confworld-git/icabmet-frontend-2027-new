import { useState } from "react";
import Hero from '../commonhero/common-hero'

function PublicationChannels() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        {
          img: "/images/publication/book1.webp",
          tag: "Conference Proceedings",
          title: "ISBN-Indexed Conference Proceedings",
          desc: "All accepted and registered abstracts will be published in the Conference Proceedings with an ISBN Number.",
          footer: "Open to all accepted & registered participants",
        },
        {
          img: "/images/publication/journal1.png",
          tag: "Journal Publication",
          title: "Web of Science & Scopus Indexed Journals",
          desc: "Publish your high-quality paper in various Web of Science, Scopus and other internationally indexed journals, increasing the visibility and impact of your research to a wide global audience.",
          footer: "For high-quality full paper submissions",
        },
      ].map((card, i) => (
        <div key={i} className="border-2 border-rose-700 rounded overflow-hidden hover:shadow-xl transition-all duration-200">
          <img src={card.img} alt={card.tag} className="w-full h-70 object-cover" />
          <div className="p-6 bg-white">
            <span className="text-xs font-black tracking-widest uppercase text-white px-3 py-1 rounded bg-rose-700">
              {card.tag}
            </span>
            <p className="mt-2 text-sm font-semibold text-gray-800 leading-relaxed">{card.desc}</p>
          </div>
          <div className="px-6 py-3 bg-rose-700 text-xs font-bold text-white">
            ✦ {card.footer}
          </div>
        </div>
      ))}
    </div>
  );
}

function AbstractGuidelines() {
  const rules = [
    "The original work should be described in the abstract",
    "Abstract should be written in English",
    "It should be one paragraph with a word limit of 150",
    "Please provide a slight biography with your abstract (an example is given in the template)",
    "The abstract should be submitted in the format of an MS Word (.doc or .docx) document",
    "After submission, you will be acknowledged of the receipt of the abstract via email within three working days",
    "The Title, Author's Names and Affiliations should be centred. Please underline the presenting author",
    "Corresponding author E-mail should be included",
  ];

  return (
    <div className="border-2 border-rose-700 rounded overflow-hidden">
      <div className="bg-rose-700 px-6 py-4">
        <h3 className="text-lg font-black text-white uppercase tracking-widest">Abstract Submission Guidelines</h3>
        <p className="text-orange-300 text-sm mt-1">Follow these requirements for your abstract submission</p>
      </div>
      <div className="bg-white p-6">
        <ul className="space-y-3">
          {rules.map((rule, i) => (
            <li key={i} className="flex items-start gap-4 border-b border-rose-700 pb-3 last:border-0 last:pb-0">
              <span className="flex-shrink-0 w-7 h-7 rounded text-white text-xs flex items-center justify-center font-black mt-0.5 bg-rose-700">
                {i + 1}
              </span>
              <span className="text-sm font-semibold text-gray-900 leading-relaxed">{rule}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FullPaperGuidelines() {
  const specs = [
    { label: "Page Length", value: "6–8 Pages", sub: "Double-column format" },
    { label: "Language", value: "English", sub: "Grammar checked" },
    { label: "Abstract", value: "≤ 150", sub: "Words maximum" },
    { label: "Keywords", value: "Min. 5", sub: "Lowercase, italics" },
  ];

  const sections = [
    "Background / Introduction",
    "Motivation and Objectives",
    "Statement of Contribution / Methods",
    "Results, Discussion and Conclusion",
    "Funding Statement",
    "Acknowledgements",
  ];

  const formatting = [
    "Tables, figures and images: properly named, good quality",
    "Title, Author's Names, Affiliations: centred",
    "Underline the presenting author",
    "Include corresponding author email",
    "Affiliations with country names",
  ];

  return (
    <div className="border-2 border-rose-700 rounded overflow-hidden">
      <div className="bg-rose-700 px-6 py-4">
        <h3 className="text-lg font-black text-white uppercase tracking-widest">Full Paper Submission Guidelines</h3>
        <p className="text-orange-300 text-sm mt-1">Requirements for complete paper submission</p>
      </div>

      <div className="bg-white p-6 space-y-8">
        {/* Note */}
        <div className="bg-white border-l-4 border-orange-500 px-4 py-3 border border-rose-700">
          <p className="text-sm font-bold text-gray-900">
            📝 You are encouraged to submit full papers if your abstract is accepted and you have paid the registration cost for ICABMET-2027.
          </p>
        </div>

        {/* Specs grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {specs.map((s, i) => (
            <div key={i} className="rounded p-4 text-white bg-rose-700">
              <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-1">{s.label}</p>
              <p className="text-2xl font-black leading-tight">{s.value}</p>
              <p className="text-xs opacity-80 mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Required Sections */}
        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-rose-700 mb-3 border-b-2 border-orange-500 pb-2">
            Required Sections
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sections.map((s, i) => (
              <div key={i} className="flex items-start gap-3 bg-white border border-rose-700 rounded p-3">
                <span className="flex-shrink-0 w-7 h-7 text-white text-xs font-black flex items-center justify-center rounded bg-rose-700">
                  {i + 1}
                </span>
                <span className="text-sm font-bold text-gray-900">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* References */}
        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-rose-700 mb-3 border-b-2 border-orange-500 pb-2">
            References Requirements — Critical
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            {[
              { val: "35", label: "Minimum references required" },
              { val: "30%", label: "Must be from the last 2 years" },
              { val: "[9]", label: "Square bracket citation format" },
              { val: "Chicago", label: "Reference style" },
            ].map((r, i) => (
              <div key={i} className="border-2 rounded p-3 border-rose-700 bg-rose-700 text-white">
                <div className="text-3xl font-black leading-none">{r.val}</div>
                <div className="text-xs font-bold mt-1 leading-snug opacity-90">{r.label}</div>
              </div>
            ))}
          </div>
          <ul className="space-y-2">
            {[
              "Style: Chicago format",
              "Order: Numbered consecutively in order of citation",
              "Citation format: Use square brackets [9] or [9, 10]",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm font-semibold text-gray-900">
                <span className="text-orange-500 font-black mt-0.5">→</span> {item}
              </li>
            ))}
          </ul>
          <div className="mt-3 bg-rose-700 text-white px-4 py-3 rounded text-sm font-bold">
            ⚠ All references must be cited within the text. Uncited references will be removed.
          </div>
        </div>

        {/* Formatting Details */}
        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-rose-700 mb-3 border-b-2 border-orange-500 pb-2">
            Formatting Details
          </h4>
          <ul className="space-y-2">
            {formatting.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm font-semibold text-gray-900">
                <span className="text-orange-500 font-black mt-0.5">•</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function PlagiarismPolicy() {
  return (
    <div className="border-2 border-rose-700 rounded overflow-hidden">
      <div className="bg-rose-700 px-6 py-4">
        <h3 className="text-lg font-black text-white uppercase tracking-widest">Plagiarism Policy & Publication Ethics</h3>
        <p className="text-orange-300 text-sm mt-1">ICABMET-2027 adheres to stringent anti-plagiarism policies to ensure the integrity and originality of all submissions.</p>
      </div>
      <div className="bg-white p-6 space-y-4">
        {[
          {
            num: "1",
            title: "Plagiarism Check",
            points: [
              "Every submission undergoes a plagiarism check using Crossref Similarity Check, which is powered by iThenticate.",
              "This ensures that all articles submitted to the conference are original and free from plagiarism.",
            ],
          },
          {
            num: "2",
            title: "Review Process",
            points: [
              "Submissions that pass the plagiarism check are sent to the scientific committee for review.",
              "Any submission found to be plagiarized at any stage will be automatically rejected.",
            ],
          },
        ].map((card, i) => (
          <div key={i} className="flex gap-4 border-2 rounded p-5 bg-white border-rose-700">
            <span className="flex-shrink-0 w-10 h-10 text-white text-lg font-black flex items-center justify-center rounded bg-rose-700">
              {card.num}
            </span>
            <div>
              <h4 className="text-base font-black mb-2 text-rose-700">{card.title}</h4>
              {card.points.map((p, j) => (
                <p key={j} className="text-sm font-semibold text-gray-900 leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-rose-700 text-white px-5 py-4 rounded">
          <p className="text-xs font-black uppercase tracking-widest text-orange-300 mb-1">Important Note</p>
          <p className="text-sm font-bold leading-relaxed">
            Authors are responsible for ensuring that their submissions are original work and properly cite all sources. Maintaining high ethical standards is crucial for the integrity of academic research.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PublicationPage() {
  return (
    <section>
      <Hero
        title="Publication"
        breadcrumbs={[{ label: 'Home', link: '#' }]}
        backgroundImage="/images/commonheroimages/10.webp"
      />
      <div className="px-4 py-10 space-y-10 mx-auto">
        <div>
          <h2 className="text-3xl font-black text-rose-700 uppercase tracking-tight mb-2">Publication of Presented Research</h2>
          <p className="text-sm font-semibold text-gray-800">ICABMET-2027 provides several publication opportunities for presented work, ensuring your research reaches a global audience of peers, scholars and academia members worldwide.</p>
        </div>
        <PublicationChannels />
        <div>
          <h2 className="text-2xl font-black text-rose-700 uppercase tracking-tight mb-6 border-b-2 border-orange-500 pb-2">Submission Guidelines</h2>
          <div className="space-y-6">
            <AbstractGuidelines />
            <FullPaperGuidelines />
          </div>
        </div>
        <PlagiarismPolicy />
      </div>
    </section>
  );
}