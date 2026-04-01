"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toaster } from "evergreen-ui";
import { HandleExcelDownload } from "../utils/utils";
import { FiDownload, FiRefreshCw } from "react-icons/fi"; // Import icons
// import { Helmet } from "react-helmet";

const Enquiries = () => {
  const [enquiryData, setEnquiryData] = useState([]); // Renamed for clarity
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  const fetchEnquiryData = async () => {
    // Renamed for clarity
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/enquiry`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setEnquiryData(res.data.data);
        toaster.success(
          res.data.message || "Enquiry data fetched successfully!"
        );
      } else {
        toaster.warning(`Failed to fetch data: ${res.statusText}`);
        setError(`Failed to fetch data: ${res.statusText}`);
      }
    } catch (err) {
      // Changed 'error' to 'err' for consistency
      console.error("Error fetching enquiry data:", err);
      toaster.danger("Failed to load enquiry data. Please try again.");
      setError("Failed to load enquiry data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiryData();
  }, []);

  const handleDownloadExcel = () => {
    // Renamed for consistency
    if (enquiryData.length > 0) {
      HandleExcelDownload(enquiryData, "ICAEBMS Enquiry Data"); // Consistent filename
    } else {
      toaster.info("No data to download.");
    }
  };

  return (
    <section>
      {/* <Helmet>
        <title>Dashboard | ICLSMHA 2026</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://iclsmha.cerada.in/Dashboard/Enquiries" />
      </Helmet> */}
      <div className="p-4 md:p-8 w-full flex flex-col items-center min-h-screen bg-gray-50">
        <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg p-6 md:p-8">
          {/* Header and Download Button */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 border-b pb-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 md:mb-0">
              Enquiry Data
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
                onClick={fetchEnquiryData}
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
                Loading enquiry records...
              </p>
            </div>
          )}

          {error && (
            <div className="flex flex-col justify-center items-center h-64 text-red-600">
              <p className="text-xl mb-4">{error}</p>
              <button
                onClick={fetchEnquiryData}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && enquiryData.length === 0 && (
            <div className="flex flex-col justify-center items-center h-64 text-gray-500">
              <p className="text-xl mb-4">No enquiry data available.</p>
              <button
                onClick={fetchEnquiryData}
                className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow-md hover:bg-pink-700 transition-colors"
              >
                Fetch Data
              </button>
            </div>
          )}

          {/* Data Table */}
          {!loading && !error && enquiryData.length > 0 && (
            <div className="w-full overflow-x-auto max-h-[calc(100vh-250px)] rounded-lg border border-gray-200 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-lime-600 opacity-80 text-white sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider rounded-tl-lg">
                      User Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Contact Number
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Preferred Contact Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Subject
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Message
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider rounded-tr-lg">
                      Help Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {enquiryData.map((inquiry) => (
                    <tr
                      key={inquiry._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {inquiry.User_Name || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {inquiry.Email ? (
                          <a
                            href={`mailto:${inquiry.Email}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
                          >
                            {inquiry.Email}
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {inquiry.Contact_Number || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {inquiry.Preferred_Contact_Time || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-sm text-blue-900 max-w-xs overflow-hidden text-ellipsis">
                        <div className="max-h-12 overflow-hidden overflow-y-auto pr-2">
                          {inquiry.Subject || "N/A"}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-blue-900 max-w-xs overflow-hidden text-ellipsis">
                        <div className="max-h-12 overflow-hidden overflow-y-auto pr-2">
                          {inquiry.Message || "N/A"}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-blue-900 max-w-xs overflow-hidden text-ellipsis">
                        <div className="max-h-12 overflow-hidden overflow-y-auto pr-2">
                          {inquiry.Help_Description || "N/A"}
                        </div>
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

export default Enquiries;
