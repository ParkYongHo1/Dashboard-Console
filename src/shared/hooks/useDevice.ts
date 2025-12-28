import { useEffect, useState, useCallback, useMemo } from "react";

const MOBILE_BREAKPOINT = 1024;

export const useDevice = () => {
  const [windowWidth, setWindowWidth] = useState(() => {
    if (typeof window === "undefined") return 1920;
    return window.innerWidth;
  });

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const device = useMemo(
    () => ({
      isMobile: windowWidth < MOBILE_BREAKPOINT,
      isDesktop: windowWidth >= MOBILE_BREAKPOINT,
      width: windowWidth,
    }),
    [windowWidth]
  );

  return device;
};
