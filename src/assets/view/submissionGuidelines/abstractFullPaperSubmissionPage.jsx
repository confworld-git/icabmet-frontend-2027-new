"use client"

import { useRef, useState, useEffect } from "react" // Import useEffect
import axios from "axios"
import { toaster } from "evergreen-ui"
import PhoneInput from "react-phone-number-input"
import Hero from "../commonhero/common-hero"
import "react-phone-number-input/style.css"
import AOS from "aos" // Import AOS
import "aos/dist/aos.css" // Import AOS CSS
// import { Helmet } from "react-helmet"

const AbstractFullPaperSubmission = () => {
  // AOS Initialization and Refresh
  useEffect(() => {
    // Initialize AOS. If you have a global AOS.init() call in App.jsx or index.jsx,
    // you might consider removing this specific init call here to avoid re-initialization.
    // However, including it here with 'once: true' is generally safe for components.
    AOS.init({
      once: true, // Only animate elements once as they enter the viewport
      // Add other global AOS settings here if needed (e.g., duration, offset)
    })

    // Crucial for React components: Refresh AOS when the component mounts or updates
    // to ensure elements with data-aos attributes are picked up and animated,
    // especially during hot-reloads in development.
    AOS.refresh()

    // The empty dependency array [] ensures this effect runs only once after the initial render.
    // If dynamic content might appear later that needs AOS, you might need to
    // call AOS.refresh() again when that content changes (e.g., in another useEffect
    // that depends on the state driving those dynamic elements).
  }, [])

  const SubmissionRef = useRef()
  const [mobile, setMobile] = useState("")

  const generateSubmissionID = () => {
    const Random = Math.floor(Math.random() * 900) + 100
    return `ICABMET2027_IN_${Random}`
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      const maxFileSize = 3 * 1024 * 1024

      const allowedFileTypes = [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]

      if (!allowedFileTypes.includes(file.type)) {
        toaster.warning("Invalid file type. Please upload a .doc or .docx file.")
        event.target.value = ""
        return
      }

      if (file.size > maxFileSize) {
        toaster.warning("File size exceeds the 3MB limit. Please upload a smaller file.")
        event.target.value = ""
        return
      }
    }
  }

  const HandleSubmission = async (e) => {
    e.preventDefault()
    const newSubmissionID = generateSubmissionID()

    const formData = new FormData(SubmissionRef.current)

    const formValues = {}
    formData.forEach((value, key) => {
      formValues[key] = value
    })

    formValues["SubmissionID"] = newSubmissionID
    formValues["mobileNumber"] = mobile

    const requiredFields = [
      "Submission_type",
      "paper_title",
      "authorName",
      "CoAuthorName",
      "correspondingEmail",
      "whatsappNumber",
      "presentationCategory",
      "presentationType",
      "Institution_Name",
      "Department",
      "designation",
      "Publication_Required",
      "file",
      "conferenceSource",
    ]

    for (const field of requiredFields) {
      const value = formValues[field]

      if (field === "file") {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          toaster.warning("File is required.")
          return
        }
      } else if (!mobile || mobile.trim() === "") {
        toaster.warning("Mobile number is required.")
        return
      } else {
        if (!value || value.trim() === "") {
          toaster.warning(`${field.replace(/_/g, " ")} is required.`)
          return
        }
      }
    }

    const formDataToSend = new FormData()
    formDataToSend.append("SubmissionID", newSubmissionID)
    formDataToSend.append("mobileNumber", mobile)
    formData.forEach((value, key) => {
      formDataToSend.append(key, value)
    })

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/paperSubmission`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      SubmissionRef.current.reset()
      setMobile("")
      toaster.success(response.data.message)
    } catch (error) {
      toaster.danger("Something's wrong")
    }
  }

  return (
    <>
      {/* <Helmet>
        <title>Paper Submission | ICLSMHA 2026 Healthcare Research Paper & Format Guidelines</title>
        <meta
          name="description"
          content="Submit your healthcare research paper to ICLSMHA 2026. Follow the official research paper submission process and prepare your work in the approved research paper format for international conferences."
        />
        <meta
          name="keywords"
          content="healthcare research paper, research paper format, research paper submission, ICLSMHA 2026"
        />
        <link rel="canonical" href="https://iclsmha.cerada.in/abstract-full-paper-submission" />
        <meta name="robots" content="index, follow" />
      </Helmet>{" "} */}
      <Hero
        title="Paper Submission"
        breadcrumbs={[{ label: "Home", link: "#" }]}
        backgroundImage="/images/commonheroimages/9.webp"
      />
      <section className="px-4 md:px-6 py-12 my-12 bg-white border border-gray-200 rounded-xl shadow-sm max-w-5xl mx-auto">
       
       
            <h1 className="text-4xl md:text-5xl text-center font-black text-rose-700 leading-tight pb-6">
         Abstract / Full Paper Submission
        </h1>
        <form
          ref={SubmissionRef}
          onSubmit={HandleSubmission}
          data-aos="fade-up"
          data-form="paper"
          className="space-y-5 w-full max-w-4xl mx-auto rounded-lg border border-gray-200 shadow-sm p-6 md:p-8 bg-white"
        >
          <div className="">
            <label className="text-gray-800 font-semibold">Submission Type:</label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center gap-2">
                <input type="radio" name="Submission_type" value="Abstract" /> Abstract
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="Submission_type" value="Full paper" /> Full paper
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <div>
              <label className="text-gray-800 font-semibold">Title of the Paper:</label>
              <input
                type="text"
                name="paper_title"
                required
                className="w-full p-2.5 px-3 border border-gray-300 outline-none rounded-lg"
              />
            </div>
            <div>
              <label className="text-gray-800 font-semibold">Author Name:</label>
              <input
                type="text"
                name="authorName"
                required
                className="w-full p-2.5 px-3 border border-gray-300 outline-none rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-800 font-semibold">Co-author Names:</label>
            <input
              type="text"
              name="CoAuthorName"
              className="w-full p-2.5 px-3 border border-gray-300 outline-none rounded-lg"
            />
          </div>

          <div>
            <label className="text-gray-800 font-semibold">Corresponding Author Email:</label>
            <input
              type="email"
              name="correspondingEmail"
              required
              className="w-full p-2.5 px-3 border border-gray-300 outline-none rounded-lg"
            />
          </div>

          <div>
            <label className="text-gray-800 font-semibold">Mobile Number (With Country Code):</label>
            <PhoneInput defaultCountry="US" value={mobile} onChange={setMobile} className="w-full" />
          </div>

          <div>
            <label className="text-gray-800 font-semibold">WhatsApp/Viber Number:</label>
            <input
              type="tel"
              name="whatsappNumber"
              pattern="[0-9]*"
              inputMode="numeric"
              className="w-full p-2.5 px-3 border border-gray-300 outline-none rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <div>
              <label className="text-gray-800 font-semibold">LinkedIn URL:</label>
              <input
                type="url"
                name="linkedinURL"
                className="w-full p-2.5 px-3 border border-gray-300 outline-none rounded-lg"
              />
            </div>
            <div>
              <label className="text-gray-800 font-semibold">Facebook URL:</label>
              <input
                type="url"
                name="facebookURL"
                className="w-full p-2.5 px-3 border border-gray-300 outline-none rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-800 font-semibold">Presentation Category:</label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center gap-2">
                <input type="radio" name="presentationCategory" value="oral" /> Oral
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="presentationCategory" value="poster" /> Poster
              </label>
            </div>
          </div>

          <div>
            <label className="text-gray-800 font-semibold">Presentation Type:</label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center gap-2">
                <input type="radio" name="presentationType" value="Virtual" /> Virtual
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="presentationType" value="Physical" /> Physical
              </label>
            </div>
          </div>

          <div>
            <label className="text-gray-800 font-semibold">University/Institution Name:</label>
            <input
              type="text"
              name="Institution_Name"
              required
              className="w-full p-2.5 px-3 border border-gray-300 outline-none rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <div>
              <label className="text-gray-800 font-semibold">Department:</label>
              <input
                type="text"
                name="Department"
                required
                className="w-full p-2.5 px-3 border border-gray-300 outline-none rounded-lg"
              />
            </div>
            <div>
              <label className="text-gray-800 font-semibold">Designation:</label>
              <input
                type="text"
                name="designation"
                required
                className="w-full p-2.5 px-3 border border-gray-300 outline-none rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-800 font-semibold">Publication Required:</label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center gap-2">
                <input type="radio" name="Publication_Required" value="yes" /> Yes
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="Publication_Required" value="no" /> No
              </label>
            </div>
          </div>

          <div>
            <label className="text-gray-800 font-semibold">File Upload:</label>
            <input
              type="file"
              accept=".doc,.docx"
              name="file"
              onChange={handleFileChange}
              required
              className="w-full p-2.5 px-3 border border-gray-300 outline-none rounded-lg"
            />
          </div>

          <div>
            <label className="text-gray-800 font-semibold">How did you know about the conference?</label>
            <textarea
              name="conferenceSource"
              rows={2}
              className="w-full p-2.5 px-3 border border-gray-300 outline-none rounded-lg"
            ></textarea>
          </div>

          <div>
            <label className="text-gray-800 font-semibold">Message:</label>
            <textarea
              name="message"
              rows={2}
              className="w-full p-2.5 px-3 border border-gray-300 outline-none rounded-lg"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-rose-600 text-white px-4 py-3 rounded-md font-medium hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 transition-colors"
          >
            Submit Your Paper
          </button>
        </form>
      </section>
      <style>
        {`
        /* Scoped to this form only */
        [data-form="paper"] label {
          color: #374151; /* gray-700 */
          font-weight: 500; /* medium */
          display: block;
          margin-bottom: 0.375rem; /* mb-1.5 */
        }

        [data-form="paper"] .flex label { 
          margin-bottom: 0; /* radio labels in rows */
        }

        [data-form="paper"] input:not([type="radio"]),
        [data-form="paper"] input:not([type="radio"]):where([type="text"], [type="email"], [type="tel"], [type="url"]),
        [data-form="paper"] select,
        [data-form="paper"] textarea {
          width: 100%;
          padding: 0.625rem 0.75rem; /* p-2.5 px-3 */
          border: 1px solid #D1D5DB; /* gray-300 */
          border-radius: 0.5rem; /* rounded-lg */
          outline: none;
          background: #fff;
          color: #111827; /* gray-900 */
          transition: box-shadow 150ms, border-color 150ms;
        }

        [data-form="paper"] input:not([type="radio"]):focus,
        [data-form="paper"] select:focus,
        [data-form="paper"] textarea:focus {
          border-color: #2563EB; /* rose-600 */
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15); /* ring-rose-400/15 */
        }

        [data-form="paper"] input[type="radio"] {
          accent-color: #2563EB; /* rose-600 */
        }

        [data-form="paper"] .grid {
          gap: 1rem; /* gap-4 */
        }

        /* Keep the existing phone input style, but align with new input visuals */
        .PhoneInputInput {
          padding: 0.625rem 0.75rem;
          border: 1px solid #D1D5DB;
          outline: none;
          border-radius: 0.5rem;
          background: #fff;
          color: #111827;
          transition: box-shadow 150ms, border-color 150ms;
        }
        .PhoneInputInput:focus {
          border-color: #2563EB;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);
        }
        `}
      </style>
    </>
  )
}

export default AbstractFullPaperSubmission
