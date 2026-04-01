"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { handleDownload, HandleExcelDownload } from "../utils/utils"; // Ensure this path is correct
import { toaster } from "evergreen-ui";
import { FiDownload, FiRefreshCw, FiPaperclip } from "react-icons/fi"; // Import new icons, including FiPaperclip for download
// import { Helmet } from "react-helmet";

const Submission = () => {
  const [submissionData, setSubmissionData] = useState([]); // Renamed for clarity
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  const fetchSubmissionData = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/paperSubmission`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setSubmissionData(res.data.data);
        toaster.success(
          res.data.message || "Paper submission data fetched successfully!"
        );
      } else {
        toaster.warning(`Failed to fetch data: ${res.statusText}`);
        setError(`Failed to fetch data: ${res.statusText}`);
      }
    } catch (err) {
      console.error("Error fetching paper submission data:", err);
      toaster.danger("Failed to load paper submission data. Please try again.");
      setError("Failed to load paper submission data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissionData();
  }, []);

  const handleDownloadExcel = () => {
    // Renamed to avoid conflict with imported handleDownload
    if (submissionData.length > 0) {
      HandleExcelDownload(submissionData, "ICAEBMS Paper Submission Data"); // Consistent filename
    } else {
      toaster.info("No data to download.");
    }
  };

  return (
    <section>
      {/* <Helmet>
        <title>Dashboard | ICLSMHA 2026</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://iclsmha.cerada.in/Dashboard/Submission" />
      </Helmet> */}
      <div className="p-4 md:p-8 w-full flex flex-col items-center min-h-screen bg-gray-50">
        <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg p-6 md:p-8">
          {/* Header and Download Button */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 border-b pb-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 md:mb-0">
              Paper Submissions Data
            </h1>
            <div className="flex space-x-3">
              <button
                className="py-2.5 px-5 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition-colors duration-200 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handleDownloadExcel} // Use the renamed function
                disabled={loading} // Disable during loading
              >
                <FiDownload className="text-xl" />
                <span>Download Excel</span>
              </button>
              <button
                className="py-2.5 px-5 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-colors duration-200 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                onClick={fetchSubmissionData}
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
                Loading submission records...
              </p>
            </div>
          )}

          {error && (
            <div className="flex flex-col justify-center items-center h-64 text-red-600">
              <p className="text-xl mb-4">{error}</p>
              <button
                onClick={fetchSubmissionData}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && submissionData.length === 0 && (
            <div className="flex flex-col justify-center items-center h-64 text-gray-500">
              <p className="text-xl mb-4">
                No paper submission data available.
              </p>
              <button
                onClick={fetchSubmissionData}
                className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow-md hover:bg-pink-700 transition-colors"
              >
                Fetch Data
              </button>
            </div>
          )}

          {/* Data Table */}
          {!loading && !error && submissionData.length > 0 && (
            <div className="w-full overflow-x-auto max-h-[calc(100vh-250px)] rounded-lg border border-gray-200 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-lime-600 opacity-80 text-white sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider rounded-tl-lg">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Submission ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Paper Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Author
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Co-Author
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Mobile
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      WhatsApp
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Pres. Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Pres. Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Institution
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Department
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Designation
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Publication Req.
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider rounded-tr-lg">
                      File
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {submissionData.map((submission) => (
                    <tr
                      key={submission._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {submission.Submission_type || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {submission.SubmissionID || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {submission.paper_title || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {submission.authorName || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {submission.CoAuthorName || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {submission.correspondingEmail ? (
                          <a
                            href={`mailto:${submission.correspondingEmail}`} // Use mailto for direct email
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
                          >
                            {submission.correspondingEmail}
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {submission.mobileNumber || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {submission.whatsappNumber || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {submission.presentationCategory || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {submission.presentationType || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {submission.Institution_Name || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {submission.Department || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {submission.designation || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full
                        ${
                          submission.Publication_Required
                            ? "bg-indigo-100 text-indigo-800"
                            : "bg-gray-100 text-blue-900"
                        }
                      `}
                        >
                          {submission.Publication_Required ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                        {submission.file ? (
                          <button
                            className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200 inline-flex items-center space-x-1"
                            onClick={() =>
                              handleDownload(
                                submission.file.buffer,
                                submission.file.mimetype,
                                submission.file.originalname
                              )
                            }
                            title="Download File"
                          >
                            <FiPaperclip className="text-base" />
                            <span>Download</span>
                          </button>
                        ) : (
                          "N/A"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Submission;
