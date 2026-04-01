import React, {useEffect} from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

export default function ObjectiveConference() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  const objective_conference = [
    {
      image: "1",
      text:"Interdisciplinary research",
      content:
        "Promote interdisciplinary research and innovation in life sciences and healthcare.",
    },
    {
      image: "2",
      text:"Exchange of knowledge",
      content:
        "Exchange knowledge, ideas & best practices among academicians & industry professionals.",
    },
    {
      image: "3",
      text:"Encourage collaboration",
      content:
        "Encourage collaborative efforts that translate scientific discoveries into practical healthcare solutions.",
    },
    {
      image: "4",
      text:"Global health challenges",
      content:
        "Address global health challenges through sustainable, evidence-based approaches.",
    },
    {
      image: "5",
      text:"Professional networking",
      content:
        "Foster professional networking to build lasting partnerships that advance health and wellbeing worldwide.",
    },
  ];

  const getGradientClass = (index) => {
    const gradients = [
      'from-purple-500 via-pink-500 to-red-500',
      'from-blue-500 via-cyan-500 to-teal-500',
      'from-green-500 via-emerald-500 to-blue-500',
      'from-yellow-500 via-orange-500 to-red-500',
      'from-indigo-500 via-purple-500 to-pink-500'
    ];
    return gradients[index % gradients.length];
  };

  const getIconBgClass = (index) => {
    const backgrounds = [
      'bg-gradient-to-br from-purple-400 to-pink-400',
      'bg-gradient-to-br from-blue-400 to-cyan-400',
      'bg-gradient-to-br from-green-400 to-emerald-400',
      'bg-gradient-to-br from-yellow-400 to-orange-400',
      'bg-gradient-to-br from-indigo-400 to-purple-400'
    ];
    return backgrounds[index % backgrounds.length];
  };

  return (
    <section className='pt-5'>
      <div className="w-full px-12 flex flex-col space-y-4 items-center">
          <h2 className="text-cyan-600 text-2xl md:text-3xl font-bold">
            Objectives of Conference
          </h2>
          <p className="text-center mx-10 md:mx-40">
          Through strategic collaboration and innovation, the International Conference on Life Sciences and Multidisciplinary Healthcare Approaches (ICLSMHA-2026)
            seeks to unite diverse expertise and aims to transform ideas into impactful healthcare solutions.
        </p>
          
        </div>
      <div className=" mx-6 md:mx-12 justify-center items-center md:items-start md:justify-between gap-6 md:gap-12 py-10">
        
        

        <div className="w-full grid grid-cols-1 md:grid-cols-2  justify-center items-center gap-6">
          {objective_conference.map((item, index) => (
            <div key={index} className="relative z-10">
              <div className={`relative p-1 rounded-3xl bg-gradient-to-r ${getGradientClass(index)} shadow-md`}>
                <div className="bg-slate-900/90 backdrop-blur-sm rounded-3xl p-8 h-full border border-white/10">
                  <div className="relative z-10 flex items-start gap-6">
                    <div className={`relative flex-shrink-0 w-20 h-20 rounded-2xl ${getIconBgClass(index)} flex items-center justify-center shadow-lg`}>
                      <div data-aos="zoom-in-left" className="relative z-10 text-white">
                        {item.image === "1" && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>
                          </svg>
                        )}
                        {item.image === "2" && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 7v14"/><path d="M16 12h2"/><path d="M16 8h2"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/><path d="M6 12h2"/><path d="M6 8h2"/>
                          </svg>
                        )}
                        {item.image === "3" && (
                          <svg fill="currentColor" height="28" width="28" viewBox="0 0 24 24">
                            <path d="M24,15.9c0-2.8-1.5-5-3.7-6.1C21.3,8.8,22,7.5,22,6c0-2.8-2.2-5-5-5c-2.1,0-3.8,1.2-4.6,3c0,0,0,0,0,0c-0.1,0-0.3,0-0.4,0 c-0.1,0-0.3,0-0.4,0c0,0,0,0,0,0C10.8,2.2,9.1,1,7,1C4.2,1,2,3.2,2,6c0,1.5,0.7,2.8,1.7,3.8C1.5,10.9,0,13.2,0,15.9V20h5v3h14v-3h5 V15.9z M17,3c1.7,0,3,1.3,3,3c0,1.6-1.3,3-3,3c0-1.9-1.1-3.5-2.7-4.4c0,0,0,0,0,0C14.8,3.6,15.8,3,17,3z M13.4,4.2 C13.4,4.2,13.4,4.2,13.4,4.2C13.4,4.2,13.4,4.2,13.4,4.2z M15,9c0,1.7-1.3,3-3,3s-3-1.3-3-3s1.3-3,3-3S15,7.3,15,9z M10.6,4.2 C10.6,4.2,10.6,4.2,10.6,4.2C10.6,4.2,10.6,4.2,10.6,4.2z M7,3c1.2,0,2.2,0.6,2.7,1.6C8.1,5.5,7,7.1,7,9C5.3,9,4,7.7,4,6S5.3,3,7,3 z M5.1,18H2v-2.1C2,13.1,4.1,11,7,11v0c0,0,0,0,0,0c0.1,0,0.2,0,0.3,0c0,0,0,0,0,0c0.3,0.7,0.8,1.3,1.3,1.8 C6.7,13.8,5.4,15.7,5.1,18z M17,21H7v-2.1c0-2.8,2.2-4.9,5-4.9c2.9,0,5,2.1,5,4.9V21z M22,18h-3.1c-0.3-2.3-1.7-4.2-3.7-5.2 c0.6-0.5,1-1.1,1.3-1.8c0.1,0,0.2,0,0.4,0v0c2.9,0,5,2.1,5,4.9V18z"/>
                          </svg>
                        )}
                        {item.image === "4" && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/><path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"/><path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"/><circle cx="12" cy="12" r="10"/>
                          </svg>
                        )}
                        {item.image === "5" && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/>
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${getGradientClass(index)} bg-clip-text text-transparent`}>
                        {item.text}
                      </h3>
                      <p className="text-gray-300 text-lg leading-relaxed font-medium">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className={`absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r ${getGradientClass(index)} rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg`}>
                {index + 1}
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
