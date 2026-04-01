import React, { useState, useEffect } from 'react';
import { CreditCard, Download, FileText, Send, AlertCircle, CheckCircle, Clock, Users, FileEdit, Calendar } from 'lucide-react';
import Hero from '../commonhero/common-hero';

const RegistrationInstructions = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const instructions = [
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Payment",
      description: "Complete your payment for the conference.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
      orange: false,
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Download Form",
      description: "After making your payment, download the Registration Form.",
      image: "/images/availablepayment/form.jpg",
      orange: true,
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Fill Out Form",
      description: "Complete all required fields in the Registration Form.",
      image: "/images/availablepayment/fill.jpg",
      orange: false,
    },
    {
      icon: <Send className="w-6 h-6" />,
      title: "Submit Registration",
      description: "Email the filled-out Registration Form along with your payment information to info@icabmet.com.",
      image: "/images/availablepayment/submit.jpg",
      orange: true,
    },
  ];

  const guidelines = [
    {
      icon: <AlertCircle className="w-5 h-5" />,
      title: "Payment Notification",
      description: "Registered members must inform us about their payments immediately via E-mail.",
      orange: false,
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Proof of Payment",
      description: "After completing registration, every participant is required to email a scanned copy of the registration fee receipt or transaction proof to us immediately.",
      orange: true,
    },
    {
      icon: <FileEdit className="w-5 h-5" />,
      title: "Paper Submission",
      description: "No modifications to the paper will be accepted after the final submission date.",
      orange: false,
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Author Limit",
      description: "Only one author and one co-author are allowed per registration.",
      orange: true,
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Late Registration",
      description: "If you need to register after the deadlines, please contact the coordinator as soon as possible.",
      orange: false,
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Form Submission",
      description: "After making your payment, download the Registration Form, fill it out and email it to us at info@icabmet.com along with your payment information.",
      orange: true,
    },
  ];

  return (
    <section>
      <Hero
        title="Registration Instructions"
        breadcrumbs={[{ label: "Home", link: "#" }]}
        backgroundImage="/images/commonheroimages/commonhero13.webp"
      />

      <div className="min-h-screen bg-white px-6 md:px-12 py-14 space-y-14">

        {/* Header */}
        <div>
          <div className="flex items-center gap-0 mb-6">
            <div className="bg-rose-700 text-white text-xs font-black uppercase tracking-[0.25em] px-4 py-2">
              How to Register
            </div>
            <div className="bg-orange-500 px-3 py-2 flex items-center">
              <span className="text-white text-xs font-black">✦</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-rose-700 leading-tight ">
          Registration Instructions
        </h1>
          
        </div>

        {/* Instruction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructions.map((item, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden transition-all duration-500 border-2 ${item.orange ? "border-orange-500" : "border-rose-700"} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Step number bar */}
              <div className={`${item.orange ? "bg-orange-500" : "bg-rose-700"} px-4 py-2 flex items-center justify-between`}>
                <span className="text-white text-xs font-black uppercase tracking-[0.25em]">Step</span>
                <span className="text-white font-black text-lg opacity-60">{String(index + 1).padStart(2, "0")}</span>
              </div>

              {/* Image */}
              <div className="h-44 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-500 ${item.orange ? "bg-orange-500" : "bg-rose-700"}`} />
              </div>

              {/* Content */}
              <div className="p-5 bg-white">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`w-8 h-8 flex items-center justify-center text-white shrink-0 ${item.orange ? "bg-orange-500" : "bg-rose-700"}`}>
                    {item.icon}
                  </span>
                  <h3 className={`text-base font-black uppercase tracking-wide ${item.orange ? "text-orange-500" : "text-rose-700"}`}>
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Important note */}
        <div className="border-l-4 border-orange-500 bg-white px-5 py-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-orange-500 shrink-0" />
            <p className="text-gray-800 font-bold text-sm">
              Important: Please note that the payee is responsible for all bank charges.
            </p>
          </div>
        </div>

       

        {/* Guidelines Header */}
        <div>
          <div className="flex items-center gap-0 mb-6">
            <div className="bg-rose-700 text-white text-xs font-black uppercase tracking-[0.25em] px-4 py-2">
              Guidelines
            </div>
            <div className="bg-orange-500 px-3 py-2 flex items-center">
              <span className="text-white text-xs font-black">✦</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-rose-700 leading-tight ">
         Registration Guidelines
        </h1>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gray-200" />

          <div className="space-y-4">
            {guidelines.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-start gap-6 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Timeline node */}
                <div className={`shrink-0 w-10 h-10 flex items-center justify-center text-white z-10 ${item.orange ? "bg-orange-500" : "bg-rose-700"}`}>
                  {item.icon}
                </div>

                {/* Card */}
                <div className={`flex-1 border-l-4 bg-white px-5 py-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 ${item.orange ? "border-l-orange-500" : "border-l-rose-700"}`}>
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-xs font-black uppercase tracking-[0.2em] ${item.orange ? "text-orange-500" : "text-rose-700"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-base font-black text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <div className="bg-rose-700 px-6 py-5 flex items-center gap-4">
          <AlertCircle className="w-5 h-5 text-orange-300 shrink-0" />
          <p className="text-white font-bold text-sm">
            Note: The payee is responsible for all bank charges.
          </p>
        </div>

      </div>
    </section>
  );
};

export default RegistrationInstructions;