"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "@/styles/Theme";

const STORAGE_KEY = "luxera-theme";

const ThemeModeContext = createContext({ mode: "light", toggle: () => {} });

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    let saved = null;
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      saved = null;
    }
    if (saved === "dark" || saved === "light") {
      setTimeout(() => {
        setMode(saved);
      }, 0);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    document.body?.classList.toggle("cs_dark", mode === "dark");
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {
    }
  }, [mode]);

  const toggle = useCallback(
    () => setMode((m) => (m === "dark" ? "light" : "dark")),
    []
  );

  return (
    <ThemeModeContext.Provider value={{ mode, toggle }}>
      <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
