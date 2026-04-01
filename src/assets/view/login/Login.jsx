import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import bg from "/images/login/login_bg.webp"; // No longer needed for background
import loginBanner from "/images/login/loginbanner.png"; // Import the new banner image
import { toaster } from "evergreen-ui";
import AOS from "aos";
import "aos/dist/aos.css";
// import { Helmet } from "react-helmet";

const Login = () => {
  const navigate = useNavigate();

  // Initialize and Refresh AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50,
    });
    AOS.refresh();
  }, []);

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/login",
        formData,
        { withCredentials: true }
      );
      if (res.status === 200) {
        toaster.success(res.data.message);
        navigate("/Dashboard");
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "An unexpected error occurred.";
      toaster.danger(errorMessage);
    }
  };

  return (
    <section>
      {/* <Helmet>
        <title>Login | ICLSMHA 2026</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://iclsmha.cerada.in/login" />
      </Helmet> */}
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
        {/* Main container for desktop: flex-row, for mobile: flex-col */}
        <div
          data-aos="zoom-in" // Using zoom-in for the whole card
          className="flex flex-col lg:flex-row w-full max-w-4xl bg-white shadow-xl rounded-lg overflow-hidden"
        >
          {/* Left Section: Image (visible on desktop, hidden or smaller on mobile) */}
          <div className="lg:w-1/2 flex justify-center items-center bg-gray-900 p-4 sm:p-6 lg:p-0">
            <img
              src={loginBanner}
              alt="Login Banner"
              className="w-full h-auto object-cover rounded-lg lg:rounded-none lg:h-full"
            />
          </div>

          {/* Right Section: Login Form */}
          <div className="lg:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
              <span className="text-blue-800">Admin Login</span> 
            </h1>
            <form onSubmit={onSubmit} className="w-full max-w-sm space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-800"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-800"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
