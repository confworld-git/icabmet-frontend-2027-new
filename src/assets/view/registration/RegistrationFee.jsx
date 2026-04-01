import React, { useState, useRef, useEffect } from "react";
import { toaster } from "evergreen-ui";
import Hero from "../commonhero/common-hero.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

import RegistrationSteps from "../../components/RegistrationSteps.jsx";
import DiscountConfetti from "./discount-confetti.jsx";
import ConferenceCards from "./ConferenceCards.jsx";
import JournalSupport from "./JournalSupport.jsx";
import Addons from "./Addons.jsx";

// ─── Currency helpers ─────────────────────────────────────────────────────────
const USD_TO_INR = 1; // fixed conversion rate; update as needed

const convertPrice = (usdPrice, currency) =>
  currency === "INR" ? Math.round(usdPrice * USD_TO_INR) : usdPrice;

const fmt = (amount, currency) =>
  currency === "INR"
    ? `₹${amount.toLocaleString("en-IN")}`
    : `$${amount.toLocaleString("en-US")}`;

// ─── Pricing Calculator ───────────────────────────────────────────────────────
/**
 * combinedBase = raw fee + journal + addons (already in the chosen currency)
 * For INR: GST 18% then bank charge 3%
 * For USD: bank charge 6% only
 */
const calculatePricing = ({
  baseAmount,
  journalAmount = 0,
  addonsAmount = 0,
  participantCategory,
  hasMembership,
  hasCoupon,
  currency,
}) => {
  const base = parseFloat(baseAmount);
  const isStudent = participantCategory?.toLowerCase().includes("student");
  // Membership fee in USD → convert if INR
  const membershipFeeUSD = isStudent ? 15 : 20;
  const membershipFeeAmount = convertPrice(membershipFeeUSD, currency);

  let calc = {
    baseAmount: base,
    membershipFee: 0,
    membershipDiscount: 0,
    couponDiscount: 0,
    totalDiscount: 0,
    finalAmount: base,
    gst: 0,
    bankTax: 0,
    total: base,
  };

  if (hasMembership && hasCoupon) {
    calc.totalDiscount = base * 0.1;
    calc.membershipFee = membershipFeeAmount;
    calc.membershipDiscount = base * 0.05;
    calc.couponDiscount = base * 0.05;
    calc.finalAmount = base - calc.totalDiscount + calc.membershipFee;
  } else if (hasMembership && !hasCoupon) {
    calc.membershipDiscount = base * 0.05;
    calc.totalDiscount = calc.membershipDiscount;
    calc.membershipFee = membershipFeeAmount;
    calc.finalAmount = base - calc.membershipDiscount + calc.membershipFee;
  } else if (!hasMembership && hasCoupon) {
    calc.couponDiscount = base * 0.05;
    calc.totalDiscount = calc.couponDiscount;
    calc.finalAmount = base - calc.couponDiscount;
  } else {
    calc.finalAmount = base;
  }
  calc.finalAmount = calc.finalAmount + journalAmount + addonsAmount;

  if (currency === "INR") {
    const gst = calc.finalAmount * 0.18;
    const bankTax = (calc.finalAmount + gst) * 0.03;
    calc.gst = parseFloat(gst.toFixed(2));
    calc.bankTax = parseFloat(bankTax.toFixed(2));
    calc.total = parseFloat((calc.finalAmount + gst + bankTax).toFixed(2));
  } else {
    const bankTax = calc.finalAmount * 0.06;
    calc.bankTax = parseFloat(bankTax.toFixed(2));
    calc.total = parseFloat((calc.finalAmount + bankTax).toFixed(2));
  }

  Object.keys(calc).forEach((k) => {
    calc[k] = parseFloat(parseFloat(calc[k]).toFixed(2));
  });

  return calc;
};

