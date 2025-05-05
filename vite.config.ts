import path from "path";
import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }): UserConfig => {
  const config: UserConfig = {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
  
  if (command === 'build') {
    config.base = "/Grocery-App/";
  }
  
  return config;
});