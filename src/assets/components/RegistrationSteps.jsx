import React from 'react';

export default function RegistrationSteps() {
  const steps = [
    {
      number: 1,
      image: "/images/registration-instructions/step1.png",
      title: "Choose Your ",
      subtitle: " Admittance Category.",
      color: "from-rose-500 to-rose-600",
      iconBg: "from-rose-400 to-rose-500",
      delay: "0s"
    },
    {
      number: 2,
      image: "/images/registration-instructions/step2.png",
      title: "Enter your details in",
      subtitle: "the form.",
      color: "from-orange-500 to-rose-500",
      iconBg: "from-orange-400 to-rose-400",
      delay: "0.2s"
    },
    {
      number: 3,
      image: "/images/registration-instructions/step3.png",
      title: "Proceed to Payment",
      subtitle: "Gateway.",
      color: "from-rose-600 to-orange-500",
      iconBg: "from-rose-500 to-orange-400",
      delay: "0.4s"
    },
    {
      number: 4,
      image: "/images/registration-instructions/step4.png",
      title: "Get your conference",
      subtitle: "invitation.",
      color: "from-orange-600 to-rose-700",
      iconBg: "from-orange-500 to-rose-600",
      delay: "0.6s"
    }
  ];

  return (
    <div className="  pb-8 px-4">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes arrow-bounce {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(10px); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .float-animation {
          animation: float 4s ease-in-out infinite;
        }
        .slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .arrow-bounce {
          animation: arrow-bounce 1.5s ease-in-out infinite;
        }
        .card-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
          transform: translateY(-12px) scale(1.02);
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>

      <div className="w-full">
        <div className="text-center mb-16 slide-up">
          
          
          <h1 className="text-4xl md:text-5xl font-black text-center text-rose-700 leading-tight pb-6">
        Registration Process
        </h1>
          <p className="text-slate-600 text-lg">Follow these simple steps to complete your registration</p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-16">
            {steps.map((step, index) => {
              return (
                <div  
                  key={step.number}
                  className="slide-up card-hover relative group"
                  style={{animationDelay: step.delay}}
                >
                  {/* Arrow separator - positioned absolutely between cards */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 left-full ml-2 z-10 arrow-bounce items-center justify-center w-12" style={{animationDelay: step.delay, transform: 'translateY(-50%)'}}>
                      <svg className="w-8 h-8 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  )}

                  {/* Main card */}
                  <div className={`relative rounded-3xl bg-gradient-to-br ${step.color} p-8 shadow-xl overflow-hidden`}>
                    {/* Animated background orbs */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 float-animation"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12 float-animation" style={{animationDelay: '1s'}}></div>
                    
                    {/* Shimmer effect overlay */}
                    <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* Number badge */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-rose-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <span className="text-white font-bold text-2xl"></span>
                    </div>

                    {/* Image container */}
                    <div className="relative mb-6 flex justify-center">
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${step.iconBg} rounded-2xl blur-xl opacity-60`}></div>
                        <div className="relative bg-white rounded-2xl  shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          <img 
                            src={step.image} 
                            alt={`Step ${step.number}`}
                            className="w-32 h-32 object-contain"
                          />
                        </div>
                      </div>
                    </div>
                    


                    {/* Text content */}
                    <div className="relative text-center">
                      <h3 className="text-xl font-bold text-white mb-1 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-rose-50 font-medium text-lg">
                        {step.subtitle}
                      </p>
                    </div>

                    
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}