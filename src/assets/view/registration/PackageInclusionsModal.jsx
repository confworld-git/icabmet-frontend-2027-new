import React, { useEffect } from "react";
import { packageInclusions } from "../../../utils/journalData";

const PackageInclusionsModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[85vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-rose-700 px-6 py-5 flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-sm transition-colors"
          >
            ✕
          </button>
          <h2 className="text-white text-xl font-bold mb-1">
            What's Included in Our Publication Support?
          </h2>
          <p className="text-rose-200 text-sm">
            Comprehensive services provided across all journal publication support packages.
          </p>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-5">
          {packageInclusions.map((item, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-lg flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="font-semibold text-rose-900 text-sm mb-1">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full bg-rose-700 text-white py-3 rounded-xl font-semibold hover:bg-rose-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageInclusionsModal;