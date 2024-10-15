import { createContext, useContext, useState, useEffect } from "react";

// Create context
const DarkModeContext = createContext();

// Custom hook to access DarkModeContext
export const useDarkMode = () => {
  return useContext(DarkModeContext);
};

// Provider component
export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Persist dark mode preference in localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('darkMode');
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'true');
    }
  }, []);

  // Toggle dark mode and store the preference
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      localStorage.setItem('darkMode', !prev);
      return !prev;
    });
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
