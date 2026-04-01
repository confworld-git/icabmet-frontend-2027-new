"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { handleDownload, HandleExcelDownload } from "../utils/utils";
import { toaster } from "evergreen-ui";
import { FiDownload, FiRefreshCw, FiPaperclip } from "react-icons/fi"; // Import new icons
// import { Helmet } from "react-helmet";

const CommitteeMember = () => {
  const [memberData, setMemberData] = useState([]); // Renamed for clarity
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  const fetchMemberData = async () => {
    // Renamed for clarity
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/committeeMember`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setMemberData(res.data.data);
        toaster.success(
          res.data.message || "Committee member data fetched successfully!"
        );
      } else {
        toaster.warning(`Failed to fetch data: ${res.statusText}`);
        setError(`Failed to fetch data: ${res.statusText}`);
      }
    } catch (err) {
      // Changed 'error' to 'err' for consistency
      console.error("Error fetching committee member data:", err);
      toaster.danger("Failed to load committee member data. Please try again.");
      setError("Failed to load committee member data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberData();
  }, []);

  const handleDownloadExcel = () => {
    // Renamed to avoid conflict
    if (memberData.length > 0) {
      HandleExcelDownload(memberData, "ICAEBMS Committee Member Data"); // Consistent filename
    } else {
      toaster.info("No data to download.");
    }
  };

  return (
    <section>
      {/* <Helmet>
        <title>Dashboard | ICLSMHA 2026</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://iclsmha.cerada.in/Dashboard/CommitteeMember" />
      </Helmet> */}
      <div className="p-4 md:p-8 w-full flex flex-col items-center min-h-screen bg-gray-50">
        <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg p-6 md:p-8">
          {/* Header and Download Button */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 border-b pb-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 md:mb-0">
              Committee Member Data
            </h1>
            <div className="flex space-x-3">
              <button
                className="py-2.5 px-5 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition-colors duration-200 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handleDownloadExcel}
                disabled={loading} // Disable during loading
              >
                <FiDownload className="text-xl" />
                <span>Download Excel</span>
              </button>
              <button
                className="py-2.5 px-5 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-colors duration-200 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                onClick={fetchMemberData}
                disabled={loading}
              >
                <FiRefreshCw
                  className={`text-xl ${loading ? "animate-spin" : ""}`}
                />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* Loading, Error, or No Data States */}
          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
              <p className="ml-4 text-gray-600 text-lg">
                Loading committee member records...
              </p>
            </div>
          )}

          {error && (
            <div className="flex flex-col justify-center items-center h-64 text-red-600">
              <p className="text-xl mb-4">{error}</p>
              <button
                onClick={fetchMemberData}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && memberData.length === 0 && (
            <div className="flex flex-col justify-center items-center h-64 text-gray-500">
              <p className="text-xl mb-4">
                No committee member data available.
              </p>
              <button
                onClick={fetchMemberData}
                className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow-md hover:bg-pink-700 transition-colors"
              >
                Fetch Data
              </button>
            </div>
          )}

          {/* Data Table */}
          {!loading && !error && memberData.length > 0 && (
            <div className="w-full overflow-x-auto max-h-[calc(100vh-250px)] rounded-lg border border-gray-200 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-lime-600 opacity-80 text-white sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider rounded-tl-lg">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      First Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Country
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Contact Number
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Member Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Organization
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Qualification
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Professional Exp.
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Department
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Specialization
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      h-index
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Associated Cerada
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Publications
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      SCI Published
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Journals
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider rounded-tr-lg">
                      Resume
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {memberData.map(
                    (
                      entry // Changed memberCount to memberData
                    ) => (
                      <tr
                        key={entry._id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                          {entry.Title || "N/A"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                          {entry.First_Name || "N/A"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          {entry.Email ? (
                            <a
                              href={`mailto:${entry.Email}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
                            >
                              {entry.Email}
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                          {entry.Country || "N/A"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                          {entry.Number || "N/A"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                          {entry.Member_Category || "N/A"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                          {entry.Organization || "N/A"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                          {entry.Qualification || "N/A"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                          {entry.Professional_Experience || "N/A"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                          {entry.Department || "N/A"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                          {entry.Specialization || "N/A"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                          {entry.h_index || "N/A"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                          {entry.Associated_Cerada || "N/A"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                          {entry.Publication || "N/A"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                          {entry.SCI_Published || "N/A"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                          {entry.Journals || "N/A"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                          {entry.Uploaded_File ? (
                            <button
                              className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200 inline-flex items-center space-x-1"
                              onClick={() =>
                                handleDownload(
                                  entry.Uploaded_File.buffer,
                                  entry.Uploaded_File.mimetype,
                                  entry.Uploaded_File.originalname
                                )
                              }
                              title="Download Resume"
                            >
                              <FiPaperclip className="text-base" />
                              <span>Download</span>
                            </button>
                          ) : (
                            "N/A"
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommitteeMember;
