import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AosWrapper = ({ children }) => {
  useEffect(() => {
    AOS.init({
      duration: 2000, // Animation duration in milliseconds
      once: false, // Whether animation should happen only once
    });
  }, []);

  return <div>{children}</div>;
};

export default AosWrapper;