"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toaster } from "evergreen-ui";
import { HandleExcelDownload } from "../utils/utils"; // Ensure this path is correct
import { FiDownload, FiRefreshCw } from "react-icons/fi"; // Import new icons
// import { Helmet } from "react-helmet";

const Registration = () => {
  const [registrationData, setRegistrationData] = useState([]); // Renamed for clarity
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  const fetchRegistrationData = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/registration`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setRegistrationData(res.data.data);
        toaster.success(
          res.data.message || "Registration data fetched successfully!"
        );
      } else {
        toaster.warning(`Failed to fetch data: ${res.statusText}`);
        setError(`Failed to fetch data: ${res.statusText}`);
      }
    } catch (err) {
      console.error("Error fetching registration data:", err);
      toaster.danger("Failed to load registration data. Please try again.");
      setError("Failed to load registration data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrationData();
  }, []);

  const handleDownload = () => {
    if (registrationData.length > 0) {
      HandleExcelDownload(registrationData, "ICAEBMS Registration Data");
    } else {
      toaster.info("No data to download.");
    }
  };

  // Helper function to get status badge classes
  const getStatusClasses = (status) => {
    let classes = "py-1 px-3 text-xs font-semibold rounded-full"; // Consistent padding and font size
    switch (status) {
      case "created":
        classes += " bg-yellow-100 text-yellow-800";
        break;
      case "Payment Paid":
        classes += " bg-green-100 text-green-800";
        break;
      case "Payment Failed":
        classes += " bg-red-100 text-red-800";
        break;
      case "Refunded":
        classes += " bg-blue-100 text-blue-800";
        break;
      default:
        classes += " bg-gray-100 text-blue-900"; // Default for unknown/N/A
        break;
    }
    return classes;
  };

  return (
    <section>
      {/* <Helmet>
        <title>Dashboard | ICLSMHA 2026</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://iclsmha.cerada.in/Dashboard/Registration" />
      </Helmet> */}
      <div className="p-4 md:p-8 w-full flex flex-col items-center min-h-screen bg-gray-50">
        <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg p-6 md:p-8">
          {/* Header and Download Button */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 border-b pb-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 md:mb-0">
              Registration Data
            </h1>
            <div className="flex space-x-3">
              <button
                className="py-2.5 px-5 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition-colors duration-200 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handleDownload}
                disabled={loading} // Disable during loading
              >
                <FiDownload className="text-xl" />
                <span>Download Excel</span>
              </button>
              <button
                className="py-2.5 px-5 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-colors duration-200 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                onClick={fetchRegistrationData}
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
                Loading registration records...
              </p>
            </div>
          )}

          {error && (
            <div className="flex flex-col justify-center items-center h-64 text-red-600">
              <p className="text-xl mb-4">{error}</p>
              <button
                onClick={fetchRegistrationData}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && registrationData.length === 0 && (
            <div className="flex flex-col justify-center items-center h-64 text-gray-500">
              <p className="text-xl mb-4">No registration data available.</p>
              <button
                onClick={fetchRegistrationData}
                className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow-md hover:bg-pink-700 transition-colors"
              >
                Fetch Data
              </button>
            </div>
          )}

          {/* Data Table */}
          {!loading && !error && registrationData.length > 0 && (
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
                      Last Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Certificate Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      DOB
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Nationality
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Department
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Institution
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Pres. Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Pres. Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Participant Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Amount (USD)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider rounded-tr-lg">
                      Contact
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {registrationData.map((entry) => (
                    <tr
                      key={entry._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {entry.Title || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {entry.first_name || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {entry.last_name || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {entry.certificate_name || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {entry.DOB
                          ? new Date(entry.DOB).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {entry.nationality || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {entry.department || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {entry.institution || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {entry.presentation_Category || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {entry.presentation_Type || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {entry.participant_category || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                        <span className={getStatusClasses(entry.status)}>
                          {entry.status || "N/A"}
                        </span>
                      </td>
                      {/* UPDATED: Amount (USD) column logic to handle object structure */}
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {typeof entry.selectedFee === "object"
                          ? entry.selectedFee.total
                            ? `$${entry.selectedFee.total.toFixed(2)}` // Display 'total' with 2 decimal places
                            : entry.selectedFee.value
                            ? `$${entry.selectedFee.value.toFixed(2)}` // Fallback to 'value' with 2 decimal places
                            : "N/A"
                          : entry.selectedFee
                          ? `$${Number(entry.selectedFee).toFixed(2)}` // If it's a number directly, format it
                          : "N/A"}
                      </td>
                      {/* END UPDATED */}
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {entry.email ? (
                          <a
                            href={`mailto:${entry.email}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
                          >
                            {entry.email}
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                        {entry.number || "N/A"}
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

export default Registration;