// ─── Checkout Panel ───────────────────────────────────────────────────────────
const CheckoutPanel = ({
  pricing,
  baseSelected,
  participantCategory,
  membership,
  onMembershipToggle,
  couponCode,
  couponStatus,
  onCouponChange,
  onCouponApply,
  onCouponRemove,
  selectedJournal,
  selectedAddons,
  registrationBase,
  currency,
}) => {
  const isStudent = participantCategory?.toLowerCase().includes("student");
  const membershipFeeUSD = isStudent ? 15 : 20;
  const membershipFee = convertPrice(membershipFeeUSD, currency);

  const journalAmount = selectedJournal
    ? convertPrice(selectedJournal.specialPrice, currency)
    : 0;
  const addonsAmount = selectedAddons.reduce(
    (sum, a) => sum + convertPrice(a.price, currency),
    0,
  );

  return (
    <div className="md:w-[420px] shrink-0 space-y-4">
      {/* Currency badge */}
      <div
        className={`rounded-xl px-4 py-2 text-xs font-bold text-center ${currency === "INR" ? "bg-orange-100 text-orange-700 border border-orange-200" : "bg-rose-100 text-rose-700 border border-rose-200"}`}
      >
        {currency === "INR"
          ? "🇮🇳 Indian pricing selected — amounts in INR (incl. 18% GST + 3% bank charge)"
          : "🌐 International pricing selected — amounts in USD (incl. 6% bank charge)"}
      </div>

      {/* Membership Card */}
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[15px] font-bold text-rose-700">
              Premium Membership ({fmt(membershipFee, currency)})
            </h3>
            <p className="text-sm text-rose-600 mt-0.5">
              Get 5% discount on registration fee
            </p>
            <p className="text-sm font-bold text-rose-700 mt-2">
              Fee: {fmt(membershipFee, currency)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onMembershipToggle(!membership)}
            className={`relative inline-flex h-7 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${membership ? "bg-rose-600" : "bg-gray-300"}`}
            style={{ width: "52px" }}
            aria-pressed={membership}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform duration-200 ${membership ? "translate-x-6" : "translate-x-0"}`}
            />
          </button>
        </div>
      </div>

      {/* Coupon Card */}
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 shadow-sm">
        <h3 className="text-[15px] font-bold text-rose-600 mb-1">
          Get 5% Discount with a coupon code!
        </h3>
        {couponStatus === "valid" ? (
          <div className="flex items-center justify-between bg-rose-100 border border-rose-300 rounded-xl px-4 py-3 mt-2">
            <span className="text-rose-700 font-semibold text-sm">
              ✓ Coupon &quot;{couponCode}&quot; applied
            </span>
            <button
              type="button"
              onClick={onCouponRemove}
              className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => onCouponChange(e.target.value.toUpperCase())}
              placeholder="Enter coupon code"
              className="flex-1 border border-rose-300 bg-white rounded-xl px-3 py-2 text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
            />
            <button
              type="button"
              onClick={onCouponApply}
              className="bg-rose-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-rose-700 transition-colors"
            >
              Apply
            </button>
          </div>
        )}
        {couponStatus === "invalid" && (
          <p className="text-red-500 text-xs mt-1">
            ✗ Invalid or expired coupon code.
          </p>
        )}
      </div>

      {/* Price Breakdown */}
      {baseSelected ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 shadow-sm">
          <h3 className="text-[15px] font-bold text-rose-600 mb-4">
            Price Breakdown
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-700">
              <span>Base Registration Fee:</span>
              <span className="font-medium">
                {fmt(registrationBase ?? pricing.baseAmount, currency)}
              </span>
            </div>

            {journalAmount > 0 && (
              <div className="flex justify-between text-gray-700">
                <span>Journal Support ({selectedJournal?.tier}):</span>
                <span className="font-medium">
                  + {fmt(journalAmount, currency)}
                </span>
              </div>
            )}

            {addonsAmount > 0 && (
              <div className="flex justify-between text-gray-700">
                <span>Add-ons ({selectedAddons.length} selected):</span>
                <span className="font-medium">
                  + {fmt(addonsAmount, currency)}
                </span>
              </div>
            )}

            {(journalAmount > 0 || addonsAmount > 0) && (
              <div className="flex justify-between text-gray-800 font-semibold border-t border-dashed border-rose-200 pt-2 mt-1">
                {/* <span>Combined Subtotal:</span> */}
                {/* <span>
                  {fmt(
                    (registrationBase ?? pricing.baseAmount) +
                      journalAmount +
                      addonsAmount,
                    currency,
                  )}
                </span> */}
              </div>
            )}

            {pricing.membershipDiscount > 0 && (
              <div className="flex justify-between text-rose-700">
                <span>Membership Discount (5%):</span>
                <span className="font-semibold">
                  - {fmt(pricing.membershipDiscount, currency)}
                </span>
              </div>
            )}
            {pricing.couponDiscount > 0 && (
              <div className="flex justify-between text-rose-700">
                <span>Coupon Discount (5%):</span>
                <span className="font-semibold">
                  - {fmt(pricing.couponDiscount, currency)}
                </span>
              </div>
            )}
            {pricing.membershipFee > 0 && (
              <div className="flex justify-between text-gray-700">
                <span>Membership Fee:</span>
                <span className="font-medium">
                  + {fmt(pricing.membershipFee, currency)}
                </span>
              </div>
            )}

            <div className="border-t border-rose-200 my-2" />

            <div className="flex justify-between font-bold text-gray-800">
              <span>Subtotal:</span>
              <span>{fmt(pricing.finalAmount, currency)}</span>
            </div>

            {/* GST row — INR only */}
            {currency === "INR" && pricing.gst > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>GST (18%):</span>
                <span>{fmt(pricing.gst, currency)}</span>
              </div>
            )}

            <div className="flex justify-between text-gray-600">
              <span>
                Bank Convenience Charge ({currency === "INR" ? "3%" : "6%"}):
              </span>
              <span>{fmt(pricing.bankTax, currency)}</span>
            </div>

            <div className="border-t border-rose-200 my-2" />

            <div className="flex justify-between text-rose-700 font-bold text-base">
              <span>Total Amount:</span>
              <span>{fmt(pricing.total, currency)}</span>
            </div>

            {pricing.totalDiscount > 0 && (
              <div className="mt-3 bg-rose-100 border border-rose-200 rounded-xl px-4 py-2.5 text-center">
                <span className="text-rose-700 font-semibold text-sm">
                  🎉 You saved {fmt(pricing.totalDiscount, currency)}!
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-rose-200 bg-rose-50 p-5 text-center text-sm text-rose-700">
          ↑ Select a registration fee from the table above to see your price
          breakdown.
        </div>
      )}
    </div>
  );
};

// ─── Fee Table Component ──────────────────────────────────────────────────────
const FeeTable = ({ tableData, isEarlyBird, onSelect, selectedBase }) => {
  return (
    <div className="overflow-x-auto w-full shadow-xl rounded-b-md">
      <table className="table-auto w-full border-collapse">
        <caption className="bg-gradient-to-t from-rose-800 to-rose-700 text-white p-3 rounded-t-md text-md text-left px-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-20 gap-2">
            <span className="font-bold">{tableData.title}</span>

            <span className="text-yellow-400 text-sm md:text-base">
              *Note: The registration fees is based on your citizenship, not
              nationality.
            </span>
          </div>
        </caption>
        <thead>
          <tr className="bg-rose-600 text-sm text-white text-left">
            <th className="border-r border-rose-500 p-3 w-[35%]">Categories</th>
            <th
              className="border-r border-rose-500 p-3 text-center"
              colSpan={2}
            >
              India (INR)
            </th>
            <th
              className="border-r border-rose-500 p-3 text-center"
              colSpan={2}
            >
              🌐 Abroad (USD)
            </th>
          </tr>
          <tr className="bg-rose-500 text-xs text-white text-center">
            <th className="border-r border-rose-400 p-2 text-left pl-3">
              Category
            </th>
            <th className="border-r border-rose-400 p-2">Early Bird</th>
            <th className="border-r border-rose-400 p-2">Regular</th>
            <th className="border-r border-rose-400 p-2">Early Bird</th>
            <th className="p-2">Regular</th>
          </tr>
        </thead>
        <tbody>
          {tableData.categories.map((item, i) => (
            <tr
              key={i}
              className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} text-sm font-[450]`}
            >
              <td className="border-r border-gray-200 p-3 text-gray-700">
                {item.category}
                {item.category.toLowerCase().includes("ug") ||
                item.category.toLowerCase().includes("student") ? (
                  <span className="text-red-500 ml-0.5">*</span>
                ) : null}
              </td>

              {/* INR Early Bird */}
              <td className="border-r border-gray-200 p-3 text-center">
                <label
                  className={`flex items-center justify-center gap-1.5 cursor-pointer `}
                >
                  <input
                    type="radio"
                    name="price"
                    onChange={() =>
                      onSelect(
                        item.inrEarlyBird,
                        tableData.title,
                        item.category,
                        "INR",
                      )
                    }
                    value={`INR_${item.inrEarlyBird}`}
                    className="accent-rose-700"
                  />
                  <span className="font-semibold">
                    ₹{item.inrEarlyBird.toLocaleString("en-IN")}
                  </span>
                </label>
              </td>

              {/* INR Regular */}
              <td className="border-r border-gray-200 p-3 text-center">
                <label className="flex items-center justify-center gap-1.5 cursor-pointer text-gray-700">
                  <input
                    type="radio"
                    name="price"
                    onChange={() =>
                      onSelect(
                        item.inrRegular,
                        tableData.title,
                        item.category,
                        "INR",
                      )
                    }
                    value={`INR_${item.inrRegular}`}
                    className="accent-rose-700"
                  />
                  <span className="font-semibold">
                    ₹{item.inrRegular.toLocaleString("en-IN")}
                  </span>
                </label>
              </td>

              {/* USD Early Bird */}
              <td className="border-r border-gray-200 p-3 text-center">
                <label
                  className={`flex items-center justify-center gap-1.5 cursor-pointer `}
                >
                  <input
                    type="radio"
                    name="price"
                    onChange={() =>
                      onSelect(
                        item.usdEarlyBird,
                        tableData.title,
                        item.category,
                        "USD",
                      )
                    }
                    value={`USD_${item.usdEarlyBird}`}
                    className="accent-orange-500"
                  />
                  <span className="font-semibold">${item.usdEarlyBird}</span>
                </label>
              </td>

              {/* USD Regular */}
              <td className="p-3 text-center">
                <label className="flex items-center justify-center gap-1.5 cursor-pointer text-gray-700">
                  <input
                    type="radio"
                    name="price"
                    onChange={() =>
                      onSelect(
                        item.usdRegular,
                        tableData.title,
                        item.category,
                        "USD",
                      )
                    }
                    value={`USD_${item.usdRegular}`}
                    className="accent-orange-500"
                  />
                  <span className="font-semibold">${item.usdRegular}</span>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ─── Currency-aware Journal Support wrapper ───────────────────────────────────
/**
 * JournalSupport uses `selectedJournal.specialPrice` (always in USD).
 * We pass a display currency hint so the parent can render prices in INR when needed.
 * The actual conversion happens in CheckoutPanel and the pricing calculator.
 */

// ─── Main Component ───────────────────────────────────────────────────────────
const RegistrationFee = () => {
  useEffect(() => {
    const loadRazorpay = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    };
    if (
      !document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
      )
    ) {
      loadRazorpay();
    }
  }, []);

  useEffect(() => {
    AOS.init({ once: true });
    AOS.refresh();
  }, []);

  // Early Bird: ends 10 March 2026
  const Early_Bird_Last_Date = new Date("10 March 2026");
  Early_Bird_Last_Date.setHours(23, 59, 59, 999);
  const dateNow = new Date();
  const isEarlyBird = dateNow <= Early_Bird_Last_Date;

  const navigate = useNavigate();
  const RegistrationFeeRef = useRef();

  // ── Form state ──────────────────────────────────────────────────────────────
  const [participantCategory, setParticipantCategory] = useState("");
  const [selectedBase, setSelectedBase] = useState(null); // { value, title, category, currency }
  const [currency, setCurrency] = useState("USD"); // active currency driven by fee selection

  // ── Journal & Addons state ──────────────────────────────────────────────────
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);

  useEffect(() => {
    setSelectedJournal(null);
    setSelectedAddons([]);
  }, [selectedBase]);

  // ── Discount state ──────────────────────────────────────────────────────────
  const [membership, setMembership] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponStatus, setCouponStatus] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [appliedCouponCode, setAppliedCouponCode] = useState("");

  // ── Derived pricing ─────────────────────────────────────────────────────────
  // Journal and addons specialPrice/price are stored in USD; convert to current currency
  const journalAmountInCurrency = selectedJournal
    ? convertPrice(selectedJournal.specialPrice, currency)
    : 0;
  const addonsAmountInCurrency = selectedAddons.reduce(
    (sum, a) => sum + convertPrice(a.price, currency),
    0,
  );

  const pricing = selectedBase
    ? calculatePricing({
        baseAmount: selectedBase.value,
        journalAmount: journalAmountInCurrency,
        addonsAmount: addonsAmountInCurrency,
        participantCategory,
        hasMembership: membership,
        hasCoupon: couponDiscount > 0,
        currency,
      })
    : {
        baseAmount: 0,
        membershipDiscount: 0,
        couponDiscount: 0,
        membershipFee: 0,
        totalDiscount: 0,
        finalAmount: 0,
        gst: 0,
        bankTax: 0,
        total: 0,
      };

  const handleBaseSelect = (value, title, category, cur) => {
    setSelectedBase({ value, title, category, currency: cur });
    setCurrency(cur);
  };

  const handleCouponApply = async () => {
    if (!couponCode.trim()) return;
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/coupon/validate`,
        {
          code: couponCode,
        },
      );
      setCouponStatus("valid");
      setCouponDiscount(data.discountPercent);
      setAppliedCouponCode(couponCode);
      toaster.success(data.message);
    } catch (error) {
      setCouponStatus("invalid");
      setCouponDiscount(0);
      setAppliedCouponCode("");
      toaster.danger(error.response?.data?.message || "Invalid coupon");
    }
  };

  const handleCouponRemove = () => {
    setCouponCode("");
    setCouponStatus(null);
    setCouponDiscount(0);
    setAppliedCouponCode("");
  };

  const HandleRegistration = async (e) => {
    e.preventDefault();

    if (!selectedBase) {
      toaster.warning("Please select a registration fee from the table.");
      return;
    }

    const formData = new FormData(RegistrationFeeRef.current);
    const formFields = Object.fromEntries(formData.entries());

    if (!formFields.Terms_and_Conditions) {
      toaster.warning("Please accept the Terms and Conditions.");
      return;
    }
    if (!formFields.presentation_Category) {
      toaster.warning("Please select a Presentation Category.");
      return;
    }
    if (!formFields.presentation_Type) {
      toaster.warning("Please select a Presentation Type.");
      return;
    }

    const selectedFeePayload = {
      title: selectedBase.title,
      category: selectedBase.category,
      currency,
      value: pricing.baseAmount,
      convenience_price: pricing.bankTax,
      gst: pricing.gst || 0,
      total: pricing.finalAmount,
      discountApplied:
        membership && couponDiscount > 0
          ? 10
          : membership || couponDiscount > 0
            ? 5
            : 0,
      membershipFee: pricing.membershipFee,
      membershipSelected: membership,
      couponCode: couponDiscount > 0 ? appliedCouponCode : null,
      finalTotal: pricing.total,

      registrationBase: selectedBase.value,
      journalSupport: selectedJournal
        ? {
            tier: selectedJournal.tier,
            package: selectedJournal.package,
            amount: journalAmountInCurrency,
          }
        : null,
      journalAmount: journalAmountInCurrency,
      addons: selectedAddons.map((a) => ({
        label: a.label,
        sublabel: a.sublabel,
        amount: convertPrice(a.price, currency),
      })),
      addonsAmount: addonsAmountInCurrency,
    };

    try {
      // Razorpay amount must be in smallest unit.
      // For INR → paise; for USD → cents
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/registration`,
        {
          ...formFields,
          selectedFee: selectedFeePayload,
        },
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.amount,
        currency,
        name: "Confworld Educational Research and Development Association (CERADA)",
        description: "ICABMET-2027 Conference Registration",
        image: "https://i.postimg.cc/3RcrXjsP/cerada-logo.webp",
        order_id: data.order_id,
        handler: async (response) => {
          try {
            await axios.post(
              `${import.meta.env.VITE_API_URL}/payment/validate`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                Order_ID: data.order_id,
              },
            );
            navigate("/success", {
              state: {
                amount: (data.amount / 100).toFixed(2),
                paymentId: response.razorpay_payment_id,
              },
            });
          } catch {
            toaster.danger(
              "Payment verification failed. Please contact support.",
            );
          }
        },
        prefill: {
          name: formFields.first_name,
          email: formFields.email,
          contact: formFields.number,
        },
        theme: { color: "#be123c" },
        modal: {
          ondismiss: async () => {
            try {
              await axios.post(
                `${import.meta.env.VITE_API_URL}/payment/cancel`,
                {
                  order_id: data.order_id,
                },
              );
            } catch {}
            toaster.warning("Payment window closed.");
          },
        },
      };

      if (!window.Razorpay) {
        toaster.danger(
          "Payment gateway not available. Please refresh the page.",
        );
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) => {
        toaster.danger(`Payment failed: ${response.error.description}`);
      });
      rzp.open();
    } catch (error) {
      toaster.danger(
        error.response?.data?.message ||
          "Payment processing failed. Please try again.",
      );
    }
  };

  // ── Fee Data (INR + USD) ────────────────────────────────────────────────────
  const physicalFees = {
    title: "Physical (Onsite) Conference Participants",
    categories: [
      {
        category:
          "Academicians / Delegates / Research Scholars / PhD Candidates",
        inrEarlyBird: 6000,
        inrRegular: 7000,
        usdEarlyBird: 325,
        usdRegular: 350,
      },
      {
        category: "UG / PG Students",
        inrEarlyBird: 5000,
        inrRegular: 6000,
        usdEarlyBird: 275,
        usdRegular: 325,
      },
      {
        category: "Non-Presenter / Attendee / Listener",
        inrEarlyBird: 4000,
        inrRegular: 5000,
        usdEarlyBird: 200,
        usdRegular: 250,
      },
    ],
  };

  const virtualFees = {
    title: "Virtual (Online) Conference Participants",
    categories: [
      {
        category:
          "Academicians / Delegates / Research Scholars / PhD Candidates",
        inrEarlyBird: 3000,
        inrRegular: 4000,
        usdEarlyBird: 150,
        usdRegular: 200,
      },
      {
        category: "UG / PG Students",
        inrEarlyBird: 2500,
        inrRegular: 3000,
        usdEarlyBird: 100,
        usdRegular: 150,
      },
      {
        category: "Non-Presenter / Attendee / Listener",
        inrEarlyBird: 1500,
        inrRegular: 2000,
        usdEarlyBird: 90,
        usdRegular: 100,
      },
    ],
  };

  return (
    <section>
      <Hero
        title="Registration Fee"
        breadcrumbs={[{ label: "Home", link: "#" }]}
        backgroundImage="/images/commonheroimages/12.webp"
      />
      <section className="pt-10 md:pt-2">
        <DiscountConfetti />

        <div
          data-aos="fade-up"
          className="flex flex-col justify-center items-center text-center my-5 space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-black text-center text-rose-700 leading-tight pb-6">
            Registration
          </h1>

          <p className="w-11/12 font-medium">
            Welcome to the ICABMET-2027 registration page. Secure your spot at
            this premier conference to connect with global experts, present your
            research and advance your career. Follow the steps below to complete
            your registration.
          </p>
        </div>

        <div
          data-aos="fade-up"
          className="flex flex-col justify-center items-center p-5 gap-5 md:gap-10"
        >
          <ConferenceCards />
        </div>

        <RegistrationSteps />

        {/* ── STEP 1: Fee Tables ── */}
        <div
          data-aos="fade-up"
          className="flex flex-col justify-center items-center px-4 md:px-6"
        >
          <h1 className="text-4xl md:text-5xl font-black text-rose-700 leading-tight pb-6">
            Registration Fees
          </h1>

          {/* Currency legend */}
          <div className="flex items-center gap-6 mt-4 mb-2">
            <span className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <span className="w-3 h-3 rounded-full bg-rose-700 inline-block" />
              India — prices in INR
            </span>
            <span className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <span className="w-3 h-3 rounded-full bg-orange-500 inline-block" />
              🌐 Abroad — prices in USD
            </span>
          </div>

          <p className="text-red-600 font-medium mt-1 mb-8 text-sm text-center">
            * Additional charges applicable for Scopus publication (T&C Apply)
          </p>

          <div data-aos="fade-up" className="flex flex-col gap-6 w-full">
            <FeeTable
              tableData={physicalFees}
              isEarlyBird={isEarlyBird}
              onSelect={handleBaseSelect}
              selectedBase={selectedBase}
            />
            <FeeTable
              tableData={virtualFees}
              isEarlyBird={isEarlyBird}
              onSelect={handleBaseSelect}
              selectedBase={selectedBase}
            />
          </div>
        </div>

        {/* ── STEP 2: Journal Publication Support ── */}
        <JournalSupport
          selectedJournal={selectedJournal}
          setSelectedJournal={setSelectedJournal}
          currency={currency}
          convertPrice={convertPrice}
          fmt={fmt}
        />

        {/* ── STEP 3: Add-ons ── */}
        <Addons
          selectedAddons={selectedAddons}
          setSelectedAddons={setSelectedAddons}
          currency={currency}
          convertPrice={convertPrice}
          fmt={fmt}
        />

        {/* ── STEP 4: Registration Form ── */}
        <div
          data-aos="fade-up"
          className="flex flex-col justify-center items-center mt-10 p-5 md:py-0"
        >
          <h1 className="text-4xl md:text-5xl font-black text-rose-700 leading-tight pb-6">
            Registration Form
          </h1>
          <p className="text-md font-medium mt-2 text-center">
            "3<span className="text-sm align-super">rd</span> International
            Conference on Applied Science, Business and Management, Engineering
            & Technology (ICABMET-2027)"
          </p>

          <form
            ref={RegistrationFeeRef}
            onSubmit={HandleRegistration}
            className="text-sm p-2 md:p-6 flex flex-col md:flex-row justify-between md:gap-10 items-start shadow-md rounded-lg mt-8 md:w-11/12"
          >
            {/* Left: Form Fields */}
            <section
              className="w-full space-y-4 md:columns-2 gap-5"
              data-aos="fade-up"
            >
              <div>
                <select
                  className="w-full p-2.5 border border-gray-300 outline-none rounded-md"
                  name="Title"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Title
                  </option>
                  <option>Mr</option>
                  <option>Ms</option>
                  <option>Mrs</option>
                  <option>Dr</option>
                  <option>Prof</option>
                </select>
              </div>
              <div>
                <input
                  type="text"
                  name="first_name"
                  className="w-full p-2.5 border border-gray-300 outline-none rounded-md"
                  placeholder="First Name"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="last_name"
                  className="w-full p-2.5 border border-gray-300 outline-none rounded-md"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="certificate_name"
                  className="w-full p-2.5 border border-gray-300 outline-none rounded-md"
                  placeholder="Certificate Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="dateofbirth">Date of Birth:</label>
                <input
                  id="dateofbirth"
                  type="date"
                  name="DOB"
                  className="w-full p-2.5 border border-gray-300 outline-none rounded-md"
                  max="2020-01-01"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="nationality"
                  className="w-full p-2.5 border border-gray-300 outline-none rounded-md"
                  placeholder="Nationality"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="department"
                  className="w-full p-2.5 border border-gray-300 outline-none rounded-md"
                  placeholder="Department"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="institution"
                  className="w-full p-2.5 border border-gray-300 outline-none rounded-md"
                  placeholder="Institution"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="number"
                  className="w-full p-2.5 border border-gray-300 outline-none rounded-md"
                  placeholder="Mobile Number with Country Code"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  className="w-full p-2.5 border border-gray-300 outline-none rounded-md"
                  placeholder="E-mail"
                  required
                />
              </div>
              <div>
                <select
                  className="w-full p-2.5 border border-gray-300 outline-none rounded-md"
                  name="participant_category"
                  value={participantCategory}
                  onChange={(e) => setParticipantCategory(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Participant Category
                  </option>
                  <option>Academicians</option>
                  <option>Delegates</option>
                  <option>Research scholars</option>
                  <option>Student</option>
                </select>
              </div>
              <div className="space-y-2">
                <span className="block font-medium">
                  Presentation Category:
                </span>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="presentation_Category"
                      value="oral"
                      className="form-radio"
                    />
                    <span>Oral</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="presentation_Category"
                      value="poster"
                      className="form-radio"
                    />
                    <span>Poster</span>
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <span className="block font-medium">Presentation Type:</span>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="presentation_Type"
                      value="Virtual"
                      className="form-radio"
                    />
                    <span>Virtual</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="presentation_Type"
                      value="Physical"
                      className="form-radio"
                    />
                    <span>Physical</span>
                  </label>
                </div>
              </div>
            </section>

            {/* Right: Checkout Panel */}
            <div className="mt-6 md:mt-0 w-full md:w-auto">
              <CheckoutPanel
                pricing={pricing}
                baseSelected={!!selectedBase}
                participantCategory={participantCategory}
                membership={membership}
                onMembershipToggle={setMembership}
                couponCode={couponCode}
                couponStatus={couponStatus}
                onCouponChange={setCouponCode}
                onCouponApply={handleCouponApply}
                onCouponRemove={handleCouponRemove}
                selectedJournal={selectedJournal}
                selectedAddons={selectedAddons}
                registrationBase={selectedBase?.value}
                currency={currency}
              />
              <div className="mt-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="Terms_and_Conditions"
                    id="terms"
                    className="w-4 h-4"
                    value="on"
                  />
                  <label
                    htmlFor="terms"
                    className="font-medium cursor-pointer text-sm"
                  >
                    I agree to the{" "}
                    <span className="text-rose-600 underline cursor-pointer">
                      Terms and Conditions
                    </span>
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-rose-700 to-orange-500 text-white font-bold text-base rounded-2xl hover:from-rose-600 hover:to-orange-400 transition-all shadow-md hover:shadow-lg"
                >
                  Check Out (Open Payment Gateway)
                </button>
                <p className="text-center text-gray-500 text-xs">
                  *Please note that the payee is responsible for all bank
                  charges.
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </section>
  );
};

export default RegistrationFee;
