import { useEffect } from "react";
import PropTypes from "prop-types";

const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => {
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <button onClick={() => setIsDarkMode(!isDarkMode)}>
      {isDarkMode ? (
        <img
          className="sm:w-6 sm:h-6 w-4 h-4"
          src="/images/icon-sun.svg"
          alt="dark mode button icon"
        />
      ) : (
        <img
          className="sm:w-6 sm:h-6 w-4 h-4"
          src="/images/icon-moon.svg"
          alt="dark mode button icon"
        />
      )}
    </button>
  );
};

ThemeToggle.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  setIsDarkMode: PropTypes.func.isRequired,
};

export default ThemeToggle;
