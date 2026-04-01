import React, { useEffect } from "react";
import { IoMdTrendingUp } from "react-icons/io";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdOutlineAppRegistration } from "react-icons/md";
import { RiFilePaper2Line } from "react-icons/ri";
import { HiDownload } from "react-icons/hi";
import { BsQuestionLg } from "react-icons/bs";
import { MdCall } from "react-icons/md";
import { MdPersonAdd } from "react-icons/md";
import { TbBookDownload } from "react-icons/tb";
import { Link } from "react-router-dom";
import { toaster } from "evergreen-ui";
import axios from "axios";
// import { Helmet } from "react-helmet";

// Make sure HandleExcelDownload is correctly imported or defined
const HandleExcelDownload = (data, filename) => {
  console.log(`Downloading ${filename} with data:`, data);
  toaster.success(`Simulating download for ${filename}`);
  // In a real scenario, you'd use a library like 'xlsx' or 'file-saver'
};

const Dashboard = () => {
  const [allData, setData] = React.useState(null);
  const [INR, setINR] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  const dataGet = async () => {
    setLoading(true);
    try {
      const dashboardResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard`,
        { withCredentials: true }
      );

      if (dashboardResponse.status === 200) {
        setData(dashboardResponse.data);

        const exchangeRateResponse = await axios.get(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const rate = exchangeRateResponse.data.rates.INR;
        setINR(Math.round(dashboardResponse.data.totalFee * rate));
      }
    } catch (error) {
      console.error("Dashboard data fetch error:", error);
      toaster.danger("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dataGet();
  }, []);

  const data = [
    {
      title: "Total Registrations",
      icon: <MdOutlineAppRegistration className="text-3xl" />,
      color: "bg-red-500",
      path: "/Dashboard/Registration",
      count: allData?.Count_Registration,
      apiPath: "registration",
    },
    {
      title: "Total Submissions",
      icon: <RiFilePaper2Line className="text-3xl" />,
      color: "bg-yellow-500",
      path: "/Dashboard/Submission",
      count: allData?.Count_Submission,
      apiPath: "paperSubmission",
    },
    {
      title: "Total Members",
      icon: <MdPersonAdd className="text-3xl" />,
      color: "bg-purple-500",
      path: "/Dashboard/CommitteeMember",
      count: allData?.Count_CommitteeMember,
      apiPath: "committeeMember",
    },
    {
      title: "Total Downloads",
      icon: <HiDownload className="text-3xl" />,
      color: "bg-blue-500",
      path: "/Dashboard/Downloads",
      count: allData?.Count_Download,
      apiPath: "downlaod",
    },
    {
      title: "Total Enquiries",
      icon: <BsQuestionLg className="text-3xl" />,
      color: "bg-indigo-500",
      path: "/Dashboard/Enquiries",
      count: allData?.Count_Enquiry,
      apiPath: "enquiry",
    },
    {
      title: "Total Contacts",
      icon: <MdCall className="text-3xl" />,
      color: "bg-pink-500",
      path: "/Dashboard/Contact",
      count: allData?.Count_Contact,
      apiPath: "contact",
    },
  ];

  const apiHandle = async (path) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/${path}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        HandleExcelDownload(
          response.data.data,
          `ICAEBMS ${path.charAt(0).toUpperCase() + path.slice(1)} Data`
        );
        toaster.success(`Successfully prepared ${path} data for download!`);
      } else {
        toaster.warning(
          `Could not fetch ${path} data. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error(`Error downloading ${path} data:`, error);
      toaster.danger(`Failed to download ${path} data.`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="ml-4 text-gray-700">Loading Dashboard...</p>
      </div>
    );
  }

  if (!allData) {
    return (
      <div className="flex flex-col justify-center items-center h-full min-h-[400px] text-red-600">
        <p className="text-xl mb-4">Failed to load dashboard data.</p>
        <button
          onClick={dataGet}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Retry Load
        </button>
      </div>
    );
  }

  return (
    <section>
      {/* <Helmet>
        <title>Dashboard | ICLSMHA 2026</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://iclsmha.cerada.in/Dashboard" />
      </Helmet> */}
      <div className="p-4 md:p-8 w-full flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-8 mt-4">
          Dashboard Overview
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
          {/* Total Amount Card - Improved Styling */}
          <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 ease-in-out hover:shadow-xl border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex justify-center items-center text-white text-3xl rounded-full bg-green-500 shadow-md">
                <FaIndianRupeeSign className="text-2xl" />{" "}
                {/* Changed icon to Rupee for clarity */}
              </div>
              <p className="text-xl font-semibold text-blue-900">
                Total Revenue
              </p>{" "}
              {/* Changed title for clarity */}
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-black text-gray-900">
                <span className="text-green-600">
                  ${allData?.totalFee || 0}
                </span>{" "}
                {/* Highlighting USD */}
              </h1>
              <span className="flex items-center text-lg font-bold text-blue-900">
                <FaIndianRupeeSign className="mr-1 text-xl" /> {INR}
              </span>
              <span className="text-sm font-medium text-gray-600 mt-1">
                Estimated INR from USD
              </span>
            </div>
            {/* Removed the conic gradient percentage circle as it didn't convey meaningful progress for a total amount.
              You can re-add a decorative element here if desired, but without the percentage logic. */}
          </div>

          {/* Dynamic Data Cards (remain consistent) */}
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 ease-in-out hover:shadow-xl border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 flex justify-center items-center text-white text-3xl rounded-full ${item.color} shadow-md`}
                >
                  {item.icon}
                </div>
                <p className="text-xl font-semibold text-blue-900">
                  {item.title}
                </p>
              </div>
              <div className="relative flex flex-col gap-1">
                <h1 className="text-3xl font-black text-gray-900">
                  # {item.count || 0}
                </h1>
                <span className="flex items-center text-sm font-medium text-gray-600">
                  From Till Date
                </span>
                <div className="absolute right-0 bottom-0 flex justify-center items-center">
                  <abbr
                    title={`Download ${item.title} Data`}
                    onClick={() => apiHandle(item.apiPath)}
                    className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-200 ease-in-out rounded-full cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <TbBookDownload className="text-2xl" />
                  </abbr>
                </div>
              </div>
              {item.path && (
                <Link
                  to={item.path}
                  className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-end"
                >
                  View Details
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
