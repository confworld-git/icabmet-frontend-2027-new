"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../commonhero/common-hero";
// import { Helmet } from "react-helmet";

const OrganizingCommitteeMembers = () => {
  const [loading, setLoading] = useState(true);
  const [committeeMembers, setCommitteeMembers] = useState({});

  const CommitteeMemberSkeleton = () => (
    <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-sm animate-pulse flex flex-col items-center">
      <div className="w-48 h-48 bg-gray-300 rounded-full mb-6"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
    </div>
  );

  useEffect(() => {
    const fetchCommitteeMembers = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const res = await axios.get(
          import.meta.env.VITE_API_URL +
            "/speaker?s=Scientific Committee,Review Committee"
        );
        if (res.status === 200 && res.data.data) {
          const newMembers = {};
          res.data.data.forEach((element) => {
            if (element._id) {
              newMembers[element._id] = element.speakers.sort(
                (a, b) => a.position - b.position
              );
            }
          });
          setCommitteeMembers(newMembers);
        }
      } catch (error) {
        console.error("Error fetching committee members:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCommitteeMembers();
  }, []);

  const renderSection = (title) => (
    <div className="w-full py-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-rose-700 mb-8 text-center">
        {title}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center border-b-4 border-rose-500 p-8 bg-rose-50 rounded-xl shadow-inner">
        {loading
          ? Array(4)
              .fill(null)
              .map((_, index) => <CommitteeMemberSkeleton key={index} />)
          : Array.isArray(committeeMembers[title]) &&
            committeeMembers[title].length > 0
          ? committeeMembers[title].map((member, index) => (
              <div
                className="w-full max-w-sm flex flex-col items-center bg-white shadow-xl rounded-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
                key={index}
              >
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-rose-500 shadow-lg mb-6">
                  <img
                    loading="lazy"
                    alt={member.Name}
                    className="w-full h-full object-cover object-top"
                    src={`${import.meta.env.VITE_API_URL}/image/${
                      member.Image
                    }`}
                  />
                </div>
                <div className="flex flex-col gap-0 items-center text-center w-full">
                  <h2 className="text-lg font-semibold text-gray-900 mb-0 break-words whitespace-normal text-center w-full">
                    {member.Name}
                  </h2>
                  <div className="text-gray-700 text-base leading-relaxed w-full">
                    {Array.isArray(member.About) &&
                      member.About.map((item, idx) => <p key={idx}>{item}</p>)}
                  </div>
                </div>
              </div>
            ))
          : !loading && (
              <p className="col-span-full text-gray-600 italic text-lg text-center py-8">
                Information about our {title} will be updated soon.
              </p>
            )}
      </div>
    </div>
  );

  return (
    <section className="min-h-screen bg-gray-100">
      {/* <Helmet>
        <title>
          ICLSMHA 2026 Organizing Committee | Scientific & Review Members
        </title>
        <meta
          name="description"
          content="Meet the Organizing Committee of ICLSMHA 2026, including the Scientific Committee and Review Committee. Learn more about the experts guiding our international healthcare and research conference."
        />
        <meta
          name="keywords"
          content="ICLSMHA 2026 organizing committee, scientific committee, review committee, conference committee members, healthcare research committee"
        />
        <link 
          rel="canonical" 
          href="https://iclsmha.cerada.in/organizing-committee-member" 
        />
        <meta name="robots" content="index, follow" />

      </Helmet> */}
      <Hero 
              title=" Organizing Committee" 
              breadcrumbs={[{ label: 'Home', link: '#' }]}
              backgroundImage="/images/commonheroimages/4.webp"
            />
      <div className="w-full px-4">
        {renderSection("Scientific Committee")}
        {renderSection("Review Committee")}

        <div className="w-full px-4 py-8 text-center bg-white shadow-md rounded-xl mt-8">
          <p className="text-xl font-medium text-gray-700">
            <a
              href="/organizing-committee-member-form"
              className="text-rose-600 hover:text-rose-500 font-semibold transition-colors duration-200"
            >
              Apply
            </a>{" "}
            for Organizing Committee Members
          </p>
        </div>
      </div>
    </section>
  );
};

export default OrganizingCommitteeMembers;