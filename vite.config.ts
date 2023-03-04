import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig(({ command, mode }) => {
  const isDevMode = mode === "development" ? true : false;

  return {
    plugins: [solidPlugin(), vanillaExtractPlugin()],
    server: {
      host: true,
      port: 8080,
    },
    css: {
      devSourcemap: isDevMode ? true : false,
    },
    build: {
      target: "es2015",
    },
  };
});
