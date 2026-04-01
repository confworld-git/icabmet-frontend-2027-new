import React, { useState } from 'react';
import { Mail, Phone, CheckCircle } from 'lucide-react';
import Hero from "../commonhero/common-hero";

const PaymentCard = ({ title, image, index }) => {
  const isOrange = index % 2 !== 0;

  return (
    <div
      className="group relative overflow-hidden cursor-default"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Top accent bar */}
      <div className={`h-1.5 w-full ${isOrange ? "bg-orange-500" : "bg-rose-700"}`} />

      <div className="bg-white border-2 border-t-0 border-gray-100 shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
        {/* Image */}
        <div className="h-52 overflow-hidden relative">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          />
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-500 ${
            isOrange
              ? "bg-gradient-to-t from-orange-600 to-transparent"
              : "bg-gradient-to-t from-rose-700 to-transparent"
          }`} />
        </div>

        {/* Card footer */}
        <div className="px-5 py-4 flex items-center justify-between">
          <h3 className={`text-base font-black uppercase tracking-wide ${isOrange ? "text-orange-500" : "text-rose-700"}`}>
            {title}
          </h3>
          <div className={`w-8 h-8 flex items-center justify-center text-white text-sm font-black transition-all duration-300 opacity-0 group-hover:opacity-100 ${isOrange ? "bg-orange-500" : "bg-rose-700"}`}>
            ✓
          </div>
        </div>

        {/* Secure tag */}
        <div className={`px-5 pb-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0`}>
          <CheckCircle className={`w-4 h-4 ${isOrange ? "text-orange-500" : "text-rose-700"}`} />
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Secure & Fast</span>
        </div>
      </div>
    </div>
  );
};

const BankDetailsCard = ({ bankDetails }) => (
  <div className="border-2 border-rose-700 overflow-hidden shadow-xl">
    {/* SVG illustration header */}
    <div className="bg-rose-700 px-8 py-10 relative overflow-hidden flex items-center gap-8">
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full border-[30px] border-white/5 pointer-events-none" />
      <div className="absolute -bottom-8 right-32 w-32 h-32 rounded-full border-[20px] border-orange-500/20 pointer-events-none" />

      {/* Bank SVG icon */}
      <div className="shrink-0 w-24 h-24 bg-white/10 flex items-center justify-center rounded-sm border-2 border-white/20">
        <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Building base */}
          <rect x="6" y="52" width="52" height="6" fill="white" opacity="0.9"/>
          {/* Columns */}
          <rect x="10" y="28" width="6" height="24" fill="white" opacity="0.8"/>
          <rect x="22" y="28" width="6" height="24" fill="white" opacity="0.8"/>
          <rect x="36" y="28" width="6" height="24" fill="white" opacity="0.8"/>
          <rect x="48" y="28" width="6" height="24" fill="white" opacity="0.8"/>
          {/* Entablature */}
          <rect x="6" y="22" width="52" height="6" fill="white" opacity="0.9"/>
          {/* Pediment */}
          <polygon points="32,6 4,22 60,22" fill="#f97316" opacity="0.9"/>
          {/* Door */}
          <rect x="27" y="38" width="10" height="14" rx="5" fill="#f97316" opacity="0.9"/>
        </svg>
      </div>

      <div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-300 mb-2">Wire Transfer</p>
        <h3 className="text-3xl font-black text-white leading-tight">Bank Transfer Details</h3>
        <div className="flex gap-1 mt-3">
          <div className="h-1 w-12 bg-white" />
          <div className="h-1 w-8 bg-orange-500" />
          <div className="h-1 w-4 bg-white opacity-40" />
        </div>
      </div>
    </div>

    {/* Details grid */}
    <div className="bg-white p-6 grid sm:grid-cols-2 gap-3">
      {bankDetails.map((detail, idx) => (
        <div
          key={idx}
          className={`border-l-4 px-4 py-3 bg-gray-50 hover:bg-white transition-colors duration-200 ${
            idx % 2 === 0 ? "border-rose-700" : "border-orange-500"
          }`}
        >
          <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">{detail.label}</p>
          <p className={`font-black text-base ${idx % 2 === 0 ? "text-rose-700" : "text-orange-500"}`}>
            {detail.value}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default function PaymentMethodsPage() {
  const paymentMethods = [
    { title: 'Debit/Credit Card', image: '/images/available_payments/debit.webp' },
    { title: 'Net Banking', image: '/images/available_payments/netbank.webp' },
    { title: 'PayPal', image: '/images/available_payments/paypal.webp' },
    { title: 'Bank Transfer (TT)', image: '/images/available_payments/bank.webp' },
  ];

  const bankDetails = [
    { label: 'Beneficiary Name', value: 'CONFWORLD EDUCATIONAL RESEARCH AND DEVELOPMENT ASSOCIATION' },
    { label: 'Bank Name', value: 'HDFC Bank' },
    { label: 'Account Number', value: '50200097123575' },
    { label: 'IFSC Code', value: 'HDFC0000124' },
    { label: 'Swift Code', value: 'HDFCINBBCHE' },
    { label: 'Branch', value: 'Kilpauk, Chennai, Tamil Nadu, India' },
  ];

  return (
    <div className="bg-white">
      <Hero
        title="Available Payment Methods"
        breadcrumbs={[{ label: 'Home', link: '#' }]}
        backgroundImage="/images/commonheroimages/13.webp"
      />

      <div className="px-6 md:px-12 py-14 space-y-14">

        {/* Header */}
        <div>
          <div className="flex items-center gap-0 mb-6">
            <div className="bg-rose-700 text-white text-xs font-black uppercase tracking-[0.25em] px-4 py-2">
              Payment Methods
            </div>
            <div className="bg-orange-500 px-3 py-2 flex items-center">
              <span className="text-white text-xs font-black">✦</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
            Choose Your <span className="text-rose-700">Payment Method</span>
          </h2>
          <div className="flex gap-1">
            <div className="h-1.5 w-16 bg-rose-700" />
            <div className="h-1.5 w-8 bg-orange-500" />
            <div className="h-1.5 w-4 bg-rose-300" />
          </div>
        </div>

        {/* Payment Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paymentMethods.map((method, idx) => (
            <PaymentCard key={idx} title={method.title} image={method.image} index={idx} />
          ))}
        </div>

        {/* Bank Details */}
        <BankDetailsCard bankDetails={bankDetails} />

        {/* Contact Section */}
        <div className="bg-rose-700 px-8 md:px-14 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-300 mb-2">Need Help?</p>
            <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">Need Assistance?</h3>
            <p className="text-white opacity-75 text-sm mt-2">Our team is ready to help with any payment queries.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a
              href="mailto:info@icabmet.com"
              className="flex items-center gap-3 bg-white text-rose-700 font-black text-sm uppercase tracking-wide px-6 py-3 hover:bg-rose-50 transition-colors duration-200"
            >
              <Mail className="w-4 h-4" />
              info@icabmet.com
            </a>
            <a
              href="tel:+918072381719"
              className="flex items-center gap-3 bg-orange-500 text-white font-black text-sm uppercase tracking-wide px-6 py-3 hover:bg-orange-600 transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              +91 8072381719
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}