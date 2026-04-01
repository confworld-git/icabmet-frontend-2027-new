import Hero from '../commonhero/common-hero'

const CheckItem = ({ children, orange }) => (
  <li className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
    <span className={`mt-1 flex-shrink-0 w-5 h-5 flex items-center justify-center ${orange ? "bg-orange-500" : "bg-rose-700"}`}>
      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
    <span className="text-gray-700 text-sm leading-relaxed">{children}</span>
  </li>
);

const Section = ({ title, badge, children, orange }) => (
  <div className="border-2 border-rose-700 overflow-hidden mb-6">
    <div className={`px-6 py-4 flex items-center justify-between ${orange ? "bg-orange-500" : "bg-rose-700"}`}>
      <h2 className="text-white font-black text-lg tracking-tight">{title}</h2>
      <span className="text-xs font-black uppercase tracking-[0.25em] text-white opacity-70">{badge}</span>
    </div>
    <ul className="px-6 py-4 space-y-1 bg-white">{children}</ul>
  </div>
);

export default function SubmissionGuidelines() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Hero
        title="Submission Guidelines"
        breadcrumbs={[{ label: 'Home', link: '#' }]}
        backgroundImage="/images/commonheroimages/8.webp"
      />

      <div className=" mx-auto px-4 py-12">

        
        
        <h1 className="text-4xl md:text-5xl font-black text-rose-700 leading-tight pb-6">
         Abstract Submission
        </h1>

        <Section title="Abstract Submission Guidelines">
          <CheckItem>Describe only <strong>original work</strong> in the abstract.</CheckItem>
          <CheckItem>Abstract must be written in <strong>English</strong>.</CheckItem>
          <CheckItem>One paragraph with a <strong>word limit of 150</strong>.</CheckItem>
          <CheckItem>Include a <strong>brief biography</strong> alongside the abstract (see template for example).</CheckItem>
          <CheckItem>Submit as an <strong>MS Word (.doc or .docx)</strong> document.</CheckItem>
          <CheckItem><strong>Title, Author Names & Affiliations</strong> should be centred; underline the presenting author.</CheckItem>
          <CheckItem>Provide the <strong>corresponding author's email</strong>.</CheckItem>
        </Section>

        <div className="border-l-4 border-orange-500 bg-white px-5 py-4 text-sm text-gray-700 mb-10 border border-gray-200">
          <p className="font-black text-orange-500 mb-1 uppercase tracking-wide text-xs">After Submission</p>
          <p>Receipt of your abstract will be acknowledged via <strong>email within 3 working days</strong>.</p>
        </div>

        
        <h1 className="text-4xl md:text-5xl font-black text-rose-700 leading-tight pb-6">
         Full Paper Submission
        </h1>

        <div className="border-l-4 border-orange-500 bg-white px-5 py-4 text-sm text-gray-700 mb-6 border border-gray-200">
          <p>Full paper submission is open to authors with an <strong>accepted abstract</strong> and <strong>paid registration</strong>.</p>
        </div>

        <Section title="Formatting Requirements" badge="Format" orange>
          <CheckItem orange><strong>6–8 pages</strong> in double-column format.</CheckItem>
          <CheckItem orange>Manuscript in <strong>English</strong>, checked for grammar and language errors.</CheckItem>
          <CheckItem orange>Tables, figures and images must be <strong>properly named</strong> and high quality.</CheckItem>
          <CheckItem orange><strong>Title, Author Names & Affiliations</strong> centred; underline the presenting author.</CheckItem>
          <CheckItem orange>Provide the <strong>corresponding author's email</strong>.</CheckItem>
          <CheckItem orange>Abstract of <strong>no more than 150 words</strong>.</CheckItem>
          <CheckItem orange>Minimum <strong>5 keywords</strong> in lowercase italics, separated by commas.</CheckItem>
          <CheckItem orange>Affiliation names must include the <strong>country</strong>.</CheckItem>
        </Section>

        <Section title="Paper Structure" badge="Content">
          <CheckItem>Background / Introduction, Motivation & Objectives</CheckItem>
          <CheckItem>Statement of Contribution / Methods</CheckItem>
          <CheckItem>Results, Discussion & Conclusion</CheckItem>
          <CheckItem>Funding Statement</CheckItem>
          <CheckItem>Acknowledgements</CheckItem>
        </Section>

        <Section title="References" badge="Citations" orange>
          <CheckItem orange>Minimum <strong>35 references</strong>; at least <strong>30% from the last 2 years</strong>.</CheckItem>
          <CheckItem orange>Use <strong>Chicago style</strong> for references.</CheckItem>
          <CheckItem orange>References numbered <strong>consecutively</strong> in order of first citation.</CheckItem>
          <CheckItem orange>Cite in text using square brackets e.g. <em>[9]</em> or <em>[9, 10]</em>.</CheckItem>
          <CheckItem orange>All references must be cited in the text; uncited references will be removed.</CheckItem>
        </Section>

        <div className="border-l-4 border-rose-700 bg-white px-5 py-4 text-sm text-gray-700 border border-gray-200">
          <p className="font-black text-rose-700 mb-1 uppercase tracking-wide text-xs">Submit As</p>
          <p>MS Word (.doc or .docx). For queries, please contact the <span className="text-rose-700 font-semibold underline cursor-pointer">organizing committee</span>.</p>
        </div>

      </div>
    </div>
  );
}