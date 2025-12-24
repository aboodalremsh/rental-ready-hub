import { createContext, useContext, useEffect, useState } from "react";

/**
 * @typedef {'light' | 'dark'} Theme
 */

/**
 * @typedef {Object} ThemeContextType
 * @property {Theme} theme
 * @property {() => void} toggleTheme
 * @property {(theme: Theme) => void} setTheme
 */

/** @type {React.Context<ThemeContextType|undefined>} */
const ThemeContext = createContext(undefined);

/**
 * @param {{ children: React.ReactNode }} props
 */
export function ThemeProvider({ children }) {
  /** @type {[Theme, React.Dispatch<React.SetStateAction<Theme>>]} */
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored) return stored;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  /**
   * @param {Theme} newTheme
   */
  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * @returns {ThemeContextType}
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
