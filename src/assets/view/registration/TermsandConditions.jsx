import React from "react";
import Hero from "../commonhero/common-hero";
import { FileText, Shield, XCircle, RefreshCw, Globe, Mail, Phone, MapPin, AlertCircle } from 'lucide-react';

const SectionHeader = ({ icon: Icon, title, orange }) => (
  <div className={`flex items-center gap-0 mb-6`}>
    <div className={`${orange ? "bg-orange-500" : "bg-rose-700"} text-white px-4 py-3 flex items-center gap-3`}>
      <Icon size={20} />
      <h2 className="text-lg font-black uppercase tracking-wide">{title}</h2>
    </div>
  </div>
);

const PolicySection = ({ icon, title, children, orange }) => (
  <section className="bg-white border-2 border-rose-700 overflow-hidden mb-6">
    <SectionHeader icon={icon} title={title} orange={orange} />
    <div className="px-8 pb-8 space-y-4 text-gray-700 leading-relaxed">
      {children}
    </div>
  </section>
);

const Note = ({ title, children, orange }) => (
  <div className={`border-l-4 px-5 py-4 my-4 ${orange ? "border-orange-500 bg-orange-50" : "border-rose-700 bg-rose-50"}`}>
    {title && <p className={`font-black text-sm uppercase tracking-wide mb-1 ${orange ? "text-orange-500" : "text-rose-700"}`}>{title}</p>}
    <div className="text-gray-800 text-sm leading-relaxed">{children}</div>
  </div>
);

const SubHeading = ({ children }) => (
  <h3 className="text-base font-black text-rose-700 uppercase tracking-wide mt-5 mb-2">{children}</h3>
);

const BulletList = ({ items }) => (
  <ul className="space-y-1 ml-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
        <span className={`shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? "bg-rose-700" : "bg-orange-500"}`} />
        {item}
      </li>
    ))}
  </ul>
);

