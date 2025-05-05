import { create } from "zustand";

type Theme = "dark" | "light" | "system";
const STORAGE_KEY = "grocery-app-theme";

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  initializeTheme: (defaultTheme: Theme) => void;
};

export const useThemeStore = create<ThemeStore>(set => ({
  theme: "system",
  setTheme: (theme: Theme) => {
    localStorage.setItem(STORAGE_KEY, theme);
    set({ theme });
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  },
  initializeTheme: (defaultTheme: Theme) => {
    const storedTheme = localStorage.getItem(STORAGE_KEY) as Theme;
    const theme = storedTheme || defaultTheme;
    set({ theme });
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  },
}));