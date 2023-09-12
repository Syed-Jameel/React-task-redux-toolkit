import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show/hide the button based on the user's scroll position
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add event listener to track scrolling
    window.addEventListener("scroll", toggleVisibility);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Adds a smooth scrolling effect
    });
  };

  return (
    <button className={`${isVisible ? "d-block" : "d-none"}  text-dark d-flex justify-content-center align-items-center border-0 rounded rounded-circle`} style={{ width: "50px", height: "50px", zIndex: "1000", position: "fixed", bottom: "5%", right: "3%", backgroundColor: "#a8eb12" }} onClick={scrollToTop} title="Scroll to Top">
      <i className="bi bi-arrow-up-circle-fill" style={{ fontSize: "30px" }}></i>
    </button>
  );
};

export default ScrollToTopButton;
