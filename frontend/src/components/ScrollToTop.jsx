import React, { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button after 300px scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top on click
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-300 animate-bounce"
        title="Scroll to top"
      >
        <FaChevronUp size={20} />
      </button>
    )
  );
};

export default ScrollToTop;
