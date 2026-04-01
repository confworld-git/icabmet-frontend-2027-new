import React, { useEffect, useState } from "react";
import download_svg from "../../images/icons/download.svg";
import Hero from "../commonhero/common-hero.jsx";
import Downloadform from "./Downloadform.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

const EssentialDownload = () => {
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const downloadList = [
    { title: "Conference Poster", file: "ICABMET Poster.jpg" },
    { title: "Conference Brochure", file: null },
    { title: "Abstract Template", file: "abstract temp.docx" },
    { title: "Full Paper Template", file: "full paper.doc" },
    { title: "Presentation Template", file: "PPT Model.ppt" },
    { title: "Registration Form", file: "Registration form.pdf" },
  ];

  return (
    <section>
      <Hero
        title="Essential Downloads"
        breadcrumbs={[{ label: 'Home', link: '#' }]}
        backgroundImage="/images/commonheroimages/7.webp"
      />
      <section className="w-full bg-white flex flex-col items-center">

        {/* Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-16 px-4">
          {downloadList.map((item, i) => (
            <div
              key={i}
              data-aos="zoom-in"
              data-aos-delay={i * 100}
              className={`flex flex-col justify-between items-center rounded-xl shadow hover:shadow-xl transition-shadow p-6 ${
                i === 2 || i === 3 ? "bg-orange-500" : "bg-rose-700"
              }`}
            >
              <h2 className="font-semibold text-center text-lg text-white min-h-[44px] flex items-center">
                {item.title}
              </h2>
              {item.file ? (
                <a
                  href={`/files/${item.file}`}
                  download
                  className="mt-6 flex items-center gap-2 bg-white text-rose-700 text-base font-semibold px-5 py-2 rounded-md shadow-sm transition duration-300 hover:opacity-90"
                >
                  <img src={download_svg} alt="" className="w-5 h-5" />
                  Download
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setPopup(true)}
                  className="mt-6 flex items-center gap-2 bg-white text-rose-700 text-base font-semibold px-5 py-2 rounded-md shadow-sm transition duration-300 hover:opacity-90"
                >
                  <img src={download_svg} alt="" className="w-5 h-5" />
                  Download
                </button>
              )}
            </div>
          ))}
        </div>

        {popup && <Downloadform setPopup={setPopup} />}
      </section>
    </section>
  );
};

export default EssentialDownload;