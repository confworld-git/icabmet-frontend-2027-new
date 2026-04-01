"use client"
import axios from "axios"
import { useNavigate, Link, useLocation } from "react-router-dom" // Import useLocation
import { IoHomeSharp, IoPersonSharp, IoDocumentSharp, IoCallSharp, IoDownloadSharp, IoMailSharp } from "react-icons/io5"
import { HiOutlineLogout } from "react-icons/hi"
import { BsPeople } from "react-icons/bs"
import { MdRecordVoiceOver } from "react-icons/md"
import { FiX } from 'react-icons/fi'; // Import X icon for close button
import { toaster } from "evergreen-ui"


const Sidebar = ({ setIsMenuOpen }) => {
  const navigate = useNavigate()
  const location = useLocation() // Needed for active link styling

  const logout = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
        withCredentials: true,
      })
      if (response.status === 200) {
        navigate("/")
        toaster.success(response.data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // Helper to determine if a link is currently active for styling
  const isActive = (path) => {
    if (path === "/Dashboard" && (location.pathname === "/" || location.pathname === "/Dashboard")) {
      return true;
    }
    if (path.includes("#")) {
      return location.pathname + location.hash === path;
    }
    return location.pathname === path;
  };

  // Function to close sidebar on link click (important for mobile UX)
  const handleLinkClick = () => {
    if (window.innerWidth < 768) { // Assuming md breakpoint is 768px in Tailwind
      setIsMenuOpen(false);
    }
  };

  return (
    // Changed: Solid background, added shadow, refined padding and layout
    // Removed: bg-gradient-to-bl from-[#ffe4e6] to-[#ccfbf1] rounded-2xl
    <div className="bg-pink-100 rounded-xl shadow-xl relative w-full h-full p-4 md:p-6 flex flex-col justify-between ">

      {/* Close button for mobile views */}
      {/* Changed: top-4 right-4 for better spacing, more prominent hover/focus, uses FiX icon */}
      <button
        onClick={() => setIsMenuOpen(false)}
        className="absolute top-4 right-4 md:hidden p-2 text-gray-600 hover:bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Close Sidebar"
      >
        <FiX className="w-6 h-6" /> {/* Uses the FiX icon */}
      </button>

      {/* Sidebar Header/Logo Area */}
      {/* Changed: Stronger heading font, text color, adjusted margins */}
      <div className=" mt-4 md:mt-0">
        
        {/* You can add a logo image here if needed */}
      </div>

      {/* Navigation Links */}
      {/* Changed: Increased space-y for better visual separation, flex-1 for layout */}
      <ul className="space-y-1 flex-1">
        {/* Link items with dynamic active styling */}
        {/* Each Link has enhanced styling: padding, rounded corners, consistent text/icon color, hover effects, active state */}
        <li>
          <Link
            to="/Dashboard"
            onClick={handleLinkClick}
            className={`flex items-center space-x-3 p-3 rounded-lg text-blue-900
                       hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200
                       ${isActive("/Dashboard") ? "bg-blue-100 text-blue-700 font-semibold" : ""}`}
          >
            <span className="text-xl"><IoHomeSharp /></span> <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            to="Registration"
            onClick={handleLinkClick}
            className={`flex items-center space-x-3 p-3 rounded-lg text-blue-900
                       hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200
                       ${isActive("/Dashboard/Registration") ? "bg-blue-100 text-blue-700 font-semibold" : ""}`}
          >
            <span className="text-xl"><IoPersonSharp /></span> <span>Registration</span>
          </Link>
        </li>
        <li>
          <Link
            to="Submission"
            onClick={handleLinkClick}
            className={`flex items-center space-x-3 p-3 rounded-lg text-blue-900
                       hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200
                       ${isActive("/Dashboard/Submission") ? "bg-blue-100 text-blue-700 font-semibold" : ""}`}
          >
            <span className="text-xl"><IoDocumentSharp /></span> <span>Submission</span>
          </Link>
        </li>
        <li>
          <Link
            to="CommitteeMember"
            onClick={handleLinkClick}
            className={`flex items-center space-x-3 p-3 rounded-lg text-blue-900
                       hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200
                       ${isActive("/Dashboard/CommitteeMember") ? "bg-blue-100 text-blue-700 font-semibold" : ""}`}
          >
            <span className="text-xl"><BsPeople /></span> <span>Committee Member</span>
          </Link>
        </li>
        <li>
          <Link
            to="Contact"
            onClick={handleLinkClick}
            className={`flex items-center space-x-3 p-3 rounded-lg text-blue-900
                       hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200
                       ${isActive("/Dashboard/Contact") ? "bg-blue-100 text-blue-700 font-semibold" : ""}`}
          >
            <span className="text-xl"><IoCallSharp /></span> <span>Contact</span>
          </Link>
        </li>
        <li>
          <Link
            to="Downloads"
            onClick={handleLinkClick}
            className={`flex items-center space-x-3 p-3 rounded-lg text-blue-900
                       hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200
                       ${isActive("/Dashboard/Downloads") ? "bg-blue-100 text-blue-700 font-semibold" : ""}`}
          >
            <span className="text-xl"><IoDownloadSharp /></span> <span>Downloads</span>
          </Link>
        </li>
        <li>
          <Link
            to="CouponManagement"
            onClick={handleLinkClick}
            className={`flex items-center space-x-3 p-3 rounded-lg text-gray-700
                       hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200
                       ${isActive("/Dashboard/CouponManagement") ? "bg-blue-100 text-blue-700 font-semibold" : ""}`}
          >
            <span className="text-xl"><IoDownloadSharp /></span> <span>Coupon </span>
          </Link>
        </li>
        {/* <li>
          <Link
            to="CouponManagement"
            onClick={handleLinkClick}
            className={`flex items-center space-x-3 p-3 rounded-lg text-blue-900
                       hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200
                       ${isActive("/Dashboard/CouponManagement") ? "bg-blue-100 text-blue-700 font-semibold" : ""}`}
          >
            <span className="text-xl"><IoTicketOutline /></span> <span>Coupon</span>
          </Link>
        </li> */}
        <li>
          <Link
            to="Enquiries"
            onClick={handleLinkClick}
            className={`flex items-center space-x-3 p-3 rounded-lg text-blue-900
                       hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200
                       ${isActive("/Dashboard/Enquiries") ? "bg-blue-100 text-blue-700 font-semibold" : ""}`}
          >
            <span className="text-xl"><IoMailSharp /></span> <span>Enquiries</span>
          </Link>
        </li>
        {/* Speakers (Base) Link */}
        <li>
            <Link
              to="Speakers"
              onClick={handleLinkClick}
              className={`flex items-center space-x-3 p-3 rounded-lg text-blue-900
                         hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200
                         ${isActive("/Dashboard/Speakers") && !location.hash ? "bg-blue-100 text-blue-700 font-semibold" : ""}`}
            >
              <span className="text-xl"><MdRecordVoiceOver /></span> <span>Speakers</span>
            </Link>
        </li>
        {/* Add Speaker (Hash) Link */}
        <li>
          <Link
            to="Speakers#add-speakers"
            onClick={handleLinkClick}
            className={`flex items-center space-x-3 pl-8 py-2 rounded-lg text-gray-600 text-sm
                       hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200
                       ${isActive("/Dashboard/Speakers#add-speakers") ? "bg-blue-50 text-blue-600 font-medium" : ""}`}
          >
            <span>- Add Speaker</span>
          </Link>
        </li>
        {/* Add OCM (Hash) Link */}
        <li>
          <Link
            to="Speakers#add-ocm"
            onClick={handleLinkClick}
            className={`flex items-center space-x-3 pl-8 py-2 rounded-lg text-gray-600 text-sm
                       hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200
                       ${isActive("/Dashboard/Speakers#add-ocm") ? "bg-blue-50 text-blue-600 font-medium" : ""}`}
          >
            <span>- Add OCM</span>
          </Link>
        </li>
      </ul>

      {/* Logout Button */}
      {/* Changed: w-full for full width, enhanced hover/focus, added shadow */}
      <div className="mt-2">
        <button
          onClick={() => {
            logout();
            handleLinkClick(); // Close sidebar after logout (for mobile)
          }}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-md flex items-center justify-center space-x-2
                     font-semibold transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <span className="text-xl"><HiOutlineLogout /></span>{" "}
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;