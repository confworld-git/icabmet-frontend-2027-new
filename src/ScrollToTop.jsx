// src/ScrollToTop.jsx (or src/components/ScrollToTop.jsx)

import { useEffect, useLayoutEffect } from 'react'; // useLayoutEffect is generally preferred for scroll
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Scrolls to the top of the window instantly when the pathname changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // 'instant' for no animation, 'smooth' for smooth scroll
    });
  }, [pathname]); // This effect re-runs whenever the 'pathname' (route) changes

  return null; // This component does not render any UI
};

export default ScrollToTop;