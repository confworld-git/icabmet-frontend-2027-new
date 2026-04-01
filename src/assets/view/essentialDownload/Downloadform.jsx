import React, { useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import axios from "axios";
import { toaster } from "evergreen-ui";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const DownloadForm = ({ setPopup }) => {
  const [DownloadForm, setDownloadForm] = useState({
    Name: "",
    Email: "",
    Number: "",
    Link: "",
    Info: "",
  });

  const HandleDownload = (e) => {
    const { name, value } = e.target;
    setDownloadForm((prev) => ({ ...prev, [name]: value }));
  };

  const handledNumber = (e) => {
    setDownloadForm((prev) => ({ ...prev, Number: e }));
  };

  const handleSubmitDownload = async (e) => {
    e.preventDefault();

    const { Name, Email, Number, Link, Info } = DownloadForm;
    if (
      !Name?.trim() ||
      !Email?.trim() ||
      !Number?.trim() ||
      !Link?.trim() ||
      !Info?.trim()
    ) {
      toaster.warning("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/download`,
        DownloadForm
      );

      if (response.status === 201) {
        const link = document.createElement("a");
        link.href = "/files/ICABMET%20Brochure.pdf";
        link.setAttribute("download", "ICABMET_Brochure.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setPopup(false);
        toaster.success(response.data.message);
      }

      setDownloadForm({
        Name: "",
        Email: "",
        Number: "",
        Link: "",
        Info: "",
      });
    } catch (error) {
      console.error("Error sending data:", error);
      toaster.danger("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-xl overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="bg-rose-700 px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-300 mb-1">Conference Brochure</p>
            <h2 className="text-xl font-black text-white leading-tight">Download ICABMET Brochure</h2>
          </div>
          <button
            onClick={() => setPopup(false)}
            className="w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 text-white rounded transition-colors duration-200"
            aria-label="Close"
          >
            <HiMiniXMark className="text-xl" />
          </button>
        </div>

        {/* Orange accent bar */}
        <div className="h-1 bg-orange-500" />

        {/* Form body */}
        <div className="p-6 space-y-4">
          <input
            type="text"
            name="Name"
            value={DownloadForm.Name}
            placeholder="Your Full Name"
            onChange={HandleDownload}
            className="w-full px-4 py-2.5 border-2 border-gray-200 focus:border-rose-700 focus:outline-none rounded text-sm font-medium text-gray-800 placeholder-gray-400 transition-colors duration-200"
            required
          />
          <input
            type="email"
            name="Email"
            value={DownloadForm.Email}
            placeholder="Email Address"
            onChange={HandleDownload}
            className="w-full px-4 py-2.5 border-2 border-gray-200 focus:border-rose-700 focus:outline-none rounded text-sm font-medium text-gray-800 placeholder-gray-400 transition-colors duration-200"
            required
          />
          <PhoneInput
            defaultCountry="US"
            value={DownloadForm.Number}
            onChange={handledNumber}
            id="Mobile_input"
            placeholder="Mobile Number (select country)"
            className="w-full px-4 py-2.5 border-2 border-gray-200 focus:border-rose-700 focus:outline-none rounded text-sm font-medium text-gray-800 placeholder-gray-400 transition-colors duration-200"
            required
          />
          <input
            type="url"
            name="Link"
            value={DownloadForm.Link}
            placeholder="Social Media Profile Link"
            onChange={HandleDownload}
            className="w-full px-4 py-2.5 border-2 border-gray-200 focus:border-rose-700 focus:outline-none rounded text-sm font-medium text-gray-800 placeholder-gray-400 transition-colors duration-200"
            required
          />
          <input
            type="text"
            name="Info"
            value={DownloadForm.Info}
            placeholder="How did you hear about the conference?"
            onChange={HandleDownload}
            className="w-full px-4 py-2.5 border-2 border-gray-200 focus:border-rose-700 focus:outline-none rounded text-sm font-medium text-gray-800 placeholder-gray-400 transition-colors duration-200"
            required
          />
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex items-center justify-between gap-4">
          <button
            onClick={() => setPopup(false)}
            className="flex-1 px-4 py-2.5 border-2 border-rose-700 text-rose-700 text-sm font-black uppercase tracking-wider rounded hover:bg-rose-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitDownload}
            className="flex-1 px-4 py-2.5 bg-orange-500 text-white text-sm font-black uppercase tracking-wider rounded hover:bg-orange-600 transition-colors duration-200"
          >
            Download ↓
          </button>
        </div>

      </div>
    </div>
  );
};

export default DownloadForm;