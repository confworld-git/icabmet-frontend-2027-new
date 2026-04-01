import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
// import { Helmet } from "react-helmet";

const DashboardLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <section>
      {/* <Helmet>
        <title>Login | ICLSMHA 2026</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://iclsmha.cerada.in/Dashboard" />
      </Helmet> */}
    <div className="flex flex-row items-start w-full">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-10 h-full bg-white shadow-lg p-4 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "280px" }} // Fixed width for sidebar
      >
        <Sidebar setIsMenuOpen={setIsMenuOpen} />
      </div>

      {/* Main Content */}
      <div
        className={`absolute left-0 transition-all duration-300 ease-in-out ${
          isMenuOpen ? "min-sm:pl-[280px]" : "pl-0"
        } w-full`}
      >
        <button
          hidden={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="absolute top-1 left-1 p-1.5 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 17 14"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
    </section>
    
  );
};

export default DashboardLayout;
