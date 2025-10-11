import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const usePageTransition = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return { isAnimating };
};
