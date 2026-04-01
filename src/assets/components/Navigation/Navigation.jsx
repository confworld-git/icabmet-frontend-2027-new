// components/Navigation/Navigation.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { LuMenu, LuX } from "react-icons/lu";
import { navigationData } from "./navigationData";
import "./Navigation.css";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Check if current page is home
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.classList.remove("overflow-hidden");
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (!isHomePage) {
        setIsScrolled(window.scrollY > 50);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.classList.toggle("overflow-hidden", !isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <>
      <nav className={`${isHomePage ? 'bg-rose-700' : isScrolled ? 'bg-rose-700' : 'bg-white shadow-md'} fixed top-6 lg:top-18 left-0 right-0 z-40 py-3 px-4 lg:px-4 2xl:px-20 transition-all duration-700 ease-in-out`}>
        <div className="w-full mx-auto flex items-center justify-between gap-x-4">
          <a 
            href="/" 
            className="flex-shrink-0 transition-all duration-700 ease-in-out transform hover:scale-105 hover:shadow-xl"
            onClick={closeMobileMenu}
          >
            <img 
              src={(isHomePage || isScrolled) 
                ? "/images/logo/icabmet.png" 
                : "/images/logo/icabmet.png"
              }
              alt="ICABMET Logo"
              className="h-16 w-auto transition-all duration-700 ease-in-out bg-white p-1"
            />
          </a>

          <div className="hidden lg:flex items-center space-x-1">
            {navigationData.map((item, index) => (
              <div key={index} className="relative group">
                {item.title === "Login" ? (
                  <a
                    href={item.path}
                    className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md transition-all duration-700 ease-in-out transform hover:scale-105 ${
                      isHomePage 
                        ? 'text-rose-600 bg-white hover:bg-rose-600 hover:text-white shadow-lg' 
                        : 'text-white bg-rose-600 shadow-md'
                    }`}
                  >
                    {item.title}
                  </a>
                ) : item.path ? (
                  <a
                    href={item.path}
                    className={`flex items-center gap-x-0 px-3 py-2 text-sm font-medium whitespace-nowrap transition-all duration-700 ease-in-out relative group ${
                      location.pathname === item.path
                        ? (isHomePage || isScrolled) ? "text-orange-300 font-semibold" : "text-orange-500 font-semibold"
                        : (isHomePage || isScrolled) ? "text-white hover:text-orange-300" : "text-gray-700 hover:text-rose-600"
                    }`}
                  >
                    <span className="relative z-10">{item.title}</span>
                    <span className={`absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
                      (isHomePage || isScrolled) ? 'bg-orange-500/20' : 'bg-rose-500/10'
                    }`}></span>
                    {item.children && (
                      <RiArrowDropDownLine className="text-xl -ml-0.5 group-hover:rotate-180 transition-transform duration-500 relative z-10" />
                    )}
                  </a>
                ) : (
                  <div className={`flex items-center gap-x-0 px-3 py-2 text-sm font-medium whitespace-nowrap cursor-pointer transition-all duration-700 ease-in-out relative ${
                    (isHomePage || isScrolled)
                      ? "text-white group-hover:text-orange-300" 
                      : "text-gray-700 group-hover:text-rose-600"
                  }`}>
                    <span className="relative z-10">{item.title}</span>
                    <span className={`absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
                      (isHomePage || isScrolled) ? 'bg-orange-500/20' : 'bg-rose-500/10'
                    }`}></span>
                    {item.children && (
                      <RiArrowDropDownLine className="text-lg group-hover:rotate-180 transition-transform duration-500 relative z-10" />
                    )}
                  </div>
                )}

                {/* Dropdown */}
                {item.children && (
                  <div className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out delay-100 z-50">
                    {item.children.map((child, childIndex) => (
                      <a
                        key={childIndex}
                        href={child.path}
                        className={`block px-4 py-3 text-sm transition-all duration-300 ${
                          childIndex === 0 ? "rounded-t-lg" : ""
                        } ${
                          childIndex === item.children.length - 1
                            ? "rounded-b-lg"
                            : ""
                        } ${
                          location.pathname === child.path
                            ? "bg-rose-50 text-rose-600 font-medium border-l-4 border-orange-500"
                            : "text-gray-700 hover:bg-orange-50 hover:text-orange-500 hover:border-l-4 hover:border-rose-600"
                        }`}
                      >
                        {child.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className={`lg:hidden p-2 transition-all duration-700 ease-in-out ${
              (isHomePage || isScrolled)
                ? 'text-white hover:text-orange-300' 
                : 'text-rose-600 hover:text-orange-500'
            }`}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-300"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-40 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b bg-rose-600">
          <img 
            src="/images/logo/icabmet.png"
            alt="ICABMET Logo"
            className="h-10 w-auto shadow-lg bg-white"
          />
          <button
            onClick={closeMobileMenu}
            className="p-1 text-white hover:text-orange-300 transition-colors duration-300"
            aria-label="Close menu"
          >
            <LuX size={20} />
          </button>
        </div>

        <div className="overflow-y-auto h-full pb-20">
          {navigationData.map((item, index) => (
            <div key={index}>
              {item.title === "Login" ? (
                <a
                  href={item.path}
                  onClick={closeMobileMenu}
                  className="block mx-4 my-2 px-6 py-3 text-center text-base font-semibold rounded-md text-white bg-orange-500 hover:bg-rose-600 transition-all duration-700 ease-in-out shadow-md"
                >
                  {item.title}
                </a>
              ) : item.path ? (
                <a
                  href={item.path}
                  onClick={closeMobileMenu}
                  className={`block px-6 py-4 text-base font-medium border-b border-gray-100 transition-all duration-500 ${
                    location.pathname === item.path
                      ? "bg-rose-50 text-rose-600 border-l-4 border-l-orange-500 font-semibold"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                  }`}
                >
                  {item.title}
                </a>
              ) : (
                <div className="px-6 py-4 text-base font-semibold text-gray-800 bg-gray-50 border-b border-gray-100">
                  {item.title}
                </div>
              )}

              {item.children && (
                <div className="bg-gray-50 border-b-2 border-gray-200">
                  {item.children.map((child, childIndex) => (
                    <a
                      key={childIndex}
                      href={child.path}
                      onClick={closeMobileMenu}
                      className={`block px-8 py-3 text-sm border-l-2 border-transparent transition-all duration-500 ${
                        location.pathname === child.path
                          ? "bg-rose-50 text-rose-600 font-medium border-l-orange-500"
                          : "text-gray-600 hover:bg-orange-50 hover:text-orange-500 hover:border-l-rose-600"
                      }`}
                    >
                      {child.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}