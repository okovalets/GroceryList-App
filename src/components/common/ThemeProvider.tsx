import { useEffect } from "react";
import { useThemeStore } from "../../store/themeStore";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: "dark" | "light" | "system";
  storageKey?: string;
};

export const ThemeProvider = ({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}: ThemeProviderProps) =>{
  const { initializeTheme } = useThemeStore();

  useEffect(() => {
    initializeTheme(defaultTheme);
  }, [defaultTheme, storageKey, initializeTheme]);

  return <>{children}</>;
}