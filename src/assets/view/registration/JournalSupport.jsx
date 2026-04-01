import React, { useState } from "react";
import { journalPackages } from "../../../utils/journalData";
import PackageInclusionsModal from "./PackageInclusionsModal";

/**
 * Props added:
 *  currency      – "INR" | "USD"
 *  convertPrice  – (usdPrice, currency) => number
 *  fmt           – (amount, currency) => string
 */
const JournalSupport = ({
  selectedJournal,
  setSelectedJournal,
  currency = "USD",
  convertPrice = (p) => p,
  fmt = (p) => `$${p}`,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelect = (pkg) => {
    if (selectedJournal?.id === pkg.id) {
      setSelectedJournal(null);
    } else {
      setSelectedJournal(pkg);
    }
  };

  return (
    <div className="py-8 px-4 md:px-6">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-rose-900 mb-2">
          Research Publication Support
        </h2>
        <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
          Increase the impact of your research with structured support for publication
          in Q1, Q2, Q3, Q4 Scopus indexed journals.
        </p>
        {currency === "INR" && (
          <p className="text-orange-600 text-xs font-semibold mt-2">
            {/* 🇮🇳 Prices shown in INR (converted from USD at ₹94.02/USD) */}
          </p>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {journalPackages.map((pkg) => {
          const isSelected = selectedJournal?.id === pkg.id;
          const displaySpecial = convertPrice(pkg.specialPrice, currency);
          const displayRegular = convertPrice(pkg.regularPrice, currency);
          const savings = displayRegular - displaySpecial;

          return (
            <div
              key={pkg.id}
              className={`
                relative rounded-2xl border-2 p-5 flex flex-col transition-all duration-200
                ${
                  isSelected
                    ? "border-rose-700 shadow-lg shadow-rose-700/20 bg-rose-700"
                    : "border-gray-200 bg-rose-50 hover:border-rose-600 hover:shadow-md"
                }
              `}
            >
              {/* Badge */}
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-amber-400 text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  ★ {pkg.badge}
                </div>
              )}

              {/* Selected checkmark */}
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-rose-700 text-xs font-bold">✓</span>
                </div>
              )}

              {/* Tier name */}
              <h3 className={`font-bold text-base mb-0.5 pr-8 ${isSelected ? "text-white" : "text-gray-800"}`}>
                {pkg.tier}
              </h3>
              <p className={`text-[10px] font-semibold uppercase tracking-widest mb-4 ${isSelected ? "text-rose-200" : "text-gray-400"}`}>
                {pkg.package}
              </p>

              {/* Pricing */}
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-amber-400 text-xs font-semibold">⚡ Exclusive Offer</span>
                <span className={`text-2xl font-extrabold ${isSelected ? "text-white" : "text-rose-700"}`}>
                  ${pkg.specialPrice}
                </span>
              </div>
              <p className={`text-xs mb-5 ${isSelected ? "text-rose-200" : "text-gray-400"}`}>
                Regular:{" "}
                <span className="line-through">
                  ${pkg.regularPrice}
                </span>
              </p>

              {/* Savings badge */}
              <div
                className={`mb-5 inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg w-fit ${
                  isSelected ? "bg-white/20 text-white" : "bg-rose-100 text-rose-900"
                }`}
              >
                Save ${pkg.regularPrice-pkg.specialPrice}
              </div>

              {/* Action button */}
              <div className="mt-auto">
                <button
                  type="button"
                  onClick={() => handleSelect(pkg)}
                  className={`
                    w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200
                    ${
                      isSelected
                        ? "bg-white text-rose-700 hover:bg-rose-50"
                        : "bg-rose-700 text-white hover:bg-rose-600"
                    }
                  `}
                >
                  {isSelected ? "✓ Added" : "Add"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* View inclusions button */}
      <div className="flex pt-4">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="py-2 px-4 rounded-xl border border-rose-700 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 ml-auto hover:bg-rose-50"
        >
          <span className="text-rose-700">👁 View Package Inclusions</span>
        </button>
      </div>

      {/* Selected summary bar */}
      {selectedJournal && (
        <div className="mt-5 flex items-center justify-between bg-rose-700 rounded-xl px-5 py-3 shadow-md shadow-rose-200">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <span className="text-rose-700 text-xs font-bold">✓</span>
            </span>
            <span className="text-sm font-medium text-white">
              {selectedJournal.tier} selected
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-white">
              +{fmt(convertPrice(selectedJournal.specialPrice, currency), currency)}
            </span>
            <button
              type="button"
              onClick={() => setSelectedJournal(null)}
              className="text-xs text-red-300 hover:text-red-200 font-medium underline"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      <PackageInclusionsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default JournalSupport;