const TermsandConditions = () => {
  return (
    <section>
      <Hero
        title="Terms & Conditions"
        breadcrumbs={[{ label: "Home", link: "#" }]}
        backgroundImage="/images/commonheroimages/commonhero14.webp"
      />

      <div className="bg-white px-6 md:px-12 py-14">

        {/* Page header */}
        <div className="flex items-center gap-0 mb-10">
          <div className="bg-rose-700 text-white text-xs font-black uppercase tracking-[0.25em] px-4 py-2">
            Policies
          </div>
          <div className="bg-orange-500 px-3 py-2 flex items-center">
            <span className="text-white text-xs font-black">✦</span>
          </div>
        </div>

        {/* Terms and Conditions */}
        <PolicySection icon={FileText} title="Terms and Conditions">
          <p className="font-bold text-rose-700">By registering for the conference, you hereby agree with the terms and conditions.</p>
          <p>The organization reserves the right to make alterations to the program, date and/or venue at any time without prior notice.</p>
          <p>The organization is not responsible for any loss or damage as a result of substitution, alteration, postponement or cancellation of an event due to causes beyond its control including without limitation, force majeure, natural disasters, sabotage, accident, trade or industrial disputes, terrorism, strikes or hostilities.</p>
          <p>The organization reserves the right and holds the sole discretion to cancel any conference at any time in case of any unavoidable and unforeseeable circumstances. The organizer will have no further liability to the client.</p>
          <p>Registrations remain valid for the event with new dates or for future editions if the conference has to be postponed by causes beyond organizer control. The refund policy is not applicable to this condition.</p>
          <p>In the event of cancellation, the organization will use reasonable and suitable alternative arrangements such as posting the news of cancellation on the appropriate event website to alert those who have booked or purchased tickets to attend the event.</p>
          <Note orange title="Important Notice">
            <div className="flex gap-2">
              <AlertCircle className="text-orange-500 shrink-0 mt-0.5" size={16} />
              <p>Delegates are responsible for checking this information prior to the event. We advise you to keep checking the website for updates of our conference.</p>
            </div>
          </Note>
          <p>The organizers will not accept any liability for personal injuries or for loss or damage to property belonging to the delegates, either during, or as a result of the conference.</p>
        </PolicySection>

        {/* Privacy Policy */}
        <PolicySection icon={Shield} title="Privacy Policy" orange>
          <p className="font-bold text-rose-700">We collect personal information that you voluntarily provide to us when registering for conferences, subscribing to newsletters, submitting inquiries, or participating in surveys or forums on https://icabmet.com</p>

          <SubHeading>1. Information We Collect</SubHeading>
          <p className="text-sm mb-2">This information may include:</p>
          <BulletList items={["Name", "Email address", "Contact number", "Mailing address", "Payment information", "Any other information you provide voluntarily"]} />

          <SubHeading>2. How We Use Your Information</SubHeading>
          <BulletList items={[
            "To process registrations for events and conferences",
            "To communicate with you regarding updates, announcements and relevant event information",
            "To respond to inquiries or provide customer support",
            "To manage website operations and improve our services",
            "To process payments and billing for conference participation or services",
            "For marketing purposes (only if you have given explicit consent)",
          ]} />

          <SubHeading>3. Sharing of Information</SubHeading>
          <p className="text-sm mb-2">We do not sell, trade or rent your personal information to third parties. However, we may share your information with:</p>
          <BulletList items={[
            "Service providers and vendors assisting us with conference logistics, payment processing and website management",
            "Law enforcement agencies or governmental bodies when required by law",
          ]} />

          <SubHeading>4. Your Rights</SubHeading>
          <BulletList items={[
            "Access, update or delete your personal information",
            "Opt-out of marketing communications",
            "Request the restriction of processing of your data in certain circumstances",
          ]} />
          <p className="text-sm mt-2">To exercise any of these rights, please contact us at info@icabmet.com</p>

          <SubHeading>5. Changes to This Privacy Policy</SubHeading>
          <p className="text-sm">We reserve the right to update this Privacy Policy at any time. Any changes will be posted on this page and we encourage you to review this page regularly to stay informed.</p>

          <SubHeading>6. Contact Us</SubHeading>
          <p className="text-sm">If you have any questions about this Privacy Policy or how we handle your personal information, please contact us at:</p>
          <div className="mt-2 space-y-1 text-sm">
            <p><span className="font-black text-rose-700">Email:</span> info@icabmet.com</p>
            <p><span className="font-black text-rose-700">Phone:</span> +91 8072381719</p>
          </div>
        </PolicySection>
        {/* Program Slot Policy */}
        <PolicySection icon={Shield} title="Program Slot Policy" >
          <p className="font-bold text-rose-700">No changes to allocated slots will be allowed once the official program schedule (Agenda) is released.</p>

          
        </PolicySection>

        {/* Cancellation Policy */}
        <PolicySection icon={XCircle} title="Cancellation Policy" orange>
          <p>If the registrant is unable to attend, please note the following cancellation policy, which takes into account advance payments made for venue, printing, shipping, hotels and other overheads.</p>
          <div className="grid sm:grid-cols-3 gap-4 mt-4">
            <div className="bg-white border-2 border-rose-700 p-5">
              <p className="text-xs font-black uppercase tracking-widest text-rose-700 mb-2">50 Days Before</p>
              <p className="text-4xl font-black text-rose-700 leading-none">40%</p>
              <p className="text-sm font-bold text-gray-600 mt-1">Refundable</p>
            </div>
            <div className="bg-white border-2 border-orange-500 p-5">
              <p className="text-xs font-black uppercase tracking-widest text-orange-500 mb-2">30–40 Days Before</p>
              <p className="text-4xl font-black text-orange-500 leading-none">35%</p>
              <p className="text-sm font-bold text-gray-600 mt-1">Refundable</p>
            </div>
            <div className="bg-rose-700 border-2 border-rose-700 p-5">
              <p className="text-xs font-black uppercase tracking-widest text-white opacity-75 mb-2">Less Than 30 Days</p>
              <p className="text-4xl font-black text-white leading-none">0%</p>
              <p className="text-sm font-bold text-white opacity-75 mt-1">No Refunds</p>
            </div>
          </div>
        </PolicySection>

        {/* Refund Policy */}
        <PolicySection icon={RefreshCw} title="Refund Policy" >
          <Note title="Transfer of Registration">
            Registration can be transferred to another event organized by the same organization of the registrant's choice.
          </Note>
          <Note orange title="Important Note">
            Refunds will be processed 2–4 weeks after the conference, excluding transaction charges.
          </Note>
          <Note title="Special Conditions">
            Refund/Cancellation Policy is not applicable if the conference is postponed due to natural disasters or unpredictable activities beyond organizers control including without limitation, force majeure, natural disasters, sabotage, accident, trade or industrial disputes, terrorism, strikes or hostilities.
          </Note>
        </PolicySection>

        {/* VISA Information */}
        <PolicySection icon={Globe} title="VISA Information" orange>
          <Note title="CERADA Policy">
            Confworld Educational Research and Development Association (CERADA) will not directly contact embassies and consulates on behalf of visa applicants.
          </Note>
          <p className="font-black text-rose-700">All delegates or invitees should apply for a Business Visa only.</p>
          <Note orange title="Important">
            Visa issues, including the inability to obtain a visa, do not fall under the consideration of the cancellation policy of the Confworld Educational Research and Development Association (CERADA).
          </Note>
        </PolicySection>

        {/* Venue */}
        <section className="bg-rose-700 border-2 border-rose-700 overflow-hidden mb-6 p-8 flex items-center gap-5">
          <div className="w-12 h-12 bg-white flex items-center justify-center shrink-0">
            <MapPin className="text-rose-700" size={24} />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-300 mb-1">Conference Venue</p>
            <p className="text-3xl font-black text-white">Chennai, India</p>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-white border-2 border-rose-700 overflow-hidden">
          <div className="bg-rose-700 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-black text-white uppercase tracking-wide">Contact Information</h2>
            <span className="text-xs font-black uppercase tracking-[0.25em] text-orange-300">Get in Touch</span>
          </div>
          <div className="px-8 py-6 space-y-4">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Conference registration and paper submission inquiries</p>
            <div className="space-y-3">
              <p className="text-base font-black text-gray-900">Ms. Aishwarya S</p>
              <a href="tel:+918072381719" className="flex items-center gap-3 group">
                <div className="w-8 h-8 bg-rose-700 flex items-center justify-center shrink-0">
                  <Phone className="text-white" size={14} />
                </div>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-rose-700 transition-colors">+91 8072381719</span>
              </a>
              <a href="mailto:info@icabmet.com" className="flex items-center gap-3 group">
                <div className="w-8 h-8 bg-orange-500 flex items-center justify-center shrink-0">
                  <Mail className="text-white" size={14} />
                </div>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-500 transition-colors">info@icabmet.com</span>
              </a>
            </div>
          </div>
        </section>

      </div>
    </section>
  );
};

export default TermsandConditions;