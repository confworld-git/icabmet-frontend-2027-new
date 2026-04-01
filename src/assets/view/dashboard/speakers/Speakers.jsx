"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toaster } from "evergreen-ui";
import { FcGallery } from "react-icons/fc";
import { IoMdRemove } from "react-icons/io";
import { GrAdd } from "react-icons/gr";
import Conform from "../conform/Conform";
import { useLocation } from "react-router-dom";
// import { Helmet } from "react-helmet";

const Speakers = () => {
  const speakersForm = useRef();
  const ocmForm = useRef();
  const addSpeakersRef = useRef();
  const addOcmRef = useRef();
  const location = useLocation();

  const [sectionone, setSectionone] = useState("Keynote Speakers");
  const [sectiontwo, setSectiontwo] = useState("Scientific Committee");
  const [speakersPosition, setSpeakersPosition] = useState(1);
  const [ocmPosition, setOcmPosition] = useState(1);
  const [conformDelete, setConformDelete] = useState({
    isOpen: false,
    id: null,
    section: null,
  });
  const [speakersAbout, setSpeakersAbout] = useState(1);
  const [ocmAbout, setOcmAbout] = useState(1);
  const [speakersImage, setSpeakersImage] = useState();
  const [ocmImage, setOcmImage] = useState();
  const [speakers, setSpeakers] = useState({});
  const [loading, setLoading] = useState(true); // Added loading state for initial data fetch
  const [error, setError] = useState(null); // Added error state for initial data fetch

  const Section1 = [
    "Welcome Address",
    "Guest of Honour",
    "Conference Chair",
    "Keynote Speakers",
    "Session Speakers",
    "Session Chairs",
  ];

  const Section2 = ["Scientific Committee", "Review Committee"];

  // Improved hash navigation with proper timing and offset handling
  useEffect(() => {
    const hash = location.hash;

    const scrollToSection = () => {
      let targetRef = null;

      // Determine which section to scroll to
      if (hash === "#add-speakers") {
        targetRef = addSpeakersRef.current;
      } else if (hash === "#add-ocm") {
        targetRef = addOcmRef.current;
      }

      if (targetRef) {
        // Calculate proper scroll position accounting for fixed headers
        const headerOffset = 100; // Adjust this value based on your header height
        const elementPosition = targetRef.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        // Smooth scroll to the calculated position
        window.scrollTo({
          top: Math.max(0, offsetPosition), // Ensure we don't scroll above the page
          behavior: "smooth",
        });
      }
    };

    // Add delay to ensure DOM is fully rendered and layout is stable
    const timeoutId = setTimeout(scrollToSection, 150);

    // Cleanup timeout on unmount or dependency change
    return () => clearTimeout(timeoutId);
  }, [location.hash]);

  const sectionOneChange = (value) => {
    setSectionone(value);
    if (speakers[`${value}`]) {
      setSpeakersPosition(speakers[`${value}`]?.length + 1);
    } else {
      setSpeakersPosition(1);
    }
  };

  const sectionTwoChange = (value) => {
    setSectiontwo(value);
    if (speakers[`${value}`]) {
      setOcmPosition(speakers[`${value}`]?.length + 1);
    } else {
      setOcmPosition(1);
    }
  };

  const speakersPositionOnChange = (value) => {
    setSpeakersPosition(Number.parseInt(value));
  };

  const ocmPositionOnChange = (value) => {
    setOcmPosition(Number.parseInt(value));
  };

  const HandleSpeaker = async () => {
    setLoading(true);
    setError(null);
    try {
      const allSections = [...Section1, ...Section2];
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/speaker?s=${allSections.join(",")}`
      );
      if (response.status === 200) {
        const newSpeakers = {};
        response.data.data.forEach((element) => {
          if (element._id) {
            newSpeakers[element._id] = element.speakers.sort((a, b) => {
              if (a.position > b.position) return 1;
              if (a.position < b.position) return -1;
              return 0;
            });
          }
        });
        setSpeakers(newSpeakers);
        if (newSpeakers[`${sectionone}`]) {
          setSpeakersPosition(newSpeakers[`${sectionone}`]?.length + 1);
        }
        if (newSpeakers[`${sectiontwo}`]) {
          setOcmPosition(newSpeakers[`${sectiontwo}`]?.length + 1);
        }
      }
    } catch (err) {
      console.error("Error fetching speaker data:", err);
      toaster.danger("Failed to load speaker and committee data.");
      setError("Failed to load speaker and committee data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    HandleSpeaker();
  }, []);

  const checked = (index, section) => {
    if (speakers[`${section}`]) {
      const arr = speakers[`${section}`];
      if (arr.length > index) {
        if (index === 0) {
          const newVal = arr[index]?.position || 0;
          return newVal / 2;
        } else if (index === 1) {
          const newVal = arr[index]?.position || 0;
          const Val = arr[0]?.position || 0;
          return (newVal + Val) / 2;
        } else if (index >= 2) {
          const newVal = arr[index]?.position || 0;
          const Val = arr[index - 1]?.position || 0;
          return (newVal + Val) / 2;
        }
      } else {
        return index + 1;
      }
    } else {
      return index + 1;
    }
  };

  const SubmitSpeaker = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(speakersForm.current);
      formData.set("position", checked(speakersPosition - 1, sectionone));
      formData.set("Section", sectionone);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/speaker`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        setSpeakers({
          ...speakers,
          [sectionone]: [
            ...(speakers[sectionone] || []),
            response.data.data,
          ].sort((a, b) => {
            if (a.position > b.position) return 1;
            if (a.position < b.position) return -1;
            return 0;
          }),
        });
        setSpeakersPosition(speakersPosition + 1);
        speakersForm.current.reset();
        setSpeakersImage(null);
        setSpeakersAbout(1);
        toaster.success(response.data.message);
      }
    } catch (err) {
      console.error("Error adding speaker:", err);
      toaster.danger("Failed to Add Speaker.");
    }
  };

  const SubmitOCM = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(ocmForm.current);
      formData.set("position", checked(ocmPosition - 1, sectiontwo));
      formData.set("Section", sectiontwo);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/speaker`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        setSpeakers({
          ...speakers,
          [sectiontwo]: [
            ...(speakers[sectiontwo] || []),
            response.data.data,
          ].sort((a, b) => {
            if (a.position > b.position) return 1;
            if (a.position < b.position) return -1;
            return 0;
          }),
        });
        setOcmPosition(ocmPosition + 1);
        ocmForm.current.reset();
        setOcmImage(null);
        setOcmAbout(1);
        toaster.success(response.data.message);
      }
    } catch (err) {
      console.error("Error adding OCM:", err);
      toaster.danger("Failed to Add OCM.");
    }
  };

  const Delete_Speaker = async (sec, id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/speaker/${id}`
      );
      if (response.status === 200) {
        toaster.success(response.data.message);
        setSpeakers((prevSpeakers) => {
          const updatedSection = prevSpeakers[sec].filter(
            (speaker) => speaker._id !== id
          );
          return {
            ...prevSpeakers,
            [sec]: updatedSection,
          };
        });
        // Update position counters
        if (Section1.includes(sec)) {
          setSpeakersPosition((prev) => (prev > 1 ? prev - 1 : 1)); // Decrement, but not below 1
        } else if (Section2.includes(sec)) {
          setOcmPosition((prev) => (prev > 1 ? prev - 1 : 1)); // Decrement, but not below 1
        }
      }
    } catch (err) {
      console.error("Error deleting speaker:", err);
      toaster.danger("Failed to delete speaker.");
    }
  };

  return (
    <section>
      {/* <Helmet>
        <title>Dashboard | ICLSMHA 2026</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://iclsmha.cerada.in/Dashboard/Speakers" />
      </Helmet> */}
      <div className="p-4 md:p-8 w-full flex flex-col items-center min-h-screen bg-gray-50">
        <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg p-6 md:p-8">
          {/* Add Speakers Section */}
          <section
            id="add-speakers"
            ref={addSpeakersRef}
            className="w-full scroll-mt-24 pt-8"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-6 text-center border-b pb-4">
              Add Conference Speakers
            </h2>
            <form
              className="p-5 md:p-8 w-full flex flex-col items-center gap-8 bg-blue-50 rounded-lg shadow-inner"
              ref={speakersForm}
              onSubmit={SubmitSpeaker}
            >
              {/* Section Type Radio Buttons */}
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 w-full mb-4">
                {Section1.map((item, index) => (
                  <label
                    key={index}
                    className={`px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ease-in-out text-sm md:text-base font-medium
                    ${
                      sectionone === item
                        ? "bg-orange-600 text-white shadow-md"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    htmlFor={`speakers-${item}`}
                  >
                    {item}
                    <input
                      checked={sectionone === item}
                      type="radio"
                      name="Section"
                      value={item}
                      id={`speakers-${item}`}
                      hidden
                      onChange={(e) => sectionOneChange(e.target.value)}
                    />
                  </label>
                ))}
              </div>

              {/* Image Upload and Text Inputs */}
              <div className="w-full flex flex-col md:flex-row justify-center items-center gap-8">
                {/* Image Upload */}
                <div className="flex-shrink-0">
                  <label
                    className="flex flex-col w-56 h-56 md:w-64 md:h-64 justify-center items-center border-2 border-dashed border-gray-300 rounded-xl overflow-hidden cursor-pointer hover:border-blue-500 transition-colors duration-200 bg-white shadow-sm"
                    htmlFor="speakers-image"
                  >
                    {speakersImage ? (
                      <img
                        className="w-full h-full object-cover object-top"
                        src={speakersImage}
                        alt="Speaker Preview"
                      />
                    ) : (
                      <div className="p-4 flex flex-col justify-center items-center gap-3 text-gray-500">
                        <p className="text-center text-sm font-medium">
                          Upload Speaker Image
                        </p>
                        <FcGallery className="text-6xl text-gray-400" />
                        <p className="text-xs text-center">
                          Click or drag an image here
                        </p>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    id="speakers-image"
                    hidden
                    accept="image/*"
                    name="Image"
                    onChange={(e) =>
                      setSpeakersImage(URL.createObjectURL(e.target.files[0]))
                    }
                    required
                  />
                </div>

                {/* Text Inputs */}
                <div className="w-full md:w-2/3 lg:w-1/2 space-y-5">
                  <input
                    className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg shadow-sm text-base"
                    type="text"
                    name="Name"
                    placeholder="Speaker Name"
                    required
                  />
                  <div className="w-full flex flex-col gap-4">
                    {Array(speakersAbout)
                      .fill(null)
                      .map((_, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <textarea
                            className="flex-grow p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg shadow-sm text-base min-h-[60px]"
                            name="About"
                            placeholder={`About Speaker (line ${index + 1})`}
                            required
                          ></textarea>
                          {speakersAbout > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                setSpeakersAbout(Math.max(1, speakersAbout - 1))
                              }
                              className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors shadow-sm"
                              title="Remove About line"
                            >
                              <IoMdRemove className="text-xl" />
                            </button>
                          )}
                        </div>
                      ))}
                  </div>
                  <div className="w-full flex justify-end">
                    <button
                      type="button"
                      onClick={() => setSpeakersAbout(speakersAbout + 1)}
                      className="p-3 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors shadow-sm"
                      title="Add another About line"
                    >
                      <GrAdd className="text-lg" />
                    </button>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label
                      htmlFor="speakers-position"
                      className="text-gray-700 font-medium text-sm"
                    >
                      Display Position
                    </label>
                    <input
                      className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg shadow-sm text-base"
                      id="speakers-position"
                      name="position"
                      type="number"
                      value={speakersPosition}
                      onChange={(e) => speakersPositionOnChange(e.target.value)}
                      placeholder="Enter position"
                      min="1"
                      required
                    />
                  </div>
                </div>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="px-12 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg"
              >
                Add Speaker
              </button>
            </form>

            {/* Speakers Details Display */}
            <div className="mt-10 p-5 bg-gray-100 rounded-lg shadow-inner">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 border-b pb-4">
                Current Speaker Details
              </h2>
              {loading && (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
                  <p className="ml-4 text-gray-600">Loading speakers...</p>
                </div>
              )}
              {error && (
                <div className="text-center text-red-600 py-10">
                  <p className="text-lg">{error}</p>
                  <button
                    onClick={HandleSpeaker}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Retry Load
                  </button>
                </div>
              )}
              {!loading &&
                !error &&
                Section1.map((section1) => (
                  <div
                    key={section1}
                    className="p-5 bg-white rounded-md mt-6 shadow-sm"
                  >
                    <h3 className="text-xl md:text-2xl font-semibold text-orange-600 mb-5">
                      {section1}
                    </h3>
                    {speakers[section1] && speakers[section1].length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {speakers[section1].map((speaker, index) => (
                          <div
                            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
                            key={speaker._id} // Use unique ID for key
                          >
                            <div className="w-48 h-48 overflow-hidden rounded-full border-4 border-blue-500 shadow-md">
                              <img
                                loading="lazy"
                                className="h-full w-full object-cover object-top"
                                alt={speaker.Name}
                                src={`${import.meta.env.VITE_API_URL}/image/${
                                  speaker.Image
                                }`}
                              />
                            </div>
                            <div className="flex flex-col gap-2 mt-4 items-center text-center">
                              <h4 className="text-xl font-bold text-gray-900">
                                {speaker.Name}
                              </h4>
                              <div className="text-gray-700 text-sm space-y-1 max-h-24 overflow-y-auto custom-scrollbar">
                                {speaker.About &&
                                  speaker.About.map((item, idx) => (
                                    <p key={idx}>{item}</p>
                                  ))}
                              </div>
                              <p className="text-sm font-medium text-gray-600">
                                Display Position: {index + 1}
                              </p>
                              <button
                                onClick={() =>
                                  setConformDelete({
                                    isOpen: true,
                                    id: speaker._id,
                                    section: section1,
                                  })
                                }
                                className="mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md shadow-sm transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600 text-center py-4">
                        No speakers available for this section.
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </section>

          {/* --- */}

          {/* Add OCM Section */}
          <section
            id="add-ocm"
            ref={addOcmRef}
            className="w-full scroll-mt-24 pt-12"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-6 text-center border-b pb-4">
              Add Organizing/Review Committee Members
            </h2>
            <form
              className="p-5 md:p-8 w-full flex flex-col items-center gap-8 bg-blue-50 rounded-lg shadow-inner"
              ref={ocmForm}
              onSubmit={SubmitOCM}
            >
              {/* Section Type Radio Buttons */}
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 w-full mb-4">
                {Section2.map((item, index) => (
                  <label
                    key={index}
                    className={`px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ease-in-out text-sm md:text-base font-medium
                    ${
                      sectiontwo === item
                        ? "bg-orange-600 text-white shadow-md"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    htmlFor={`ocm-${item}`}
                  >
                    {item}
                    <input
                      checked={sectiontwo === item}
                      type="radio"
                      name="Section"
                      value={item}
                      id={`ocm-${item}`}
                      hidden
                      onChange={(e) => sectionTwoChange(e.target.value)}
                    />
                  </label>
                ))}
              </div>

              {/* Image Upload and Text Inputs */}
              <div className="w-full flex flex-col md:flex-row justify-center items-center gap-8">
                {/* Image Upload */}
                <div className="flex-shrink-0">
                  <label
                    className="flex flex-col w-56 h-56 md:w-64 md:h-64 justify-center items-center border-2 border-dashed border-gray-300 rounded-xl overflow-hidden cursor-pointer hover:border-blue-500 transition-colors duration-200 bg-white shadow-sm"
                    htmlFor="ocm-image"
                  >
                    {ocmImage ? (
                      <img
                        className="w-full h-full object-cover object-top"
                        src={ocmImage}
                        alt="OCM Preview"
                      />
                    ) : (
                      <div className="p-4 flex flex-col justify-center items-center gap-3 text-gray-500">
                        <p className="text-center text-sm font-medium">
                          Upload OCM Image
                        </p>
                        <FcGallery className="text-6xl text-gray-400" />
                        <p className="text-xs text-center">
                          Click or drag an image here
                        </p>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    id="ocm-image"
                    hidden
                    accept="image/*"
                    name="Image"
                    onChange={(e) =>
                      setOcmImage(URL.createObjectURL(e.target.files[0]))
                    }
                    required
                  />
                </div>

                {/* Text Inputs */}
                <div className="w-full md:w-2/3 lg:w-1/2 space-y-5">
                  <input
                    className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg shadow-sm text-base"
                    type="text"
                    name="Name"
                    placeholder="OCM Name"
                    required
                  />
                  <div className="w-full flex flex-col gap-4">
                    {Array(ocmAbout)
                      .fill(null)
                      .map((_, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <textarea
                            className="flex-grow p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg shadow-sm text-base min-h-[60px]"
                            name="About"
                            placeholder={`About OCM (line ${index + 1})`}
                            required
                          ></textarea>
                          {ocmAbout > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                setOcmAbout(Math.max(1, ocmAbout - 1))
                              }
                              className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors shadow-sm"
                              title="Remove About line"
                            >
                              <IoMdRemove className="text-xl" />
                            </button>
                          )}
                        </div>
                      ))}
                  </div>
                  <div className="w-full flex justify-end">
                    <button
                      type="button"
                      onClick={() => setOcmAbout(ocmAbout + 1)}
                      className="p-3 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors shadow-sm"
                      title="Add another About line"
                    >
                      <GrAdd className="text-lg" />
                    </button>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label
                      htmlFor="ocm-position"
                      className="text-gray-700 font-medium text-sm"
                    >
                      Display Position
                    </label>
                    <input
                      className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg shadow-sm text-base"
                      id="ocm-position"
                      name="position"
                      type="number"
                      value={ocmPosition}
                      onChange={(e) => ocmPositionOnChange(e.target.value)}
                      placeholder="Enter position"
                      min="1"
                      required
                    />
                  </div>
                </div>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="px-12 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg"
              >
                Add OCM
              </button>
            </form>

            {/* OCM Details Display */}
            <div className="mt-10 p-5 bg-gray-100 rounded-lg shadow-inner">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 border-b pb-4">
                Current Committee Details
              </h2>
              {loading && (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
                  <p className="ml-4 text-gray-600">
                    Loading committee members...
                  </p>
                </div>
              )}
              {error && (
                <div className="text-center text-red-600 py-10">
                  <p className="text-lg">{error}</p>
                  <button
                    onClick={HandleSpeaker} // Renamed for consistency
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Retry Load
                  </button>
                </div>
              )}
              {!loading &&
                !error &&
                Section2.map((section2) => (
                  <div
                    key={section2}
                    className="p-5 bg-white rounded-md mt-6 shadow-sm"
                  >
                    <h3 className="text-xl md:text-2xl font-semibold text-orange-600 mb-5">
                      {section2}
                    </h3>
                    {speakers[section2] && speakers[section2].length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {speakers[section2].map((speaker, index) => (
                          <div
                            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
                            key={speaker._id} // Use unique ID for key
                          >
                            <div className="w-48 h-48 overflow-hidden rounded-full border-4 border-blue-500 shadow-md">
                              <img
                                loading="lazy"
                                className="h-full w-full object-cover object-top"
                                alt={speaker.Name}
                                src={`${import.meta.env.VITE_API_URL}/image/${
                                  speaker.Image
                                }`}
                              />
                            </div>
                            <div className="flex flex-col gap-2 mt-4 items-center text-center">
                              <h4 className="text-xl font-bold text-gray-900">
                                {speaker.Name}
                              </h4>
                              <div className="text-gray-700 text-sm space-y-1 max-h-24 overflow-y-auto custom-scrollbar">
                                {speaker.About &&
                                  speaker.About.map((item, idx) => (
                                    <p key={idx}>{item}</p>
                                  ))}
                              </div>
                              <p className="text-sm font-medium text-gray-600">
                                Display Position: {index + 1}
                              </p>
                              <button
                                onClick={() =>
                                  setConformDelete({
                                    isOpen: true,
                                    id: speaker._id,
                                    section: section2,
                                  })
                                }
                                className="mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md shadow-sm transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600 text-center py-4">
                        No committee members available for this section.
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </section>
        </div>
        {conformDelete.isOpen && (
          <Conform
            data={{ data: conformDelete, Delete_Speaker }}
            close={setConformDelete}
          />
        )}
      </div>
    </section>
  );
};

export default Speakers;
