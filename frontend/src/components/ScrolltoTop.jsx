import { useState, useEffect } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function ScrolltoTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Monitor window scrolling positions
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    
    // Clean up event listener on component unmount
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Smooth scroll handler targeting document origin
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button 
          className="scroll-to-top-btn" 
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <KeyboardArrowUpIcon style={{ fontSize: "28px" }} />
        </button>
      )}
    </>
  );
}