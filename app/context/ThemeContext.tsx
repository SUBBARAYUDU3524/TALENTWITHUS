"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemeContextProps = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeContext must be used within ThemeProvider");
  return ctx;
}

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setThemeState("dark");
      document.documentElement.classList.add("dark");
    } else {
      setThemeState("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("theme", t);
    if (t === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};