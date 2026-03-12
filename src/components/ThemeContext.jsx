import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const themes = {
  DARK: "dark",
  LIGHT: "light",
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved || themes.DARK;
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);

    // Apply theme to document
    if (theme === themes.LIGHT) {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === themes.DARK ? themes.LIGHT : themes.DARK));
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, isDark: theme === themes.DARK }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
