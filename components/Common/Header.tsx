'use client'

import React, { useState, useEffect, lazy, Suspense } from "react";

const Desktop = lazy(() => import("./Navbar/Desktop"));
const Mobile = lazy(() => import("./Navbar/Mobile"));

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // 1024px is the 'lg' breakpoint in Tailwind
    };

    // Check on initial render
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <header className="mt-3">
      <Suspense fallback={<div>Loading...</div>}>
        {isMobile ? <Mobile /> : <Desktop />}
      </Suspense>
    </header>
  );
};

export default Header;