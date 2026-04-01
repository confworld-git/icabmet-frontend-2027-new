import { useRef, useState } from "react";
import {
  countries,
  qualifications,
  roles_and_responsibilities,
} from "./organizingCommitteeMemberFormJson.js";
import { BsDiamondFill } from "react-icons/bs";
// import {  } from "react";
import PhoneInput from "react-phone-number-input";

export default function OrganizingCommitteeMemberForm() {
  const OCMRef = useRef();
  const [value, setValue] = useState();

  const HandleOCM = async (e) => {
    e.preventDefault();

    const formData = new FormData(OCMRef.current);
    const formValues = {};
    formData.forEach((value, key) => {
      formValues[key] = value;
    });

    const requiredFields = [
      "Title",
      "First_Name",
      "Email",
      "Country",
      "Number",
      "Member_Category",
      "Organization",
      "Qualification",
      "Professional_Experience",
      "Industry_Experience",
      "Department",
      "Specialization",
      "h_index",
      "Associated_Cerada",
      "Publication",
      "SCI_Published",
      "Journals",
      "Conference_Info",
      "file",
    ];

    for (const field of requiredFields) {
      const value = formValues[field];

      if (field === "file") {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          toast.error("File is required.");
          return;
        }

        if (value instanceof File) {
          if (value.size > 300 * 1024) {
            toast.error("File size must be less than 300KB.");
            return;
          }
        } else if (Array.isArray(value)) {
          for (const file of value) {
            if (file.size > 300 * 1024) {
              toast.error("Each file size must be less than 300KB.");
              return;
            }
          }
        }
      } else {
        if (!value || value.trim() === "") {
          toast.error(`${field.replace(/_/g, " ")} is required.`);
          return;
        }
      }
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_LINK}Committee`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.message);
      setValue("");
      OCMRef.current.reset();
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Internal server error");
    }
  };
  return (
    <>
      <div className="flex justify-center h-100 w-full relative">
        <img
          className="w-full h-full object-cover object-center absolute z-1 scale-x-[-1]"
          src="/images/about-banner.jpg"
          alt=""
        />
        <div className="w-full h-full object-cover object-center absolute z-2 bg-black opacity-50"></div>
        <div className="container relative z-3 flex flex-col justify-center">
          <h2 className="capitalize text-xl font-bold text-white p-2">
            Home {">>"} Organizing Committee Member Form
          </h2>
        </div>
      </div>
      <div className="flex justify-center bg-gray-100">
        <div className="container">
          <div className="lg:mx-15 p-5">
            <h1 className="text-3xl my-10 font-bold text-center text-gradient">
              Roles & Responsibilities for Organizing Committee Member
            </h1>
            <ul className="shadow-md p-5 rounded-2xl bg-white">
              {roles_and_responsibilities.map(
                ({ title, description }, index) => (
                  <li
                    key={index}
                    className="p-2 md:flex text-gray-700 gap-2 items-center"
                  >
                    <BsDiamondFill
                      size={13}
                      className="text-[var(--color-heading)]"
                    />
                    <h3 className="font-semibold">{title}: </h3>
                    <p>{description}</p>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="lg:mx-15 p-5">
            <h2 className="text-3xl my-10 font-bold text-center text-gradient">
              Qualifications for Organizing Committee Member
            </h2>
            {qualifications.map(({ title, list, description }, index) => (
              <div className="shadow-md p-5 rounded-2xl bg-white lg:px-30 mb-10">
                <h3 className="text-xl my-10 font-bold text-gradient">
                  {title}
                </h3>
                <ul>
                  {list.map((item, index) => (
                    <li
                      key={index}
                      className="p-2 flex text-gray-700 gap-2 items-center "
                    >
                      <BsDiamondFill
                        size={13}
                        className="text-[var(--color-heading)] min-w-5 max-w-5"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                {description.map((item, index) => (
                  <p key={index} className="my-2 text-gray-700">
                    {item}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div className=" lg:mx-15 p-5">
            <form
              ref={OCMRef}
              onSubmit={HandleOCM}
              data-aos="fade-up"
              className=" mx-auto bg-white p-8 rounded-xl shadow space-y-6"
            >
              <h1 className="text-2xl font-bold text-center">
                Apply for{" "}
                <span className="text-gradient">
                  Organizing Committee Members
                </span>
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold text-gray-700">
                    Title*
                  </label>
                  <select
                    name="Title"
                    defaultValue=""
                    required
                    className="w-full border border-gray-300 rounded px-4 py-[10px]"
                  >
                    <option disabled value="">
                      Select Title
                    </option>
                    <option value="Mr">Mr</option>
                    <option value="Ms">Ms</option>
                    <option value="Dr">Dr</option>
                    <option value="Prof">Prof</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    name="First_Name"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    placeholder="Full Name"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">
                    Email*
                  </label>
                  <input
                    type="email"
                    name="Email"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    placeholder="Email"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">
                    Whatsapp/Viber Contact Number*
                  </label>
                  <PhoneInput
                    international
                    limitMaxLength
                    defaultCountry="US"
                    name="Number"
                    value={value}
                    onChange={setValue}
                    className="w-full border border-gray-300 rounded px-4 py-2 custom-phone-input"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">
                    Country*
                  </label>
                  <select
                    name="Country"
                    defaultValue=""
                    required
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  >
                    <option disabled value="">
                      Select Country
                    </option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.name}>
                        {country.emoji} {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">
                    Member Category*
                  </label>
                  <select
                    name="Member_Category"
                    defaultValue=""
                    required
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  >
                    <option disabled value="">
                      Select Member Category
                    </option>
                    <option value="Advisory">Advisory</option>
                    <option value="Scientific">Scientific</option>
                    <option value="Hospitality">Hospitality</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">
                    Name of the Organization*
                  </label>
                  <input
                    type="text"
                    name="Organization"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    required
                    placeholder="Name of the Organization"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">
                    Department*
                  </label>
                  <input
                    type="text"
                    name="Department"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    required
                    placeholder="Department"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">
                    Qualification*
                  </label>
                  <input
                    type="text"
                    name="Qualification"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    required
                    placeholder="Qualification"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">
                    Professional Background*
                  </label>
                  <input
                    type="text"
                    name="Professional_Experience"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    required
                    placeholder="Professional Background"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">
                    Industry Background*
                  </label>
                  <input
                    type="text"
                    name="Industry_Experience"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    required
                    placeholder="Industry Background"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">
                    Area of Specialization*
                  </label>
                  <input
                    type="text"
                    name="Specialization"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    required
                    placeholder="Specialization"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">
                    Associated with CERADA*
                  </label>
                  <input
                    type="text"
                    name="Associated_Cerada"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    required
                    placeholder="Yes/No"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">
                    h-index*
                  </label>
                  <input
                    type="number"
                    name="h_index"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    required
                    placeholder="h-index"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">
                    No. of Scopus Publications*
                  </label>
                  <input
                    type="text"
                    name="Publication"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    required
                    placeholder="Scopus Publications"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">
                    No. of SCI/WoS Publications*
                  </label>
                  <input
                    type="text"
                    name="SCI_Published"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    required
                    placeholder="SCI/WoS Publications"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">
                    Editor/Reviewer in Journals*
                  </label>
                  <input
                    type="text"
                    name="Journals"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    required
                    placeholder="Editor/Reviewer in Journals"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">
                    Upload CV* (Docx, Doc, PDF)
                  </label>
                  <input
                    type="file"
                    name="file"
                    accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    required
                  />
                  <span className="text-sm text-gray-500">Less than 300KB</span>
                </div>

                <div className="md:col-span-2">
                  <label className="block font-semibold text-gray-700">
                    How did you find out about the event?
                  </label>
                  <textarea
                    name="Conference_Info"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="text-center pt-4">
                <input
                  type="submit"
                  value="Submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
