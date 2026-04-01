import { useState } from "react";
import { LuMenu } from "react-icons/lu";
import { navbarList } from "./navList";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { topNavList } from "./navList";

export default function Sidebar({ value }) {
  const { sidebarOpen, isOpenSidebar } = value;
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleDropdown = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } w-screen h-screen bg-black opacity-40 transition-transform duration-300 ease-in-out fixed top-0 left-0 z-40`}
        onClick={isOpenSidebar}
      ></div>
      <div
        className={`fixed top-0 right-0 w-80 h-screen bg-gray-100 z-50 shadow-lg overflow-auto p-5 ${
          sidebarOpen ? "translate-x-0" : "translate-x-100"
        } transition-transform duration-300 ease-in-out`}
      >
        <i className="menuIcon cursor-pointer" onClick={isOpenSidebar}>
          <LuMenu size={30} />
        </i>
        <ul className="mt-5">
          {navbarList.map(({ main_title, main_link, drop_down }, index) => (
            <li
              key={index}
              className="capitalize p-2 justify-between items-center cursor-pointer"
              {...(drop_down && { onClick: () => toggleDropdown(index) })}
            >
              <div className="flex items-center justify-between">
                {main_link ? (
                  <Link to={main_link}> {main_title} </Link>
                ) : (
                  main_title
                )}
                <span>
                  {drop_down && (
                    <RiArrowDropDownLine
                      size={30}
                      className={`transition-transform duration-200 ${
                        activeIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </span>
              </div>
              {drop_down && (
                <ul
                  className={`transition-all duration-300 ease-in-out space-y-2 overflow-hidden ${
                    activeIndex === index ? "max-h-96 mt-2" : "max-h-0"
                  }`}
                >
                  {drop_down.map(({ sub_link, sub_title }, sub_index) => (
                    <li
                      className="hover:bg-gray-200 p-2 rounded-lg"
                      key={sub_index}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Link to={sub_link} className="flex items-center">
                        {/* <img
                          src={sub_item.sub_icon}
                          alt={sub_item.sub_title}
                          width={50}
                          height={50}
                          loading="lazy"
                          className="w-6 max-h-6 me-2"
                        /> */}
                        <span className="text-sm capitalize">{sub_title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <ul className=" flex flex-col justify-around gap-2  text-sm font-semibold  flex-wrap">
          {topNavList.map(({ title, icon, link, alt }, index) => (
            <li
              key={index}
              className="flex items-center gap-2 hover:bg-gray-200 rounded-lg"
              onClick={() => set1()}
            >
              <Link
                className="capitalize flex items-center gap-2  p-2 w-full"
                to={link}
              >
                <img
                  src={icon}
                  alt={alt}
                  width={50}
                  height={50}
                  loading="lazy"
                  className="w-7  max-h-7  bg-white rounded-full"
                />
                <span className="text-sm  capitalize">{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
